using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.Common;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class InterfaceConfigurationManipulator
    {
        /// <summary>
        /// Create an invariant store
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="dataTypeDescriptor"></param>
        public static void AddNew(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            XmlProviderInterfaceConfigurationElement configurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor);

            string interfaceType = dataTypeDescriptor.TypeManagerTypeName;

            if (interfaceType != null)
            {
                object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor.TypeManagerTypeName);

                if (key != null)
                {
                    throw new InvalidOperationException(string.Format("Configuration already contains an interface type '{0}'", configurationElement.InterfaceType));
                }
            }

            XmlDataProviderStoreManipulator.CreateStore(providerName, configurationElement);

            xmlDataProviderConfiguration.Section.Interfaces.Add(configurationElement);

            xmlDataProviderConfiguration.Save();
        }



        public static void Change(string providerName, DataTypeChangeDescriptor changeDescriptor)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            string oldInterfaceTypeName = changeDescriptor.OriginalType.TypeManagerTypeName;

            object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(oldInterfaceTypeName);

            XmlProviderInterfaceConfigurationElement oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
            XmlProviderInterfaceConfigurationElement newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(changeDescriptor.AlteredType);

            XmlDataProviderStoreManipulator.AlterStore(providerName, oldConfigurationElement, newConfigurationElement, changeDescriptor);

            xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
            xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);

            xmlDataProviderConfiguration.Save();
        }



        public static void Remove(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor.TypeManagerTypeName);

            if (key != null)
            {
                XmlProviderInterfaceConfigurationElement element = xmlDataProviderConfiguration.Section.Interfaces.Get(key);

                xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
                xmlDataProviderConfiguration.Save();

                XmlDataProviderStoreManipulator.DropStore(providerName, element);
            }
        }



        public static void AddLocale(string providerName, IEnumerable<Type> interfaceTypes, CultureInfo cultureInfo)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            foreach (Type type in interfaceTypes)
            {
                if (DataLocalizationFacade.IsLocalizable(type) == true)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                    object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor.TypeManagerTypeName);
                    XmlProviderInterfaceConfigurationElement newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, cultureInfo, null);

                    xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
                    xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);

                    foreach (var kvp in newConfigurationElement.DataScopes.Values)
                    {
                        XmlDataProviderStoreManipulator.CreateStore(providerName, kvp[cultureInfo.Name]);
                    }
                }
            }

            xmlDataProviderConfiguration.Save();
        }



        public static void RemoveLocale(string providerName, IEnumerable<Type> interfaceTypes, CultureInfo cultureInfo)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            foreach (Type type in interfaceTypes)
            {
                if (DataLocalizationFacade.IsLocalizable(type) == true)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                    object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor.TypeManagerTypeName);

                    XmlProviderInterfaceConfigurationElement oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
                    foreach (var kvp in oldConfigurationElement.DataScopes.Values)
                    {
                        XmlDataProviderStoreManipulator.DropStore(providerName, kvp[cultureInfo.Name]);
                    }

                    XmlProviderInterfaceConfigurationElement newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, null, cultureInfo);

                    xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
                    xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);
                }
            }

            xmlDataProviderConfiguration.Save();
        }



        private static XmlProviderInterfaceConfigurationElement BuildXmlProviderInterfaceConfigurationElement(DataTypeDescriptor dataTypeDescriptor)
        {
            return BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, null, null);
        }


        private static XmlProviderInterfaceConfigurationElement BuildXmlProviderInterfaceConfigurationElement(DataTypeDescriptor dataTypeDescriptor, CultureInfo addedCultureInfo, CultureInfo removedCultureInfo)
        {
            XmlProviderInterfaceConfigurationElement configurationElement = new XmlProviderInterfaceConfigurationElement();
            configurationElement.InterfaceType = dataTypeDescriptor.TypeManagerTypeName;
            configurationElement.IsGeneratedType = dataTypeDescriptor.IsCodeGenerated;

            bool isLocalizable = false;
            if (dataTypeDescriptor.IsCodeGenerated == false)
            {
                Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);
                isLocalizable = DataLocalizationFacade.IsLocalizable(interfaceType);
            }
            else 
            {
                isLocalizable = true;
            }

            foreach (DataScopeIdentifier dataScopeIdentifier in dataTypeDescriptor.DataScopes)
            {
                configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                {
                    DataScope = dataScopeIdentifier.Name,
                    CultureName = CultureInfo.InvariantCulture.Name,
                    Filename = MakeFilename(dataTypeDescriptor, dataScopeIdentifier, CultureInfo.InvariantCulture.Name),
                    ElementName = MakeElementName(dataTypeDescriptor)
                });

                if (isLocalizable == true)
                {
                    List<string> localezationNames = DataLocalizationFacade.ActiveLocalizationNames.ToList();
                    foreach (string cultureName in localezationNames)
                    {
                        if ((removedCultureInfo != null) && (removedCultureInfo.Name == cultureName)) continue;

                        configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                            {
                                DataScope = dataScopeIdentifier.Name,
                                CultureName = cultureName,
                                Filename = MakeFilename(dataTypeDescriptor, dataScopeIdentifier, cultureName),
                                ElementName = MakeElementName(dataTypeDescriptor)
                            });
                    }


                    if ((addedCultureInfo != null) && (localezationNames.Contains(addedCultureInfo.Name) == false))
                    {
                        configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                        {
                            DataScope = dataScopeIdentifier.Name,
                            CultureName = addedCultureInfo.Name,
                            Filename = MakeFilename(dataTypeDescriptor, dataScopeIdentifier, addedCultureInfo.Name),
                            ElementName = MakeElementName(dataTypeDescriptor)
                        });
                    }
                }
            }

            configurationElement.ConfigurationDataIdProperties = new SimpleNameTypeConfigurationElementCollection();
            foreach (DataFieldDescriptor field in dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)))
            {
                configurationElement.ConfigurationDataIdProperties.Add(field.Name, field.InstanceType);
            }

            configurationElement.ConfigurationPropertyNameMappings = new PropertyNameMappingConfigurationElementCollection();
            configurationElement.ConfigurationPropertyInitializers = new SimpleNameTypeConfigurationElementCollection();

            return configurationElement;
        }




        private static string MakeFilename(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScopeIdentifier, string cultureName)
        {
            if (cultureName == "")
            {
                return string.Format("{0}s_{1}.xml", StringExtensionMethods.CreateNamespace(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name, '.'), dataScopeIdentifier.Name);
            }
            else
            {
                return string.Format("{0}s_{1}_{2}.xml", StringExtensionMethods.CreateNamespace(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name, '.'), dataScopeIdentifier.Name, cultureName);
            }
        }




        private static string MakeElementName(DataTypeDescriptor dataTypeDescriptor)
        {
            string name = dataTypeDescriptor.Name;

            if (name.StartsWith("I") == true)
            {
                name = name.Remove(0, 1);
                name = string.Format("{0}{1}", name.Substring(0, 1).ToUpper(), name.Remove(0, 1));
            }

            return name;
        }



        private sealed class XmlDataProviderConfiguration
        {
            Configuration _configuration = null;

            public XmlDataProviderConfiguration(string providerName)
            {
                _configuration = Configuration.Load(System.IO.Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), string.Format("{0}.config", providerName)));

                this.Section = _configuration.GetSection(XmlDataProviderConfigurationSection.SectionName) as XmlDataProviderConfigurationSection;

                if (this.Section == null)
                {
                    this.Section = new XmlDataProviderConfigurationSection();
                    _configuration.Sections.Add(XmlDataProviderConfigurationSection.SectionName, this.Section);
                }
            }



            public XmlDataProviderConfigurationSection Section
            {
                get;
                private set;
            }



            public void Save()
            {
                _configuration.Save();
            }
        }
    }
}
