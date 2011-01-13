using System;
using System.Globalization;

using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.DynamicTypes;

using Microsoft.SqlServer.Management.Smo;



namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal static class DynamicTypesCommon
    {
        internal static string GenerateTableName(DataTypeDescriptor dataTypeDescriptor)
        {
            string tableNameStem = dataTypeDescriptor.Namespace.Replace('.', '_');
            return string.Format("{0}_{1}", tableNameStem, dataTypeDescriptor.Name);
        }



        internal static string GenerateTableName(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo)
        {
            string tableNameStem = dataTypeDescriptor.Namespace.Replace('.', '_');

            PublicationScope publicationScope;

            switch (dataScope.Name)
            {
                case DataScopeIdentifier.PublicName:
                    publicationScope = PublicationScope.Published;
                    break;
                case DataScopeIdentifier.AdministratedName:
                    publicationScope = PublicationScope.Unpublished;
                    break;
                default:
                    throw new InvalidOperationException("Unsupported data scope identifier: '{0}'".FormatWith(dataScope.Name));
            }

            string storageKey = SqlDataProvider.GetStorageName(publicationScope.ToString(), cultureInfo.Name);


            return string.Format("{0}_{1}_{2}", tableNameStem, dataTypeDescriptor.Name, storageKey);
        }



        internal static string GenerateListTableName(DataTypeDescriptor typeDescriptor, DataFieldDescriptor fieldDescriptor)
        {
            return string.Format("{0}_{1}", GenerateTableName(typeDescriptor), fieldDescriptor.Name);
        }

        internal static DataType MapStoreTypeToSqlDataType(StoreFieldType storeType)
        {
            switch (storeType.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.Integer:
                    return DataType.Int;
                case PhysicalStoreFieldType.Long:
                    return DataType.BigInt;
                case PhysicalStoreFieldType.String:
                    return DataType.NVarChar(storeType.MaximumLength);
                case PhysicalStoreFieldType.LargeString:
                    return DataType.NVarCharMax;
                case PhysicalStoreFieldType.DateTime:
                    return DataType.DateTime;
                case PhysicalStoreFieldType.Decimal:
                    return DataType.Decimal(storeType.NumericScale, storeType.NumericPrecision);
                case PhysicalStoreFieldType.Boolean:
                    return DataType.Bit;
                case PhysicalStoreFieldType.Guid:
                    return DataType.UniqueIdentifier;
                default:
                    throw new ArgumentException("Unknown store type on field");
            }
        }


        internal static bool AreSame(DataType a, DataType b)
        {
            if (a.Name != b.Name) return false;

            switch (a.SqlDataType)
            {
                case SqlDataType.BigInt:
                case SqlDataType.Bit:
                case SqlDataType.DateTime:
                case SqlDataType.Int:
                case SqlDataType.NText:
                case SqlDataType.NVarCharMax:
                case SqlDataType.SmallDateTime:
                case SqlDataType.SmallInt:
                case SqlDataType.Timestamp:
                case SqlDataType.TinyInt:
                case SqlDataType.UniqueIdentifier:
                    return true;
                case SqlDataType.Decimal:
                case SqlDataType.Float:
                case SqlDataType.Money:
                case SqlDataType.Numeric:
                case SqlDataType.Real:
                case SqlDataType.SmallMoney:
                    return a.NumericPrecision == b.NumericPrecision && a.NumericScale == b.NumericScale;
                case SqlDataType.NVarChar:
                    return a.MaximumLength == b.MaximumLength;
            }

            throw new NotImplementedException("Unhandled SqlDataType encountered");
        }
    }
}
