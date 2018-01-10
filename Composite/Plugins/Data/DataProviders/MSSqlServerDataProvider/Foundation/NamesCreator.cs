using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal static class NamesCreator
    {
        internal static string MakeDataIdClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return $"{MakeNiceTypeFullName(dataTypeDescriptor)}DataId";
        }



        internal static string MakeDataIdClassFullName(DataTypeDescriptor dataTypeDescriptor, string providerName)
        {
            return $"{MakeNamespaceName(providerName)}.{MakeDataIdClassName(dataTypeDescriptor)}";
        }



        internal static string MakeEntityBaseClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return $"{MakeNiceTypeFullName(dataTypeDescriptor)}EntityBase";
        }



        internal static string MakeEntityBaseClassFullName(DataTypeDescriptor dataTypeDescriptor, string providerName)
        {
            return $"{MakeNamespaceName(providerName)}.{MakeEntityBaseClassName(dataTypeDescriptor)}";
        }



        internal static string MakeEntityClassName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName)
        {
            var typeName = MakeNiceTypeFullName(dataTypeDescriptor);

            if (string.IsNullOrEmpty(localeCultureName))
            {
                return $"{typeName}_{dataScopeIdentifierName}Entity";
            }


            return $"{typeName}_{dataScopeIdentifierName}_{localeCultureName.Replace("-", "")}Entity";
        }


        internal static string MakeEntityClassFullName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName, string providerName)
        {
            return $"{MakeNamespaceName(providerName)}.{MakeEntityClassName(dataTypeDescriptor, dataScopeIdentifierName, localeCultureName)}";
        }


        internal static string MakeSqlDataProviderHelperClassName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName)
        {
            var typeName = MakeNiceTypeFullName(dataTypeDescriptor);

            if (string.IsNullOrEmpty(localeCultureName))
                return $"{typeName}_{dataScopeIdentifierName}SqlDataProviderHelper";

            return  $"{typeName}_{dataScopeIdentifierName}_{localeCultureName.Replace("-", "")}SqlDataProviderHelper";
        }


        internal static string MakeSqlDataProviderHelperClassFullName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName, string providerName)
        {
            var className = MakeSqlDataProviderHelperClassName(dataTypeDescriptor, dataScopeIdentifierName, localeCultureName);
            return $"{MakeNamespaceName(providerName)}.{className}";
        }


        internal static string MakeDataContextFieldName(string tableName)
        {
            return tableName;
        }


        internal static string MakeDataContextClassName(string providerName)
        {
            return $"{providerName}DataContext";
        }


        internal static string MakeDataContextClassFullName(string providerName)
        {
            return $"{MakeNamespaceName(providerName)}.{MakeDataContextClassName(providerName)}";
        }


        internal static string MakeNamespaceName(string providerName)
        {
            return "CompositeGenerated." + providerName;
        }



        private static string MakeNiceTypeFullName(DataTypeDescriptor dataTypeDescriptor)
        {
            return dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_');
        }
    }
}
