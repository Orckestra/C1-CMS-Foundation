using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Sql;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
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

                SqlStoreManipulator.CreateStoresForType(dataTypeDescriptor);

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
            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

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
            }
        }



        private void InitializeExistingStores()
        {
            _compositeGeneratedAssembly = _compositeGeneratedAssembly ?? AssemblyFacade.GetGeneratedAssemblyFromBin();
            _sqlDataTypeStoresContainer = new SqlDataTypeStoresContainer(_dataProviderContext.ProviderName, _connectionString, _sqlLoggingContext);

            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                InitializeStoreResult initializeStoreResult = InitializeStore(element, allSqlDataTypeStoreDataScopes);

                if (initializeStoreResult.InterfaceType == null) continue;

                AddDataTypeStore(initializeStoreResult);
            }
        }

        private static Exception NewConfigurationException(ConfigurationElement element, string message)
        {
            return new ConfigurationErrorsException(message, element.ElementInformation.Source, element.ElementInformation.LineNumber);
        }

        private InitializeStoreResult InitializeStore(InterfaceConfigurationElement element, Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, bool forceCompile = false)
        {
            InitializeStoreResult result = new InitializeStoreResult();

            List<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes = new List<SqlDataTypeStoreDataScope>();

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

            Type interfaceType = null;

            try
            {
                interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                if (interfaceType == null)
                {
                    Log.LogError("SqlDataProvider", string.Format("The data interface type '{0}' does not exists and is not code generated. It will not be unusable", dataTypeDescriptor.TypeManagerTypeName));
                    return result;
                }

                result.InterfaceType = interfaceType;

                string validationMessage;
                bool isValid = DataTypeValidationRegistry.Validate(interfaceType, dataTypeDescriptor, out validationMessage);
                if (!isValid)
                {
                    Log.LogCritical("SqlDataProvider", validationMessage);
                    throw new InvalidOperationException(validationMessage);
                }

                Type dataContextClassType; // This is the same for all stores!

                Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>> sqlDataStoreTableTypes;
                EnsureNeededTypes(dataTypeDescriptor, sqlDataTypeStoreDataScopes, allSqlDataTypeStoreDataScopes, out dataContextClassType, out sqlDataStoreTableTypes, forceCompile);

                _sqlDataTypeStoresContainer.DataContextType = dataContextClassType;


                Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable> sqlDataTypeStoreTables = new Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable>();
                foreach (SqlDataTypeStoreDataScope storeDataScope in sqlDataTypeStoreDataScopes)
                {
                    SqlDataTypeStoreTableKey key = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);

                    result.TableNames.Add(key, storeDataScope.TableName);

                    FieldInfo dataContextFieldInfo = sqlDataStoreTableTypes[key].Item1;
                    Type sqlDataProvdierHelperType = sqlDataStoreTableTypes[key].Item2;

                    ISqlDataProviderHelper sqlDataProviderHelper = (ISqlDataProviderHelper)Activator.CreateInstance(sqlDataProvdierHelperType);

                    SqlDataTypeStoreTable sqlDataTypeStoreTable = new SqlDataTypeStoreTable(dataContextFieldInfo, sqlDataProviderHelper);
                    _createdSqlDataTypeStoreTables.Add(sqlDataTypeStoreTable);

                    sqlDataTypeStoreTables.Add(key, sqlDataTypeStoreTable);
                }


                SqlDataTypeStore sqlDataTypeStore = new SqlDataTypeStore(interfaceType, sqlDataTypeStoreTables, dataTypeDescriptor.IsCodeGenerated, _sqlDataTypeStoresContainer);
                result.SqlDataTypeStore = sqlDataTypeStore;

                return result;
            }
            catch (Exception ex)
            {
                if (interfaceType != null)
                {
                    DataProviderRegistry.AddKnownDataType(interfaceType, _dataProviderContext.ProviderName);

                    Log.LogError(LogTitle, "Failed initialization for the datatype {0}", dataTypeDescriptor.TypeManagerTypeName);
                }
                Log.LogError(LogTitle, ex);

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



        private void AddDataTypeStore(InitializeStoreResult initializeStoreResult, bool doValidate = true)
        {
            if (initializeStoreResult.SqlDataTypeStore != null)
            {
                bool isValid = true;
                if (doValidate) isValid = ValidateTables(initializeStoreResult);

                if (isValid)
                {
                    _sqlDataTypeStoresContainer.AddSupportedDataTypeStore(initializeStoreResult.InterfaceType, initializeStoreResult.SqlDataTypeStore);
                    DataProviderRegistry.AddNewDataType(initializeStoreResult.InterfaceType, _dataProviderContext.ProviderName);
                }
                else
                {
                    _sqlDataTypeStoresContainer.AddKnownInterface(initializeStoreResult.InterfaceType);
                }
            }
            else if (initializeStoreResult.InterfaceType != null)
            {
                _sqlDataTypeStoresContainer.AddKnownInterface(initializeStoreResult.InterfaceType);
            }
        }



        private bool ValidateTables(InitializeStoreResult initializeStoreResult)
        {
            StringBuilder errors = new StringBuilder();

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
            ISqlTableInformation sqlTableInformation;

            try
            {
                sqlTableInformation = SqlTableInformationStore.GetTableInformation(_connectionString, tableName);
            }
            catch (SqlException sqlException)
            {
                Log.LogCritical(LogTitle, sqlException);
                throw;
            }
            catch (Exception ex)
            {
                errors.AppendLine(ex.ToString());
                return false;
            }

            if (sqlTableInformation == null)
            {
                errors.AppendLine("Table '{0}' does not exist".FormatWith(tableName));
                return false;
            }

            int primaryKeyCount =
                (from column in sqlTableInformation.ColumnInformations
                 where column.IsPrimaryKey 
                 select column).Count();

            if (primaryKeyCount == 0)
            {
                errors.AppendLine(string.Format("The table '{0}' is missing a primary key", tableName));
                return false;
            }


            List<SqlColumnInformation> columns = new List<SqlColumnInformation>(sqlTableInformation.ColumnInformations);
            foreach (PropertyInfo property in interfaceType.GetPropertiesRecursively())
            {
                if (property.Name == "DataSourceId") continue;

                SqlColumnInformation column = columns.Find(col => col.ColumnName == property.Name);
                if (null == column)
                {
                    errors.AppendLine(string.Format("The interface property named '{0}' does not exist in the table '{1}' as a column", property.Name, sqlTableInformation.TableName));
                    return false;
                }

                if ((column.IsNullable == false) || (column.Type == typeof(string)))
                {
                    if (column.Type != property.PropertyType)
                    {
                        errors.AppendLine(string.Format("Type mismatch. The interface type '{0}' does not match the database type '{1}'", property.PropertyType, column.Type));
                        return false;
                    }
                }
            }

            return true;
        }



        /// <summary>
        /// Checks that tables related to specified data type included in current DataContext class, if not - compiles a new version of DataContext that contains them
        /// </summary>
        private void EnsureNeededTypes(
            DataTypeDescriptor dataTypeDescriptor, 
            IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes, 
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, 
            out Type dataContextClassType, 
            out Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>> sqlDataStoreTableTypes, 
            bool forceCompile = false)
        {
            lock (_lock)
            {
                // Getting the interface (ensuring that it exists)
                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);


                string dataContextClassFullName = NamesCreator.MakeDataContextClassFullName(_dataProviderContext.ProviderName);
                dataContextClassType = TryGetGeneratedType(dataContextClassFullName);

                // Trying to instantiate a data context object
                if (dataContextClassType != null && !TryLoadDataContextClass(dataContextClassType))
                {
                    dataContextClassType = null;
                    forceCompile = true;
                }

                List<SqlDataTypeStoreDataScope> storeDataScopesToCompile = new List<SqlDataTypeStoreDataScope>();
                List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled = new List<SqlDataTypeStoreDataScope>();

                sqlDataStoreTableTypes = new Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>>();
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
                            Log.LogWarning(LogTitle, "Data context class is missing field '{0}'", dataContextFieldName);
                        }
                    }


                    string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                    Type sqlDataProviderHelperClassType = TryGetGeneratedType(sqlDataProviderHelperClassFullName);

                    sqlDataStoreTableTypes.Add(new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName), new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType));

                    bool isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { sqlDataProviderHelperClassType });
                    if (isRecompileNeeded || forceCompile || dataContextFieldInfo == null)
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
                    CompileMissingClasses(dataTypeDescriptor, allSqlDataTypeStoreDataScopes, sqlDataStoreTableTypes, 
                        storeDataScopesToCompile, storeDataScopesAlreadyCompiled, dataContextClassFullName, out dataContextClassType);
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
                                           Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>> sqlDataStoreTableTypes,
                                           List<SqlDataTypeStoreDataScope> storeDataScopesToCompile, 
                                           List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled,
                                           string dataContextClassFullName, 
                                           out Type dataContextClassType)
        {
            CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

            SqlDataProviderCodeBuilder sqlDataProviderCodeBuilder =
                new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
            sqlDataProviderCodeBuilder.AddDataType(dataTypeDescriptor, storeDataScopesToCompile);

            sqlDataProviderCodeBuilder.AddExistingDataType(dataTypeDescriptor, storeDataScopesAlreadyCompiled);

            foreach (var kvp in allSqlDataTypeStoreDataScopes.Where(f => f.Key != dataTypeDescriptor))
            {
                sqlDataProviderCodeBuilder.AddExistingDataType(kvp.Key, kvp.Value);
            }

            sqlDataProviderCodeBuilder.AddDataContext();

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder, false);

            dataContextClassType = types.Single(f => f.FullName == dataContextClassFullName);

            foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesToCompile)
            {
                string dataContextFieldNames = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);
                FieldInfo dataContextFieldInfo = dataContextClassType
                    .GetFields(BindingFlags.Public | BindingFlags.Instance)
                    .Single(f => f.Name == dataContextFieldNames);

                string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type sqlDataProviderHelperClassType = types.Single(f => f.FullName == sqlDataProviderHelperClassFullName);

                var storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName,storeDataScope.CultureName);
                sqlDataStoreTableTypes[storeTableKey] = new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType);
            }

            foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesAlreadyCompiled)
            {
                string dataContextFieldNames = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);
                FieldInfo dataContextFieldInfo =
                    dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance)
                                        .Single(f => f.Name == dataContextFieldNames);

                string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(
                    dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);

                Type sqlDataProviderHelperClassType = TryGetGeneratedType(sqlDataProviderHelperClassFullName);

                var storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);
                sqlDataStoreTableTypes[storeTableKey] = new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType);
            }

            UpdateCreatedSqlDataTypeStoreTables(dataContextClassType);
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
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = new Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>>();

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
