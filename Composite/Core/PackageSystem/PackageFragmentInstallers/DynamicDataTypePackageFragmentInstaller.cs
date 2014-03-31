using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicDataTypePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<DataTypeDescriptor> _dataTypeDescriptors = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            var foreignKeyReferences = new List<string>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.OnlyOneElement"));
                return validationResult;
            }

            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");
            if (typesElement == null)
            {
                validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.MissingElement"));
                return validationResult;
            }

            _dataTypeDescriptors = new List<DataTypeDescriptor>();

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                XAttribute dataTypeDescriptorAttribute = typeElement.Attribute("dataTypeDescriptor");

                if (dataTypeDescriptorAttribute == null)
                {
                    validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.MissingAttribute").FormatWith("dataTypeDescriptor"), typeElement);
                    continue;
                }

                XElement serializedDataTypeDescriptor;
                try
                {
                    serializedDataTypeDescriptor = XElement.Parse(dataTypeDescriptorAttribute.Value);
                }
                catch (Exception)
                {
                    validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorParseError"), dataTypeDescriptorAttribute);
                    continue;
                }

                DataTypeDescriptor dataTypeDescriptor;
                try
                {
                    bool inheritedFieldsIncluded = serializedDataTypeDescriptor.Descendants().Any(e => e.Attributes("inherited").Any(a => (string) a == "true"));

                    dataTypeDescriptor = DataTypeDescriptor.FromXml(serializedDataTypeDescriptor, inheritedFieldsIncluded);
                }
                catch (Exception e)
                {
                    validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorDeserializeError").FormatWith(e.Message));
                    continue;
                }

                Type type = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                if ((type != null) && (DataFacade.GetAllKnownInterfaces().Contains(type)))
                {
                    validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.TypeExists").FormatWith(type));
                }

                foreach (var field in dataTypeDescriptor.Fields)
                {
                    if(!field.ForeignKeyReferenceTypeName.IsNullOrEmpty())
                    {
                        foreignKeyReferences.Add(field.ForeignKeyReferenceTypeName);
                    }
                }

                _dataTypeDescriptors.Add(dataTypeDescriptor);
                this.InstallerContext.AddPendingDataTypeDescritpor(dataTypeDescriptor.TypeManagerTypeName, dataTypeDescriptor);
            }

            foreach(string foreignKeyTypeName in foreignKeyReferences)
            {
                if(!TypeManager.HasTypeWithName(foreignKeyTypeName) 
                    && !_dataTypeDescriptors.Any(descriptor => descriptor.TypeManagerTypeName == foreignKeyTypeName))
                {
                    validationResult.AddFatal(GetText("DynamicDataTypePackageFragmentInstaller.MissingReferencedType").FormatWith(foreignKeyTypeName));
                }
            }

            if (validationResult.Count > 0)
            {
                _dataTypeDescriptors = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            if (_dataTypeDescriptors == null) throw new InvalidOperationException("DynamicDataTypePackageFragmentInstaller has not been validated");

            List<XElement> typeElements = new List<XElement>();
            foreach (DataTypeDescriptor dataTypeDescriptor in _dataTypeDescriptors)
            {
                Log.LogVerbose("DynamicDataTypePackageFragmentInstaller", string.Format("Installing the type '{0}'", dataTypeDescriptor));

                GeneratedTypesFacade.GenerateNewType(dataTypeDescriptor, false);

                XElement typeElement = new XElement("Type", new XAttribute("typeId", dataTypeDescriptor.DataTypeId));
                typeElements.Add(typeElement);
            }

            GlobalEventSystemFacade.FlushTheSystem(true);

            yield return new XElement("Types", typeElements);
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
