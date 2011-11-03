using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Instrumentation;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;
using Composite.Core;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    internal partial class SqlDataProvider
    {
        public void CreateStore(DataTypeDescriptor dataTypeDescriptor)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                if (InterfaceConfigurationManipulator.ConfigurationExists(_dataProviderContext.ProviderName, dataTypeDescriptor) == true)
                {
                    throw new InvalidOperationException(string.Format("SqlDataProvider configuration already contains a interface named '{0}'. Remove it from the configuration and restart the application.", dataTypeDescriptor.TypeManagerTypeName));
                }

                SqlStoreManipulator.CreateStoresForType(dataTypeDescriptor);

                InterfaceConfigurationElement element = InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, dataTypeDescriptor);
                _interfaceConfigurationElements.Add(element);

                Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

                InitializeStore(element, allSqlDataTypeStoreDataScopes);
            }
        }



        public void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            DataTypeChangeDescriptor dataTypeChangeDescriptor = updateDataTypeDescriptor.CreateDataTypeChangeDescriptor();

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                SqlStoreManipulator.AlterStoresForType(updateDataTypeDescriptor);

                bool localizationChanged = dataTypeChangeDescriptor.AlteredType.Localizeable !=
                                           dataTypeChangeDescriptor.OriginalType.Localizeable;

                InterfaceConfigurationElement newElement = InterfaceConfigurationManipulator.Change(_dataProviderContext.ProviderName, dataTypeChangeDescriptor, localizationChanged);
                if (newElement != null)
                {
                    InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Where(f => f.DataTypeId == newElement.DataTypeId).Single();
                    _interfaceConfigurationElements.Remove(oldElement);
                    _interfaceConfigurationElements.Add(newElement);
                }
            }
        }



        public void DropStore(DataTypeDescriptor dataTypeDescriptor)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                SqlStoreManipulator.DropStoresForType(_dataProviderContext.ProviderName, dataTypeDescriptor);

                InterfaceConfigurationManipulator.Remove(_dataProviderContext.ProviderName, dataTypeDescriptor);
                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Where(f => f.DataTypeId == dataTypeDescriptor.DataTypeId).Single();
                _interfaceConfigurationElements.Remove(oldElement);
            }
        }



        private void InitializeExistingStores()
        {
            _sqlDataTypeStoresContainer = new SqlDataTypeStoresContainer(_dataProviderContext.ProviderName, _connectionString, _sqlLoggingContext);

            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = BuildAllExistingDataTypeStoreDataScopes();

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                InitializeStore(element, allSqlDataTypeStoreDataScopes);
            }
        }



        private void InitializeStore(InterfaceConfigurationElement element, Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes)
        {
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

            DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value, true);

            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            if (interfaceType == null)
            {
                Log.LogError("SqlDataProvider", string.Format("The data interface type '{0}' does not exists and is not code generated. It will not be usable", dataTypeDescriptor.TypeManagerTypeName));
                return;
            }

            Type dataContextClassType; // This is the same for all stores!

            Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>> sqlDataStoreTableTypes;
            EnsureNeededTypes(dataTypeDescriptor, sqlDataTypeStoreDataScopes, allSqlDataTypeStoreDataScopes, out dataContextClassType, out sqlDataStoreTableTypes);

            _sqlDataTypeStoresContainer.DataContextType = dataContextClassType;

            Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable> sqlDataTypeStoreTables = new Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable>();
            foreach (SqlDataTypeStoreDataScope storeDataScope in sqlDataTypeStoreDataScopes)
            {
                SqlDataTypeStoreTableKey key = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);

                FieldInfo dataContextFieldInfo = sqlDataStoreTableTypes[key].Item1;
                Type sqlDataProvdierHelperType = sqlDataStoreTableTypes[key].Item2;

                ISqlDataProviderHelper sqlDataProviderHelper = (ISqlDataProviderHelper)Activator.CreateInstance(sqlDataProvdierHelperType);

                SqlDataTypeStoreTable sqlDataTypeStoreTable = new SqlDataTypeStoreTable(dataContextFieldInfo, sqlDataProviderHelper);
                _createdSqlDataTypeStoreTables.Add(sqlDataTypeStoreTable);

                sqlDataTypeStoreTables.Add(key, sqlDataTypeStoreTable);
            }

            SqlDataTypeStore sqlDataTypeStore = new SqlDataTypeStore(interfaceType, sqlDataTypeStoreTables, dataTypeDescriptor.IsCodeGenerated, _sqlDataTypeStoresContainer);

            AddDataTypeStore(interfaceType, sqlDataTypeStore);
        }



        private void AddDataTypeStore(Type interfaceType, SqlDataTypeStore sqlDataTypeStore)
        {
            if (sqlDataTypeStore != null)
            {
                _sqlDataTypeStoresContainer.AddSupportedDataTypeStore(interfaceType, sqlDataTypeStore);
                DataProviderRegistry.AddNewDataType(interfaceType, _dataProviderContext.ProviderName);
            }
            else
            {
                _sqlDataTypeStoresContainer.AddKnownInterface(interfaceType);
            }
        }

