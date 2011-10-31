using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using System.Globalization;


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



        public static void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, XmlProviderInterfaceConfigurationElement oldConfigurationElement, XmlProviderInterfaceConfigurationElement newConfigurationElement)
        {
#warning MRJ: BM: HANDLE STORE CHANGE AND COPY DATA!! See updateDataTypeDescriptor.LocalesToCopyTo, updateDataTypeDescriptor.LocaleToCopyFrom, updateDataTypeDescriptor.PublicationAdded, updateDataTypeDescriptor.PublicationRemoved

            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            foreach (KeyValuePair<string, Type> kvp in oldConfigurationElement.PropertyInitializers)
            {
                newConfigurationElement.AddPropertyInitializer(kvp.Key, kvp.Value);
            }


            Dictionary<string, object> newFieldValues = new Dictionary<string, object>();

            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.AddedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in newConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    CreateStore(updateDataTypeDescriptor.ProviderName, dataScopeConfigurationElement);
                }
            }


            if (updateDataTypeDescriptor.PublicationAdded) // Data provider has to handle this with the new build manager
            {
                newFieldValues.Add("PublicationStatus", GenericPublishProcessController.Draft);
            }


            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.ExistingDataScopes)
            {
                foreach (var kvp in oldConfigurationElement.DataScopes[scopeIdentifier.Name])
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = kvp.Value;
                    DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[scopeIdentifier.Name][kvp.Key];

                    CopyData(updateDataTypeDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues);
                }
            }


            if (updateDataTypeDescriptor.PublicationAdded)
            {
                foreach (var kvp in oldConfigurationElement.DataScopes[DataScopeIdentifier.PublicName])
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = kvp.Value;
                    DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[DataScopeIdentifier.AdministratedName][kvp.Key];

                    CopyData(updateDataTypeDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);

                    DeleteData(updateDataTypeDescriptor.ProviderName, oldDataScopeConfigurationElement);
                }
            }

            if (updateDataTypeDescriptor.PublicationRemoved)
            {
                foreach (var kvp in oldConfigurationElement.DataScopes[DataScopeIdentifier.AdministratedName])
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = kvp.Value;
                    DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[DataScopeIdentifier.PublicName][kvp.Key];

                    CopyData(updateDataTypeDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);
                }
            }


