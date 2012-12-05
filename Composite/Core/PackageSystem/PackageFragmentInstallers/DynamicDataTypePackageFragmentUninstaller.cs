using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.C1Console.Events;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicDataTypePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private List<DataTypeDescriptor> _dataTypeDescriptorsToDelete = null;
        private List<PackageFragmentValidationResult> _validationResult = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                _validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentUninstaller.OnlyOneElement"));
                return _validationResult;
            }

            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");

            _dataTypeDescriptorsToDelete = new List<DataTypeDescriptor>();

            if (typesElement != null)
            {
                foreach (XElement typeElement in typesElement.Elements("Type").Reverse())
                {
                    XAttribute typeIdAttribute = typeElement.Attribute("typeId");
                    if (typeIdAttribute == null)
                    {
                        _validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentUninstaller.MissingAttribute").FormatWith("typeId"), typeElement);
                        continue;
                    }

                    Guid typeId;
                    if (typeIdAttribute.TryGetGuidValue(out typeId) == false)
                    {
                        _validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentUninstaller.WrongAttributeFormat"), typeIdAttribute);
                        continue;
                    }

                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeId);
                    if (dataTypeDescriptor != null)
                    {
                        _dataTypeDescriptorsToDelete.Add(dataTypeDescriptor);

                        var foreignRefereeTypes = DataReferenceFacade.GetRefereeTypes(dataTypeDescriptor.GetInterfaceType()).Where(f => _dataTypeDescriptorsToDelete.Any(g => g.GetInterfaceType().Equals(f)) == false);
                        foreach (Type foreignRefereeType in foreignRefereeTypes)
                        {
                            _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format("Data type '{0}' has references to type '{1}' about to be uninstalled. References must be removed before the package can be uninstalled.", foreignRefereeType, dataTypeDescriptor.TypeManagerTypeName), typeIdAttribute));
                        }
                    }
                }
            }

            if (_validationResult.Count > 0)
            {
                _dataTypeDescriptorsToDelete = null;
            }

            return _validationResult;
        }



        /// <exclude />
        public override void Uninstall()
        {
            if (_dataTypeDescriptorsToDelete == null) throw new InvalidOperationException("DynamicDataTypePackageFragmentUninstaller has not been validated");

            bool flushTheSystem = false;
            foreach (DataTypeDescriptor dataTypeDescriptor in _dataTypeDescriptorsToDelete)
            {
                Log.LogVerbose("DynamicDataTypePackageFragmentUninstaller", string.Format("Uninstalling the type '{0}'", dataTypeDescriptor));

                GeneratedTypesFacade.DeleteType(dataTypeDescriptor, false);
                flushTheSystem = true;
            }

            if (flushTheSystem == true)
            {
                GlobalEventSystemFacade.FlushTheSystem(true);
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