#warning MRJ: BM: Flush on flush??
        private List<SqlDataTypeStoreTable> _createdSqlDataTypeStoreTables = new List<SqlDataTypeStoreTable>();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <param name="sqlDataTypeStoreDataScopes"></param>
        /// <param name="sqlDataStoreTableTypes">(DataContextFieldInfo, SqlDataProviderHelperType)</param>
        private void EnsureNeededTypes(DataTypeDescriptor dataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes, Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes, out Type dataContextClassType, out Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>> sqlDataStoreTableTypes)
        {
            // Getting the interface (ensuring that it exists)
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);


            string dataContextClassFullName = NamesCreator.MakeDataContextClassFullName(_dataProviderContext.ProviderName);
            dataContextClassType = TypeManager.TryGetType(dataContextClassFullName);

            List<SqlDataTypeStoreDataScope> storeDataScopesToCompile = new List<SqlDataTypeStoreDataScope>();
            List<SqlDataTypeStoreDataScope> storeDataScopesAlreadyCompiled = new List<SqlDataTypeStoreDataScope>();

            sqlDataStoreTableTypes = new Dictionary<SqlDataTypeStoreTableKey, Tuple<FieldInfo, Type>>();
            foreach (SqlDataTypeStoreDataScope storeDataScope in sqlDataTypeStoreDataScopes)
            {
#warning MRJ: BM: Is this entityClass needed?
                //string entityClassFullName = NamesCreator.MakeEntityClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                //typeFullNames.Add(TypeManager.TryGetType(entityClassFullName));

                string dataContextFieldName = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);

                FieldInfo dataContextFieldInfo = null;
                if (dataContextClassType != null)
                {
                    dataContextFieldInfo = dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance).Where(f => f.Name == dataContextFieldName).SingleOrDefault();
                }

                string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                Type sqlDataProviderHelperClassType = TypeManager.TryGetType(sqlDataProviderHelperClassFullName);

                sqlDataStoreTableTypes.Add(new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName), new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType));

#warning MRJ: BM: Is this split really needed?
                bool isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { sqlDataProviderHelperClassType });
                if (isRecompileNeeded) storeDataScopesToCompile.Add(storeDataScope);
                else storeDataScopesAlreadyCompiled.Add(storeDataScope); 
            }






           // bool isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, neededTypes);

            if (storeDataScopesToCompile.Count > 0)
            {
#warning MRJ: BM: Move this code?? Same as with CreateStore,... Runtime create the types needed
                CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder(_dataProviderContext.ProviderName + ":" + dataTypeDescriptor.Name);

                SqlDataProviderCodeBuilder sqlDataProviderCodeBuilder = new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);
                sqlDataProviderCodeBuilder.AddDataType(dataTypeDescriptor, storeDataScopesToCompile);

                sqlDataProviderCodeBuilder.AddExistingDataType(dataTypeDescriptor, storeDataScopesAlreadyCompiled);

                // Addning existing types);
                foreach (var kvp in allSqlDataTypeStoreDataScopes.Where(f => f.Key != dataTypeDescriptor))
                {
#warning MRJ: BM: This might go wrong if the type is in the config, but not compiled!! Check that the types exist before adding them
                    sqlDataProviderCodeBuilder.AddExistingDataType(kvp.Key, kvp.Value);
                }

                sqlDataProviderCodeBuilder.AddDataContext();

                /*//// Property serializer for entity tokens and more
                //Dictionary<string, Type> serializerProperties = dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)).ToDictionary(f => f.Name, f => f.InstanceType);
                //PropertySerializerTypeCodeGenerator.AddPropertySerializerTypeCode(codeGenerationBuilder, dataIdClassFullName, serializerProperties);

                //// Data wrapper for caching
                //DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);*/

                IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                dataContextClassType = types.Where(f => f.FullName == dataContextClassFullName).Single();

