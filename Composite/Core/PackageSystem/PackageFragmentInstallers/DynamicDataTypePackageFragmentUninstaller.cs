using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicDataTypePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private List<DataTypeDescriptor> _dataTypeDescriptorsToDelete;
        private List<PackageFragmentValidationResult> _validationResult;

        /// <exclude />
        public override bool ValidateFirst { get { return true; } }

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
                    if (!typeIdAttribute.TryGetGuidValue(out typeId))
                    {
                        _validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentUninstaller.WrongAttributeFormat"), typeIdAttribute);
                        continue;
                    }

                    var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeId);
                    if (dataTypeDescriptor == null)
                    {
                        continue;
                    }

                    _dataTypeDescriptorsToDelete.Add(dataTypeDescriptor);

                    Type interfaceType = dataTypeDescriptor.GetInterfaceType();
                    var foreignRefereeTypes = DataReferenceFacade.GetRefereeTypes(interfaceType).Where(f => !_dataTypeDescriptorsToDelete.Any(g => g.GetInterfaceType() == f));
                    foreach (Type foreignRefereeType in foreignRefereeTypes)
                    {
                        // TODO: localize
                        _validationResult.AddFatal(string.Format("Data type '{0}' has references to type '{1}' about to be uninstalled. References must be removed before the package can be uninstalled.", foreignRefereeType, dataTypeDescriptor.TypeManagerTypeName), 
                                                    typeIdAttribute);
                    }

                    UninstallerContext.AddPendingForDeletionDataType(interfaceType);
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
            Verify.IsNotNull(_dataTypeDescriptorsToDelete, "DynamicDataTypePackageFragmentUninstaller has not been validated");

            bool flushTheSystem = false;
            foreach (DataTypeDescriptor dataTypeDescriptor in _dataTypeDescriptorsToDelete)
            {
                Log.LogVerbose(this.GetType().Name, "Uninstalling the type '{0}'", dataTypeDescriptor);

                GeneratedTypesFacade.DeleteType(dataTypeDescriptor, false);
                flushTheSystem = true;
            }

            if (flushTheSystem)
            {
                CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
