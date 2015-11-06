using System;
using System.IO;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.Common;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    /// <summary>
    /// Add, change and remove type-to-table mapping information
    /// </summary>
    internal static class InterfaceConfigurationManipulator
    {
        private static readonly string LogTitle = typeof(InterfaceConfigurationManipulator).Name;

        static readonly object _syncRoot = new object();

        internal static InterfaceConfigurationElement AddNew(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_syncRoot)
            {
                var configuration = new SqlDataProviderConfiguration(providerName);

                if (configuration.Section.Interfaces.ContainsInterfaceType(dataTypeDescriptor.DataTypeId))
                {
                    Log.LogWarning(LogTitle, 
                        "Configuration file '{0}' already contains an interface with data type ID '{1}', type name '{2}'. "
                         + "Possibly there are multiple AppDomain-s running.",
                            configuration.ConfigurationFilePath,
                            dataTypeDescriptor.DataTypeId,
                            dataTypeDescriptor);

                    return configuration.Section.Interfaces.Get(dataTypeDescriptor);
                }

                InterfaceConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor);

                configuration.Section.Interfaces.Add(interfaceConfig);

                configuration.Save();

                return interfaceConfig;
            }
        }

        internal static InterfaceConfigurationElement RefreshLocalizationInfo(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            var changeDescriptor = new DataTypeChangeDescriptor(dataTypeDescriptor, dataTypeDescriptor);

            return Change(providerName, changeDescriptor, true);
        }

        internal static bool ConfigurationExists( string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_syncRoot)
            {
                var configuration = new SqlDataProviderConfiguration(providerName);

                InterfaceConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor);

                return configuration.Section.Interfaces.ContainsInterfaceType(interfaceConfig);
            }
        }



        internal static InterfaceConfigurationElement Change(string providerName, DataTypeChangeDescriptor changeDescriptor, bool localeChanges)
        {
            lock (_syncRoot)
            {
                var originalType = changeDescriptor.OriginalType;
                var alteredType = changeDescriptor.AlteredType;

                bool typeNameChanged = originalType.Namespace != alteredType.Namespace ||
                                       originalType.Name != alteredType.Name;

                if (!localeChanges &&
                    !changeDescriptor.AddedDataScopes.Any() &&
                    !changeDescriptor.DeletedDataScopes.Any() &&
                    !changeDescriptor.AddedKeyFields.Any() &&
                    !changeDescriptor.DeletedKeyFields.Any() &&
                    !changeDescriptor.KeyFieldsOrderChanged &&
                    !typeNameChanged)
                {
                    // No changes to the config is needed, lets not touch the file.
                    return null;
                }

                var configuration = new SqlDataProviderConfiguration(providerName);

                Guid dataTypeId = originalType.DataTypeId;

                var existingElement = configuration.Section.Interfaces.Get(originalType);

                Verify.IsNotNull(existingElement, "Configuration does not contain the original interface with id '{0}'", dataTypeId);

                configuration.Section.Interfaces.Remove(originalType);

                InterfaceConfigurationElement newInterfaceConfig = BuildInterfaceConfigurationElement(alteredType, existingElement, typeNameChanged);

                configuration.Section.Interfaces.Add(newInterfaceConfig);

                configuration.Save();

                return newInterfaceConfig;
            }
        }


        internal static void Remove(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_syncRoot)
            {
                var configuration = new SqlDataProviderConfiguration(providerName);

                if (configuration.Section.Interfaces.ContainsInterfaceType(dataTypeDescriptor))
                {
                    configuration.Section.Interfaces.Remove(dataTypeDescriptor);
                    configuration.Save();
                }
            }
        }


        private static InterfaceConfigurationElement BuildInterfaceConfigurationElement(
            DataTypeDescriptor dataTypeDescriptor, 
            InterfaceConfigurationElement existingElement = null,
            bool updateTableNames = false)
        {
            var propertyMappings = new PropertyNameMappingConfigurationElementCollection();
            //foreach (DataFieldDescriptor field in dataTypeDescriptor.Fields)
            //{
            //    propertyMappings.Add(field.Name, field.Name);
            //}

            var keyInfo = new SimpleNameTypeConfigurationElementCollection();
            foreach (DataFieldDescriptor field in dataTypeDescriptor.KeyFields)
            {
                keyInfo.Add(field.Name, field.InstanceType);
            }

            var stores = new StoreConfigurationElementCollection();
            // Fix logic for the case of a localized interface without languages
            foreach (DataScopeIdentifier dataScope in dataTypeDescriptor.DataScopes)
            {
                foreach (var culture in SqlDataProviderStoreManipulator.GetCultures(dataTypeDescriptor))
                {
                    string tableName = null;

                    if (!updateTableNames && existingElement != null)
                    {
                        foreach (StoreConfigurationElement table  in existingElement.ConfigurationStores)
                        {
                            if (table.DataScope == dataScope.Name && table.CultureName == culture.Name)
                            {
                                tableName = table.TableName;
                                break;
                            }
                        }
                        
                    }

                    tableName = tableName ?? DynamicTypesCommon.GenerateTableName(dataTypeDescriptor, dataScope, culture);

                    stores.Add(new StoreConfigurationElement {TableName = tableName, DataScope = dataScope.Name, CultureName = culture.Name});
                }
            }

            return new InterfaceConfigurationElement
            {
                DataTypeId = dataTypeDescriptor.DataTypeId,
                IsGeneratedType = dataTypeDescriptor.IsCodeGenerated,
                ConfigurationStores = stores,
                ConfigurationPropertyNameMappings = propertyMappings,
                ConfigurationDataIdProperties = keyInfo,
                ConfigurationPropertyInitializers = new SimpleNameTypeConfigurationElementCollection()
            };
        }

        internal static string GetConfigurationFilePath(string dataProviderName)
        {
            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), 
                                $"{dataProviderName}.config");
        }


        private sealed class SqlDataProviderConfiguration
        {
            readonly string _configurationFilePath;
            readonly C1Configuration _configuration;

            public SqlDataProviderConfiguration(string providerName)
            {
                _configurationFilePath = GetConfigurationFilePath(providerName);
                _configuration = new C1Configuration(_configurationFilePath);

                Section = _configuration.GetSection(SqlDataProviderConfigurationSection.SectionName) as SqlDataProviderConfigurationSection;

                if (Section == null)
                {
                    Section = new SqlDataProviderConfigurationSection();
                    _configuration.Sections.Add(SqlDataProviderConfigurationSection.SectionName, Section);
                }
            }



            public SqlDataProviderConfigurationSection Section
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
