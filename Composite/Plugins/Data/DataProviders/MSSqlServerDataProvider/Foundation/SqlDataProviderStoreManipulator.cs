using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Sql;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    internal sealed class SqlDataProviderStoreManipulator
    {
        private static readonly object _lock = new object();

        private readonly string _connectionString;
        private readonly IEnumerable<InterfaceConfigurationElement> _generatedInterfaces;

        internal SqlDataProviderStoreManipulator(string connectionString, IEnumerable<InterfaceConfigurationElement> generatedInterfaces)
        {
            Verify.ArgumentNotNullOrEmpty(connectionString, "connectionString");
            Verify.ArgumentNotNull(generatedInterfaces, "generatedInterfaces");

            _connectionString = connectionString;
            _generatedInterfaces = generatedInterfaces;
        }

        internal void CreateStoresForType(DataTypeDescriptor typeDescriptor, Action<string> existingTablesValidator)
        {
            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
                {
                    foreach (var culture in GetCultures(typeDescriptor))
                    {
                        CreateStore(typeDescriptor, dataScope, culture, existingTablesValidator);
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
                DropStore(typeDescriptor, dataScope, cultureInfo);
            }
        }

        internal static IEnumerable<CultureInfo> GetCultures(DataTypeDescriptor typeDescriptor)
        {
            if (typeDescriptor.Localizeable)
            {
                return DataLocalizationFacade.ActiveLocalizationCultures;
            }
            
            return new [] { CultureInfo.InvariantCulture };
        }

        private void CreateScopeData(DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope)
        {
            foreach (var cultureInfo in GetCultures(typeDescriptor))
            {
                CreateStore(typeDescriptor, dataScope, cultureInfo);
            }
        }

        internal void CreateStore(DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo,
                                  Action<string> existingTablesValidator = null)
        {
            string tableName = DynamicTypesCommon.GenerateTableName(typeDescriptor, dataScope, cultureInfo);
            var tables = GetTablesList();

            if (tables.Contains(tableName))
            {
                if (existingTablesValidator != null)
                {
                    existingTablesValidator(tableName);
                    return;
                }

                throw new InvalidOperationException($"Database already contains a table named {tableName}");
            }

            var sql = new StringBuilder();
            var sqlColumns = typeDescriptor.Fields.Select(fieldDescriptor 
                => GetColumnInfo(tableName, fieldDescriptor.Name, typeDescriptor, fieldDescriptor, true, false)
                ).ToList();

            sql.AppendFormat("CREATE TABLE dbo.[{0}]({1});", tableName, string.Join(",", sqlColumns));
            sql.Append(SetPrimaryKey(tableName, typeDescriptor.PhysicalKeyPropertyNames, typeDescriptor.PrimaryKeyIsClusteredIndex));

            try
            {
                ExecuteNonQuery(sql.ToString());
            }
            catch (Exception ex)
            {
                throw MakeVerboseException(ex);
            }

            foreach (var index in typeDescriptor.Indexes)
            {
                CreateIndex(tableName, index);
            }

            SqlTableInformationStore.ClearCache(_connectionString, tableName);
        }

        internal List<string> GetTablesList()
        {
            string sql = @"
				SELECT t.Name FROM sysobjects s
				INNER JOIN sysobjects t ON s.parent_obj = t.id
				WHERE t.xtype = 'U'";
            DataTable dt = ExecuteReader(sql);
            List<string> tables = (from DataRow dr in dt.Rows select dr["Name"].ToString()).ToList();

            return tables;
        }

        #region Db helpers
        public DataTable ExecuteReader(string commandText)
        {
            var conn = SqlConnectionManager.GetConnection(_connectionString);

            using (var cmd = new SqlCommand(commandText, conn))
            {
                using (var dt = new DataTable())
                {
                    using (var rdr = cmd.ExecuteReader())
                    {
                        if (rdr != null) dt.Load(rdr);
                        return dt;
                    }
                }
            }
        }

        public void ExecuteNonQuery(string commandText)
        {
            if (string.IsNullOrEmpty(commandText))
            {
                return;
            }

            Log.LogInformation("SqlDataProvider", commandText);

            var conn = SqlConnectionManager.GetConnection(_connectionString);
            using (var cmd = new SqlCommand(commandText, conn))
            {
                cmd.ExecuteNonQuery();
            }
        }

        public void ExecuteNonQuery(SqlCommand cmd)
        {
            var conn = SqlConnectionManager.GetConnection(_connectionString);
            cmd.Connection = conn;
            cmd.ExecuteNonQuery();
        }

        public void ExecuteStoredProcedure(string spName, string[] spParams)
        {
            string sql = string.Format("{0} {1}", spName, string.Join(",", spParams));

            ExecuteNonQuery(sql);
        }

        #endregion


        private string GetConfiguredTableName(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScope, string cultureName)
        {
            var stores =
                (from dataInterface in _generatedInterfaces
                 where dataInterface.DataTypeId == dataTypeDescriptor.DataTypeId
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


        internal string TryNormalizeTypeFullName(string typeName)
        {
            Type type = TypeManager.TryGetType(typeName);

            if (type != null)
            {
                return TypeManager.TrySerializeType(type);
            }
            return typeName;
        }


        internal void AlterStoresForType(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            DataTypeChangeDescriptor changeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in changeDescriptor.AddedDataScopes)
                {
                    CreateScopeData(changeDescriptor.AlteredType, dataScope);
                }

                foreach (DataScopeIdentifier dataScope in changeDescriptor.ExistingDataScopes)
                {
                    AlterScopeData(updateDataTypeDescriptor, changeDescriptor, dataScope);
                }


                if (updateDataTypeDescriptor.PublicationAdded)
                {
                    HandleEnablingOfPublication(changeDescriptor);
                }

                if (updateDataTypeDescriptor.PublicationRemoved)
                {
                    HandleDisablingOfPublication(changeDescriptor);
                }

                foreach (DataScopeIdentifier dataScope in changeDescriptor.DeletedDataScopes)
                {
                    DropScopeData(changeDescriptor.AlteredType, dataScope);
                }
            }
        }



        private void HandleDisablingOfPublication(DataTypeChangeDescriptor changeDescriptor)
        {
            IEnumerable<CultureInfo> locales = GetCultures(changeDescriptor.OriginalType);

            foreach (CultureInfo locale in locales)
            {
                string oldTableName = GetConfiguredTableName(changeDescriptor.OriginalType, DataScopeIdentifier.Administrated, locale.Name);
                string newTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, DataScopeIdentifier.Public, locale);

                StringBuilder fieldList = GetCommonFields(changeDescriptor);

                string removeCommandText = string.Format(@"DELETE FROM [{0}];", newTableName);
                ExecuteNonQuery(removeCommandText);

                string copyCommandText = string.Format(@"
                            INSERT INTO [{0}] ({2})
                            SELECT {2}                             
                            FROM [{1}];", newTableName, oldTableName, fieldList);
                ExecuteNonQuery(copyCommandText);
            }
        }



        private static StringBuilder GetCommonFields(DataTypeChangeDescriptor changeDescriptor)
        {
            var fieldList = new StringBuilder();
            foreach (DataFieldDescriptor dataFieldDescriptor in changeDescriptor.OriginalType.Fields)
            {
                if (!changeDescriptor.AlteredType.Fields.Any(f => f.Id == dataFieldDescriptor.Id)) continue;

                if (fieldList.Length > 0) fieldList.Append(", ");

                fieldList.Append("[" + dataFieldDescriptor.Name + "]");
            }
            return fieldList;
        }



        private void HandleEnablingOfPublication(DataTypeChangeDescriptor changeDescriptor)
        {
            IEnumerable<CultureInfo> locales = GetCultures(changeDescriptor.OriginalType);

            foreach (CultureInfo locale in locales)
            {
                string oldTableName = GetConfiguredTableName(changeDescriptor.OriginalType, DataScopeIdentifier.Public, locale.Name);
                string newTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, DataScopeIdentifier.Administrated, locale);

                StringBuilder fieldList = GetCommonFields(changeDescriptor);

                string copyCommandText = string.Format(@"
                            INSERT INTO [{0}] ({2})
                            SELECT {2}                             
                            FROM [{1}];", newTableName, oldTableName, fieldList);
                ExecuteNonQuery(copyCommandText);

                string updateOldCommandText = string.Format("UPDATE [{0}] SET [{1}] = '{2}'", oldTableName, "PublicationStatus", GenericPublishProcessController.Published);
                ExecuteNonQuery(updateOldCommandText);

                string updateNewCommandText = string.Format("UPDATE [{0}] SET [{1}] = '{2}'", newTableName, "PublicationStatus", GenericPublishProcessController.Published);
                ExecuteNonQuery(updateNewCommandText);
            }
        }



        private void AlterScopeData(UpdateDataTypeDescriptor updateDataTypeDescriptor, DataTypeChangeDescriptor changeDescriptor, DataScopeIdentifier dataScope)
        {
            var culturesToDelete = new List<CultureInfo>();
            var culturesToChange = new List<CultureInfo>();

            var oldCultures = GetCultures(changeDescriptor.OriginalType).Evaluate();
            var newCultures = GetCultures(changeDescriptor.AlteredType).Evaluate();

            foreach (var culture in oldCultures)
            {
                if (newCultures.Contains(culture))
                {
                    culturesToChange.Add(culture);
                }
                else
                {
                    culturesToDelete.Add(culture);
                }
            }

            var culturesToAdd = newCultures.Where(culture => !oldCultures.Contains(culture)).ToList();


            culturesToAdd.ForEach(culture => CreateStore(changeDescriptor.AlteredType, dataScope, culture));
            culturesToChange.ForEach(culture => AlterStore(updateDataTypeDescriptor, changeDescriptor, dataScope, culture));

            if (updateDataTypeDescriptor.LocalesToCopyTo != null)
            {
                StringBuilder fieldList = GetCommonFields(changeDescriptor);

                string fromTableName = GetConfiguredTableName(changeDescriptor.OriginalType, dataScope, "");

                foreach (CultureInfo locale in updateDataTypeDescriptor.LocalesToCopyTo)
                {
                    string toTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, dataScope, locale);

                    string copyCommandText = string.Format(@"
                            INSERT INTO [{0}] ({2})
                            SELECT {2}                             
                            FROM [{1}];", toTableName, fromTableName, fieldList);
                    ExecuteNonQuery(copyCommandText);

                    string updateCommandText = string.Format("UPDATE [{0}] SET [{1}] = '{2}'", toTableName, "SourceCultureName", locale.Name);
                    ExecuteNonQuery(updateCommandText);
                }

                string removeCommandText = string.Format(@"DELETE FROM [{0}];", fromTableName);
                ExecuteNonQuery(removeCommandText);
            }

            if (updateDataTypeDescriptor.LocaleToCopyFrom != null)
            {
                StringBuilder fieldList = GetCommonFields(changeDescriptor);

                string fromTableName = GetConfiguredTableName(changeDescriptor.OriginalType, dataScope, updateDataTypeDescriptor.LocaleToCopyFrom.Name);
                string toTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, dataScope, CultureInfo.InvariantCulture);

                string copyCommandText = string.Format(@"
                            INSERT INTO [{0}] ({2})
                            SELECT {2}                             
                            FROM [{1}];", toTableName, fromTableName, fieldList);
                ExecuteNonQuery(copyCommandText);
            }


            culturesToDelete.ForEach(culture => DropStore(changeDescriptor.OriginalType, dataScope, culture));
        }



        private void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, DataTypeChangeDescriptor changeDescriptor, DataScopeIdentifier dataScope, CultureInfo culture)
        {
            try
            {
                string originalTableName = GetConfiguredTableName(changeDescriptor.OriginalType, dataScope, culture.Name);
                string alteredTableName = originalTableName;

                // This could be done more nicely! But only give the table a new name if the type has changed its name and not because we changed the naming scheme
                if (updateDataTypeDescriptor.OldDataTypeDescriptor.Name != updateDataTypeDescriptor.NewDataTypeDescriptor.Name ||
                    updateDataTypeDescriptor.OldDataTypeDescriptor.Namespace != updateDataTypeDescriptor.NewDataTypeDescriptor.Namespace)
                {
                    alteredTableName = DynamicTypesCommon.GenerateTableName(changeDescriptor.AlteredType, dataScope, culture);
                }

                var tables = GetTablesList();

                if (!tables.Contains(originalTableName))
                {
                    throw new InvalidOperationException(
                        $"Unable to alter data type store for type '{changeDescriptor.AlteredType.GetFullInterfaceName()}'. The database does not contain expected table '{originalTableName}'");
                }


                bool primaryKeyChanged = changeDescriptor.AddedKeyFields.Any() 
                                         || changeDescriptor.DeletedKeyFields.Any() 
                                         || changeDescriptor.KeyFieldsOrderChanged
                                         || changeDescriptor.VersionKeyFieldsChanged
                                         || changeDescriptor.OriginalType.PrimaryKeyIsClusteredIndex != changeDescriptor.AlteredType.PrimaryKeyIsClusteredIndex;

                DropConstraints(originalTableName, primaryKeyChanged);

                if (originalTableName != alteredTableName)
                {
                    if (tables.Contains(alteredTableName))
                        throw new InvalidOperationException(
                            $"Can not rename table '{originalTableName}' to '{alteredTableName}'. A table with that name already exists");
                    RenameTable(originalTableName, alteredTableName);
                }

                var newIndexes = changeDescriptor.AlteredType.Indexes.Select(i => i.ToString()).ToList();
                foreach (var oldIndex in changeDescriptor.OriginalType.Indexes)
                {
                    if (!newIndexes.Contains(oldIndex.ToString()))
                    {
                        DropIndex(alteredTableName, oldIndex);
                    }
                }

                DropFields(alteredTableName, changeDescriptor.DeletedFields, changeDescriptor.OriginalType.Fields);
                ImplementFieldChanges(alteredTableName, changeDescriptor.AlteredType, changeDescriptor.ExistingFields);


                Dictionary<string, object> defaultValues = null;
                if (updateDataTypeDescriptor.PublicationAdded)
                {
                    defaultValues = new Dictionary<string, object>
                    {
                        {"PublicationStatus", GenericPublishProcessController.Draft}
                    };
                }

                AppendFields(alteredTableName, changeDescriptor, changeDescriptor.AddedFields, defaultValues);

                // Clustered index has to be created first.
                var createIndexActions = new List<Tuple<bool, Action>>();
                
                if (primaryKeyChanged)
                {
                    bool isClusteredIndex = changeDescriptor.AlteredType.PrimaryKeyIsClusteredIndex;

                    createIndexActions.Add(new Tuple<bool, Action>(isClusteredIndex,
                        () => ExecuteNonQuery(SetPrimaryKey(alteredTableName, changeDescriptor.AlteredType.PhysicalKeyPropertyNames, isClusteredIndex))
                    ));
                }

                var oldIndexes = changeDescriptor.OriginalType.Indexes.Select(i => i.ToString()).ToList();
                foreach (var newIndex in changeDescriptor.AlteredType.Indexes)
                {
                    if (!oldIndexes.Contains(newIndex.ToString()))
                    {
                        var index = newIndex;

                        createIndexActions.Add(new Tuple<bool, Action>(newIndex.Clustered, 
                            () => CreateIndex(alteredTableName, index)));
                    }
                }

                createIndexActions.Sort((a, b) => b.Item1.CompareTo(a.Item1));

                foreach (var createIndex in createIndexActions)
                {
                    createIndex.Item2();
                }

                SqlTableInformationStore.ClearCache(_connectionString, originalTableName);
                SqlTableInformationStore.ClearCache(_connectionString, alteredTableName);
            }
            catch (Exception ex)
            {
                throw MakeVerboseException(ex);
            }

        }



        internal void RenameTable(string oldTableName, string newTableName)
        {
            ExecuteStoredProcedure("sp_rename", new[] { SqlQuoted(oldTableName), SqlQuoted(newTableName) });
        }



        internal void DropStoresForType(string providerName, DataTypeDescriptor typeDescriptor)
        {
            lock (_lock)
            {
                foreach (DataScopeIdentifier dataScope in typeDescriptor.DataScopes)
                {
                    DropScopeData(typeDescriptor, dataScope);
                }
            }
        }

        private void DropScopeData(DataTypeDescriptor typeDescriptor, DataScopeIdentifier dataScope)
        {
            foreach (var culture in GetCultures(typeDescriptor))
            {
                DropStore(typeDescriptor, dataScope, culture);
            }
        }

        private void DropStore(DataTypeDescriptor dataTypeDescriptor, DataScopeIdentifier dataScope, CultureInfo cultureInfo)
        {
            string tableName = GetConfiguredTableName(dataTypeDescriptor, dataScope, cultureInfo.Name);

            if (string.IsNullOrEmpty(tableName))
            {
                return;
            }

            try
            {
                var tables = GetTablesList();

                if (tables.Contains(tableName))
                {
                    ExecuteNonQuery($"DROP TABLE [{tableName}];");

                    SqlTableInformationStore.ClearCache(_connectionString, tableName);
                }
            }
            catch (Exception ex)
            {
                throw MakeVerboseException(ex);
            }
        }

        private void ImplementFieldChanges(
            string tableName, 
            DataTypeDescriptor typeDescriptor,
            IEnumerable<DataTypeChangeDescriptor.ExistingFieldInfo> existingFieldDescription)
        {
            foreach (var changedFieldDescriptor in existingFieldDescription)
            {
                // Recreating deleted constraints, if necessary - renaming the column/changing its type
                bool changes = changedFieldDescriptor.AlteredFieldHasChanges;
                var columnName = changedFieldDescriptor.OriginalField.Name;

                ConfigureColumn(tableName, columnName, 
                    typeDescriptor,
                    changedFieldDescriptor.AlteredField, changedFieldDescriptor.OriginalField, changes);
            }
        }


        internal void RenameColumn(string tableName, string oldColumnName, string newColumnName)
        {
            string oldName = "{0}.{1}".FormatWith(tableName, oldColumnName);
            ExecuteStoredProcedure("sp_rename", new[] { SqlQuoted(oldName), SqlQuoted(newColumnName), "'COLUMN'" });
        }

        private void DropFields(string tableName, IEnumerable<DataFieldDescriptor> fieldsToDrop, IEnumerable<DataFieldDescriptor> fields)
        {
            var sql = new StringBuilder();

            foreach (var deletedFieldDescriptor in fieldsToDrop)
            {
                var columnExists = fields.Any(f => f.Name.Equals(deletedFieldDescriptor.Name));

                if (columnExists)
                {
                    sql.AppendFormat("ALTER TABLE [{0}] DROP COLUMN [{1}];", tableName, deletedFieldDescriptor.Name);
                }
                else
                {
                    Log.LogWarning(typeof(SqlDataProvider).FullName, "Column '{0}' on table '{1}' has already been dropped", deletedFieldDescriptor.Name, tableName);
                }
            }

            ExecuteNonQuery(sql.ToString());
        }



        private void AppendFields(string tableName, 
            DataTypeChangeDescriptor changeDescriptor,
            IEnumerable<DataFieldDescriptor> addedFieldDescriptions, 
            Dictionary<string, object> defaultValues = null)
        {
            foreach (var addedFieldDescriptor in addedFieldDescriptions)
            {
                string fieldName = addedFieldDescriptor.Name;
                object defaultValue = null;
                if (defaultValues != null && defaultValues.ContainsKey(fieldName))
                {
                    defaultValue = defaultValues[addedFieldDescriptor.Name];
                }



                CreateColumn(tableName, changeDescriptor.AlteredType, addedFieldDescriptor, defaultValue);

                // Updating VersionId field
                if (addedFieldDescriptor.Name == nameof(IVersioned.VersionId)
                    && changeDescriptor.AlteredType.SuperInterfaces.Contains(typeof (IVersioned)))
                {
                    string sourceField;

                    if (changeDescriptor.AlteredType.DataTypeId == typeof (IPage).GetImmutableTypeId())
                    {
                        sourceField = nameof(IPage.Id);
                    }
                    else
                    {
                        sourceField = changeDescriptor.AlteredType.Fields
                            .Where(f => f.InstanceType == typeof(Guid) 
                                        && (f.ForeignKeyReferenceTypeName?.Contains(typeof (IPage).FullName) ?? false))
                            .OrderByDescending(f => f.Name == nameof(IPageData.PageId))
                            .Select(f => f.Name)
                            .FirstOrDefault();
                    }

                    if (sourceField != null)
                    {
                        string updateVersionIdCommandText =
                            $"UPDATE [{tableName}] SET [{nameof(IVersioned.VersionId)}] = [{sourceField}]";
                        ExecuteNonQuery(updateVersionIdCommandText);
                    }
                }
            }
        }



        private IEnumerable<string> GetConstraints(string tableName, string constraintType = null)
        {
            /*
                This is the list of all possible values for this column (xtype):
                C = CHECK constraint 
                D = Default or DEFAULT constraint 
                F = FOREIGN KEY constraint 
                L = Log 
                P = Stored procedure 
                PK = PRIMARY KEY constraint (type is K) 
                RF = Replication filter stored procedure 
                S = System table 
                TR = Trigger 
                U = User table 
                UQ = UNIQUE constraint (type is K) 
                V = View 
                X = Extended stored procedure
            */
            string type = string.IsNullOrEmpty(constraintType) ? string.Empty : string.Format(" AND s.xtype = '{0}'", constraintType);

            string commandText = string.Format(@"
				SELECT * FROM sysobjects s
				INNER JOIN sysobjects t ON s.parent_obj = t.id
				WHERE t.name = '{0}'{1}", tableName, type);

            var dt = ExecuteReader(commandText);
            var constraints = (from DataRow dr in dt.Rows select dr["Name"].ToString()).ToList();

            return constraints;
        }

        private void DropConstraints(string tableName, bool includingPrimaryKey)
        {
            var sql = new StringBuilder();
            var constraints = GetConstraints(tableName);

            foreach (var constraint in constraints)
            {
                if (includingPrimaryKey || !IsPrimaryKeyContraint(constraint))
                {
                    sql.AppendFormat("ALTER TABLE [{0}] DROP CONSTRAINT [{1}];", tableName, constraint);
                }
            }

            ExecuteNonQuery(sql.ToString());
        }

        internal string SetPrimaryKey(string tableName, IEnumerable<string> fieldNames, bool createAsClustered)
        {
            if (!fieldNames.Any())
            {
                return string.Empty;
            }

            string primaryKeyIndexName = GeneratePrimaryKeyContraintName(tableName);

            return string.Format("ALTER TABLE [{0}] ADD CONSTRAINT [{1}] PRIMARY KEY{2}({3});", tableName, primaryKeyIndexName,
                                    createAsClustered ? " CLUSTERED " : " NONCLUSTERED ", string.Join(",", fieldNames.Distinct().Select(field => "[" + field + "]")));
        }

        private Exception MakeVerboseException(Exception ex)
        {
            var message = new StringBuilder();
            Exception nested = ex;
            while (nested != null)
            {
                message.Append(nested.Message);
                message.Append(" ");
                nested = nested.InnerException;
            }
            return new InvalidOperationException(message.ToString(), ex);
        }



        private void CreateColumn(string tableName, DataTypeDescriptor typeDescriptor, DataFieldDescriptor fieldDescriptor, object defaultValue = null)
        {
            if (defaultValue == null && !fieldDescriptor.IsNullable && fieldDescriptor.DefaultValue != null)
            {
                ExecuteNonQuery("ALTER TABLE [{0}] ADD {1};"
                            .FormatWith(tableName, GetColumnInfo(tableName, fieldDescriptor.Name, typeDescriptor, fieldDescriptor, true, false)));
                return;
            }

            // Creating a column, making it nullable
            ExecuteNonQuery("ALTER TABLE [{0}] ADD {1};"
                            .FormatWith(tableName, GetColumnInfo(tableName, fieldDescriptor.Name, typeDescriptor, fieldDescriptor, true, true)));

            // Setting default value with "UPDATE" statement
            if (defaultValue != null || (!fieldDescriptor.IsNullable && fieldDescriptor.DefaultValue == null))
            {
                string defaultValueStr;

                if(defaultValue != null)
                {
                    Type typeOfDefaultValue = defaultValue.GetType();
                    defaultValueStr = (typeOfDefaultValue == typeof(string) || typeOfDefaultValue == typeof(Guid))
                                    ? ("'" + defaultValue + "'")
                                    : defaultValue.ToString();
                }
                else
                {
                    defaultValueStr = GetDefaultValueText(fieldDescriptor.StoreType);
                }

                ExecuteNonQuery("UPDATE [{0}] SET [{1}] = {2};"
                                .FormatWith(tableName, fieldDescriptor.Name, defaultValueStr));
            }

            // Making column not nullable if necessary
            if(!fieldDescriptor.IsNullable)
            {
                AlterColumn(tableName, GetColumnInfo(tableName, fieldDescriptor.Name, typeDescriptor, fieldDescriptor, false, false));
            }
        }



        private void ConfigureColumn(string tableName, string columnName, 
            DataTypeDescriptor typeDescriptor,
            DataFieldDescriptor fieldDescriptor, DataFieldDescriptor originalFieldDescriptor, bool changes)
        {
            string fieldName = fieldDescriptor.Name;

            if (columnName != fieldName)
            {
                RenameColumn(tableName, columnName, fieldName);
            }

            if(changes)
            {
                bool fieldBecameRequired = !fieldDescriptor.IsNullable && originalFieldDescriptor.IsNullable;

                if(fieldBecameRequired)
                {
                    if (fieldDescriptor.StoreType.ToString() != originalFieldDescriptor.StoreType.ToString())
                    {
                        AlterColumn(tableName, GetColumnInfo(tableName, fieldName, typeDescriptor, fieldDescriptor, false, true));
                    }

                    string defaultValue = TranslatesIntoDefaultConstraint(fieldDescriptor.DefaultValue)
                                              ? GetDefaultValueText(fieldDescriptor.DefaultValue)
                                              : GetDefaultValueText(fieldDescriptor.StoreType); 

                    ExecuteNonQuery("UPDATE [{0}] SET [{1}] = {2} WHERE [{1}] IS NULL"
                                    .FormatWith(tableName, fieldDescriptor.Name, defaultValue));
                }

                AlterColumn(tableName, GetColumnInfo(tableName, fieldDescriptor.Name, typeDescriptor, fieldDescriptor, false, false));
            }

            ExecuteNonQuery(SetDefaultValue(tableName, fieldDescriptor.Name, fieldDescriptor.DefaultValue));
        }

        private void AlterColumn(string tableName, string columnInfo)
        {
            ExecuteNonQuery(string.Format("ALTER TABLE [{0}] ALTER COLUMN {1};", tableName, columnInfo));
        }

        internal string GetColumnInfo(string tableName, string columnName, 
            DataTypeDescriptor dataTypeDescriptor,
            DataFieldDescriptor fieldDescriptor, bool includeDefault, bool forceNullable)
        {
            string defaultInfo = string.Empty;
            string fieldName = fieldDescriptor.Name;
            bool isKeyField = dataTypeDescriptor.KeyPropertyNames.Contains(fieldName)
                || fieldDescriptor.ForeignKeyReferenceTypeName != null;

            if (TranslatesIntoDefaultConstraint(fieldDescriptor.DefaultValue))
            {
                if (includeDefault)
                {
                    defaultInfo = string.Format("CONSTRAINT [{0}] DEFAULT {1}", SqlSafeName("DF", tableName, columnName), GetDefaultValueText(fieldDescriptor.DefaultValue));
                }
            }

            // Enabling case sensitive comparison for the random string fields
            
            var defaultValue = fieldDescriptor.DefaultValue;

            string collation = string.Empty;
            if (defaultValue?.ValueType == DefaultValueType.RandomString
                || (isKeyField && fieldDescriptor.StoreType.IsString))
            {
                collation = "COLLATE Latin1_General_CS_AS";
            }
            
            return string.Format(
                "[{0}] {1} {2} {3} {4}",
                fieldDescriptor.Name,
                DynamicTypesCommon.MapStoreTypeToSqlDataType(fieldDescriptor.StoreType),
                collation,
                fieldDescriptor.IsNullable || forceNullable ? "NULL" : "NOT NULL",
                defaultInfo);
        }

        private string SetDefaultValue(string tableName, string columnName, DefaultValue defaultValue)
        {
            if (!TranslatesIntoDefaultConstraint(defaultValue))
                return string.Empty;

            string constraintName = SqlSafeName("DF", tableName, columnName);
            return string.Format("ALTER TABLE [{0}] ADD CONSTRAINT [{1}] DEFAULT {2} FOR [{3}];", tableName, constraintName, GetDefaultValueText(defaultValue), columnName);
        }

        private string GetDefaultValueText(StoreFieldType storeFieldType)
        {
            Verify.ArgumentNotNull(storeFieldType, "storeFieldType");

            switch (storeFieldType.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.String:
                case PhysicalStoreFieldType.LargeString:
                    return "N''";
                case PhysicalStoreFieldType.Guid:
                    return "'00000000-0000-0000-0000-000000000000'";
                case PhysicalStoreFieldType.Integer:
                case PhysicalStoreFieldType.Long:
                case PhysicalStoreFieldType.Decimal:
                    return "0";
                case PhysicalStoreFieldType.Boolean:
                    return "0";
                case PhysicalStoreFieldType.DateTime:
                    return "getdate()";
            }

            throw new NotImplementedException("Supplied StoreFieldType contains an unsupported PhysicalStoreType '{0}'."
                                              .FormatWith(storeFieldType.PhysicalStoreType));
        }

        private bool TranslatesIntoDefaultConstraint(DefaultValue defaultValue)
        {
            return defaultValue != null && defaultValue.ValueType != DefaultValueType.RandomString;
        }

        private string GetDefaultValueText(DefaultValue defaultValue)
        {
            Verify.ArgumentNotNull(defaultValue, "defaultValue");

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

            throw new NotImplementedException("Supplied DefaultValue contains an unsupported DefaultValueType '{0}'."
                                              .FormatWith(defaultValue.ValueType));
        }

        private void CreateIndex(string tableName, DataTypeIndex index)
        {
            string indexName = GetIndexName(index);

            var fields = new StringBuilder();
            foreach (var field in index.Fields)
            {
                if (fields.Length > 0)
                {
                    fields.Append(", ");
                }
                fields.Append('[').Append(field.Item1).Append(']');
                if (field.Item2 == IndexDirection.Descending)
                {
                    fields.Append(" DESC");
                }
            }

            var sql = string.Format("CREATE {0}CLUSTERED INDEX [{1}] ON [{2}] ({3})",
                            !index.Clustered ? "NON" : "",
                            indexName, 
                            tableName, 
                            fields);

            ExecuteNonQuery(sql);
        }

        private void DropIndex(string tableName, DataTypeIndex index)
        {
             string indexName = GetIndexName(index);

            var sql = string.Format("DROP INDEX [{0}] ON [{1}]", indexName,  tableName);

            ExecuteNonQuery(sql);
        }

        private string GetIndexName(DataTypeIndex index)
        {
            var result = new StringBuilder().Append("IX_");
            foreach (var field in index.Fields)
            {
                result.Append('_').Append(field.Item1);
            }
            return result.ToString();
        }

        private string SqlQuoted(object obj)
        {
            return SqlQuoted(obj.ToString());
        }

        private static string SqlQuoted(string theString)
        {
            return string.Format("'{0}'", theString.Replace("'", "''"));
        }

        private static bool IsPrimaryKeyContraint(string contraintName)
        {
            return contraintName.StartsWith("PK_");
        }

        private static string GeneratePrimaryKeyContraintName(string tableName)
        {
            return SqlSafeName("PK", tableName);
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

        private static string SqlSafeName(string prefix, string parentName, string subName)
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
