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



        public static void AlterStore(string providerName, XmlProviderInterfaceConfigurationElement oldConfigurationElement, XmlProviderInterfaceConfigurationElement newConfigurationElement, DataTypeChangeDescriptor dataTypeChangeDescriptor)
        {
            foreach (KeyValuePair<string, Type> kvp in oldConfigurationElement.PropertyInitializers)
            {
                newConfigurationElement.AddPropertyInitializer(kvp.Key, kvp.Value);
            }


            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.AddedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in newConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    CreateStore(providerName, dataScopeConfigurationElement);
                }
            }

            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.DeletedDataScopes)
            {
                foreach (DataScopeConfigurationElement dataScopeConfigurationElement in oldConfigurationElement.DataScopes[scopeIdentifier.Name].Values)
                {
                    DropStore(providerName, dataScopeConfigurationElement);
                }
            }

            foreach (DataScopeIdentifier scopeIdentifier in dataTypeChangeDescriptor.ExistingDataScopes)
            {
                foreach (var kvp in oldConfigurationElement.DataScopes[scopeIdentifier.Name])
                {
                    DataScopeConfigurationElement oldDataScopeConfigurationElement = kvp.Value;
                    DataScopeConfigurationElement newDataScopeConfigurationElement = newConfigurationElement.DataScopes[scopeIdentifier.Name][kvp.Key];

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

                                newChildAttributes.Add(newChildAttribute);
                            }
                        }

                        XElement newElement = new XElement(newDataScopeConfigurationElement.ElementName, newChildAttributes);

                        newElements.Add(newElement);
                    }

                    C1File.Delete(oldFilename);

                    XElement newRoot = new XElement(string.Format("{0}s", newDataScopeConfigurationElement.ElementName));
                    newRoot.Add(newElements);

                    XDocument newDocument = new XDocument();
                    newDocument.Add(newRoot);

                    XDocumentUtils.Save(newDocument, newFilename);
                }
            }
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
            if (C1Directory.Exists(directoryPath)==false)
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