#warning MRJ: BM: At this point copy data if anything is specified in updateDataTypeDescriptor.LocalesToCopyTo or updateDataTypeDescriptor.LocaleToCopyFrom

            if (updateDataTypeDescriptor.LocalesToCopyTo != null)
            {
                foreach (string dataScopeIdentifier in oldConfigurationElement.DataScopes.Keys)
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = oldConfigurationElement.DataScopes[dataScopeIdentifier][""];

                    foreach (CultureInfo locale in updateDataTypeDescriptor.LocalesToCopyTo)
                    {
                        DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[dataScopeIdentifier][locale.Name];

                        Dictionary<string, object> nfv = new Dictionary<string, object>(newFieldValues);
                        nfv.Add("CultureName", locale.Name);
                        nfv.Add("SourceCultureName", locale.Name);

                        CopyData(updateDataTypeDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, nfv, false);
                    }

                    DeleteData(updateDataTypeDescriptor.ProviderName, oldDataScopeConfigurationElement);
                }
            }


            if (updateDataTypeDescriptor.LocaleToCopyFrom != null)
            {
                foreach (string dataScopeIdentifier in oldConfigurationElement.DataScopes.Keys)
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = oldConfigurationElement.DataScopes[dataScopeIdentifier][updateDataTypeDescriptor.LocaleToCopyFrom.Name];
                    DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[dataScopeIdentifier][""];

                    CopyData(updateDataTypeDescriptor.ProviderName, dataTypeChangeDescriptor, oldDataScopeConfigurationElement, newDataScopeConfigurationElement, newFieldValues, false);
                }

                foreach (var dataScopes in oldConfigurationElement.DataScopes)
                {
                    foreach (var kvp in dataScopes.Value.Where(f => f.Key != ""))
                    {
                        DataScopeConfigurationElement dataScopeConfigurationElement = kvp.Value;
                        DeleteData(updateDataTypeDescriptor.ProviderName, dataScopeConfigurationElement);
                    }
                }
            }


            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.DeletedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in oldConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    DropStore(updateDataTypeDescriptor.ProviderName, dataScopeConfigurationElement);
                }
            }
        }



        private static void CopyData(string providerName, DataTypeChangeDescriptor dataTypeChangeDescriptor, DataScopeConfigurationElement oldDataScopeConfigurationElement, DataScopeConfigurationElement newDataScopeConfigurationElement, Dictionary<string, object> newFieldValues, bool deleteOldFile = true)
        {
            string oldFilename = ResolvePath(oldDataScopeConfigurationElement.Filename, providerName);
            string newFilename = ResolvePath(newDataScopeConfigurationElement.Filename, providerName);

            XDocument oldDocument = XDocumentUtils.Load(PathUtil.Resolve(oldFilename));

            List<XElement> newElements = new List<XElement>();

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

                foreach (DataFieldDescriptor fieldDescriptor in dataTypeChangeDescriptor.AddedFields)
                {
                    if (fieldDescriptor.IsNullable == false
                        && !newChildAttributes.Any(attr => attr.Name == fieldDescriptor.Name))
                    {
                        XAttribute newChildAttribute = new XAttribute(fieldDescriptor.Name, fieldDescriptor.DefaultValue.Value);

                        if (newFieldValues.ContainsKey(fieldDescriptor.Name))
                        {
                            newChildAttribute.SetValue(newFieldValues[fieldDescriptor.Name]);
                        }

                        newChildAttributes.Add(newChildAttribute);
                    }
                    else if (newFieldValues.ContainsKey(fieldDescriptor.Name))
                    {
                        XAttribute attribute = newChildAttributes.Where(attr => attr.Name == fieldDescriptor.Name).SingleOrDefault();
                        if (attribute != null)
                        {
                            attribute.SetValue(newFieldValues[fieldDescriptor.Name]);
                        }
                    }
                }

                XElement newElement = new XElement(newDataScopeConfigurationElement.ElementName, newChildAttributes);

                newElements.Add(newElement);
            }

            if (deleteOldFile)
            {
                C1File.Delete(oldFilename);
            }

            XElement newRoot = new XElement(string.Format("{0}s", newDataScopeConfigurationElement.ElementName));
            newRoot.Add(newElements);

            XDocument newDocument = new XDocument();
            newDocument.Add(newRoot);

            XDocumentUtils.Save(newDocument, newFilename);
        }



        private static void DeleteData(string providerName, DataScopeConfigurationElement dataScopeConfigurationElement)
        {
            string filename = ResolvePath(dataScopeConfigurationElement.Filename, providerName);

            XElement root = new XElement(string.Format("{0}s", dataScopeConfigurationElement.ElementName));

            XDocument document = new XDocument();
            document.Add(root);

            XDocumentUtils.Save(document, filename);
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
            if (C1Directory.Exists(directoryPath) == false)
            {
                C1Directory.CreateDirectory(directoryPath);
            }

            bool keepExistingFile = false;
            string rootLocalName = string.Format("{0}s", scopeElement.ElementName);

            if (C1File.Exists(filename) == true)
            {
                try
                {
                    XDocument existingDocument = XDocumentUtils.Load(filename);
                    if (existingDocument.Root.Name.LocalName == rootLocalName)
                    {
                        keepExistingFile = true;
                    }
                }
                catch (Exception)
                {
                    keepExistingFile = false;
                }

                if (keepExistingFile == false)
                {
                    C1File.Delete(filename);
                }
            }

            if (keepExistingFile == false)
            {
                XDocument document = new XDocument();
                document.Add(new XElement(rootLocalName));
                XDocumentUtils.Save(document, filename);
            }
        }



        internal static void DropStore(string providerName, DataScopeConfigurationElement scopeElement)
        {
            string filename = ResolvePath(scopeElement.Filename, providerName);

            if (C1File.Exists(filename) == true)
            {
                C1File.Delete(filename);
            }
        }



        private static DataTypeChangeDescriptor.ExistingFieldInfo GetExistingFieldInfo(DataTypeChangeDescriptor dataTypeChangeDescriptor, string name)
        {
            return dataTypeChangeDescriptor.ExistingFields.Where(f => f.OriginalField.Name == name).FirstOrDefault();
        }



        private static string ResolvePath(string filename, string providerName)
        {
            XmlDataProviderData providerConfiguration = GetProviderSettings(providerName);

            string s = Path.Combine(providerConfiguration.StoreDirectory, filename);

            return PathUtil.Resolve(Path.Combine(providerConfiguration.StoreDirectory, filename));
        }



        private static XmlDataProviderData GetProviderSettings(string providerName)
        {
            return (XmlDataProviderData)DataProviderConfigurationServices.GetDataProviderConfiguration(providerName);
        }
    }
}
