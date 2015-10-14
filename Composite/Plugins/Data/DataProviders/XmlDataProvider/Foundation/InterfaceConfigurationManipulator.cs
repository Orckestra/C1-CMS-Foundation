using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.Common;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal static class InterfaceConfigurationManipulator
    {
        private static readonly string LogTitle = typeof(InterfaceConfigurationManipulator).Name;

        /// <summary>
        /// Create an invariant store
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="dataTypeDescriptor"></param>
        public static void AddNew(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            var xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            string interfaceType = dataTypeDescriptor.TypeManagerTypeName;

            if (interfaceType != null)
            {
                object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

                if (key != null)
                {
                    Log.LogWarning(LogTitle, 
                        "Configuration file '{0}' already contains an interface type '{1} 'with id '{2}'. "
                        + "Possibly there are multiple AppDomain-s running.",
                        xmlDataProviderConfiguration.ConfigurationFilePath, dataTypeDescriptor, dataTypeDescriptor.DataTypeId);
                    return;
                }
            }

            XmlProviderInterfaceConfigurationElement configurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor);

            XmlDataProviderStoreManipulator.CreateStore(providerName, configurationElement);

            xmlDataProviderConfiguration.Section.Interfaces.Add(configurationElement);

            xmlDataProviderConfiguration.Save();
        }



        public static XmlProviderInterfaceConfigurationElement Change(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            DataTypeChangeDescriptor changeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            var xmlDataProviderConfiguration = new XmlDataProviderConfiguration(updateDataTypeDescriptor.ProviderName);

            object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(changeDescriptor.OriginalType);

            var oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
            var newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(changeDescriptor.AlteredType, oldConfigurationElement);

            XmlDataProviderStoreManipulator.AlterStore(updateDataTypeDescriptor, oldConfigurationElement, newConfigurationElement);

            xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
            xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);

            xmlDataProviderConfiguration.Save();

            return newConfigurationElement;
        }



        public static void Remove(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

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
                if (!DataLocalizationFacade.IsLocalized(type))
                {
                    continue;
                }

                var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

                var oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
                var newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, cultureInfo, null, oldConfigurationElement);

                xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
                xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);

                foreach (Dictionary<string, DataScopeConfigurationElement> filesByCulture in newConfigurationElement.DataScopes.Values)
                {
                    XmlDataProviderStoreManipulator.CreateStore(providerName, filesByCulture[cultureInfo.Name]);
                }
            }

            xmlDataProviderConfiguration.Save();
        }



        public static void RemoveLocale(string providerName, IEnumerable<Type> interfaceTypes, CultureInfo cultureInfo)
        {
            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            foreach (Type type in interfaceTypes)
            {
                if (DataLocalizationFacade.IsLocalizable(type))
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                    object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

                    bool configurationChanged = false;

                    var oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
                    foreach (Dictionary<string, DataScopeConfigurationElement> scopesByLanguage in oldConfigurationElement.DataScopes.Values)
                    {
                        if (scopesByLanguage.ContainsKey(cultureInfo.Name))
                        {
                            XmlDataProviderStoreManipulator.DropStore(providerName, scopesByLanguage[cultureInfo.Name]);
                            configurationChanged = true;
                        }
                    }

                    if (configurationChanged)
                    {
                        var newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, null, cultureInfo, oldConfigurationElement);

                        xmlDataProviderConfiguration.Section.Interfaces.Remove(key);
                        xmlDataProviderConfiguration.Section.Interfaces.Add(newConfigurationElement);
                    }
                }
            }

            xmlDataProviderConfiguration.Save();
        }



        private static XmlProviderInterfaceConfigurationElement BuildXmlProviderInterfaceConfigurationElement(
            DataTypeDescriptor dataTypeDescriptor,
            XmlProviderInterfaceConfigurationElement existingElement = null)
        {
            return BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor, null, null, existingElement);
        }


        private static XmlProviderInterfaceConfigurationElement BuildXmlProviderInterfaceConfigurationElement(
            DataTypeDescriptor dataTypeDescriptor, 
            CultureInfo addedCultureInfo, 
            CultureInfo removedCultureInfo,
            XmlProviderInterfaceConfigurationElement existingElement)
        {
            var configurationElement = new XmlProviderInterfaceConfigurationElement
            {
                DataTypeId = dataTypeDescriptor.DataTypeId,
                IsGeneratedType = dataTypeDescriptor.IsCodeGenerated
            };

            bool isLocalized = dataTypeDescriptor.Localizeable;
            foreach (DataScopeIdentifier dataScopeIdentifier in dataTypeDescriptor.DataScopes)
            {
                if (!isLocalized)
                {
                    configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                    {
                        DataScope = dataScopeIdentifier.Name,
                        CultureName = CultureInfo.InvariantCulture.Name,
                        Filename = NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, CultureInfo.InvariantCulture.Name),
                        ElementName = NamesCreator.MakeElementName(dataTypeDescriptor)
                    });
                }

                if (isLocalized)
                {
                    List<string> localizationNames = DataLocalizationFacade.ActiveLocalizationNames.ToList();
                    foreach (string cultureName in localizationNames)
                    {
                        if (removedCultureInfo != null && removedCultureInfo.Name == cultureName) continue;

                        string existingFileName = null;
                        string existingElementName = null;

                        if (existingElement != null)
                        {
                            foreach (DataScopeConfigurationElement store in existingElement.ConfigurationStores)
                            {
                                if (store.DataScope == dataScopeIdentifier.Name && store.CultureName == cultureName)
                                {
                                    existingFileName = store.Filename;
                                    existingElementName = store.ElementName;
                                    break;
                                }
                            }
                        }

                        configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                            {
                                DataScope = dataScopeIdentifier.Name,
                                CultureName = cultureName,
                                Filename = existingFileName ?? NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, cultureName),
                                ElementName = existingElementName ?? NamesCreator.MakeElementName(dataTypeDescriptor)
                            });
                    }


                    if (addedCultureInfo != null && !localizationNames.Contains(addedCultureInfo.Name))
                    {
                        configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                        {
                            DataScope = dataScopeIdentifier.Name,
                            CultureName = addedCultureInfo.Name,
                            Filename = NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, addedCultureInfo.Name),
                            ElementName = NamesCreator.MakeElementName(dataTypeDescriptor)
                        });
                    }
                }
            }

            configurationElement.ConfigurationDataIdProperties = new SimpleNameTypeConfigurationElementCollection();
            foreach (DataFieldDescriptor field in dataTypeDescriptor.KeyFields)
            {
                configurationElement.ConfigurationDataIdProperties.Add(field.Name, field.InstanceType);
            }

            configurationElement.ConfigurationPropertyNameMappings = new PropertyNameMappingConfigurationElementCollection();
            configurationElement.ConfigurationPropertyInitializers = new SimpleNameTypeConfigurationElementCollection();

            return configurationElement;
        }



        private sealed class XmlDataProviderConfiguration
        {
            readonly string _configurationFilePath;
            readonly C1Configuration _configuration;

            public XmlDataProviderConfiguration(string providerName)
            {
                _configurationFilePath =
                    Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory),
                                 string.Format("{0}.config", providerName));

                _configuration = new C1Configuration(_configurationFilePath);

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


            public string ConfigurationFilePath
            {
                get { return _configurationFilePath; }
            }


            public void Save()
            {
                _configuration.Save();
            }
        }
    }
}
