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

            string storageKey = GetStorageName(publicationScope.ToString(), cultureInfo.Name);

            return string.Format("{0}_{1}_{2}", tableNameStem, dataTypeDescriptor.Name, storageKey);

#warning MRJ: BM: Clean this
            //string result = string.Format("{0}_{1}_{2}", tableNameStem, dataTypeDescriptor.Name, publicationScope);

            //if (!string.IsNullOrEmpty(cultureInfo.ToString())) result += "_" + cultureInfo;

            //return result;
		}


        internal static string GetStorageName(string dataScope, string cultureName)
        {
            string result = dataScope;
            if (!cultureName.IsNullOrEmpty())
            {
                result += "_" + cultureName.Replace('-', '_').Replace(' ', '_');
            }
            return result;
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
