using System;
using System.Data;
using System.Globalization;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
	internal static class DynamicTypesCommon
	{
		internal static string GenerateTableName(DataTypeDescriptor dataTypeDescriptor)
		{
		    return dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_');
		}

		internal static string GenerateTableName(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo)
		{
		    string tableName = dataTypeDescriptor.GetFullInterfaceName().Replace('.', '_');

			switch (dataScope.Name)
			{
				case DataScopeIdentifier.PublicName:
					break;
				case DataScopeIdentifier.AdministratedName:
			        tableName += "_Unpublished";
					break;
				default:
					throw new InvalidOperationException("Unsupported data scope identifier: '{0}'".FormatWith(dataScope.Name));
			}

            if (!cultureInfo.Name.IsNullOrEmpty())
            {
                tableName += "_" + cultureInfo.Name.Replace('-', '_').Replace(' ', '_');
            }

            return tableName;
		}


		internal static string GenerateListTableName(DataTypeDescriptor typeDescriptor, DataFieldDescriptor fieldDescriptor)
		{
			return string.Format("{0}_{1}", GenerateTableName(typeDescriptor), fieldDescriptor.Name);
		}

		internal static string MapStoreTypeToSqlDataType(StoreFieldType storeType)
		{
			string result = string.Format(" [{0}]", GetStoreTypeToSqlDataTypeMapping(storeType));

			switch (storeType.PhysicalStoreType)
			{
				case PhysicalStoreFieldType.String:
					return string.Format("{0}({1})", result, storeType.MaximumLength);
				case PhysicalStoreFieldType.LargeString:
					return string.Format("{0}({1})", result, "max");
				case PhysicalStoreFieldType.Decimal:
					return string.Format("{0}({1},{2})", result, storeType.NumericPrecision, storeType.NumericScale);
				default:
					return result;
			}
		}

		internal static SqlDbType GetStoreTypeToSqlDataTypeMapping(StoreFieldType storeType)
		{
			switch (storeType.PhysicalStoreType)
			{
				case PhysicalStoreFieldType.Integer:
					return SqlDbType.Int;
				case PhysicalStoreFieldType.Long:
					return SqlDbType.BigInt;
				case PhysicalStoreFieldType.String:
					return SqlDbType.NVarChar;
				case PhysicalStoreFieldType.LargeString:
					return SqlDbType.NVarChar;
				case PhysicalStoreFieldType.DateTime:
					return SqlDbType.DateTime;
				case PhysicalStoreFieldType.Decimal:
					return SqlDbType.Decimal;
				case PhysicalStoreFieldType.Boolean:
					return SqlDbType.Bit;
				case PhysicalStoreFieldType.Guid:
					return SqlDbType.UniqueIdentifier;
				default:
					throw new ArgumentException("Unknown store type on field");
			}
		}

		internal static bool AreSame(DataFieldDescriptor a, DataFieldDescriptor b)
		{
			return a.ToXml().ToString() == b.ToXml().ToString();
		}
	}
}
