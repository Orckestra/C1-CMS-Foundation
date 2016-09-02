using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Linq;
using Composite.Core.Sql;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;
using System.Text;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    internal partial class SqlDataProvider
    {
        private static readonly string LogTitle = typeof(SqlDataProvider).Name;
        private readonly List<SqlDataTypeStoreTable> _createdSqlDataTypeStoreTables = new List<SqlDataTypeStoreTable>();
        private Assembly _compositeGeneratedAssembly;

        private static readonly Hashtable<Type, bool> _typeLoadResults = new Hashtable<Type, bool>(); 

        public void CreateStores(IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptors)
        {
            var types = DataTypeTypesManager.GetDataTypes(dataTypeDescriptors);

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                if (InterfaceConfigurationManipulator.ConfigurationExists(_dataProviderContext.ProviderName, dataTypeDescriptor))
                {
                    var filePath = InterfaceConfigurationManipulator.GetConfigurationFilePath(_dataProviderContext.ProviderName);

                    throw new InvalidOperationException(
                        $"SqlDataProvider configuration already contains a interface named '{dataTypeDescriptor.TypeManagerTypeName}', Id: '{dataTypeDescriptor.DataTypeId}'. Remove it from the configuration file '{filePath}' and restart the application.");
                }
            }

            // Creating Sql tables and adding to the configuration
            var configElements = new Dictionary<DataTypeDescriptor, InterfaceConfigurationElement>();

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                Type type = types[dataTypeDescriptor.DataTypeId];

                Action<string> existingTablesValidator = tableName =>
                {
                    var errors = new StringBuilder();
                    var interfaceType = type;
                    if (!ValidateTable(interfaceType, tableName, errors))
                    {
                        throw new InvalidOperationException("Table '{0}' already exist but isn't valid: {1}".FormatWith(tableName, errors.ToString()));
                    }
                };

                SqlStoreManipulator.CreateStoresForType(dataTypeDescriptor, existingTablesValidator);

                InterfaceConfigurationElement element = InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);
                _interfaceConfigurationElements.Add(element);

                configElements.Add(dataTypeDescriptor, element);
            }


            // Generating necessary classes and performing validation
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

            bool dataContextRecompilationNeeded = false;

            var toCompileList = new List<HelperClassesGenerationInfo>();
            var generatedClassesInfo = new Dictionary<DataTypeDescriptor, InterfaceGeneratedClassesInfo>();

            Type dataContextClass = _sqlDataTypeStoresContainer.DataContextClass;

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                var element = configElements[dataTypeDescriptor];

                // InitializeStoreResult initializeStoreResult = InitializeStore(element, allSqlDataTypeStoreDataScopes);

                HelperClassesGenerationInfo toCompile = null;

                var classesInfo = InitializeStoreTypes(element, allSqlDataTypeStoreDataScopes, dataContextClass, null, false, ref dataContextRecompilationNeeded, ref toCompile);

                if (classesInfo != null && toCompile != null)
                {
                    toCompileList.Add(toCompile);

                    generatedClassesInfo[dataTypeDescriptor] = classesInfo;
                }
            }

            // Compiling missing classes
            if (toCompileList.Any())
            {
                var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":CreateStores");

                foreach (var toCompile in toCompileList)
                {
                    toCompile.GenerateCodeAction(codeGenerationBuilder);
                }

                var generatedHelperClasses = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false).ToArray();

                foreach (var toCompile in toCompileList)
                {
                    toCompile.PopulateFieldsAction(generatedHelperClasses);
                }
            }

            // Emitting a new DataContext class
            if (dataContextRecompilationNeeded)
            {
                var newDataTypeIds = new HashSet<Guid>(dataTypeDescriptors.Select(d => d.DataTypeId));

                _createdSqlDataTypeStoreTables.RemoveAll(f => newDataTypeIds.Contains(f.DataTypeId));

                var fields = _createdSqlDataTypeStoreTables.Select(s => new Tuple<string, Type>(s.DataContextFieldName, s.DataContextFieldType)).ToList();
                
                foreach (var classesInfo in generatedClassesInfo.Values)
                {
                    fields.AddRange(classesInfo.Fields.Select(f => new Tuple<string, Type>(f.Value.FieldName, f.Value.FieldType)));
                }

                dataContextClass = DataContextAssembler.EmitDataContextClass(fields);

                UpdateCreatedSqlDataTypeStoreTables(dataContextClass);
            }

            _sqlDataTypeStoresContainer.DataContextClass = dataContextClass;

            // Registering the new type/tables
            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                InterfaceGeneratedClassesInfo classesInfo;

                if (!generatedClassesInfo.TryGetValue(dataTypeDescriptor, out classesInfo))
                {
                    throw new InvalidOperationException("No generated classes for data type '{0}' found".FormatWith(dataTypeDescriptor.Name));
                }
                InitializeStoreResult initInfo = EmbedDataContextInfo(classesInfo, dataContextClass);

                AddDataTypeStore(initInfo, false);
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


            var dataTypes = LoadDataTypes(_interfaceConfigurationElements);

            var compilationData = new List<HelperClassesGenerationInfo>();
            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                HelperClassesGenerationInfo toCompile = null;

                var generatedClassesInfo = InitializeStoreTypes(element, allSqlDataTypeStoreDataScopes,
                    dataContextClass, dataTypes, false, ref dataContextRecompilationNeeded, ref toCompile);

                if (generatedClassesInfo == null) continue;
                if (toCompile != null)
                {
                    compilationData.Add(toCompile);
                }

                initializedStores.Add(generatedClassesInfo);
            }

            if (compilationData.Any())
            {
                var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + " : compiling missing classes");

                foreach (var toCompile in compilationData)
                {
                    toCompile.GenerateCodeAction(codeGenerationBuilder);
                }

                // Precompiling DataWrapper classes as well to improve loading time
                foreach (var interfaceType in dataTypes.Values)
                {
                    if (DataWrapperTypeManager.TryGetWrapperType(interfaceType.FullName) == null)
                    {
                        DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, interfaceType);
                    }
                }

                var types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false).ToArray();

                foreach (var toCompile in compilationData)
                {
                    toCompile.PopulateFieldsAction(types);
                }
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

                AddDataTypeStore(store, true, true);
            }
        }

        /// <summary>
        /// Loads all the data types referenced in the provider's configuration file.
        /// </summary>
        private static Dictionary<Guid, Type> LoadDataTypes(IEnumerable<InterfaceConfigurationElement> configurationElements)
        {
            var dataTypeDescriptors = new List<DataTypeDescriptor>();

            foreach (InterfaceConfigurationElement element in configurationElements)
            {
                Guid dataTypeId = element.DataTypeId;

                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
                if (dataTypeDescriptor == null)
                {
                    throw NewConfigurationException(element, "Failed to get a DataTypeDescriptor by id '{0}'".FormatWith(dataTypeId));
                }

                dataTypeDescriptors.Add(dataTypeDescriptor);
            }

            return DataTypeTypesManager.GetDataTypes(dataTypeDescriptors);
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
            HelperClassesGenerationInfo toCompile = null;

            var result = InitializeStoreTypes(element, allSqlDataTypeStoreDataScopes, dataContextClass, null, forceCompile, ref dataContextRecompilationNeeded, ref toCompile);

            if (result != null && toCompile != null)
            {
                var codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + result.InterfaceType.FullName);

                toCompile.GenerateCodeAction(codeGenerationBuilder);

                var types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false).ToArray();

                toCompile.PopulateFieldsAction(types);
            }

            return result;
        }

        private InterfaceGeneratedClassesInfo InitializeStoreTypes(InterfaceConfigurationElement element, 
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, 
            Type dataContextClass,
            Dictionary<Guid, Type> dataTypes,
            bool forceCompile,
            ref bool dataContextRecompilationNeeded, 
            ref HelperClassesGenerationInfo helperClassesGenerationInfo)
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

            Guid dataTypeId = element.DataTypeId;

            var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
            if (dataTypeDescriptor == null)
            {
                throw NewConfigurationException(element, "Failed to get a DataTypeDescriptor by id '{0}'".FormatWith(dataTypeId));
            }

            result.DataTypeDescriptor = dataTypeDescriptor;

            Type interfaceType = null;

            try
            {
                if (dataTypes == null
                    || !dataTypes.TryGetValue(dataTypeId, out interfaceType)
                    || interfaceType == null)
                {
                    interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
                }

                if (interfaceType == null)
                {
                    Log.LogWarning(LogTitle, "The data interface type '{0}' does not exists and is not code generated. It will not be unusable", dataTypeDescriptor.TypeManagerTypeName);
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
                helperClassesGenerationInfo = EnsureNeededTypes(dataTypeDescriptor, 
                    dataScopes, allSqlDataTypeStoreDataScopes, dataContextClass, 
                    out fields, ref dataContextRecompilationNeeded, forceCompile);

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


        private void AddDataTypeStore(InitializeStoreResult initializeStoreResult, bool doValidate = true, bool isInitialization = false)
        {
            if (initializeStoreResult.InterfaceType == null)
            {
                return;
            }

            bool isValid = initializeStoreResult.SqlDataTypeStore != null;

            if (isValid && doValidate)
            {
                isValid = ValidateTables(initializeStoreResult, isInitialization);
            }

            if (!isValid)
            {
                _sqlDataTypeStoresContainer.AddKnownInterface(initializeStoreResult.InterfaceType);
                return;
            }

            _sqlDataTypeStoresContainer.AddSupportedDataTypeStore(initializeStoreResult.InterfaceType, initializeStoreResult.SqlDataTypeStore);
            DataProviderRegistry.AddNewDataType(initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName);
        }



        private bool ValidateTables(InitializeStoreResult initializeStoreResult, bool isInitialization)
        {
            var errors = new StringBuilder();

            bool isValid = true;

            var interfaceType = initializeStoreResult.InterfaceType;
            foreach (string tableName in initializeStoreResult.TableNames.Values)
            {
                bool isTableValid = ValidateTable(interfaceType, tableName, errors);
                if (!isTableValid) isValid = false;
            }

            if (!isValid)
            {
                DataTypeValidationRegistry.AddValidationError(initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName, errors.ToString());

                if (isInitialization
                    && GlobalSettingsFacade.EnableDataTypesAutoUpdate
                    && interfaceType.IsAutoUpdateble()
                    && !interfaceType.IsGenerated())
                {
                    Log.LogInformation(LogTitle, "Data schema for the data interface '{0}' on the SqlDataProvider '{1}' is not matching and will be updated.", 
                                        initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName);
                    Log.LogInformation(LogTitle, errors.ToString());
                }
                else
                {
                    Log.LogCritical(LogTitle, "The data interface '{0}' will not work for the SqlDataProvider '{1}'",
                                     initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName);
                    Log.LogCritical(LogTitle, errors.ToString());
                }
                
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


            var columns = new List<SqlColumnInformation>(sqlTableInformation.ColumnInformations);
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
//            if (typeof (ILocalizedControlled).IsAssignableFrom(interfaceType)
//                && !properties.Any(p => p.Name == "CultureName")
//                && columns.Any(c => c.ColumnName == "CultureName"))
//            {
//                Log.LogInformation(LogTitle, "Removing obsolete 'CultureName' column from table '{0}'", tableName);


//                string selectConstraintName = string.Format(
//                    @"SELECT df.name 'ConstraintName'
//                    FROM sys.default_constraints df
//                    INNER JOIN sys.tables t ON df.parent_object_id = t.object_id
//                    INNER JOIN sys.columns c ON df.parent_object_id = c.object_id AND df.parent_column_id = c.column_id
//                    where t.name = '{0}'
//                    and c.name = 'CultureName'", tableName);


//                var dt = ExecuteReader(selectConstraintName);
//                List<string> constraints = (from DataRow dr in dt.Rows select dr["ConstraintName"].ToString()).ToList();

//                foreach (var constrainName in constraints)
//                {
//                    ExecuteSql("ALTER TABLE [{0}] DROP CONSTRAINT [{1}]".FormatWith(tableName, constrainName));
//                }

//                string sql = "ALTER TABLE [{0}] DROP COLUMN [CultureName]".FormatWith(tableName);

//                ExecuteSql(sql);
//            }

            return true;
        }


        //private void ExecuteSql(string sql)
        //{
        //    var conn = SqlConnectionManager.GetConnection(_connectionString);

        //    Log.LogInformation(LogTitle, sql);

        //    using (var cmd = new SqlCommand(sql, conn))
        //    {
        //        cmd.ExecuteNonQuery();
        //    }
        //}

        //private DataTable ExecuteReader(string commandText)
        //{
        //    var conn = SqlConnectionManager.GetConnection(_connectionString);

        //    using (var cmd = new SqlCommand(commandText, conn))
        //    {
        //        using (var dt = new DataTable())
        //        {
        //            using (var rdr = cmd.ExecuteReader())
        //            {
        //                if (rdr != null) dt.Load(rdr);
        //                return dt;
        //            }
        //        }
        //    }
        //}

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
        private HelperClassesGenerationInfo EnsureNeededTypes(
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

                var storeDataScopesToCompile = new List<SqlDataTypeStoreDataScope>();
                var storeDataScopesAlreadyCompiled = new List<SqlDataTypeStoreDataScope>();

                fields = new Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo>();

                foreach (SqlDataTypeStoreDataScope storeDataScope in sqlDataTypeStoreDataScopes)
                {
                    string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                    FieldInfo dataContextFieldInfo = null;
                    if (dataContextClassType != null)
                    {
                        dataContextFieldInfo = dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance)
                                                                   .SingleOrDefault(f => f.Name == dataContextFieldName);
                    }


                    string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);

                    string entityClassName = NamesCreator.MakeEntityClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);

                    Type sqlDataProviderHelperClass = null, entityClass = null;

                    try
                    {
                        sqlDataProviderHelperClass = TryGetGeneratedType(sqlDataProviderHelperClassFullName);
                        entityClass = TryGetGeneratedType(entityClassName);

                        forceCompile = forceCompile
                            || CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { sqlDataProviderHelperClass, entityClass });
                    }
                    catch (TypeLoadException)
                    {
                        forceCompile = true;
                    }

                    if (!forceCompile)
                    {
                        var storeTypeInfo = new StoreTypeInfo(dataContextFieldName, entityClass, sqlDataProviderHelperClass)
                        {
                            DataContextField = dataContextFieldInfo
                        };

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

                    return CompileMissingClasses(dataTypeDescriptor, allSqlDataTypeStoreDataScopes, fields, 
                        storeDataScopesToCompile, storeDataScopesAlreadyCompiled);
                }
            }

            return null;
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
                var dataContext = (DataContext)Activator.CreateInstance(dataContextClassType, connection);
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


        private class HelperClassesGenerationInfo
        {
            public Action<CodeGenerationBuilder> GenerateCodeAction;
            public Action<Type[]> PopulateFieldsAction;
        }



        private HelperClassesGenerationInfo CompileMissingClasses(DataTypeDescriptor dataTypeDescriptor, Dictionary<DataTypeDescriptor, 
                                           IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes,
                                           Dictionary<SqlDataTypeStoreTableKey, StoreTypeInfo> fields,
                                           List<SqlDataTypeStoreDataScope> storeDataScopesToCompile, 
                                           List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled)
        {
            return new HelperClassesGenerationInfo
            {
                GenerateCodeAction = codeGenerationBuilder =>
                {
                    var sqlDataProviderCodeBuilder = new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
                    sqlDataProviderCodeBuilder.AddDataType(dataTypeDescriptor, storeDataScopesToCompile);

                    sqlDataProviderCodeBuilder.AddExistingDataType(dataTypeDescriptor, storeDataScopesAlreadyCompiled);
                },
                PopulateFieldsAction = types =>
                {
                    foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesToCompile)
                    {
                        string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                        string helperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(
                            dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                        Type helperClass = types.Single(f => f.FullName == helperClassFullName);

                        string entityClassFullName = NamesCreator.MakeEntityClassFullName(
                            dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                        Type entityClass = types.Single(f => f.FullName == entityClassFullName);

                        var storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);
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
            };
        }

        private Type TryGetGeneratedType(string typeName)
        {
            Type compiledType = CodeGenerationManager.GetCompiledType(typeName);
            if (compiledType != null) return compiledType;

            if (_compositeGeneratedAssembly != null)
            {
                Type result = _compositeGeneratedAssembly.GetType(typeName, false);
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
                Guid dataTypeId = element.DataTypeId;
                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId, true);
                if (dataTypeDescriptor == null)
                {
                    Log.LogWarning(LogTitle, "Failed to get data type descriptor by id '{0}'".FormatWith(dataTypeId));
                    continue;
                }

                var sqlDataTypeStoreDataScopes = new List<SqlDataTypeStoreDataScope>();

                foreach (StorageInformation storageInformation in element.Stores)
                {
                    var sqlDataTypeStoreDataScope = new SqlDataTypeStoreDataScope
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
