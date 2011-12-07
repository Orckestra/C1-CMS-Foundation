using System;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
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
        static readonly object _syncRoot = new object();

        internal static InterfaceConfigurationElement AddNew(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_syncRoot)
            {
                var configuration = new SqlDataProviderConfiguration(providerName);

                InterfaceConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor, null);

                if (configuration.Section.Interfaces.ContainsInterfaceType(interfaceConfig) == true)
                {
                    string typeFullName = (dataTypeDescriptor.Namespace ?? string.Empty) + "." + dataTypeDescriptor.Name;
                
                    throw new InvalidOperationException(
                        string.Format("Configuration already contains an interface with data type ID '{0}', type name '{1}'",
                                      interfaceConfig.DataTypeId,
                                      typeFullName));
                }

                configuration.Section.Interfaces.Add(interfaceConfig);

                configuration.Save();

                return interfaceConfig;
            }
        }

        internal static InterfaceConfigurationElement RefreshLocalizationInfo(string providerName, DataTypeDescriptor dataTypeDescriptor, InterfaceConfigurationElement oldConfigurationElement)
        {
            var changeDescriptor = new DataTypeChangeDescriptor(dataTypeDescriptor, dataTypeDescriptor);

            return Change(providerName, changeDescriptor, true, oldConfigurationElement);
        }

        internal static bool ConfigurationExists( string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            lock (_syncRoot)
            {
                var configuration = new SqlDataProviderConfiguration(providerName);

                InterfaceConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor, null);

                return configuration.Section.Interfaces.ContainsInterfaceType(interfaceConfig);
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="changeDescriptor"></param>
        /// <param name="localeChanges"></param>
        /// <param name="oldConfigurationElement">If this has a value, any existing tables names will be used instead of defaulting them</param>
        /// <returns></returns>
        internal static InterfaceConfigurationElement Change(string providerName, DataTypeChangeDescriptor changeDescriptor, bool localeChanges, InterfaceConfigurationElement oldConfigurationElement)
        {
            lock (_syncRoot)
            {
                if ((localeChanges == false) &&
                    (changeDescriptor.AddedDataScopes.Count() == 0) &&
                    (changeDescriptor.DeletedDataScopes.Count() == 0) &&
                    (changeDescriptor.AddedKeyFields.Count() == 0) &&
                    (changeDescriptor.DeletedKeyFields.Count() == 0)
                    && (changeDescriptor.OriginalType.Namespace == changeDescriptor.AlteredType.Namespace)
                    && (changeDescriptor.OriginalType.Name == changeDescriptor.AlteredType.Name))
                {
                    // No changes to the config is needed, lets not touch the file.
                    return null;
                }

                var configuration = new SqlDataProviderConfiguration(providerName);

                Guid dataTypeId = changeDescriptor.OriginalType.DataTypeId;

                Verify.IsTrue(configuration.Section.Interfaces.ContainsInterfaceType(changeDescriptor.OriginalType),
                        "Configuration does not contain the original interface named '{0}'".FormatWith(dataTypeId));
                
                configuration.Section.Interfaces.Remove(changeDescriptor.OriginalType);

                InterfaceConfigurationElement newInterfaceConfig = BuildInterfaceConfigurationElement(changeDescriptor.AlteredType, oldConfigurationElement);

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


        private static InterfaceConfigurationElement BuildInterfaceConfigurationElement(DataTypeDescriptor dataTypeDescriptor, InterfaceConfigurationElement oldConfigurationElement)
        {
            var tableConfig = new InterfaceConfigurationElement();            

            tableConfig.DataTypeId = dataTypeDescriptor.DataTypeId;
            tableConfig.IsGeneratedType = dataTypeDescriptor.IsCodeGenerated;

            var propertyMappings = new PropertyNameMappingConfigurationElementCollection();
            var keyInfo = new SimpleNameTypeConfigurationElementCollection();

            //foreach (DataFieldDescriptor field in dataTypeDescriptor.Fields)
            //{
            //    propertyMappings.Add(field.Name, field.Name);
            //}

            foreach (DataFieldDescriptor field in dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)))
            {
                keyInfo.Add(field.Name, field.InstanceType);
            }

            tableConfig.ConfigurationStores = new StoreConfigurationElementCollection();
            // Fix logic for the case of a localized interface without languages
            foreach (DataScopeIdentifier dataScope in dataTypeDescriptor.DataScopes)
            {
                foreach (var culture in SqlDataProviderStoreManipulator.GetCultures(dataTypeDescriptor))
                {
                    string tableName = null;

                    if (oldConfigurationElement != null)
                    {
                        tableName = oldConfigurationElement.ConfigurationStores.OfType<StoreConfigurationElement>().Where(f => f.CultureName == culture.Name && f.DataScope == dataScope.Name).Select(f => f.TableName).SingleOrDefault();
                    }
                    
                    if (tableName == null)
                    {
                        tableName = DynamicTypesCommon.GenerateTableName(dataTypeDescriptor, dataScope, culture);
                    }

                    tableConfig.ConfigurationStores.Add(new StoreConfigurationElement
                    {
                        TableName = tableName, 
                        DataScope = dataScope.Name, 
                        CultureName = culture.Name
                    });
                }
            }

            tableConfig.ConfigurationPropertyNameMappings = propertyMappings;
            tableConfig.ConfigurationDataIdProperties = keyInfo;
            tableConfig.ConfigurationPropertyInitializers = new SimpleNameTypeConfigurationElementCollection();

            return tableConfig;
        }

        private sealed class SqlDataProviderConfiguration
        {
            readonly C1Configuration _configuration;

            public SqlDataProviderConfiguration(string providerName)
            {
                _configuration = new C1Configuration(System.IO.Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), string.Format("{0}.config", providerName)));

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



            public void Save()
            {
                _configuration.Save();
            }
        }
    }
}
