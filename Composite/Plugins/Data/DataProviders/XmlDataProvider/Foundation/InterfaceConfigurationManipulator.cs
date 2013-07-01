using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
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
            var xmlDataProviderConfiguration = new XmlDataProviderConfiguration(providerName);

            XmlProviderInterfaceConfigurationElement configurationElement = BuildXmlProviderInterfaceConfigurationElement(dataTypeDescriptor);

            string interfaceType = dataTypeDescriptor.TypeManagerTypeName;

            if (interfaceType != null)
            {
                object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

                if (key != null)
                {
                    throw new InvalidOperationException(
                        "Configuration file '{0}' already contains an interface type with id '{1}'."
                        .FormatWith(xmlDataProviderConfiguration.ConfigurationFilePath, configurationElement.DataTypeId));
                }
            }

            XmlDataProviderStoreManipulator.CreateStore(providerName, configurationElement);

            xmlDataProviderConfiguration.Section.Interfaces.Add(configurationElement);

            xmlDataProviderConfiguration.Save();
        }



        public static XmlProviderInterfaceConfigurationElement Change(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            DataTypeChangeDescriptor changeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            XmlDataProviderConfiguration xmlDataProviderConfiguration = new XmlDataProviderConfiguration(updateDataTypeDescriptor.ProviderName);

            object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(changeDescriptor.OriginalType);

            XmlProviderInterfaceConfigurationElement oldConfigurationElement = xmlDataProviderConfiguration.Section.Interfaces.Get(key);
            XmlProviderInterfaceConfigurationElement newConfigurationElement = BuildXmlProviderInterfaceConfigurationElement(changeDescriptor.AlteredType);

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
                if (DataLocalizationFacade.IsLocalizable(type))
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                    object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);
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
                if (DataLocalizationFacade.IsLocalizable(type))
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                    object key = xmlDataProviderConfiguration.Section.Interfaces.GetKey(dataTypeDescriptor);

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
            configurationElement.DataTypeId = dataTypeDescriptor.DataTypeId;
            configurationElement.IsGeneratedType = dataTypeDescriptor.IsCodeGenerated;

            bool isLocalizable = false;
            if (dataTypeDescriptor.IsCodeGenerated == false)
            {
                Type interfaceType = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                if (interfaceType != null)
                {
                    isLocalizable = DataLocalizationFacade.IsLocalizable(interfaceType);
                }
                else
                {
                    isLocalizable = dataTypeDescriptor.Localizeable;
                }
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
                    Filename = NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, CultureInfo.InvariantCulture.Name),
                    ElementName = NamesCreator.MakeElementName(dataTypeDescriptor)
                });

                if (isLocalizable)
                {
                    List<string> localezationNames = DataLocalizationFacade.ActiveLocalizationNames.ToList();
                    foreach (string cultureName in localezationNames)
                    {
                        if ((removedCultureInfo != null) && (removedCultureInfo.Name == cultureName)) continue;

                        configurationElement.ConfigurationStores.Add(new DataScopeConfigurationElement
                            {
                                DataScope = dataScopeIdentifier.Name,
                                CultureName = cultureName,
                                Filename = NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, cultureName),
                                ElementName = NamesCreator.MakeElementName(dataTypeDescriptor)
                            });
                    }


                    if ((addedCultureInfo != null) && (localezationNames.Contains(addedCultureInfo.Name) == false))
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
