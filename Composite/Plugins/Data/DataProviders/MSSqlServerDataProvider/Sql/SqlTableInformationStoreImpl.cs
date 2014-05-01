using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Sql;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
    internal class SqlTableInformationStoreImpl : ISqlTableInformationStore
    {
        private static Dictionary<string, ISqlTableInformation> _tableInformationCache = new Dictionary<string, ISqlTableInformation>();
        private static Dictionary<string, Dictionary<string, ColumnInfo>> _columnsInformationCache;
        
        public ISqlTableInformation GetTableInformation(string connectionString, string tableName)
        {
            Verify.ArgumentNotNullOrEmpty(connectionString, "connectionString");
            Verify.ArgumentNotNullOrEmpty(tableName, "tableName)");

            string key = GetTableCacheKey(connectionString, tableName);

            if (!_tableInformationCache.ContainsKey(key))
            {
                SqlTableInformation sqlTableInformation = CreateSqlTableInformation(connectionString, tableName);
                _tableInformationCache.Add(key, sqlTableInformation);
            }

            return _tableInformationCache[key];
        }



        public void OnFlush()
        {
            _tableInformationCache = new Dictionary<string, ISqlTableInformation>();
            _columnsInformationCache = null;
        }

        public void ClearCache(string connectionString, string tableName)
        {
            _tableInformationCache.Remove(GetTableCacheKey(connectionString, tableName));
            _columnsInformationCache = null;
        }

        private static string GetTableCacheKey(string connectionString, string tableName)
        {
            return tableName + " " + connectionString.GetHashCode();
        }

        private static Dictionary<string, ColumnInfo> GetColumnsInfo(SqlConnection connection, string tableName)
        {
            var columnsCache = _columnsInformationCache;
            if(columnsCache == null)
            {
                columnsCache = new Dictionary<string, Dictionary<string, ColumnInfo>>();

                const string queryString =
                @"SELECT tableName = obj.name,
                       columnName = col.name,
                       isPrimaryKey = CASE WHEN tc.CONSTRAINT_TYPE = 'PRIMARY KEY' THEN 1 ELSE 0 END,
                       isIdentity = CASE WHEN col.status & 0x80 = 0 THEN 0 ELSE 1 END,
                       isComputed = col.iscomputed,
                       isNullable = col.isnullable
                  FROM SysObjects obj
                  INNER JOIN
                       SysColumns col
                  ON obj.id = col.id
                  LEFT OUTER JOIN
                       (INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
	                   INNER JOIN
                            INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
  	                 ON tc.TABLE_NAME = kcu.TABLE_NAME AND tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY')
                  ON obj.name = kcu.TABLE_NAME AND col.name = kcu.COLUMN_NAME
                  where obj.xtype = 'U' AND exists(select * from INFORMATION_SCHEMA.TABLES t where t.TABLE_NAME = obj.name AND t.TABLE_SCHEMA = SCHEMA_NAME()) 
                  ORDER BY col.colorder";

                using (var command = new SqlCommand(queryString, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        foreach (DbDataRecord record in reader)
                        {
                            string tblName = record.GetString(0);

                            if (!columnsCache.ContainsKey(tblName))
                            {
                                columnsCache.Add(tblName, new Dictionary<string, ColumnInfo>());
                            }

                            string fieldName = record.GetString(1);
                            columnsCache[tblName].Add(fieldName, new ColumnInfo
                            {
                                TableName = tblName,
                                Name = fieldName,
                                IsPrimaryKey = record.GetInt32(2) == 1,
                                IsIdentity = record.GetInt32(3) == 1,
                                IsComputed = record.GetInt32(4) == 1,
                                IsNullable = record.GetInt32(5) == 1
                            });
                        }
                    }
                }

                string[] tableNames = columnsCache.Keys.ToArray();

                // Performing a query with will get no rows but provide us with columns' types information
                var fieldTypesQuery = string.Join(";", tableNames.Select(t => "SELECT * FROM [{0}] WHERE 1 = 2".FormatWith(t)));

                int index = 0;

                using (var command = new SqlCommand(fieldTypesQuery, connection))
                using (var reader = command.ExecuteReader())
                {
                    do
                    {
                        Verify.That(index < tableNames.Length, "Too many results received");

                        for (int i = 0; i < reader.FieldCount; ++i)
                        {
                            string name = reader.GetName(i);
                            Type type = reader.GetProviderSpecificFieldType(i);

                            var fieldsInfo = columnsCache[tableNames[index]];
                            fieldsInfo[name].Type = type;
                        }

                        index++;
                    } while (reader.NextResult());
                }

                _columnsInformationCache = columnsCache;
            }

            return columnsCache.ContainsKey(tableName) ? columnsCache[tableName] : new Dictionary<string, ColumnInfo>();
        }


        private static SqlTableInformation CreateSqlTableInformation(string connectionString, string tableName)
        {
            var connection = SqlConnectionManager.GetConnection(connectionString);

            var columns = GetColumnsInfo(connection, tableName);

            // Checking if the necessary table exists
            if(columns.Count == 0)
            {
                return null;
            }
            
            var tableInformation = new SqlTableInformation(tableName);

            foreach(var column in columns.Values)
            {
                tableInformation.AddColumnInformation(
                        new SqlColumnInformation(
                            column.Name,
                            column.IsPrimaryKey,
                            column.IsIdentity,
                            column.IsComputed,
                            column.IsNullable,
                            ConvertSqlTypeToSystemType(column.Type),
                            ConvertSqlTypeToSqlDbType(column.Type)
                        ));
            }

            return tableInformation;
        }


        private static SqlDbType ConvertSqlTypeToSqlDbType(Type type)
        {
            //if (type == typeof(SqlBinary)) return SqlDbType.Binary;
            if (type == typeof(SqlBoolean)) return SqlDbType.Bit;
            if (type == typeof(SqlByte)) return SqlDbType.TinyInt;
            //if (type == typeof(SqlChars)) return SqlDbType.NVarChar;
            if (type == typeof(SqlDateTime)) return SqlDbType.DateTime;
            if (type == typeof(SqlDecimal)) return SqlDbType.Decimal;
            if (type == typeof(SqlSingle)) return SqlDbType.Real;
            if (type == typeof(SqlGuid)) return SqlDbType.UniqueIdentifier;
            if (type == typeof(SqlInt16)) return SqlDbType.SmallInt;
            if (type == typeof(SqlInt32)) return SqlDbType.Int;
            if (type == typeof(SqlInt64)) return SqlDbType.BigInt;
            if (type == typeof(SqlMoney)) return SqlDbType.Money;
            if (type == typeof(SqlString)) return SqlDbType.NVarChar;
            // else if (type == typeof(SqlXml)) return SqlDbType.Xml;

            throw new NotImplementedException(string.Format("The sql type {0} not supported", type.FullName));
        }


        private static Type ConvertSqlTypeToSystemType(Type type)
        {
            //if (type == typeof(SqlBinary)) return SqlDbType.Binary;
            if (type == typeof(SqlBoolean)) return typeof(bool);
            if (type == typeof(SqlByte)) return typeof(byte);
            //if (type == typeof(SqlChars)) return SqlDbType.NVarChar;
            if (type == typeof(SqlDateTime)) return typeof(DateTime);
            if (type == typeof(SqlDecimal)) return typeof(decimal);
            if (type == typeof(SqlSingle)) return typeof(Single);
            if (type == typeof(SqlGuid)) return typeof(Guid);
            if (type == typeof(SqlInt16)) return typeof(Int16);
            if (type == typeof(SqlInt32)) return typeof(Int32);
            if (type == typeof(SqlInt64)) return typeof(Int64);
            if (type == typeof(SqlMoney)) return typeof(double);
            if (type == typeof(SqlString)) return typeof(string);
            //if (type == typeof(SqlXml)) return SqlDbType.Xml;

            throw new NotImplementedException(string.Format("The sql type {0} not supported", type.FullName));
        }

        private class ColumnInfo
        {
            public string TableName;
            public string Name;
            public bool IsPrimaryKey;
            public bool IsIdentity;
            public bool IsComputed;
            public bool IsNullable;
            public Type Type;
        }
    }
}