#warning MRJ: BM: Refac these to loops
                foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesToCompile)
                {
                    string dataContextFieldNames = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);
                    FieldInfo dataContextFieldInfo = dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance).Where(f => f.Name == dataContextFieldNames).Single();

                    string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                    Type sqlDataProviderHelperClassType = types.Where(f => f.FullName == sqlDataProviderHelperClassFullName).Single();

                    SqlDataTypeStoreTableKey storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);
                    sqlDataStoreTableTypes[storeTableKey] = new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType);
                }

                foreach (SqlDataTypeStoreDataScope storeDataScope in storeDataScopesAlreadyCompiled)
                {
                    string dataContextFieldNames = NamesCreator.MakeDataContextFieldName(storeDataScope.TableName);
                    FieldInfo dataContextFieldInfo = dataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance).Where(f => f.Name == dataContextFieldNames).Single();

                    string sqlDataProviderHelperClassFullName = NamesCreator.MakeSqlDataProviderHelperClassFullName(dataTypeDescriptor, storeDataScope.DataScopeName, storeDataScope.CultureName, _dataProviderContext.ProviderName);
                    Type sqlDataProviderHelperClassType = TypeManager.TryGetType(sqlDataProviderHelperClassFullName);

                    SqlDataTypeStoreTableKey storeTableKey = new SqlDataTypeStoreTableKey(storeDataScope.DataScopeName, storeDataScope.CultureName);
                    sqlDataStoreTableTypes[storeTableKey] = new Tuple<FieldInfo, Type>(dataContextFieldInfo, sqlDataProviderHelperClassType);
                }

                UpdateCreatedSqlDataTypeStoreTables(dataContextClassType);
            }
        }


        /// <summary>
        /// This method updates the DataContectFieldInfo on all existing store tables.
        /// This is needed due to the fact that all data stores share the same
        /// DataContext class and the DataContext class is code generated everytime
        /// a new store is code generated.
        /// </summary>
        /// <param name="newDataContextClassType"></param>
        private void UpdateCreatedSqlDataTypeStoreTables(Type newDataContextClassType)
        {
            foreach (SqlDataTypeStoreTable dataTypeStoreTable in _createdSqlDataTypeStoreTables)
            {
                string fieldName = dataTypeStoreTable.DataContextQueryableFieldInfo.Name;

                FieldInfo newFieldInfo = newDataContextClassType.GetFields(BindingFlags.Public | BindingFlags.Instance).Where(f => f.Name == fieldName).SingleOrDefault();

                if (newFieldInfo == null)
                {

                }
                else
                {
                    dataTypeStoreTable.DataContextQueryableFieldInfo = newFieldInfo;
                }
            }
        }



        private Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> BuildAllExistingDataTypeStoreDataScopes()
        {
            Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>> allSqlDataTypeStoreDataScopes = new Dictionary<DataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope>>();

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value, true);

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

                allSqlDataTypeStoreDataScopes.Add(dataTypeDescriptor, sqlDataTypeStoreDataScopes);
            }

            return allSqlDataTypeStoreDataScopes;
        }
    }
}
