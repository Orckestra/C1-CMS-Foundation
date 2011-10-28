using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal static class NamesCreator
    {
        internal static string MakeDataIdClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}DataId", MakeNiceTypeFullName(dataTypeDescriptor));
        }



        internal static string MakeDataIdClassFullName(DataTypeDescriptor dataTypeDescriptor, string providerName)
        {
            return string.Format("{0}.{1}", MakeNamespaceName(providerName), MakeDataIdClassName(dataTypeDescriptor));
        }



        internal static string MakeEntityBaseClassName(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}EntityBase", dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_').Replace('+', '_'));
        }



        internal static string MakeEntityBaseClassFullName(DataTypeDescriptor dataTypeDescriptor, string providerName)
        {
            return string.Format("{0}.{1}", MakeNamespaceName(providerName), MakeEntityBaseClassName(dataTypeDescriptor));
        }



        internal static string MakeEntityClassName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName)
        {
            if (string.IsNullOrEmpty(localeCultureName)) return string.Format("{0}_{1}Entity", MakeNiceTypeFullName(dataTypeDescriptor), dataScopeIdentifierName);

            return string.Format("{0}_{1}_{2}Entity", MakeNiceTypeFullName(dataTypeDescriptor), dataScopeIdentifierName, localeCultureName.Replace("-", ""));
        }


        internal static string MakeEntityClassFullName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName, string providerName)
        {
            return string.Format("{0}.{1}", MakeNamespaceName(providerName), MakeEntityClassName(dataTypeDescriptor, dataScopeIdentifierName, localeCultureName));
        }


        internal static string MakeSqlDataProviderHelperClassName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName)
        {
            if (string.IsNullOrEmpty(localeCultureName)) return string.Format("{0}_{1}SqlDataProviderHelper", MakeNiceTypeFullName(dataTypeDescriptor), dataScopeIdentifierName);

            return string.Format("{0}_{1}_{2}SqlDataProviderHelper", MakeNiceTypeFullName(dataTypeDescriptor), dataScopeIdentifierName, localeCultureName.Replace("-", ""));
        }


        internal static string MakeSqlDataProviderHelperClassFullName(DataTypeDescriptor dataTypeDescriptor, string dataScopeIdentifierName, string localeCultureName, string providerName)
        {
            return string.Format("{0}.{1}", MakeNamespaceName(providerName), MakeSqlDataProviderHelperClassName(dataTypeDescriptor, dataScopeIdentifierName, localeCultureName));
        }


        internal static string MakeDataContextFieldName(string tableName)
        {
            return tableName;
        }


        internal static string MakeDataContextClassName(string providerName)
        {
            return string.Format("{0}DataContext", providerName);
        }


        internal static string MakeDataContextClassFullName(string providerName)
        {
            return string.Format("{0}.{1}", MakeNamespaceName(providerName), MakeDataContextClassName(providerName));
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
