using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.EventSystem;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.Xml;
using Composite.Data;


namespace Composite.PackageSystem.PackageFragmentInstallers
{
    public sealed class DynamicDataTypePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private List<DataTypeDescriptor> _dataTypeDescriptorsToDelete = null;
        private List<PackageFragmentValidationResult> _validationResult = null;


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Types").Count() > 1)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DynamicDataTypeAddOnFragmentUninstaller.OnlyOneElement")));
                return _validationResult;
            }

            XElement typesElement = this.Configuration.Where(f => f.Name == "Types").SingleOrDefault();
            if (typesElement == null) return _validationResult;

            _dataTypeDescriptorsToDelete = new List<DataTypeDescriptor>();

            foreach (XElement typeElement in typesElement.Elements("Type").Reverse())
            {
                XAttribute typeIdAttribute = typeElement.Attribute("typeId");
                if (typeIdAttribute == null)
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DynamicDataTypeAddOnFragmentUninstaller.MissingAttribute"), "typeId"), typeElement));
                    continue;
                }

                Guid typeId;
                if (typeIdAttribute.TryGetGuidValue(out typeId) == false)
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DynamicDataTypeAddOnFragmentUninstaller.WrongAttributeFormat"), typeIdAttribute));
                    continue;
                }

                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeId);
                if (dataTypeDescriptor != null)
                {
                    _dataTypeDescriptorsToDelete.Add(dataTypeDescriptor);

                    var foreignRefereeTypes = DataReferenceFacade.GetRefereeTypes(dataTypeDescriptor.GetInterfaceType()).Where(f=>_dataTypeDescriptorsToDelete.Any(g=>g.GetInterfaceType().Equals(f))==false);
                    foreach( Type foreignRefereeType in foreignRefereeTypes)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Data type '{0}' has references to type '{1}' about to be uninstalled. References must be removed before the package can be uninstalled.", foreignRefereeType, dataTypeDescriptor.TypeManagerTypeName), typeIdAttribute));
                    }
                }
            }

            if (_validationResult.Count > 0)
            {
                _dataTypeDescriptorsToDelete = null;
            }

            return _validationResult;
        }



        public override void Uninstall()
        {
            if (_dataTypeDescriptorsToDelete == null) throw new InvalidOperationException("Has not been validated");

            bool flushTheSystem = false;
            foreach (DataTypeDescriptor dataTypeDescriptor in _dataTypeDescriptorsToDelete)
            {
                LoggingService.LogVerbose("DynamicDataTypeAddOnFragmentUninstaller", string.Format("Uninstalling the type '{0}'", dataTypeDescriptor));

                GeneratedTypesFacade.DeleteType(dataTypeDescriptor, false);
                flushTheSystem = true;
            }

            if (flushTheSystem == true)
            {
                GlobalEventSystemFacade.FlushTheSystem(true);
            }
        }
    }
}
