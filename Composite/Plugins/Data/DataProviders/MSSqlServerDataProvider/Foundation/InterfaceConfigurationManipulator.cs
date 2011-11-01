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

                InterfaceConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor);

                if (configuration.Section.Interfaces.ContainsInterfaceType(interfaceConfig.DataTypeId.Value) == true)
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

                return configuration.Section.Interfaces.ContainsInterfaceType(interfaceConfig.DataTypeId.Value);
            }
        }



        internal static InterfaceConfigurationElement Change(string providerName, DataTypeChangeDescriptor changeDescriptor, bool localeChanges)
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

                Verify.IsTrue(configuration.Section.Interfaces.ContainsInterfaceType(dataTypeId),
                        "Configuration does not contain the original interface named '{0}'".FormatWith(dataTypeId));

                configuration.Section.Interfaces.Remove(dataTypeId);

                InterfaceConfigurationElement newInterfaceConfig = BuildInterfaceConfigurationElement(changeDescriptor.AlteredType);

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

                Guid dataTypeId = dataTypeDescriptor.DataTypeId;

                if (configuration.Section.Interfaces.ContainsInterfaceType(dataTypeId))
                {
                    configuration.Section.Interfaces.Remove(dataTypeId);
                    configuration.Save();
                }
            }
        }


        private static InterfaceConfigurationElement BuildInterfaceConfigurationElement(DataTypeDescriptor dataTypeDescriptor)
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
                    string tableName = DynamicTypesCommon.GenerateTableName(dataTypeDescriptor, dataScope, culture);
                    tableConfig.ConfigurationStores.Add(new StoreConfigurationElement
                                                            {TableName = tableName, DataScope = dataScope.Name, CultureName = culture.Name});
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
