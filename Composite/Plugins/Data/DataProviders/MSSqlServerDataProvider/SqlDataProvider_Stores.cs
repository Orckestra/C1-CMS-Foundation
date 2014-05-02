using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Linq;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Linq;
using Composite.Core.Sql;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;
using System.Data.SqlClient;
using System.Text;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    internal partial class SqlDataProvider
    {
        private static readonly string LogTitle = typeof(SqlDataProvider).Name;
        private readonly List<SqlDataTypeStoreTable> _createdSqlDataTypeStoreTables = new List<SqlDataTypeStoreTable>();
        private Assembly _compositeGeneratedAssembly;

        private static readonly Hashtable<Type, bool> _typeLoadResults = new Hashtable<Type, bool>(); 

        public void CreateStore(DataTypeDescriptor dataTypeDescriptor)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                if (InterfaceConfigurationManipulator.ConfigurationExists(_dataProviderContext.ProviderName, dataTypeDescriptor))
                {
                    throw new InvalidOperationException(string.Format("SqlDataProvider configuration already contains a interface named '{0}'. Remove it from the configuration and restart the application.", dataTypeDescriptor.TypeManagerTypeName));
                }

                Action<string> existingTablesValidator = tableName =>
                {
                    var errors = new StringBuilder();
                    var interfaceType = dataTypeDescriptor.GetInterfaceType();
                    if (!ValidateTable(interfaceType, tableName, errors))
                    {
                        throw new InvalidOperationException("Table '{0}' already exist but isn't valid: {1}".FormatWith(tableName, errors.ToString()));
                    }
                };

                SqlStoreManipulator.CreateStoresForType(dataTypeDescriptor, existingTablesValidator);

                InterfaceConfigurationElement element = InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);
                _interfaceConfigurationElements.Add(element);

                Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

                InitializeStoreResult initializeStoreResult = InitializeStore(element, allSqlDataTypeStoreDataScopes);

                if (initializeStoreResult.InterfaceType == null) return;

                AddDataTypeStore(initializeStoreResult, false);
            }
        }



        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceCompile)
        {
            var dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                SqlStoreManipulator.AlterStoresForType(updateDataTypeDescriptor);

                bool localizationChanged = dataTypeChangeDescriptor.AlteredType.Localizeable !=
                                           dataTypeChangeDescriptor.OriginalType.Localizeable;

                var oldElement = _interfaceConfigurationElements.Single(f => f.DataTypeId == updateDataTypeDescriptor.OldDataTypeDescriptor.DataTypeId);

                var newElement = InterfaceConfigurationManipulator.Change(_dataProviderContext.ProviderName, dataTypeChangeDescriptor, localizationChanged);
                if (newElement != null)
                {
                    _interfaceConfigurationElements.Remove(oldElement);
                    _interfaceConfigurationElements.Add(newElement);
                }

                if (forceCompile)
                {
                    Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

                    InitializeStoreResult initializeStoreResult = InitializeStore(newElement ?? oldElement, allSqlDataTypeStoreDataScopes, true);

                    if (!updateDataTypeDescriptor.NewDataTypeDescriptor.IsCodeGenerated)
                    {
                        var interfaceType = updateDataTypeDescriptor.NewDataTypeDescriptor.GetInterfaceType();

                        if (!DataTypeValidationRegistry.IsValidForProvider(interfaceType, _dataProviderContext.ProviderName))
                        {
                            // Revalidating alternated static data type
                            _sqlDataTypeStoresContainer.RemoveKnownInterface(interfaceType);

                            DataTypeValidationRegistry.ClearValidationError(interfaceType, _dataProviderContext.ProviderName);

                            AddDataTypeStore(initializeStoreResult);
                        }
                    }
                }
            }
        }



        public void DropStore(DataTypeDescriptor dataTypeDescriptor)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                SqlStoreManipulator.DropStoresForType(_dataProviderContext.ProviderName, dataTypeDescriptor);

                InterfaceConfigurationManipulator.Remove(_dataProviderContext.ProviderName, dataTypeDescriptor);
                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.FirstOrDefault(f => f.DataTypeId == dataTypeDescriptor.DataTypeId);
                if (oldElement != null)
                {
                    _interfaceConfigurationElements.Remove(oldElement);
                }

                Guid dataTypeId = dataTypeDescriptor.DataTypeId;
                int storesRemoved = _createdSqlDataTypeStoreTables.RemoveAll(item => item.DataTypeId == dataTypeId);

                if (storesRemoved > 0)
                {
                    Type interfaceType = dataTypeDescriptor.GetInterfaceType();

                    _sqlDataTypeStoresContainer.ForgetInterface(interfaceType);
                }
            }
        }



        private void InitializeExistingStores()
        {
            _compositeGeneratedAssembly = _compositeGeneratedAssembly ?? AssemblyFacade.GetGeneratedAssemblyFromBin();
            _sqlDataTypeStoresContainer = new SqlDataTypeStoresContainer(_dataProviderContext.ProviderName, _connectionString, _sqlLoggingContext);

            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

            var initializedStores = new List<InterfaceGeneratedClassesInfo>();

            bool dataContextRecompilationNeeded = false;

            Type dataContextClass = TryLoadDataContext(ref dataContextRecompilationNeeded);

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                var generatedClassesInfo = InitializeStoreTypes(element, allSqlDataTypeStoreDataScopes, 
                    dataContextClass, false, ref dataContextRecompilationNeeded);

                if (generatedClassesInfo == null) continue;

                initializedStores.Add(generatedClassesInfo);
            }

            if (dataContextRecompilationNeeded)
            {
                dataContextClass = DataContextAssembler.EmitDataContextClass(
                    initializedStores
                    .Where(s => s.Fields != null)
                    .SelectMany(s => s.Fields.Values).Evaluate());
            }

            _sqlDataTypeStoresContainer.DataContextClass = dataContextClass;

            foreach (var typeInfo in initializedStores)
            {
                var store = EmbedDataContextInfo(typeInfo, dataContextClass);

                AddDataTypeStore(store);
            }
        }

        private static Exception NewConfigurationException(ConfigurationElement element, string message)
        {
            return new ConfigurationErrorsException(message, element.ElementInformation.Source, element.ElementInformation.LineNumber);
        }


        private InitializeStoreResult InitializeStore(InterfaceConfigurationElement element,
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes,
            bool forceCompile = false)
        {
            bool dataContextRecompilationNeeded = false;

            Type dataContextClass = _sqlDataTypeStoresContainer.DataContextClass;

            var initInfo = InitializeStoreTypes(element, allSqlDataTypeStoreDataScopes, dataContextClass, forceCompile, ref dataContextRecompilationNeeded);

            if (initInfo.InterfaceType == null)
            {
                return new InitializeStoreResult();
            }

            if (dataContextRecompilationNeeded)
            {
                _createdSqlDataTypeStoreTables.RemoveAll(f => f.DataTypeId == initInfo.DataTypeDescriptor.DataTypeId);

                var existingFields = _createdSqlDataTypeStoreTables.Select(
                                      s => new Tuple<string, Type>(s.DataContextFieldName, s.DataContextFieldType));
                var newFields = initInfo.Fields.Select(f => new Tuple<string, Type>(f.Value.FieldName, f.Value.FieldType));

                dataContextClass = DataContextAssembler.EmitDataContextClass(existingFields.Concat(newFields).Evaluate());

                UpdateCreatedSqlDataTypeStoreTables(dataContextClass);
            }

            _sqlDataTypeStoresContainer.DataContextClass = dataContextClass;

            return EmbedDataContextInfo(initInfo, dataContextClass);
        }


        private Type TryLoadDataContext(ref bool forceCompile)
        {
            string dataContextClassFullName = NamesCreator.MakeDataContextClassFullName(_dataProviderContext.ProviderName);
            Type dataContextClass = TryGetGeneratedType(dataContextClassFullName);

            // Trying to instantiate a data context object
            if (dataContextClass != null && !TryLoadDataContextClass(dataContextClass))
            {
                forceCompile = true;
                return null;
            }

            return dataContextClass;
        }

        private InitializeStoreResult EmbedDataContextInfo(InterfaceGeneratedClassesInfo initInfo, Type dataContextType)
        {
            var result = new InitializeStoreResult();

            if (initInfo.InterfaceType == null)
            {
                return result;
            }

            result.InterfaceType = initInfo.InterfaceType;

            var sqlDataTypeStoreTables = new Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable>();
            foreach (SqlDataTypeStoreDataScope storeDataScope in initInfo.DataScopes)
            {
                var key = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);

                result.TableNames.Add(key, storeDataScope.TableName);

                Verify.IsNotNull(initInfo.Fields, "Fields collection is null");

                StoreTypeInfo fieldInfo;
                if (!initInfo.Fields.TryGetValue(key, out fieldInfo))
                {
                    continue;
                }

                Verify.IsNotNull(fieldInfo, "Field info is missing");
                

                FieldInfo dataContextFieldInfo = dataContextType != null 
                    ? dataContextType.GetField(fieldInfo.FieldName) 
                    : fieldInfo.DataContextField;

                Type sqlDataProvdierHelperType = fieldInfo.SqlHelperClass;

                var sqlDataProviderHelper = (ISqlDataProviderHelper)Activator.CreateInstance(sqlDataProvdierHelperType);

                var sqlDataTypeStoreTable = new SqlDataTypeStoreTable(
                    initInfo.DataTypeDescriptor.DataTypeId,
                    dataContextFieldInfo, 
                    sqlDataProviderHelper,
                    fieldInfo.FieldName,
                    fieldInfo.FieldType);
                _createdSqlDataTypeStoreTables.Add(sqlDataTypeStoreTable);

                sqlDataTypeStoreTables.Add(key, sqlDataTypeStoreTable);
            }


            var sqlDataTypeStore = new SqlDataTypeStore(result.InterfaceType,
                sqlDataTypeStoreTables,
                initInfo.DataTypeDescriptor.IsCodeGenerated,
                _sqlDataTypeStoresContainer);

            result.SqlDataTypeStore = sqlDataTypeStore;

            return result;
        }

        private InterfaceGeneratedClassesInfo InitializeStoreTypes(InterfaceConfigurationElement element, 
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, 
            Type dataContextClass,
            bool forceCompile,
            ref bool dataContextRecompilationNeeded)
        {
            var result = new InterfaceGeneratedClassesInfo();

            var dataScopes = new List<SqlDataTypeStoreDataScope>();

            foreach (StorageInformation storageInformation in element.Stores)
            {
                var sqlDataTypeStoreDataScope = new SqlDataTypeStoreDataScope
                {
                    DataScopeName = storageInformation.DataScope,
                    CultureName = storageInformation.CultureName,
                    TableName = storageInformation.TableName
                };

                dataScopes.Add(sqlDataTypeStoreDataScope);
            }

            result.DataScopes = dataScopes;

            if (!element.DataTypeId.HasValue)
            {
                throw NewConfigurationException(element, "Missing 'dataTypeId' attribute");
            }

            Guid dataTypeId = element.DataTypeId.Value;

            var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
            if (dataTypeDescriptor == null)
            {
                throw NewConfigurationException(element, "Failed to get a DataTypeDescriptor by id '{0}'".FormatWith(dataTypeId));
            }

            result.DataTypeDescriptor = dataTypeDescriptor;

            Type interfaceType = null;

            try
            {
                interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                if (interfaceType == null)
                {
                    Log.LogError(LogTitle, "The data interface type '{0}' does not exists and is not code generated. It will not be unusable", dataTypeDescriptor.TypeManagerTypeName);
                    return result;
                }

                result.InterfaceType = interfaceType;

                string validationMessage;
                bool isValid = DataTypeValidationRegistry.Validate(interfaceType, dataTypeDescriptor, out validationMessage);
                if (!isValid)
                {
                    Log.LogCritical(LogTitle, validationMessage);
                    throw new InvalidOperationException(validationMessage);
                }

                Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo> fields;
                EnsureNeededTypes(dataTypeDescriptor, dataScopes, allSqlDataTypeStoreDataScopes, dataContextClass, out fields, ref dataContextRecompilationNeeded, forceCompile);

                result.Fields = fields;
                return result;
            }
            catch (Exception ex)
            {
                if (interfaceType != null)
                {
                    DataProviderRegistry.RegisterDataTypeInitializationError(interfaceType, ex);
                    DataProviderRegistry.AddKnownDataType(interfaceType, _dataProviderContext.ProviderName);

                    Log.LogError(LogTitle, "Failed initialization for the datatype {0}", dataTypeDescriptor.TypeManagerTypeName);
                }
                Log.LogError(LogTitle, ex);

                result.Fields = new Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo>();

                return result;
            }
        }


        private class InitializeStoreResult
        {
            public InitializeStoreResult()
            {
                TableNames = new Dictionary<SqlDataTypeStoreTableKey, string>();
            }

            public Type InterfaceType { get; set; }
            public SqlDataTypeStore SqlDataTypeStore { get; set; }
            public Dictionary<SqlDataTypeStoreTableKey, string> TableNames { get; set; }
        }


        private class InterfaceGeneratedClassesInfo
        {
            public Type InterfaceType { get; set; }
            public List<SqlDataTypeStoreDataScope> DataScopes { get; set; }
            public DataTypeDescriptor DataTypeDescriptor { get; set; }
            public Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo> Fields { get; set; }
        }


        private void AddDataTypeStore(InitializeStoreResult initializeStoreResult, bool doValidate = true)
        {
            if (initializeStoreResult.InterfaceType == null)
            {
                return;
            }

            bool isValid = initializeStoreResult.SqlDataTypeStore != null;

            if (isValid && doValidate)
            {
                isValid = ValidateTables(initializeStoreResult);
            }

            if (!isValid)
            {
                _sqlDataTypeStoresContainer.AddKnownInterface(initializeStoreResult.InterfaceType);
                return;
            }

            _sqlDataTypeStoresContainer.AddSupportedDataTypeStore(initializeStoreResult.InterfaceType, initializeStoreResult.SqlDataTypeStore);
            DataProviderRegistry.AddNewDataType(initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName);
        }



        private bool ValidateTables(InitializeStoreResult initializeStoreResult)
        {
            var errors = new StringBuilder();

            bool isValid = true;
            foreach (string tableName in initializeStoreResult.TableNames.Values)
            {
                bool isTableValid = ValidateTable(initializeStoreResult.InterfaceType, tableName, errors);
                if (!isTableValid) isValid = false;
            }

            if (!isValid)
            {
                DataTypeValidationRegistry.AddValidationError(initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName, errors.ToString());
                Log.LogCritical(LogTitle, string.Format("The data interface '{0}' will not work for the SqlDataProvider '{1}'", initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName));
                Log.LogCritical(LogTitle, errors.ToString());
            }

            return isValid;
        }



        private bool ValidateTable(Type interfaceType, string tableName, StringBuilder errors)
        {
            ISqlTableInformation sqlTableInformation = SqlTableInformationStore.GetTableInformation(_connectionString, tableName);

            if (sqlTableInformation == null)
            {
                errors.AppendLine("Table '{0}' does not exist".FormatWith(tableName));
                return false;
            }

            int primaryKeyCount = sqlTableInformation.ColumnInformations.Count(column => column.IsPrimaryKey);

            if (primaryKeyCount == 0)
            {
                errors.AppendLine(string.Format("The table '{0}' is missing a primary key", tableName));
                return false;
            }


            List<SqlColumnInformation> columns = new List<SqlColumnInformation>(sqlTableInformation.ColumnInformations);
            var properties = interfaceType.GetPropertiesRecursively();

            foreach (PropertyInfo property in properties)
            {
                if (property.Name == "DataSourceId") continue;

                SqlColumnInformation column = columns.Find(col => col.ColumnName == property.Name);
                if (column == null)
                {
                    errors.AppendLine(string.Format("The interface property named '{0}' does not exist in the table '{1}' as a column", property.Name, sqlTableInformation.TableName));
                    return false;
                }

                if (!column.IsNullable || column.Type == typeof(string))
                {
                    if (column.Type != property.PropertyType)
                    {
                        errors.AppendLine(string.Format("Type mismatch. The interface type '{0}' does not match the database type '{1}'", property.PropertyType, column.Type));
                        return false;
                    }
                }
            }

            // Updating schema from C1 4.1, to be removed in future versions.
            if (typeof (ILocalizedControlled).IsAssignableFrom(interfaceType)
                && !properties.Any(p => p.Name == "CultureName")
                && columns.Any(c => c.ColumnName == "CultureName"))
            {
                Log.LogInformation(LogTitle, "Removing obsolete 'CultureName' column from table '{0}'", tableName);


                string selectConstraintName = string.Format(
                    @"SELECT df.name 'ConstraintName'
                    FROM sys.default_constraints df
                    INNER JOIN sys.tables t ON df.parent_object_id = t.object_id
                    INNER JOIN sys.columns c ON df.parent_object_id = c.object_id AND df.parent_column_id = c.column_id
                    where t.name = '{0}'
                    and c.name = 'CultureName'", tableName);


                var dt = ExecuteReader(selectConstraintName);
                List<string> constraints = (from DataRow dr in dt.Rows select dr["ConstraintName"].ToString()).ToList();

                foreach (var constrainName in constraints)
                {
                    ExecuteSql("ALTER TABLE [{0}] DROP CONSTRAINT [{1}]".FormatWith(tableName, constrainName));
                }

                string sql = "ALTER TABLE [{0}] DROP COLUMN [CultureName]".FormatWith(tableName);

                ExecuteSql(sql);
            }

            return true;
        }


        private void ExecuteSql(string sql)
        {
            var conn = SqlConnectionManager.GetConnection(_connectionString);

            Log.LogInformation(LogTitle, sql);

            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.ExecuteNonQuery();
            }
        }

        private DataTable ExecuteReader(string commandText)
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

        internal class StoreTypeInfo
        {
            public StoreTypeInfo(string fieldName, Type fieldType, Type sqlHelperType)
            {
                FieldName = fieldName;
                FieldType = fieldType;
                SqlHelperClass = sqlHelperType;
            }

            public string FieldName;
            public Type FieldType;
            public Type SqlHelperClass;

            public FieldInfo DataContextField;
        }

        /// <summary>
        /// Checks that tables related to specified data type included in current DataContext class, if not - compiles a new version of DataContext that contains them
        /// </summary>
        private void EnsureNeededTypes(
            DataTypeDescriptor dataTypeDescriptor, 
            IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes, 
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, 
            Type dataContextClassType,
            out Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo> fields,
            ref bool dataContextRecompileNeeded, bool forceCompile = false)
        {
            lock (_lock)
            {
                // Getting the interface (ensuring that it exists)
                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                List<SqlDataTypeStoreDataScope> storeDataScopesToCompile = new List<SqlDataTypeStoreDataScope>();
                List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled = new List<SqlDataTypeStoreDataScope>();

                fields = new Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo>();

                foreach (SqlDataTypeStoreDataScope storeDataScope in sqlDataTypeStoreDataScopes)
                {
                    string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                    FieldInfo dataContextFieldInfo = null;
                    if (dataContextClassType != null)
                    {
                        dataContextFieldInfo = dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance)
                                                                   .SingleOrDefault(f => f.Name == dataContextFieldName);

                        if (dataContextFieldInfo == null)
                        {
                            if (RuntimeInformation.IsDebugBuild)
                            {
                                Log.LogInformation(LogTitle, "Missing classes will be compiled for data context's field '{0}'", dataContextFieldName);
                            }
                        }
                    }


                    string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);

                    string entityClassName = NamesCreator.MakeEntityClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);

                    Type sqlDataProviderHelperClass = null, entityClass = null;

                    try
                    {
                        sqlDataProviderHelperClass = TryGetGeneratedType(sqlDataProviderHelperClassFullName);
                        entityClass = TryGetGeneratedType(entityClassName);

                        forceCompile = forceCompile 
                            || CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] {sqlDataProviderHelperClass});
                    }
                    catch (TypeLoadException)
                    {
                        forceCompile = true;
                    }

                    if (!forceCompile)
                    {
                        var storeTypeInfo = new StoreTypeInfo(dataContextFieldName, entityClass, sqlDataProviderHelperClass);
                        storeTypeInfo.DataContextField = dataContextFieldInfo;

                        fields.Add(new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName), storeTypeInfo);
                    }

                    if (dataContextFieldInfo == null)
                    {
                        dataContextRecompileNeeded = true;
                    }

                    if (forceCompile)
                    {
                        storeDataScopesToCompile.Add(storeDataScope);
                    }
                    else
                    {
                        storeDataScopesAlreadyCompiled.Add(storeDataScope);
                    }
                }


                if (storeDataScopesToCompile.Any())
                {
                    dataContextRecompileNeeded = true;

                    if (!dataTypeDescriptor.IsCodeGenerated)
                    {
                        // Building a new descriptor so generated classes take in account field changes
                        dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
                    }

                    CompileMissingClasses(dataTypeDescriptor, allSqlDataTypeStoreDataScopes, fields, 
                        storeDataScopesToCompile, storeDataScopesAlreadyCompiled);
                }
            }
        }

        private bool TryLoadDataContextClass(Type dataContextClassType)
        {
            if (_typeLoadResults.ContainsKey(dataContextClassType))
            {
                return _typeLoadResults[dataContextClassType];
            }

            bool success = true;

            var connection = SqlConnectionManager.GetConnection(_connectionString);
            
            try
            {
                DataContext dataContext = (DataContext)Activator.CreateInstance(dataContextClassType, connection);
                dataContext.Dispose();
            }
            catch (Exception ex)
            {
                var innerEx = ex;

                while (innerEx is TargetInvocationException)
                {
                    innerEx = innerEx.InnerException;
                }

                if (!(innerEx is TypeLoadException || innerEx is FileNotFoundException))
                {
                    throw;
                }

                Log.LogWarning(LogTitle, "Failed to load DataContext class, creating a new one.");
                Log.LogWarning(LogTitle, innerEx.Message);

                success = false;
            }

            
            lock (_typeLoadResults)
            {
                _typeLoadResults[dataContextClassType] = success;
            }

            return success;
        }


        private void CompileMissingClasses(DataTypeDescriptor dataTypeDescriptor, Dictionary<DataTypeDescriptor, 
                                           IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes,
                                           Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo> fields,
                                           List<SqlDataTypeStoreDataScope> storeDataScopesToCompile, 
                                           List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled)
        {
            var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

            SqlDataProviderCodeBuilder sqlDataProviderCodeBuilder =
                new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
            sqlDataProviderCodeBuilder.AddDataType(dataTypeDescriptor, storeDataScopesToCompile);

            sqlDataProviderCodeBuilder.AddExistingDataType(dataTypeDescriptor, storeDataScopesAlreadyCompiled);

            foreach (var kvp in allSqlDataTypeStoreDataScopes.Where(f => f.Key != dataTypeDescriptor))
            {
                sqlDataProviderCodeBuilder.AddExistingDataType(kvp.Key, kvp.Value);
            }

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false);

            foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesToCompile)
            {
                string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                string helperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type helperClass = types.Single(f => f.FullName == helperClassFullName);

                string entityClassFullName = NamesCreator.MakeEntityClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type entityClass = types.Single(f => f.FullName == entityClassFullName);

                var storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName,storeDataScope.CultureName);
                fields[storeTableKey] = new StoreTypeInfo(dataContextFieldName, entityClass, helperClass); 
            }

            foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesAlreadyCompiled)
            {
                string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                string helperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type helperClass = TryGetGeneratedType(helperClassFullName);

                string entityClassFullName = NamesCreator.MakeEntityClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type entityClass = TryGetGeneratedType(entityClassFullName);

                var storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);
                fields[storeTableKey] = new StoreTypeInfo(dataContextFieldName, entityClass, helperClass); 
            }
        }

        private Type TryGetGeneratedType(string typeName)
        {
            Type compiledType = CodeGenerationManager.GetCompiledTypes().LastOrDefault(f => f.FullName == typeName);
            if (compiledType != null) return compiledType;

            if (_compositeGeneratedAssembly != null)
            {
                Type result = _compositeGeneratedAssembly.GetType(typeName);
                if (result != null) return result;
            }

            return TypeManager.TryGetType(typeName);
        }

        /// <summary>
        /// This method updates the DataContextQueryableFieldInfo property on all existing store tables.
        /// </summary>
        /// <remarks>
        /// This is needed due to the fact that all data stores share the same
        /// DataContext class and the DataContext class is code generated everytime
        /// a new store is code generated.
        /// </remarks>
        /// <param name="newDataContextClassType"></param>
        private void UpdateCreatedSqlDataTypeStoreTables(Type newDataContextClassType)
        {
            foreach (SqlDataTypeStoreTable dataTypeStoreTable in _createdSqlDataTypeStoreTables)
            {
                Verify.IsNotNull(dataTypeStoreTable.DataContextQueryableFieldInfo, "Missing field info");

                string fieldName = dataTypeStoreTable.DataContextQueryableFieldInfo.Name;

                FieldInfo newFieldInfo = newDataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance).SingleOrDefault(f => f.Name == fieldName);

                if (newFieldInfo != null)
                {
                    dataTypeStoreTable.DataContextQueryableFieldInfo = newFieldInfo;
                }
                else
                {
                    Log.LogWarning(LogTitle, "DataContext missing field newly created field '{0}'", fieldName);
                }
            }
        }



        private Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> BuildAllExistingDataTypeStoreDataScopes()
        {
            var allSqlDataTypeStoreDataScopes = new Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>>();

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                if (!element.DataTypeId.HasValue)
                {
#pragma warning disable 612,618
                    string interfaceName = element.InterfaceType ?? "<unknown type name>";
#pragma warning restore 612,618

                    Log.LogWarning(LogTitle, "Failed to create store for type '{0}' as it doesn't have an assigned 'dataTypeId' attribute, or it wasn't correctly loaded from meta data files".FormatWith(interfaceName));
                    continue;
                }

                Guid dataTypeId = element.DataTypeId.Value;
                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
                if (dataTypeDescriptor == null)
                {
                    Log.LogWarning(LogTitle, "Failed to get data type descriptor by id '{0}'".FormatWith(dataTypeId));
                    continue;
                }

                var sqlDataTypeStoreDataScopes = new List<SqlDataTypeStoreDataScope>();

                foreach (StorageInformation storageInformation in element.Stores)
                {
                    SqlDataTypeStoreDataScope sqlDataTypeStoreDataScope = new SqlDataTypeStoreDataScope
                    {
                        DataScopeName = storageInformation.DataScope,
                        CultureName = storageInformation.CultureName,
                        TableName = storageInformation.TableName
                    };

                    sqlDataTypeStoreDataScopes.Add(sqlDataTypeStoreDataScope);
                }

                allSqlDataTypeStoreDataScopes.Add(dataTypeDescriptor, sqlDataTypeStoreDataScopes);
            }

            return allSqlDataTypeStoreDataScopes;
        }
    }
}
