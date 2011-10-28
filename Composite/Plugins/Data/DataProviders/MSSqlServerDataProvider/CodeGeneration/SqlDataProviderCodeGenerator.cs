using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Composite.Core.Logging;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
// using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
#warning MRJ: BM: This should be obsoliete
    internal sealed class SqlDataProviderCodeGenerator
    {
        private const string _namespacePrefix = "Composite.Data.GeneratedTypes";

        readonly private string _connectionString;
        readonly private SqlLoggingContext _sqlLoggingContext;
        

        private IEnumerable<SqlDataProviderCodeGeneratorTable> _tables;

        private readonly string _providerName;
        readonly private string _name;
        readonly private string _namespaceName;
        readonly private string _dataContextName;



        public SqlDataProviderCodeGenerator(string name, string connectionString, IEnumerable<SqlDataProviderCodeGeneratorTable> tables, string providerName, SqlLoggingContext sqlLoggingContext = null)
        {
            Verify.ArgumentNotNullOrEmpty(name, "name");
            Verify.ArgumentNotNullOrEmpty(connectionString, "connectionString");
            Verify.ArgumentNotNull(tables, "tables");


            _connectionString = connectionString;
            _tables = tables;
            _sqlLoggingContext = sqlLoggingContext;


            foreach (SqlDataProviderCodeGeneratorTable table in _tables)
            {
                ValidateTable(table);

                if (table.Validated == true)
                {
                    InitializeTable(table);
                }

                if (table.Validated == false)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine(string.Format("The interface '{0}' did not validate with the following errors:", table.InterfaceType));

                    foreach (string error in table.Errors)
                    {
                        sb.AppendLine(error);
                    }

                    LoggingService.LogWarning("SqlDataProvider", sb.ToString());
                }

                //////////////////////////////////
                //#warning REMARK THIS SHIT
                //                else
                //                {
                //                    Console.WriteLine(string.Format("The interface '{0}' did not validate with the following errors:", table.InterfaceType));
                //                    foreach (string error in table.Errors)
                //                    {
                //                        Console.WriteLine(error);
                //                    }
                //                    Console.WriteLine();
                //                }
                //////////////////////////////////
            }

            _providerName = providerName;

            _name = name;
            _namespaceName = string.Format("{0}.{1}", _namespacePrefix, _name);
            _dataContextName = string.Format("{0}DataContext", _name);

            //////////////////////////////////
            //#warning REMARK THIS SHIT
            //            id = "ID";
            //            _namespaceName = "Composite.DeveloperTools.BootStrapper";
            //            _dataContextName = "DataContext";
            //////////////////////////////////
        }



        public SqlDataTypeStoresContainer Generate()
        {
           /* IEnumerable<SqlDataProviderCodeGeneratorTable> validTables = ValidTables.Evaluate();
            
            if (_sqlLoggingContext.Enabled == true)
            {
                _sqlLoggingContext.TablesToIgnore = new List<string>();

                foreach (SqlDataProviderCodeGeneratorTable table in validTables)
                {
                    if (_sqlLoggingContext.TypesToIgnore.Contains(table.InterfaceType) == false) continue;

                    _sqlLoggingContext.TablesToIgnore.AddRange(table.Stores.Select(f => f.Value.TableName));
                }
                _sqlLoggingContext.TablesToIgnore = _sqlLoggingContext.TablesToIgnore.Distinct().ToList();
            }


            SqlDataTypeStoresContainer result = new SqlDataTypeStoresContainer(_name, _connectionString, _sqlLoggingContext);


            if (validTables.Count() == 0)
            {
                result.ConfiguredInterfaceTypes = new List<Type>();
                return result;
            }


            BuildManagerCompileUnit compileUnit;
            Type dataContextType = GenerateDataContextClass(validTables, out compileUnit);

            var tableResults = new List<KeyValuePair<SqlDataProviderCodeGeneratorTable, SqlDataTypeStore>>();
            foreach (SqlDataProviderCodeGeneratorTable table in validTables)
            {
                SqlDataTypeStore tableResult = ExtractInterfaceResult(table, compileUnit);

                tableResults.Add(new KeyValuePair<SqlDataProviderCodeGeneratorTable, SqlDataTypeStore>(table, tableResult));
            }

            result.ConnectionString = _connectionString;
            result.DataContextType = dataContextType;

            foreach (var tableResultPair in tableResults)
            {
                foreach (var kvp in tableResultPair.Value.StoreTables)
                {
                    string storageKey = kvp.Key;

                    FieldInfo fieldInfo = result.DataContextType.GetField(tableResultPair.Key.Stores[storageKey].DataContextFieldName);
                    Verify.IsNotNull(fieldInfo, "Field information has not been set");
                    kvp.Value.DataContextQueryableFieldInfo = fieldInfo;
                }

                tableResultPair.Value.SqlDataProviderCodeGeneratorResult = result;

                result.AddTableResult(tableResultPair.Key.InterfaceType, tableResultPair.Value);
            }

            foreach (SqlDataProviderCodeGeneratorTable table in InvalidTables)
            {
                result.AddTableError(table.InterfaceType, table.Errors);
            }

            List<Type> configuredInterfaceTypes = new List<Type>();
            foreach (SqlDataProviderCodeGeneratorTable table in validTables)
            {
                configuredInterfaceTypes.Add(table.InterfaceType);
            }

            result.ConfiguredInterfaceTypes = configuredInterfaceTypes;

            return result;*/
            throw  new NotImplementedException();
        }



        private void AddTableCode(BuildManagerCompileUnit buildManagerCompileUnit, SqlDataProviderCodeGeneratorTable table)
        {
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateEntityClasses(table));
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateDataIdClasses(table));
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateSqlDataProviderHelperMethodsClasses(table));

            buildManagerCompileUnit.AddAssemblyReference(table.InterfaceType.Assembly);
        }



        private string GetTableFingerPrint(SqlDataProviderCodeGeneratorTable table)
        {
            var idAndFingerprintCreator = new IdAndFingerprintCreator(_connectionString, _name, table);

            return idAndFingerprintCreator.CreateTableFingerprint();
        }



        private static void AddDefaultAssemblyReferences(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Exception).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Data.DbType).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Linq.IQueryable).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Data.Linq.Mapping.TableAttribute).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.ComponentModel.IContainer).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Core.Linq.ExpressionCreator).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Core.Types.ExtendedNullable<>).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.DataSourceId).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.ProcessControlled.IProcessControlled).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.SqlDataProvider).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.Plugins.DataProvider.CodeGeneration.PropertyInitializer.RandomGuidPropertyInitializer).Assembly);
        }



        private SqlDataTypeStore ExtractInterfaceResult(SqlDataProviderCodeGeneratorTable table, BuildManagerCompileUnit buildManagerCompileUnit)
        {
            throw new NotImplementedException();
            /*
            var tableResult = new SqlDataTypeStore(table.InterfaceType);

            tableResult.StoreTables = new Dictionary<string, SqlDataTypeStore.SqlDataTypeStoreTable>();

            foreach (var kvp in table.Stores)
            {
                var store = kvp.Value;
                var storeInformation = new SqlDataTypeStore.SqlDataTypeStoreTable();

                Type sqlDataProviderHelperMethodsClassType = buildManagerCompileUnit.GetGeneretedTypeByName(store.SqlDataProviderHelperMethodsClassName);
                if (sqlDataProviderHelperMethodsClassType == null) return null;
                storeInformation.SqlDataProviderHelperMethods = (ISqlDataProviderHelperMethods)Activator.CreateInstance(sqlDataProviderHelperMethodsClassType);

                Type dataIdType = buildManagerCompileUnit.GetGeneretedTypeByName(store.DataIdClassName);
                if (dataIdType == null) return null;
                storeInformation.DataIdType = dataIdType;

                tableResult.StoreTables.Add(kvp.Key, storeInformation);
            }

            return tableResult;*/
        }



        private string GetUnitFingerprint(IEnumerable<SqlDataProviderCodeGeneratorTable> tables)
        {
            StringBuilder sb = new StringBuilder();
            foreach (SqlDataProviderCodeGeneratorTable table in tables)
            {
                sb.Append(GetTableFingerPrint(table));
                sb.Append("···");
            }

            byte[] hash = MD5.Create().ComputeHash(Encoding.Unicode.GetBytes(sb.ToString()));
            return new Guid(hash).ToString();
        }



        private Type GenerateDataContextClass(IEnumerable<SqlDataProviderCodeGeneratorTable> tables, out BuildManagerCompileUnit buildManagerCompileUnit)
        {
            string compileUnitId = string.Format("{0}.{1}", _namespaceName, _dataContextName);
            string fingerprint = GetUnitFingerprint(tables);

            buildManagerCompileUnit = new BuildManagerCompileUnit(compileUnitId, fingerprint);

            AddDefaultAssemblyReferences(buildManagerCompileUnit);

            foreach (var table in tables)
            {
                AddTableCode(buildManagerCompileUnit, table);
                buildManagerCompileUnit.RegisterUsedType(table.InterfaceType);
            }

            buildManagerCompileUnit.AddType(_namespaceName, new KeyValuePair<string, Func<CodeTypeDeclaration>>(_dataContextName, () => CreateDataContextClass()));

            buildManagerCompileUnit.AllowCrossReferences = true;

            BuildManager.GetCompiledTypes(buildManagerCompileUnit);

            return buildManagerCompileUnit.GetGeneretedTypeByName(_dataContextName);
        }



        private void ValidateTable(SqlDataProviderCodeGeneratorTable table)
        {
#warning MRJ: BM: Reintroduce this validation
           /* table.Validated = false;

            if (table.InterfaceType == null) { table.Errors.Add(string.Format("Interface type is null")); return; }
            if (table.InterfaceType.GetProperties().Length == 0) { table.Errors.Add(string.Format("The interface type '{0}' does not contain any properties", table.InterfaceType)); return; }
            if (table.InterfaceType.IsVisible == false) { table.Errors.Add(string.Format("The interface type '{0}' is notvisible to other assemblies", table.InterfaceType)); return; }


            try
            {
                DataInterfaceValidator.Validate(table.InterfaceType);

                table.PropertyList = new PropertyList(table.InterfaceType, table.DataIdProperties, table.PropertyNameMapping);
            }
            catch (Exception ex)
            {
                table.Errors.Add(ex.ToString());
                return;
            }


            foreach (string dataScope in table.DataScopes)
            {
                foreach (string cultureName in table.CultureNames)
                {
                    string storeKey = SqlDataProvider.GetStorageName(dataScope, cultureName);
                    string tableName = table.Stores[storeKey].TableName;

                    if (string.IsNullOrEmpty(tableName) == true)
                    {
                        table.Errors.Add("Table name is null or empty");
                        return;
                    }

                    ISqlTableInformation sqlTableInformation;

                    try
                    {
                        sqlTableInformation = SqlTableInformationStore.GetTableInformation(_connectionString, tableName);
                    }
                    catch (SqlException sqlException)
                    {
                        LoggingService.LogCritical("SqlDataProvider", sqlException);
                        throw;
                    }
                    catch (Exception ex)
                    {
                        table.Errors.Add(ex.ToString());
                        return;
                    }

                    if(sqlTableInformation == null)
                    {
                        table.Errors.Add("Table '{0}' does not exist".FormatWith(tableName));
                        return;
                    }

                    table.Stores[storeKey].SqlTableInformation = sqlTableInformation;

                    int primaryKeyCount =
                        (from column in sqlTableInformation.ColumnInformations
                         where column.IsPrimaryKey == true
                         select column).Count();

                    if (primaryKeyCount == 0)
                    {
                        table.Errors.Add(string.Format("The table '{0}' is missing a primary key", tableName));
                        return;
                    }

                    try
                    {
                        List<string> exceptionList = new List<string>();
                        if (sqlTableInformation.HasIdentityColumn == true)
                        {
                            Property property =
                                table.PropertyList.DataIdProperties.Where(
                                    p => p.MappedName == sqlTableInformation.IdentityColumnName).First();

                            exceptionList.Add(property.Name);
                        }

                        PropertyInitializerDictionaryArgumentValidator.Validate(table.PropertyInitializers);
                        PropertyInitializerDictionaryArgumentValidator.ValidateVsPropertyList(
                            table.PropertyInitializers, table.PropertyList, exceptionList);
                    }
                    catch (Exception ex)
                    {
                        table.Errors.Add(ex.ToString());
                        return;
                    }
                }
            }


            if (ValidateTableColumns(table) == false)
            {
                return;
            }


            table.Validated = true;*/
        }



        private bool ValidateTableColumns(SqlDataProviderCodeGeneratorTable table)
        {
            foreach (ISqlTableInformation sqlTableInformation in table.Stores.Values.Select(si => si.SqlTableInformation))
            {
                List<SqlColumnInformation> columns = new List<SqlColumnInformation>(sqlTableInformation.ColumnInformations);
                foreach (Property property in table.PropertyList.Properties)
                {
                    if ((property.IsDataId == true) || (property.IsInterface == true))
                    {
                        SqlColumnInformation column = columns.Find(col => col.ColumnName == property.MappedName);
                        if (null == column) { table.Errors.Add(string.Format("The mapped name '{0}' for the interface property named '{1}' does not exist in the table '{2}'", property.MappedName, property.Name, sqlTableInformation.TableName)); return false; }

                        if ((column.IsNullable == false) || (column.Type == typeof(string)))
                        {
                            if (column.Type != property.Type) { table.Errors.Add(string.Format("Type mismatch. The interface type '{0}' does not match the database type '{1}'", property.Type, column.Type)); return false; }
                        }
                    }
                    else
                    {
                        throw new NotImplementedException();
                    }
                }
            }

            return true;
        }



        private void InitializeTable(SqlDataProviderCodeGeneratorTable table)
        {
            foreach (SqlDataProviderCodeGeneratorTable.StoreInformation storeInformaion in table.Stores.Values)
            {
                string tableName = storeInformaion.TableName;

                string prefix = table.InterfaceType.Name + tableName;

                string fullInterfaceName = table.InterfaceType.FullName.Replace(".", "_");

                storeInformaion.EntityClassName = prefix + "Entity";

                storeInformaion.DataIdClassName = fullInterfaceName + "DataId";
                storeInformaion.EntityBaseClassName = fullInterfaceName + "EntityBase";
                storeInformaion.WrapperClassName = fullInterfaceName + "Wrapper";

                storeInformaion.TransformQueryableMappingsClassName = prefix + "TransformQueryableMappings";
                storeInformaion.SqlDataProviderHelperMethodsClassName = prefix + "SqlDataProviderHelperMethods";
                storeInformaion.DataContextFieldName = tableName;
            }
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateEntityClasses(SqlDataProviderCodeGeneratorTable table)
        {
            EntityClassGenerator entityClassGenerator = new EntityClassGenerator(table, _providerName);

            return entityClassGenerator.CreateClasses();
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateDataIdClasses(SqlDataProviderCodeGeneratorTable table)
        {
            DataIdClassGenerator dataIdClassGenerator = new DataIdClassGenerator(table);

            return dataIdClassGenerator.CreateClasses();
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateSqlDataProviderHelperMethodsClasses(SqlDataProviderCodeGeneratorTable table)
        {
            SqlDataProviderHelperMethodsGenerator sqlDataProviderHelperMethodsGenerator = new SqlDataProviderHelperMethodsGenerator(table, _dataContextName);

            return sqlDataProviderHelperMethodsGenerator.CreateClasses();
        }



        private CodeTypeDeclaration CreateDataContextClass()
        {
            DataContextClassGenerator dataContextClassGenerator =
                new DataContextClassGenerator(
                    _dataContextName,
                    _tables);

            return dataContextClassGenerator.CreateClass();
        }



        private IEnumerable<SqlDataProviderCodeGeneratorTable> ValidTables
        {
            get
            {
                foreach (SqlDataProviderCodeGeneratorTable table in _tables)
                {
                    if (table.Validated == true)
                    {
                        yield return table;
                    }
                }
            }
        }



        private IEnumerable<SqlDataProviderCodeGeneratorTable> InvalidTables
        {
            get
            {
                foreach (SqlDataProviderCodeGeneratorTable table in _tables)
                {
                    if (table.Validated == false)
                    {
                        yield return table;
                    }
                }
            }
        }



        private sealed class IdAndFingerprintCreator
        {
            private string _connectionString;
            private string _name;
            private SqlDataProviderCodeGeneratorTable _table;
            private DataTypeDescriptor _dataTypeDescriptor;


            public IdAndFingerprintCreator(string connectionString, string name, SqlDataProviderCodeGeneratorTable table)
            {
                _connectionString = connectionString;
                _name = name;
                _table = table;
                _dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(table.InterfaceType);
            }



            public string CreateTableFingerprint()
            {
                var sb = new StringBuilder();

                sb.Append(_connectionString.GetHashCode());
                sb.Append('·');

                sb.Append(_dataTypeDescriptor.DataTypeId);
                sb.Append('·');

                sb.Append(_dataTypeDescriptor.Version);
                sb.Append('·');

                foreach (string cultureName in _table.CultureNames)
                {
                    sb.Append(cultureName).Append('·');
                }

                foreach (var kvp in _table.Stores)
                {
                    sb.Append(kvp.Key);
                    sb.Append('·');

                    sb.Append(kvp.Value.TableName);
                    sb.Append('·');
                }

                return sb.ToString();
            }
        }
    }
}
