using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Data.Types;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicDataTypePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private static readonly string LogTitle = typeof (DynamicDataTypePackageFragmentInstaller).Name;

        private List<DataTypeDescriptor> _dataTypeDescriptors = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            var foreignKeyReferences = new List<string>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_OnlyOneElement);
                return validationResult;
            }

            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");
            if (typesElement == null)
            {
                validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_MissingElement);
                return validationResult;
            }

            _dataTypeDescriptors = new List<DataTypeDescriptor>();

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                XElement serializedDataTypeDescriptor;

                XAttribute fileAttribute = typeElement.Attribute("dataTypeDescriptorFile");
                if (fileAttribute != null)
                {
                    string relativeFilePath = (string)fileAttribute;

                    string markup;

                    using (var stream = this.InstallerContext.ZipFileSystem.GetFileStream(relativeFilePath))
                    using (var reader = new StreamReader(stream))
                    {
                        markup = reader.ReadToEnd();
                    }

                    serializedDataTypeDescriptor = XElement.Parse(markup);
                }
                else
                {
                    var dataTypeDescriptorAttribute = typeElement.Attribute("dataTypeDescriptor");
                    if (dataTypeDescriptorAttribute == null)
                    {
                        validationResult.AddFatal(Texts.DataTypePackageFragmentInstaller_MissingAttribute("dataTypeDescriptor"), typeElement);
                        continue;
                    }

                    try
                    {
                        serializedDataTypeDescriptor = XElement.Parse(dataTypeDescriptorAttribute.Value);
                    }
                    catch (Exception)
                    {
                        validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorParseError, dataTypeDescriptorAttribute);
                        continue;
                    }
                }

                DataTypeDescriptor dataTypeDescriptor;
                try
                {
                    bool inheritedFieldsIncluded = serializedDataTypeDescriptor.Descendants().Any(e => e.Attributes("inherited").Any(a => (string) a == "true"));

                    dataTypeDescriptor = DataTypeDescriptor.FromXml(serializedDataTypeDescriptor, inheritedFieldsIncluded);
                }
                catch (Exception e)
                {
                    validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorDeserializeError(e.Message));
                    continue;
                }

                Type type = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                if (type != null && DataFacade.GetAllKnownInterfaces().Contains(type))
                {
                    validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_TypeExists(type));
                }

                if (dataTypeDescriptor.SuperInterfaces.Any(f=>f.Name==nameof(IVersioned)))
                {
                    if (dataTypeDescriptor.Fields.All(f => f.Name != nameof(IVersioned.VersionId)))
                    {
                        dataTypeDescriptor.Fields.Add(new DataFieldDescriptor(Guid.NewGuid(), nameof(IVersioned.VersionId),StoreFieldType.Guid, typeof(Guid),true ));
                    }
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
                    validationResult.AddFatal(Texts.DynamicDataTypePackageFragmentInstaller_MissingReferencedType(foreignKeyTypeName));
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
            if (_dataTypeDescriptors == null) throw new InvalidOperationException(LogTitle + " has not been validated");

            string typeNames = string.Join(", ", _dataTypeDescriptors.Select(d => d.GetFullInterfaceName()));

            Log.LogVerbose(this.GetType().Name, $"Installing types: '{typeNames}'");

            GeneratedTypesFacade.GenerateNewTypes(_dataTypeDescriptors, true);

            var typeElements = _dataTypeDescriptors.Select(d => new XElement("Type", new XAttribute("typeId", d.DataTypeId)));

            yield return new XElement("Types", typeElements);
        }
    }
}
