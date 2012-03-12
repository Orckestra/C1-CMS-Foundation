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
        private static Dictionary<string, List<ColumnInfo>> _columnsInformationCache;
        
        public ISqlTableInformation GetTableInformation(string connectionString, string tableName)
        {
            Verify.ArgumentNotNullOrEmpty(connectionString, "connectionString");
            Verify.ArgumentNotNullOrEmpty(tableName, "tableName)");

            string key = tableName + " " + connectionString.GetHashCode();

            if (false == _tableInformationCache.ContainsKey(key))
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

        private static List<ColumnInfo> GetColumnsInfo(SqlConnection connection, string tableName)
        {
            Dictionary<string, List<ColumnInfo>> columnsCache = _columnsInformationCache;
            if(columnsCache == null)
            {
                columnsCache = new Dictionary<string, List<ColumnInfo>>();

                const string queryString =
                @"SELECT tableName = obj.name,
                       columnName = col.name,
                       isPrimaryKey = CASE WHEN tc.constraint_type = 'PRIMARY KEY' THEN 1 ELSE 0 END,
                       isIdentity = CASE WHEN col.status & 0x80 = 0 THEN 0 ELSE 1 END,
                       isComputed = col.iscomputed,
                       isNullable = col.isnullable
                  FROM SysObjects obj
                  INNER JOIN
                       SysColumns col
                  ON obj.id = col.id
                  LEFT OUTER JOIN
                       (information_schema.key_column_usage kcu
	                   INNER JOIN
                            information_schema.table_constraints tc
  	                 ON tc.table_name = kcu.table_name AND tc.constraint_name = kcu.constraint_name AND tc.constraint_type = 'PRIMARY KEY')
                  ON obj.name = kcu.table_name AND col.name = kcu.column_name
                  where obj.xtype = 'U'
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
                                columnsCache.Add(tblName, new List<ColumnInfo>());
                            }

                            columnsCache[tblName].Add(new ColumnInfo
                            {
                                TableName = tblName,
                                Name = record.GetString(1),
                                IsPrimaryKey = record.GetInt32(2) == 1,
                                IsIdentity = record.GetInt32(3) == 1,
                                IsComputed = record.GetInt32(4) == 1,
                                IsNullable = record.GetInt32(5) == 1
                            });
                        }
                    }
                }

                _columnsInformationCache = columnsCache;
            }

            return columnsCache.ContainsKey(tableName) ? columnsCache[tableName] : new List<ColumnInfo>();
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

            // Performing a query with will get no rows but provide us with columns' types information
            string queryString = "SELECT * FROM [{0}] WHERE 1 = 2".FormatWith(tableName);

            Dictionary<string, Type> columnTypes;
            using (var command = new SqlCommand(queryString, connection))
            using (var reader = command.ExecuteReader())
            {
                columnTypes = new Dictionary<string, Type>(reader.FieldCount);

                for (int i = 0; i < reader.FieldCount; ++i)
                {
                    string name = reader.GetName(i);
                    Type type = reader.GetProviderSpecificFieldType(i);

                    columnTypes.Add(name, type);
                }
            }
            
            var tableInformation = new SqlTableInformation(tableName);

            foreach(var column in columns)
            {
                Verify.That(columnTypes.ContainsKey(column.Name), "Unexpected column");
                Type columnType = columnTypes[column.Name];

                tableInformation.AddColumnInformation(
                        new SqlColumnInformation(
                            column.Name,
                            column.IsPrimaryKey,
                            column.IsIdentity,
                            column.IsComputed,
                            column.IsNullable,
                            ConvertSqlTypeToSystemType(columnType),
                            ConvertSqlTypeToSqlDbType(columnType)
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
        }
    }
}
