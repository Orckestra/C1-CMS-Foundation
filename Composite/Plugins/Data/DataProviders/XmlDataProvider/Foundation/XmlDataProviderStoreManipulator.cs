using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class XmlDataProviderStoreManipulator
    {
        public static void CreateStore(string providerName, XmlProviderInterfaceConfigurationElement configurationElement)
        {
            foreach (DataScopeConfigurationElement scopeElement in configurationElement.ConfigurationStores)
            {
                CreateStore(providerName, scopeElement);
            }
        }



        public static void AlterStore(UpdateDataTypeDescriptor updateDescriptor, XmlProviderInterfaceConfigurationElement oldConfigurationElement, XmlProviderInterfaceConfigurationElement newConfigurationElement)
        {
            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDescriptor.CreateDataTypeChangeDescriptor();

            foreach (KeyValuePair<string, Type> kvp in oldConfigurationElement.PropertyInitializers)
            {
                newConfigurationElement.AddPropertyInitializer(kvp.Key, kvp.Value);
            }

            Dictionary<string, object> newFieldValues = new Dictionary<string, object>();

            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.AddedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in newConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    CreateStore(updateDescriptor.ProviderName, dataScopeConfigurationElement);
                }
            }
           


            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.ExistingDataScopes)
            {
                foreach (KeyValuePair<string, DataScopeConfigurationElement> fileForLanguage in oldConfigurationElement.DataScopes[scopeIdentifier.Name])
                {
                    string cultureName = fileForLanguage.Key;

                    if (!newConfigurationElement.DataScopes[scopeIdentifier.Name].ContainsKey(cultureName))
                    {
                        continue;
                    }

                    var oldDataScopeConfigurationElement = fileForLanguage.Value;
                    var newDataScopeConfigurationElement = newConfigurationElement.DataScopes[scopeIdentifier.Name][cultureName];

                    newFieldValues = new Dictionary<string, object>
                    {
                        {"PublicationStatus", GenericPublishProcessController.Published}
                    };

                    CopyData(updateDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues);
                }
            }


            if (updateDescriptor.PublicationAdded)
            {
                foreach (var fileByLanguage in oldConfigurationElement.DataScopes[DataScopeIdentifier.PublicName])
                {
                    var oldDataScopeConfigurationElement = fileByLanguage.Value;
                    var newDataScopeConfigurationElement = newConfigurationElement.DataScopes[DataScopeIdentifier.AdministratedName][fileByLanguage.Key];

                    newFieldValues = new Dictionary<string, object>
                    {
                        {"PublicationStatus", GenericPublishProcessController.Published}
                    };

                    CopyData(updateDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);
                }
            }

            if (updateDescriptor.PublicationRemoved)
            {
                foreach (var fileByLanguage in oldConfigurationElement.DataScopes[DataScopeIdentifier.AdministratedName])
                {
                    var oldDataScopeConfigurationElement = fileByLanguage.Value;
                    var newDataScopeConfigurationElement = newConfigurationElement.DataScopes[DataScopeIdentifier.PublicName][fileByLanguage.Key];

                    CopyData(updateDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);
                }
            }


            bool oldTypeLocalized = updateDescriptor.OldDataTypeDescriptor.Localizeable;
            bool newTypeLocalized = updateDescriptor.NewDataTypeDescriptor.Localizeable;

            if (!oldTypeLocalized && newTypeLocalized)
            {
                foreach (var newStore in newConfigurationElement.DataScopes.Values.SelectMany(kvp => kvp.Values))
                {
                    CreateStore(updateDescriptor.ProviderName, newStore);
                }

                foreach (string dataScopeIdentifier in oldConfigurationElement.DataScopes.Keys)
                {
                    var oldFilesByCulture = oldConfigurationElement.DataScopes[dataScopeIdentifier];

                    string invariantCultureKey = "";

                    if (oldFilesByCulture.ContainsKey(invariantCultureKey))
                    {
                        var oldDataScopeConfigurationElement = oldFilesByCulture[invariantCultureKey];

                        if (updateDescriptor.LocalesToCopyTo != null)
                        {
                            foreach (CultureInfo locale in updateDescriptor.LocalesToCopyTo)
                            {
                                var newDataScopeConfigurationElement = newConfigurationElement.DataScopes[dataScopeIdentifier][locale.Name];

                                var nfv = new Dictionary<string, object>(newFieldValues)
                                {
                                    {"SourceCultureName", locale.Name}
                                };

                                CopyData(updateDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, nfv, false);
                            }
                        }

                        DropStore(updateDescriptor.ProviderName, oldDataScopeConfigurationElement);
                    }
                }
            }

            if (oldTypeLocalized && !newTypeLocalized)
            {
                foreach (var newStore in newConfigurationElement.DataScopes.Values.SelectMany(kvp => kvp.Values))
                {
                    CreateStore(updateDescriptor.ProviderName, newStore);
                }

                if (updateDescriptor.LocaleToCopyFrom != null)
                {
                    foreach (string dataScopeIdentifier in oldConfigurationElement.DataScopes.Keys)
                    {
                        var oldDataScopeConfigurationElement = oldConfigurationElement.DataScopes[dataScopeIdentifier][updateDescriptor.LocaleToCopyFrom.Name];
                        var newDataScopeConfigurationElement = newConfigurationElement.DataScopes[dataScopeIdentifier][""];

                        CopyData(updateDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);
                    }
                }

                foreach (var oldStore in oldConfigurationElement.DataScopes.SelectMany(d => d.Value).Where(f => f.Key != "").Select(f => f.Value))
                {
                    DropStore(updateDescriptor.ProviderName, oldStore);
                }
            }

            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.DeletedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in oldConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    DropStore(updateDescriptor.ProviderName, dataScopeConfigurationElement);
                }
            }
        }



        private static void CopyData(string providerName, DataTypeChangeDescriptor dataTypeChangeDescriptor, DataScopeConfigurationElement oldDataScopeConfigurationElement, DataScopeConfigurationElement newDataScopeConfigurationElement, Dictionary<string, object> newFieldValues, bool deleteOldFile = true)
        {
            string oldFilename = ResolvePath(oldDataScopeConfigurationElement.Filename, providerName);
            string newFilename = ResolvePath(newDataScopeConfigurationElement.Filename, providerName);

            XDocument oldDocument = XDocumentUtils.Load(PathUtil.Resolve(oldFilename));

            List<XElement> newElements = new List<XElement>();

            bool addingVersionId = dataTypeChangeDescriptor.AddedFields.Any(f => f.Name == nameof(IVersioned.VersionId))
                                   && dataTypeChangeDescriptor.AlteredType.SuperInterfaces.Any(s => s == typeof (IVersioned));

            string versionIdSourceFieldName = null;
            if (addingVersionId)
            {
                if (dataTypeChangeDescriptor.AlteredType.DataTypeId == typeof(IPage).GetImmutableTypeId())
                {
                    versionIdSourceFieldName = nameof(IPage.Id);
                }
                else
                {
                    versionIdSourceFieldName = dataTypeChangeDescriptor.AlteredType.Fields
                        .Where(f => f.InstanceType == typeof(Guid)
                                    && (f.ForeignKeyReferenceTypeName?.Contains(typeof(IPage).FullName) ?? false))
                        .OrderByDescending(f => f.Name == nameof(IPageData.PageId))
                        .Select(f => f.Name)
                        .FirstOrDefault();
                }
            }


            foreach (XElement oldElement in oldDocument.Root.Elements())
            {
                List<XAttribute> newChildAttributes = new List<XAttribute>();

                foreach (XAttribute oldChildAttribute in oldElement.Attributes())
                {
                    var existingFieldInfo = GetExistingFieldInfo(dataTypeChangeDescriptor, oldChildAttribute.Name.LocalName);

                    if (existingFieldInfo != null)
                    {
                        if (existingFieldInfo.OriginalField.Name != existingFieldInfo.AlteredField.Name)
                        {
                            XAttribute newChildAttribute = new XAttribute(existingFieldInfo.AlteredField.Name, oldChildAttribute.Value);

                            newChildAttributes.Add(newChildAttribute);
                        }
                        else
                        {
                            newChildAttributes.Add(oldChildAttribute);
                        }
                    }
                    // It may happen that some data were added before data descriptors are updated, in the case of using 
                    // [AutoUpdateable] attribute. 
                    else if (dataTypeChangeDescriptor.AddedFields.Any(addedField => addedField.Name == oldChildAttribute.Name))
                    {
                        newChildAttributes.Add(oldChildAttribute);
                    }
                }

                // Adding default value for fields that are NULL and become required
                foreach (var existingFieldInfo in dataTypeChangeDescriptor.ExistingFields)
                {
                    bool fieldBecomeRequired = existingFieldInfo.OriginalField.IsNullable && !existingFieldInfo.AlteredField.IsNullable;

                    string fieldName = existingFieldInfo.AlteredField.Name;

                    if (fieldBecomeRequired && !newChildAttributes.Any(attr => attr.Name.LocalName == fieldName))
                    {
                        newChildAttributes.Add(new XAttribute(fieldName, GetDefaultValue(existingFieldInfo.AlteredField)));
                    }
                }

                foreach (DataFieldDescriptor fieldDescriptor in dataTypeChangeDescriptor.AddedFields)
                {
                    if (addingVersionId && fieldDescriptor.Name == nameof(IVersioned.VersionId) && versionIdSourceFieldName != null)
                    {
                        if (!oldElement.Attributes().Any(a => a.Name.LocalName == nameof(IVersioned.VersionId)))
                        {
                            var sourceFieldValue = (Guid)oldElement.Attribute(versionIdSourceFieldName);

                            newChildAttributes.Add(new XAttribute(fieldDescriptor.Name, sourceFieldValue));
                        }

                        continue;
                    }

                    if (!fieldDescriptor.IsNullable
                        && !newChildAttributes.Any(attr => attr.Name == fieldDescriptor.Name))
                    {
                        object value;
                        if (!newFieldValues.TryGetValue(fieldDescriptor.Name, out value))
                        {
                            value = GetDefaultValue(fieldDescriptor);
                        }

                        newChildAttributes.Add(new XAttribute(fieldDescriptor.Name, value));
                    }
                    else if (newFieldValues.ContainsKey(fieldDescriptor.Name))
                    {
                        XAttribute attribute = newChildAttributes.SingleOrDefault(attr => attr.Name == fieldDescriptor.Name);

                        attribute?.SetValue(newFieldValues[fieldDescriptor.Name]);
                    }
                }

                XElement newElement = new XElement(newDataScopeConfigurationElement.ElementName, newChildAttributes);

                newElements.Add(newElement);
            }

            if (deleteOldFile)
            {
                C1File.Delete(oldFilename);
            }

            var newDocument = new XDocument(
                new XElement(XmlDataProviderDocumentWriter.GetRootElementName(newDataScopeConfigurationElement.ElementName),
                    newElements));

            XDocumentUtils.Save(newDocument, newFilename);
        }


        private static object GetDefaultValue(DataFieldDescriptor fieldDescriptor)
        {
            Verify.ArgumentNotNull(fieldDescriptor, "fieldDescriptor");

            if (fieldDescriptor.DefaultValue != null)
            {
                return fieldDescriptor.DefaultValue.Value;
            }

            switch (fieldDescriptor.StoreType.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.Boolean:
                    return false;
                case PhysicalStoreFieldType.DateTime:
                    return DateTime.Now;
                case PhysicalStoreFieldType.Integer:
                case PhysicalStoreFieldType.Long:
                case PhysicalStoreFieldType.Decimal:
                    return 0m;
                case PhysicalStoreFieldType.Guid:
                    return Guid.Empty;
                case PhysicalStoreFieldType.String:
                case PhysicalStoreFieldType.LargeString:
                    return string.Empty;
            }

            throw new NotImplementedException("Supplied StoreFieldType contains an unsupported PhysicalStoreType '{0}'."
                                              .FormatWith(fieldDescriptor.StoreType.PhysicalStoreType));
        }

        public static void DropStore(string providerName, XmlProviderInterfaceConfigurationElement configurationElement)
        {
            foreach (DataScopeConfigurationElement scopeElement in configurationElement.ConfigurationStores)
            {
                DropStore(providerName, scopeElement);
            }
        }



        internal static void CreateStore(string providerName, DataScopeConfigurationElement scopeElement)
        {
            string filename = ResolvePath(scopeElement.Filename, providerName);

            string directoryPath = Path.GetDirectoryName(filename);
            if (!C1Directory.Exists(directoryPath))
            {
                C1Directory.CreateDirectory(directoryPath);
            }

            bool keepExistingFile = false;
            string rootLocalName = XmlDataProviderDocumentWriter.GetRootElementName(scopeElement.ElementName);
            string obsoleteRootElementName = scopeElement.ElementName + "s";

            if (C1File.Exists(filename))
            {
                try
                {
                    XDocument existingDocument = XDocumentUtils.Load(filename);
                    if (existingDocument.Root.Name.LocalName == rootLocalName
                        || existingDocument.Root.Name.LocalName == obsoleteRootElementName)
                    {
                        keepExistingFile = true;
                    }
                }
                catch (Exception)
                {
                    keepExistingFile = false;
                }

                if (!keepExistingFile)
                {
                    C1File.Delete(filename);
                }
            }

            if (!keepExistingFile)
            {
                var document = new XDocument();
                document.Add(new XElement(rootLocalName));
                XDocumentUtils.Save(document, filename);
            }
        }



        internal static void DropStore(string providerName, DataScopeConfigurationElement scopeElement)
        {
            string filename = ResolvePath(scopeElement.Filename, providerName);

            if (C1File.Exists(filename))
            {
                C1File.Delete(filename);
            }
        }



        private static DataTypeChangeDescriptor.ExistingFieldInfo GetExistingFieldInfo(DataTypeChangeDescriptor dataTypeChangeDescriptor, string name)
        {
            return dataTypeChangeDescriptor.ExistingFields.FirstOrDefault(f => f.OriginalField.Name == name);
        }



        private static string ResolvePath(string filename, string providerName)
        {
            XmlDataProviderData providerConfiguration = GetProviderSettings(providerName);

            return PathUtil.Resolve(Path.Combine(providerConfiguration.StoreDirectory, filename));
        }



        private static XmlDataProviderData GetProviderSettings(string providerName)
        {
            return (XmlDataProviderData)DataProviderConfigurationServices.GetDataProviderConfiguration(providerName);
        }
    }
}
