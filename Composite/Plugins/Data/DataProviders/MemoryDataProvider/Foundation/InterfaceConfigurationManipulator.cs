using System;
using System.Linq;

using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using System.Collections.Generic;
using Composite.Plugins.Data.DataProviders.Common;
using Composite.Core.Configuration;
using Composite.Data;
using Composite.Core.Types;

namespace Composite.Plugins.Data.DataProviders.MemoryDataProvider.Foundation
{
    /// <summary>
    /// Add, change and remove type-to-table mapping information
    /// </summary>
    internal static class InterfaceConfigurationManipulator
    {
        internal static void AddNew(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            MemoryDataProviderData providerConfiguration = GetProviderSettings(providerName);

            MemoryDataProviderInterfaceTypeConfigurationElement interfaceConfig = BuildInterfaceConfigurationElement(dataTypeDescriptor);
            if (providerConfiguration.InterfaceTypes.ContainsInterfaceType(interfaceConfig.InterfaceType) == true) throw new InvalidOperationException(string.Format("Configuration already contains a interface named '{0}'", interfaceConfig.InterfaceType));

            providerConfiguration.InterfaceTypes.Add(interfaceConfig);

            throw new NotImplementedException();
            //DataProviderConfigurationServices.SaveDataProviderConfiguration(providerConfiguration);
        }



        internal static void Change(string providerName, DataTypeChangeDescriptor changeDescriptor)
        {
           MemoryDataProviderData providerConfiguration = GetProviderSettings(providerName);

            string interfaceType = changeDescriptor.OriginalType.TypeManagerTypeName;

            if (providerConfiguration.InterfaceTypes.ContainsInterfaceType(interfaceType) == false) throw new InvalidOperationException(string.Format("Configuration does not contain the original interface named '{0}'" , interfaceType));
            providerConfiguration.InterfaceTypes.Remove(interfaceType);

            MemoryDataProviderInterfaceTypeConfigurationElement newInterfaceConfig = BuildInterfaceConfigurationElement(changeDescriptor.AlteredType);
            providerConfiguration.InterfaceTypes.Add(newInterfaceConfig);

            throw new NotImplementedException();
            //DataProviderConfigurationServices.SaveDataProviderConfiguration(providerConfiguration);
        }



        internal static void Remove(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
           MemoryDataProviderData providerConfiguration = GetProviderSettings(providerName);

            string interfaceType = dataTypeDescriptor.TypeManagerTypeName;

            if (providerConfiguration.InterfaceTypes.ContainsInterfaceType(interfaceType) == true)
            {
                providerConfiguration.InterfaceTypes.Remove(interfaceType);
                throw new NotImplementedException();
                //DataProviderConfigurationServices.SaveDataProviderConfiguration(providerConfiguration);
            }
        }



        private static MemoryDataProviderInterfaceTypeConfigurationElement BuildInterfaceConfigurationElement(DataTypeDescriptor dataTypeDescriptor)
        {
            MemoryDataProviderInterfaceTypeConfigurationElement element = new MemoryDataProviderInterfaceTypeConfigurationElement();

            element.InterfaceType = dataTypeDescriptor.TypeManagerTypeName;
            element.IsGeneratedType = dataTypeDescriptor.IsCodeGenerated;

            element.ConfigurationStores = new StoreConfigurationElementCollection();
            foreach (DataScopeIdentifier dataScope in dataTypeDescriptor.DataScopes)
            {
                element.ConfigurationStores.Add(new StoreConfigurationElement { DataScope = dataScope.Name });
            }

            element.ConfigurationDataIdProperties = new SimpleNameTypeConfigurationElementCollection();
            foreach (DataFieldDescriptor field in dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)))
            {
                element.ConfigurationDataIdProperties.Add(field.Name, field.InstanceType);
            }

            return element;
        }



        private static MemoryDataProviderData GetProviderSettings(string providerName)
        {
            return (MemoryDataProviderData)DataProviderConfigurationServices.GetDataProviderConfiguration(providerName);
        }
    }
}
