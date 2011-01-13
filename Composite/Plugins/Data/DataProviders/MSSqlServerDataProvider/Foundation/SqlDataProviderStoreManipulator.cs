using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.Sql;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal sealed class SqlDataProviderStoreManipulator
    {
        private static object _lock = new object();

        private readonly string _connectionString;
        private readonly List<InterfaceConfigurationElement> _generatedInterfaces;


        internal SqlDataProviderStoreManipulator(string connectionString, List<InterfaceConfigurationElement> generatedInterfaces)
        {
            Verify.ArgumentNotNullOrEmpty(connectionString, "connectionString");
            Verify.ArgumentNotNull(generatedInterfaces, "generatedInterfaces");

            _connectionString = connectionString;
            _generatedInterfaces = generatedInterfaces;
        }


        internal void CreateStoresForType(DataTypeDescriptor typeDescriptor)
        {
            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
                {
                    foreach(var culture in GetCultures(typeDescriptor))
                    {
                        CreateStore(typeDescriptor, dataScope, culture);
                    }
                }
            }
        }

        internal void AddLocale(DataTypeDescriptor typeDescriptor, CultureInfo cultureInfo)
        {
            foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
            {
                CreateStore(typeDescriptor, dataScope, cultureInfo);
            }
        }

        internal void RemoveLocale(string providerName, DataTypeDescriptor typeDescriptor, CultureInfo cultureInfo)
        {
            foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
            {
                DropStore(providerName, typeDescriptor, dataScope, cultureInfo);
            }
        }

        internal static IEnumerable<CultureInfo> GetCultures(DataTypeDescriptor typeDescriptor)
        {
            if (typeDescriptor.Localizeable)
            {
                foreach (var culture in DataLocalizationFacade.ActiveLocalizationCultures)
                {
                    yield return culture;
                }
            }
            else
            {
                yield return CultureInfo.InvariantCulture;
            }
        }

        private void CreateScopeData(DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope)
        {
            foreach (var cultureInfo in GetCultures(typeDescriptor))
            {
                CreateStore(typeDescriptor, dataScope, cultureInfo);
            }
        }

        internal void CreateStore(DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo)
        {
            string tableName = DynamicTypesCommon.GenerateTableName(typeDescriptor, dataScope, cultureInfo);
            var sqlConnection = SqlConnectionManager.GetConnection(_connectionString);

            Database database = GetDatabase(sqlConnection);

            if (database.Tables.Contains(tableName) == true)
            {
                throw new InvalidOperationException(
                    "Database already contains a table named {0}".FormatWith(tableName));
            }

            Table newTable = new Table(database, tableName);

            foreach (DataFieldDescriptor fieldDescriptor in typeDescriptor.Fields)
            {
                Column column = CreateColumn(fieldDescriptor, newTable);
                newTable.Columns.Add(column);
            }

            SetClusteredIndex(newTable, typeDescriptor);

            SetPrimaryKey(newTable, typeDescriptor.KeyPropertyNames, dataScope,
                          (typeDescriptor.HasCustomPhysicalSortOrder == false));

            try
            {
                newTable.Create();
            }
            catch (FailedOperationException ex)
            {
                throw MakeVerboseException(ex);
            }
        }


        private string GetConfiguredTableName(string providerName, string dataTypeName, DataScopeIdentifier dataScope, string cultureName)
        {
            string normalizedTypeName = TryNormalizeTypeFullName(dataTypeName);

            var stores =
                (from dataInterface in _generatedInterfaces
                 where dataInterface.InterfaceType == normalizedTypeName
                 select dataInterface.Stores).FirstOrDefault();

            if (stores == null)
            {
                return null;
            }

            var tableName = (from store in stores
                             where store.CultureName == cultureName && store.DataScope == dataScope.Name
                            select store.TableName).FirstOrDefault();
            return tableName;
        }


        private string TryNormalizeTypeFullName(string typeName)
        {
            Type type = TypeManager.TryGetType(typeName);

            if (type != null)
            {
                return TypeManager.TrySerializeType(type);
            }
            return typeName;
        }


        internal void AlterStoresForType(string providerName, DataTypeChangeDescriptor changeDescriptor)
        {
            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in changeDescriptor.ExistingDataScopes)
                {
                    AlterScopeData(providerName, changeDescriptor, dataScope);
                }

                foreach (DataScopeIdentifier dataScope in changeDescriptor.AddedDataScopes)
                {
                    CreateScopeData(changeDescriptor.AlteredType, dataScope);
                }

                foreach (DataScopeIdentifier dataScope in changeDescriptor.DeletedDataScopes)
                {
                    DropScopeData(providerName, changeDescriptor.AlteredType, dataScope);
                }
            }
        }

        private void AlterScopeData(string providerName, DataTypeChangeDescriptor changeDescriptor, DataScopeIdentifier dataScope)
        {
            var culturesToDelete = new List<CultureInfo>();
            var culturesToAdd = new List<CultureInfo>();
            var culturesToChange = new List<CultureInfo>();

            var oldCultures = GetCultures(changeDescriptor.OriginalType);
            var newCultures = GetCultures(changeDescriptor.AlteredType);

            foreach(var culture in oldCultures)
            {
                if(newCultures.Contains(culture))
                {
                    culturesToChange.Add(culture);
                } 
                else
                {
                    culturesToDelete.Add(culture);
                }
            }

            foreach (var culture in newCultures)
            {
                if (!oldCultures.Contains(culture))
                {
                    culturesToAdd.Add(culture);
                }
            }

            culturesToChange.ForEach(culture => AlterStore(providerName, changeDescriptor, dataScope, culture));
            culturesToAdd.ForEach(culture => CreateStore(changeDescriptor.AlteredType, dataScope, culture));
            culturesToDelete.ForEach(culture => DropStore(providerName, changeDescriptor.OriginalType, dataScope, culture));
        }

        private void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor, DataScopeIdentifier dataScope, CultureInfo culture)
        {
            string originalTableName = GetConfiguredTableName(providerName, changeDescriptor.OriginalType.TypeManagerTypeName, dataScope, culture.Name);

            string alteredTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, dataScope, culture);

            var sqlConnection = SqlConnectionManager.GetConnection(_connectionString);

            Database database = GetDatabase(sqlConnection);

            if (database.Tables.Contains(originalTableName) == false)
            {
                throw new InvalidOperationException(
                    string.Format(
                        "Unable to alter data type store. The database does not contain expected table {0}",
                        originalTableName));
            }

            Table table = database.Tables[originalTableName];

            DropAllIndexes(table);
            DropAllConstraints(table);

            if (originalTableName != alteredTableName)
            {
                if (database.Tables.Contains(alteredTableName) == true)
                    throw new InvalidOperationException(
                        string.Format("Can not rename table to {0}. A table with that name already exists",
                                      alteredTableName));
                table.Rename(alteredTableName);
            }

            DropFields(table, changeDescriptor.DeletedFields);
            ImplementFieldChanges(table, changeDescriptor.OriginalTypeDataExists, changeDescriptor.ExistingFields);
            AppendFields(table, changeDescriptor.AddedFields);
            SetPrimaryKey(table, changeDescriptor.AlteredType.KeyPropertyNames, dataScope,
                          (changeDescriptor.AlteredType.HasCustomPhysicalSortOrder == false));
            SetClusteredIndex(table, changeDescriptor.AlteredType);

            try
            {
                table.Alter();
            }
            catch (FailedOperationException ex)
            {
                throw MakeVerboseException(ex);
            }
            
        }



        internal void DropStoresForType(string providerName, DataTypeDescriptor typeDescriptor)
        {
            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
                {
                    DropScopeData(providerName, typeDescriptor, dataScope);
                }
            }
        }



        private void DropScopeData(string providerName, DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope)
        {
            foreach (var culture in GetCultures(typeDescriptor))
            {
                DropStore(providerName, typeDescriptor, dataScope, culture);
            }
        }

        private void DropStore(string providerName, DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo)
        {
            string tableName = GetConfiguredTableName(providerName, typeDescriptor.TypeManagerTypeName, dataScope, cultureInfo.Name);

            var sqlConnection = SqlConnectionManager.GetConnection(_connectionString);

            Database database = GetDatabase(sqlConnection);

            try
            {
                if (string.IsNullOrEmpty(tableName) == false)
                {
                    DropTableIfExists(database, tableName);
                }
            }
            catch (FailedOperationException ex)
            {
                throw MakeVerboseException(ex);
            }
        }



        private void DropTableIfExists(Database database, string tableName)
        {
            if (database.Tables.Contains(tableName) == true)
            {
                Table listTable = database.Tables[tableName];
                listTable.Drop();
            }
        }



        private void ImplementFieldChanges(Table table, bool containsData, IEnumerable<DataTypeChangeDescriptor.ExistingFieldInfo> changedFieldDescriptions)
        {
            foreach (var changedFieldDescriptor in changedFieldDescriptions)
            {
                if(!changedFieldDescriptor.AlteredFieldHasChanges)
                {
                    continue;
                }

                if (containsData == true) // Has data
                {
                    Column column = table.Columns[changedFieldDescriptor.OriginalField.Name];
                    ConfigureColumn(table, column, changedFieldDescriptor.AlteredField, true);
                }
                else
                {
                    DropFields(table, new DataFieldDescriptor[] { changedFieldDescriptor.OriginalField });
                    AppendFields(table, new DataFieldDescriptor[] { changedFieldDescriptor.AlteredField });
                }
            }
        }



        private void ConfigureColumn(Table table, Column column, DataFieldDescriptor fieldDescriptor, bool isAlter)
        {
            if(isAlter)
            {
                DropDefaultValue(column);
            }

            DataType requiredDataType = DynamicTypesCommon.MapStoreTypeToSqlDataType(fieldDescriptor.StoreType);

            if (column.Name != fieldDescriptor.Name)
                column.Rename(fieldDescriptor.Name);
            if (DynamicTypesCommon.AreSame(column.DataType, requiredDataType) == false)
            {
                column.DataType = requiredDataType;

                // NOTE: Smo converts SqlDataType.NVarCharMax into nvarchar(1) sql type, the following code block fixes this issue.
                if(column.DataType.SqlDataType == SqlDataType.NVarCharMax
                    && column.Properties.Contains("DataType")
                    && column.Properties["DataType"].Value is string
                    && (string)column.Properties["DataType"].Value == "nvarchar"
                    && column.Properties.Contains("Length")
                    && column.Properties["Length"].Value is Int32
                    && (Int32)column.Properties["Length"].Value == 0)
                {
                    column.Properties["Length"].Value = -1;
                }
            }

            if (isAlter)
            {
                if (column.Nullable != fieldDescriptor.IsNullable)
                {
                    column.Nullable = fieldDescriptor.IsNullable;
                }
                column.Alter();
            }
            else
            {
                column.Nullable = fieldDescriptor.IsNullable;
            }

            SetDefaultValue(table, column, fieldDescriptor.DefaultValue);
        }



        private void DropFields(Table table, IEnumerable<DataFieldDescriptor> fieldsToDrop)
        {
            foreach (var deletedFieldDescriptor in fieldsToDrop)
            {
                var column = table.Columns[deletedFieldDescriptor.Name];
                if(column != null)
                {
                    column.Drop();
                }
                else
                {
                    LoggingService.LogWarning(typeof(Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.SqlDataProvider).FullName,
                        "Column '{0}' on table '{1}' has already been dropped".FormatWith(deletedFieldDescriptor.Name, table.Name));
                }
            }
        }



        private void AppendFields(Table table, IEnumerable<DataFieldDescriptor> addedFieldDescriptions)
        {
            foreach (var addedFieldDescriptor in addedFieldDescriptions)
            {
                if (table.Columns.Contains(addedFieldDescriptor.Name))
                {
                    Column column = table.Columns[addedFieldDescriptor.Name];
                    ConfigureColumn(table, column, addedFieldDescriptor, true);
                }
                else
                {
                    Column column = CreateColumn(addedFieldDescriptor, table);
                    table.Columns.Add(column);
                }
            }
        }

        private static void DropAllConstraints(Table table)
        {
            for (int i = table.Checks.Count - 1; i >= 0; i--)
            {
                table.Checks[i].Drop();
            }
        }


        private static void DropAllIndexes(Table table)
        {
            for (int i = table.Indexes.Count - 1; i >= 0 ; i--)
            {
                table.Indexes[i].Drop();
            }
        }


        private static void SetPrimaryKey(Table table, IEnumerable<string> fieldNames, DataScopeIdentifier dataScopeIdentifier, bool createAsClustered)
        {

            if (fieldNames.Any())
            {
                string primaryKeyIndexName = SqlSafeName( "PK", table.Name);
                Index primaryKeyIndex = new Index(table, primaryKeyIndexName);
                primaryKeyIndex.IndexKeyType = IndexKeyType.DriPrimaryKey;

                primaryKeyIndex.IsClustered = createAsClustered;

                foreach (string fieldName in fieldNames)
                {
                    primaryKeyIndex.IndexedColumns.Add(new IndexedColumn(primaryKeyIndex, fieldName));
                }

                table.Indexes.Add(primaryKeyIndex);
            }
        }


        private static void SetClusteredIndex(Table table, DataTypeDescriptor typeDescriptor)
        {
            if (typeDescriptor.HasCustomPhysicalSortOrder == true)
            {
                SetClusteredIndex(table, typeDescriptor.StoreSortOrderFieldNames);
            }
        }


        private static void SetClusteredIndex(Table table, IEnumerable<string> fieldNames)
        {
            string clusteredIndexName = SqlSafeName("IX", table.Name);
            Index clusteredIndex = new Index(table, clusteredIndexName);
            clusteredIndex.IndexKeyType = IndexKeyType.None;
            clusteredIndex.IsClustered = true;
            foreach (string fieldName in fieldNames)
            {
                clusteredIndex.IndexedColumns.Add(new IndexedColumn(clusteredIndex, fieldName));
            }
            table.Indexes.Add(clusteredIndex);
        }


        private Exception MakeVerboseException(Exception ex)
        {
            StringBuilder message = new StringBuilder();
            Exception nested = ex;
            while (nested != null)
            {
                message.Append(nested.Message);
                message.Append(" ");
                nested = nested.InnerException;
            }
            return new InvalidOperationException(message.ToString(), ex);
        }


        private Column CreateColumn(DataFieldDescriptor fieldDescriptor, Table parent)
        {
            Column column = new Column(parent, fieldDescriptor.Name);
            ConfigureColumn(parent, column, fieldDescriptor, false);
            return column;
        }


        /// <summary>
        /// Removes "Default value" constraint from the column.
        /// </summary>
        /// <param name="column">The column.</param>
        private static void DropDefaultValue(Column column)
        {
            if (column.DefaultConstraint != null)
            {
                column.DefaultConstraint.Drop();
                column.Refresh();
            }
        }


        private void SetDefaultValue(Table parent, Column column, DefaultValue defaultValue)
        {
            if (defaultValue == null)
                return;

            column.AddDefaultConstraint(SqlSafeName( "DF", parent.Name, column.Name));
            column.DefaultConstraint.Text = GetDefaultValueText(defaultValue);
        }


        private string GetDefaultValueText(DefaultValue defaultValue)
        {
            switch (defaultValue.ValueType)
            {
                case DefaultValueType.DateTimeNow:
                    return "getdate()";
                case DefaultValueType.String:
                case DefaultValueType.Guid:
                    return "N" + SqlQuoted(defaultValue.Value);
                case DefaultValueType.NewGuid:
                    return "newid()";
                case DefaultValueType.Integer:
                    return defaultValue.Value.ToString();
                case DefaultValueType.Boolean:
                    return ((bool)defaultValue.Value ? "1" : "0");
                case DefaultValueType.DateTime:
                    return SqlQuoted(((DateTime)defaultValue.Value).ToString("yyyy-MM-dd HH:mm:ss"));
                case DefaultValueType.Decimal:
                    return ((decimal)defaultValue.Value).ToString("F", CultureInfo.InvariantCulture);
            }

            throw new NotImplementedException("Supplied DefaultValue contains an unsupported DefaultValueType.");
        }


        private string SqlQuoted(object obj)
        {
            return SqlQuoted(obj.ToString());
        }


        private string SqlQuoted(string theString)
        {
            return string.Format("'{0}'", theString.Replace("'", "''"));
        }



        private Database GetDatabase(SqlConnection sqlConnection)
        {
            Server server = new Server(new ServerConnection(sqlConnection));
            
            return server.Databases[sqlConnection.Database];
        }



        private static string SqlSafeName(string prefix, string elementName)
        {
            string name = string.Format("{0}_{1}", prefix, elementName);

            if (name.Length > 128)
            {

                string random = System.IO.Path.GetRandomFileName();
                name = name.Substring(0, 128 - random.Length) + random;
            }

            return name;
        }



        private static string SqlSafeName( string prefix, string parentName, string subName )
        {
            string stem = string.Format("{0}_{1}_", prefix, parentName);

            if (stem.Length + subName.Length > 128)
            {
                stem = stem.Substring(0, 127 - subName.Length) + "_";
            }

            return stem + subName;
        }
    }
}
