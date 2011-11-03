using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;
using Composite.Plugins.Data.DataProviders.Common;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using System.IO;
using Composite.Data.Foundation.PluginFacades;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
#warning MRJ: BM: Move this class
    internal class SqlDataProviderCodeProvider : ICodeProvider
    {
        public string ProviderName { get; private set; }

        public SqlDataProviderCodeProvider(string providerName)
        {
            ProviderName = providerName;
        }


        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            SqlDataProvider xmlDataProvider = (SqlDataProvider)DataProviderPluginFacade.GetDataProvider(ProviderName);

            xmlDataProvider.BuildAllCode(builder);
        }
    }



    [ConfigurationElementType(typeof(SqlDataProviderData))]
    internal partial class SqlDataProvider : IGeneratedTypesDataProvider, ILocalizedDataProvider
    {
#warning MRJ: BM: This is used by SqlDataProviderCodeGenerator that is current hardcoded. Find fix
#warning MRJ: BM: There is also redundant code herem, See EnsureStore or something
        public void BuildAllCode(CodeGenerationBuilder codeGenerationBuilder)
        {
            SqlDataProviderCodeBuilder codeBuilder = new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                if(element.DataTypeId == null || element.DataTypeId == Guid.Empty) continue;

                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId.Value);

                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("SqlDataProvider", "The non code generated interface type '{0}' was not found, skipping code generation for that type");
                    continue;
                }

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

                codeBuilder.AddDataType(dataTypeDescriptor, sqlDataTypeStoreDataScopes);
            }

            codeBuilder.AddDataContext();
        }

        private readonly string _connectionString;
        private readonly List<InterfaceConfigurationElement> _interfaceConfigurationElements;
        private SqlDataTypeStoresContainer _sqlDataTypeStoresContainer;
        private readonly SqlLoggingContext _sqlLoggingContext;


#warning MRJ: BM: Remove this
        /* private readonly List<InterfaceConfigurationElement> _dataTypesTableElements;
        private readonly List<InterfaceConfigurationElement> _generatedTypesTableElements;
        private bool _generatedTypesHasBeenGenerated;
        private SqlDataTypeStoresContainer _dataTypesGeneratorResult;*/



        private DataProviderContext _dataProviderContext;
        private SqlDataProviderStoreManipulator _sqlDataProviderStoreManipulator;

        private readonly object _lock = new object();

        private class RequireTransactionScope : IDisposable
        {
            private TransactionScope _scope;

            public RequireTransactionScope()
            {
                if (Transaction.Current == null)
                {
                    _scope = new TransactionScope();
                }
            }

            public void Complete()
            {
                if (_scope != null)
                {
                    _scope.Complete();
                }
            }

            public void Dispose()
            {
                if (_scope != null)
                {
                    _scope.Dispose();
                }
            }
        }


        public SqlDataProvider(string connectionString, IEnumerable<InterfaceConfigurationElement> interfaceConfigurationElement, SqlLoggingContext sqlLoggingContext = null)
        {
            _connectionString = connectionString;
            _interfaceConfigurationElements = interfaceConfigurationElement.ToList();
            _sqlLoggingContext = sqlLoggingContext;
        }



        public DataProviderContext Context
        {
            set
            {
                _dataProviderContext = value;

#warning MRJ: Fix this line!
                CodeGenerationManager.AddAssemblyCodeProvider(new SqlDataProviderCodeProvider(_dataProviderContext.ProviderName));

                InitializeExistingStores();
            }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return _sqlDataTypeStoresContainer.SupportedInterface;
        }



        public IEnumerable<Type> GetKnownInterfaces()
        {
            return _sqlDataTypeStoresContainer.KnownInterfaces;
        }



        public IEnumerable<Type> GetGeneratedInterfaces()
        {
#warning MRJ: BM: Clean this

            return _sqlDataTypeStoresContainer.GeneratedInterfaces;

            /* using (TimerProfilerFacade.CreateTimerProfiler())
             {
                 if (_generatedTypesHasBeenGenerated == false)
                 {
                     lock (_lock)
                     {
                         if (_generatedTypesHasBeenGenerated == false)
                         {
                             _dataTypesGeneratorResult = GenerateResult(_dataTypesTableElements.Concat(_generatedTypesTableElements), false);
                             _generatedTypesHasBeenGenerated = true;
                         }
                     }
                 }

                 List<Type> result = new List<Type>();

                 HashSet<Type> configuratedIntefaceTypes = new HashSet<Type>(_dataTypesGeneratorResult.ConfiguredInterfaceTypes);

                 foreach (var interfaceConfigurationElement in _generatedTypesTableElements)
                 {
                     Type type = TypeManager.TryGetType(interfaceConfigurationElement.DataTypeId);

                     if (configuratedIntefaceTypes.Contains(type))
                     {
                         result.Add(type);
                     }
                 }

                 return result;
             }*/
        }



        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler(typeof(T).ToString()))
            {
                SqlDataTypeStore result = _sqlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

                return (IQueryable<T>)result.GetQueryable();
            }
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler(string.Format("dataId ({0})", typeof(T))))
            {
                if (dataId == null) throw new ArgumentNullException("dataId");

                SqlDataTypeStore result = _sqlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

                IData data = result.GetDataByDataId(dataId, _dataProviderContext);

                return (T)data;
            }
        }



        public void Update(IEnumerable<IData> datas)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                if (datas == null) throw new ArgumentNullException("datas");

                Type interfaceType = null;
                foreach (IData data in datas)
                {
                    if (data == null) throw new ArgumentException("datas enumeration may not contain nulls");
                    if (data.DataSourceId == null) throw new ArgumentException("data in datas enumeration may not contain null DataSourceIds");

                    if (interfaceType == null)
                    {
                        interfaceType = data.DataSourceId.InterfaceType;
                    }
                    else if (interfaceType != data.DataSourceId.InterfaceType)
                    {
                        throw new ArgumentException(string.Format("Only one data interface per enumerable type supported"));
                    }
                }                

                _sqlDataTypeStoresContainer.Update(datas);
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> datas)
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                if (datas == null) throw new ArgumentNullException("datas");

                RequireTransactionScope scope = null;
                try
                {
                    // To be removed
                    if (typeof(T).FullName != "Composite.Data.Types.ILogEntry")
                    {
                        scope = new RequireTransactionScope();
                    }

                    var result = _sqlDataTypeStoresContainer.AddNew<T>(datas, _dataProviderContext);

                    if (scope != null)
                    {
                        scope.Complete();
                    }

                    return result;
                }
                finally
                {
                    if (scope != null)
                    {
                        scope.Dispose();
                    }
                }
            }
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (dataSourceIds == null) throw new ArgumentNullException("dataSourceIds");

                Type interfaceType = null;
                foreach (DataSourceId dataSourceId in dataSourceIds)
                {
                    if (dataSourceId == null) throw new ArgumentException("datas enumeration may not contain nulls");

                    if (interfaceType == null)
                    {
                        interfaceType = dataSourceId.InterfaceType;
                    }
                    else if (interfaceType != dataSourceId.InterfaceType)
                    {
                        throw new ArgumentException(string.Format("Only one data interface per enumerable type supported"));
                    }
                }

                _sqlDataTypeStoresContainer.Delete(dataSourceIds, _dataProviderContext);
            }
        }



        



        private SqlDataProviderStoreManipulator SqlStoreManipulator
        {
            get
            {
                if (_sqlDataProviderStoreManipulator == null)
                {
                    lock (_lock)
                    {
                        if (_sqlDataProviderStoreManipulator == null)
                        {
                            _sqlDataProviderStoreManipulator = new SqlDataProviderStoreManipulator(_connectionString, _interfaceConfigurationElements);
                        }
                    }
                }

                return _sqlDataProviderStoreManipulator;
            }
        }



       /* private SqlDataTypeStore GetTableResult(Type interfaceType)
        {
            return 
        }*/


#warning MRJ: BM: Remove this
        /*  private SqlDataTypeStoresContainer GetGeneratorResult(Type interfaceType)
        {
            if (_dataTypesGeneratorResult.ConfiguredInterfaceTypes.Contains(interfaceType) == true)
            {
                return _dataTypesGeneratorResult;
            }
            throw new InvalidOperationException(string.Format("The data interface '{0}' is not supported by this provider '{1}'", interfaceType, _dataProviderContext.ProviderName));
        }



        private SqlDataTypeStore GetTableResult(Type interfaceType)
        {
            SqlDataTypeStoresContainer generatorResult = GetGeneratorResult(interfaceType);

            return GetTableResult(interfaceType, generatorResult);
        }*/


#warning MRJ: BM: Remove this
        /* private SqlDataTypeStore GetTableResult(Type interfaceType, SqlDataTypeStoresContainer sqlDataProviderCodeGeneratorResult)
        {
            SqlDataTypeStore result = sqlDataProviderCodeGeneratorResult.TryGetTableResult(interfaceType);

            if (result == null)
            {
                List<string> errors = sqlDataProviderCodeGeneratorResult.GetErrors(interfaceType);

                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Format("The interface type '{0}' was not configured correctly with the following errors:", interfaceType));
                foreach (string error in errors)
                {
                    sb.AppendLine(error);
                }

                throw new InvalidOperationException(sb.ToString());
            }

            return result;
        }*/

        /* private SqlDataTypeStoresContainer GenerateResult(IEnumerable<InterfaceConfigurationElement> tableElementsToGenerated, bool onlyBasicTypes)
         {
             using (TimerProfilerFacade.CreateTimerProfiler())
             {
                 var tables = new List<SqlDataProviderCodeGeneratorTable>();

                 foreach (InterfaceConfigurationElement table in tableElementsToGenerated)
                 {
                     string interfaceTypeName = table.DataTypeId;
                     Type interfaceType = TypeManager.TryGetType(interfaceTypeName);

                     if (interfaceType == null)
                     {
                         LoggingService.LogWarning("SqlDataProvider", "Cannot load type '{0}', related data storage will not be loaded.".FormatWith(interfaceTypeName));
                         continue;
                     }

                     var codeTable = new SqlDataProviderCodeGeneratorTable
                         {
                             InterfaceType = interfaceType,
                             DataIdProperties = table.DataIdProperties,
                             PropertyNameMapping = table.PropertyNameMappings,
                             PropertyInitializers = table.PropertyInitializers
                         };

                     codeTable.DataScopes = new List<string>();
                     codeTable.CultureNames = new List<string>();
                     codeTable.Stores = new Dictionary<string, SqlDataProviderCodeGeneratorTable.StoreInformation>();

                     foreach (StorageInformation storageInfo in table.Stores)
                     {
                         if (!codeTable.DataScopes.Contains(storageInfo.DataScope))
                         {
                             codeTable.DataScopes.Add(storageInfo.DataScope);
                         }

                         if (!codeTable.CultureNames.Contains(storageInfo.CultureName))
                         {
                             codeTable.CultureNames.Add(storageInfo.CultureName);
                         }

                         string storageName = GetStorageName(storageInfo.DataScope, storageInfo.CultureName);
                         codeTable.Stores.Add(storageName, new SqlDataProviderCodeGeneratorTable.StoreInformation
                                                               {
                                                                   TableName = storageInfo.TableName,
                                                                   DataScope = storageInfo.DataScope,
                                                                   CultureName = storageInfo.CultureName
                                                               });
                     }

                     if (codeTable.InterfaceType == null)
                     {
                         codeTable.Errors.Add(string.Format("The type '{0}' could not be found", table.DataTypeId));
                     }

                     tables.Add(codeTable);
                 }

                 string dataProviderName = _dataProviderContext.ProviderName;

                 if (onlyBasicTypes)
                 {
                     dataProviderName += "__basic";
                 }

                 SqlDataProviderCodeGenerator generator = new SqlDataProviderCodeGenerator(dataProviderName, _connectionString, tables, _dataProviderContext.ProviderName, _sqlLoggingContext);

                 SqlDataTypeStoresContainer result = generator.Generate();

                 return result;
             }
         }*/

#warning MRJ: DM: Delete this method
        /*   internal static string GetStorageName1(string dataScope, string cultureName)
        {
            string result = dataScope;
            if (!cultureName.IsNullOrEmpty())
            {
                result += "_" + cultureName.Replace('-', '_').Replace(' ', '_');
            }
            return result;
        }*/


        public void AddLocale(CultureInfo cultureInfo)
        {
            var supportedInterfaces = GetSupportedInterfaces();
            foreach (var type in supportedInterfaces)
            {
                if (!DataLocalizationFacade.IsLocalized(type))
                {
                    continue;
                }

                var typeDesrciptor = DynamicTypeManager.GetDataTypeDescriptor(type);
                SqlStoreManipulator.AddLocale(typeDesrciptor, cultureInfo);

                InterfaceConfigurationElement newElement = InterfaceConfigurationManipulator.RefreshLocalizationInfo(_dataProviderContext.ProviderName, typeDesrciptor);

                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Where(f => f.DataTypeId == newElement.DataTypeId).Single();
                _interfaceConfigurationElements.Remove(oldElement);
                _interfaceConfigurationElements.Add(newElement);
            }
        }

        public void RemoveLocale(CultureInfo cultureInfo)
        {
            var supportedInterfaces = GetSupportedInterfaces();
            foreach (var type in supportedInterfaces)
            {
                if (!DataLocalizationFacade.IsLocalized(type))
                {
                    continue;
                }

                var typeDesrciptor = DynamicTypeManager.GetDataTypeDescriptor(type);
                SqlStoreManipulator.RemoveLocale(_dataProviderContext.ProviderName, typeDesrciptor, cultureInfo);

                InterfaceConfigurationElement newElement = InterfaceConfigurationManipulator.RefreshLocalizationInfo(_dataProviderContext.ProviderName, typeDesrciptor);
                
                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Where(f => f.DataTypeId == newElement.DataTypeId).Single();
                _interfaceConfigurationElements.Remove(oldElement);
                _interfaceConfigurationElements.Add(newElement);
            }
        }
    }





    internal sealed class SqlDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        private static readonly string LogTitle = typeof (SqlDataProviderAssembler).Name;

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            SqlDataProviderData sqlDataProviderData = (SqlDataProviderData)objectConfiguration;

            string configFilePath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), string.Format("{0}.config", sqlDataProviderData.Name));
            C1Configuration configuration = new C1Configuration(configFilePath);

            SqlDataProviderConfigurationSection section = configuration.GetSection(SqlDataProviderConfigurationSection.SectionName) as SqlDataProviderConfigurationSection;
            if (section == null)
            {
                section = new SqlDataProviderConfigurationSection();
                configuration.Sections.Add(SqlDataProviderConfigurationSection.SectionName, section);
                configuration.Save();
            }


            List<InterfaceConfigurationElement> interfaceConfigurationElements = new List<InterfaceConfigurationElement>();
            foreach (InterfaceConfigurationElement table in section.Interfaces)
            {
                interfaceConfigurationElements.Add(table);
            }

            ReplaceTypeNamesWithTypeIDs(interfaceConfigurationElements);


            SqlLoggingContext sqlLoggingContext = new SqlLoggingContext();
            sqlLoggingContext.Enabled = sqlDataProviderData.SqlQueryLoggingEnabled;
            sqlLoggingContext.IncludeStack = sqlDataProviderData.SqlQueryLoggingIncludeStack;
            sqlLoggingContext.TypesToIgnore = new List<Type>();
            if (sqlDataProviderData.SqlQueryLoggingEnabled == true)
            {
                foreach (LoggingIgnoreInterfacesConfigurationElement element in sqlDataProviderData.LoggingIgnoreInterfaces)
                {
                    Type interfaceType = TypeManager.TryGetType(element.InterfaceType);
                    if (interfaceType != null)
                    {
                        sqlLoggingContext.TypesToIgnore.Add(interfaceType);
                    }
                }
            }


            string connectionString = sqlDataProviderData.ConnectionString;

            if (string.IsNullOrEmpty(connectionString))
            {
                string connectionStringName = sqlDataProviderData.ConnectionStringName;

                if (string.IsNullOrEmpty(connectionStringName))
                {
                    throw new ConfigurationErrorsException("SqlDataProvider requires one of the following properties to be specified: 'connectionString', 'connectionStringName'");
                }

                var connStringConfigNode = System.Web.Configuration.WebConfigurationManager.ConnectionStrings[connectionStringName];
                connectionString = connStringConfigNode.ConnectionString;
            }

            return new SqlDataProvider(connectionString, interfaceConfigurationElements, sqlLoggingContext);

#warning MRJ: BM: Clean this up

            /*List<InterfaceConfigurationElement> typesTableElements = new List<InterfaceConfigurationElement>();
            List<InterfaceConfigurationElement> generatedTypesTableElements = new List<InterfaceConfigurationElement>();
            foreach (InterfaceConfigurationElement table in section.Interfaces)
            {
                if (table.IsGeneratedType == false)
                {
                    typesTableElements.Add(table);
                }
                else
                {
                    generatedTypesTableElements.Add(table);
                }
            }*/

            /*
            SqlLoggingContext sqlLoggingContext = new SqlLoggingContext();
            sqlLoggingContext.Enabled = sqlDataProviderData.SqlQueryLoggingEnabled;
            sqlLoggingContext.IncludeStack = sqlDataProviderData.SqlQueryLoggingIncludeStack;
            sqlLoggingContext.TypesToIgnore = new List<Type>();
            if (sqlDataProviderData.SqlQueryLoggingEnabled == true)
            {
                foreach (LoggingIgnoreInterfacesConfigurationElement element in sqlDataProviderData.LoggingIgnoreInterfaces)
                {
                    Type interfaceType = TypeManager.TryGetType(element.InterfaceType);
                    if (interfaceType != null)
                    {
                        sqlLoggingContext.TypesToIgnore.Add(interfaceType);
                    }
                }
            }


            return new SqlDataProvider(sqlDataProviderData.ConnectionString, typesTableElements, generatedTypesTableElements, sqlLoggingContext);*/
        }

        #region Build manager upgrade C1 2.0 -> 3.0

        private static void ReplaceTypeNamesWithTypeIDs(IEnumerable<InterfaceConfigurationElement> configurationElements)
        {
#pragma warning disable 612,618

            Dictionary<string, Guid> typeNameToTypeIdMap = null;

            foreach (var interfaceConfigurationElement in configurationElements)
            {
                string interfaceTypeName = interfaceConfigurationElement.InterfaceType;

                if (interfaceTypeName.IsNullOrEmpty())
                {
                    continue;
                }

                typeNameToTypeIdMap = typeNameToTypeIdMap ?? DataMetaDataFacade.GetTypeManagerTypeNameToTypeIdMap();

                if (!typeNameToTypeIdMap.ContainsKey(interfaceTypeName))
                {
                    Log.LogWarning(LogTitle, "Failed to find DataTypeId for interface '{0}'".FormatWith(interfaceTypeName));
                    continue;
                }

                interfaceConfigurationElement.DataTypeId = typeNameToTypeIdMap[interfaceTypeName];
                interfaceConfigurationElement.InterfaceType = null;
            }

#pragma warning restore 612,618
        }



        #endregion Build manager upgrade C1 2.0 -> 3.0
    }


    internal sealed class SqlLoggingContext
    {
        public bool Enabled { get; set; }
        public bool IncludeStack { get; set; }
        public List<Type> TypesToIgnore { get; set; }
        public List<string> TablesToIgnore { get; set; }
    }




    [Assembler(typeof(SqlDataProviderAssembler))]
    internal sealed class SqlDataProviderData : DataProviderData
    {
        private const string _connectionStringPropertyName = "connectionString";
        [System.Configuration.ConfigurationProperty(_connectionStringPropertyName, IsRequired = false)]
        public string ConnectionString
        {
            get { return (string)base[_connectionStringPropertyName]; }
            set { base[_connectionStringPropertyName] = value; }
        }


        private const string _connectionStringNamePropertyName = "connectionStringName";
        [System.Configuration.ConfigurationProperty(_connectionStringNamePropertyName, IsRequired = false)]
        public string ConnectionStringName
        {
            get { return (string)base[_connectionStringNamePropertyName]; }
            set { base[_connectionStringNamePropertyName] = value; }
        }


        private const string _sqlQueryLoggingEnabledPropertyName = "sqlQueryLoggingEnabled";
        [System.Configuration.ConfigurationProperty(_sqlQueryLoggingEnabledPropertyName, IsRequired = false, DefaultValue = false)]
        public bool SqlQueryLoggingEnabled
        {
            get { return (bool)base[_sqlQueryLoggingEnabledPropertyName]; }
            set { base[_sqlQueryLoggingEnabledPropertyName] = value; }
        }


        private const string _sqlQueryLoggingIncludeStackPropertyName = "sqlQueryLoggingIncludeStack";
        [System.Configuration.ConfigurationProperty(_sqlQueryLoggingIncludeStackPropertyName, IsRequired = false, DefaultValue = false)]
        public bool SqlQueryLoggingIncludeStack
        {
            get { return (bool)base[_sqlQueryLoggingIncludeStackPropertyName]; }
            set { base[_sqlQueryLoggingIncludeStackPropertyName] = value; }
        }


        private const string _logginIgnoreInterfacesNamePropertyName = "LoggingIgnoreInterfaces";
        [System.Configuration.ConfigurationProperty(_logginIgnoreInterfacesNamePropertyName, IsRequired = false)]
        public LoggingIgnoreInterfacesConfigurationElementCollection LoggingIgnoreInterfaces
        {
            get { return (LoggingIgnoreInterfacesConfigurationElementCollection)base[_logginIgnoreInterfacesNamePropertyName]; }
            set { base[_logginIgnoreInterfacesNamePropertyName] = value; }
        }
    }




    internal sealed class LoggingIgnoreInterfacesConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new LoggingIgnoreInterfacesConfigurationElement();
        }



        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            return ((LoggingIgnoreInterfacesConfigurationElement)element).InterfaceType;
        }
    }




    internal sealed class LoggingIgnoreInterfacesConfigurationElement : System.Configuration.ConfigurationElement
    {
        private const string _interfaceTypePropertyName = "interfaceType";
        [System.Configuration.ConfigurationProperty(_interfaceTypePropertyName, IsRequired = true)]
        public string InterfaceType
        {
            get { return (string)base[_interfaceTypePropertyName]; }
            set { base[_interfaceTypePropertyName] = value; }
        }
    }







    internal sealed class SqlDataProviderConfigurationSection : System.Configuration.ConfigurationSection
    {
        public const string SectionName = "Composite.Data.Plugins.SqlDataProviderConfiguration";

        private const string _InterfacesNamePropertyName = "Interfaces";
        [System.Configuration.ConfigurationProperty(_InterfacesNamePropertyName, IsRequired = false)]
        public InterfaceConfigurationElementCollection Interfaces
        {
            get { return (InterfaceConfigurationElementCollection)base[_InterfacesNamePropertyName]; }
            set { base[_InterfacesNamePropertyName] = value; }
        }
    }


    internal sealed class StorageInformation
    {
        public StorageInformation(string dataScope, string cultureName, string tableName)
        {
            DataScope = dataScope;
            CultureName = cultureName;
            TableName = tableName;
        }

        public string DataScope { get; private set; }
        public string CultureName { get; private set; }
        public string TableName { get; private set; }
    }

    internal sealed class InterfaceConfigurationElement : System.Configuration.ConfigurationElement
    {
        public IEnumerable<StorageInformation> Stores
        {
            get
            {
                var stores = new List<StorageInformation>();

                foreach (StoreConfigurationElement element in ConfigurationStores)
                {
                    stores.Add(new StorageInformation(element.DataScope, element.CultureName, element.TableName));
                }

                return stores;
            }
        }

        public Dictionary<string, Type> DataIdProperties
        {
            get
            {
                Dictionary<string, Type> dic = new Dictionary<string, Type>();

                foreach (SimpleNameTypeConfigurationElement element in ConfigurationDataIdProperties)
                {
                    dic.Add(element.Name, element.Type);
                }

                return dic;
            }
        }



        public Dictionary<string, string> PropertyNameMappings
        {
            get
            {
                Dictionary<string, string> dic = new Dictionary<string, string>();

                foreach (PropertyNameMappingConfigurationElement element in ConfigurationPropertyNameMappings)
                {
                    dic.Add(element.PropertyName, element.SourcePropertyName);
                }

                return dic;
            }
        }



        public Dictionary<string, Type> PropertyInitializers
        {
            get
            {
                Dictionary<string, Type> dic = new Dictionary<string, Type>();

                if (ConfigurationPropertyInitializers != null)
                {
                    foreach (SimpleNameTypeConfigurationElement element in ConfigurationPropertyInitializers)
                    {
                        dic.Add(element.Name, element.Type);
                    }
                }

                return dic;
            }
        }


        private const string _storesPropertyName = "Stores";
        [System.Configuration.ConfigurationProperty(_storesPropertyName, IsRequired = false)]
        public StoreConfigurationElementCollection ConfigurationStores
        {
            get
            {
                var baseValue = (StoreConfigurationElementCollection)base[_storesPropertyName];
                return baseValue ?? new StoreConfigurationElementCollection();
            }
            set { base[_storesPropertyName] = value; }
        }


        private const string _dataTypeIdName = "dataTypeId";
        [System.Configuration.ConfigurationProperty(_dataTypeIdName, IsRequired = false)]
        public Guid? DataTypeId
        {
            get { return (Guid?)base[_dataTypeIdName]; }
            set { base[_dataTypeIdName] = value; }
        }


        private const string _interfaceTypePropertyName = "interfaceType";
        [System.Configuration.ConfigurationProperty(_interfaceTypePropertyName, IsRequired = false)]
        [Obsolete("Attribute 'dataTypeId' should be used instead, used for upgrade procedure")]
        public string InterfaceType
        {
            get { return (string)base[_interfaceTypePropertyName]; }
            set { base[_interfaceTypePropertyName] = value; }
        }


        private const string _isGeneratedTypePropertyName = "isGeneratedType";
        [System.Configuration.ConfigurationProperty(_isGeneratedTypePropertyName, IsRequired = true)]
        public bool IsGeneratedType
        {
            get { return (bool)base[_isGeneratedTypePropertyName]; }
            set { base[_isGeneratedTypePropertyName] = value; }
        }


        private const string _dataIdPropertiesPropertyName = "DataIdProperties";
        [System.Configuration.ConfigurationProperty(_dataIdPropertiesPropertyName, IsRequired = true)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationDataIdProperties
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_dataIdPropertiesPropertyName]; }
            set { base[_dataIdPropertiesPropertyName] = value; }
        }


        private const string _propertyNameMappingsPropertyName = "PropertyNameMappings";
        [System.Configuration.ConfigurationProperty(_propertyNameMappingsPropertyName, IsRequired = false)]
        public PropertyNameMappingConfigurationElementCollection ConfigurationPropertyNameMappings
        {
            get { return (PropertyNameMappingConfigurationElementCollection)base[_propertyNameMappingsPropertyName]; }
            set { base[_propertyNameMappingsPropertyName] = value; }
        }


        private const string _propertyInitializersPropertyName = "PropertyInitializers";
        [System.Configuration.ConfigurationProperty(_propertyInitializersPropertyName, IsRequired = false)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationPropertyInitializers
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_propertyInitializersPropertyName]; }
            set { base[_propertyInitializersPropertyName] = value; }
        }
    }


    internal sealed class InterfaceConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        public void Add(InterfaceConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new InterfaceConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            Guid? dataTypeId = ((InterfaceConfigurationElement) element).DataTypeId;
            if(dataTypeId != null)
            {
                return dataTypeId.ToString();
            }


#pragma warning disable 612,618
            string interfaceTypeName = ((InterfaceConfigurationElement) element).InterfaceType;
#pragma warning restore 612,618

            Verify.IsNotNull(interfaceTypeName, "Configuration element is missing attribute 'dataTypeId'");

            return interfaceTypeName;
        }

        internal bool ContainsInterfaceType(Guid dataTypeId)
        {
            object[] allKeys = BaseGetAllKeys();
            return allKeys.Contains(GetKey(dataTypeId));
        }

        private static object GetKey(Guid dataTypeId)
        {
            return dataTypeId.ToString();
        }

        internal void Remove(Guid dataTypeId)
        {
            BaseRemove(GetKey(dataTypeId));
        }
    }



    internal sealed class StoreConfigurationElement : System.Configuration.ConfigurationElement
    {
        private const string _tableNamePropertyName = "tableName";
        [System.Configuration.ConfigurationProperty(_tableNamePropertyName, IsKey = true, IsRequired = true)]
        public string TableName
        {
            get { return (string)base[_tableNamePropertyName]; }
            set { base[_tableNamePropertyName] = value; }
        }


        private const string _dataScopePropertyName = "dataScope";
        [System.Configuration.ConfigurationProperty(_dataScopePropertyName, IsRequired = true)]
        public string DataScope
        {
            get { return (string)base[_dataScopePropertyName]; }
            set { base[_dataScopePropertyName] = value; }
        }

        private const string _culturePropertyName = "cultureName";
        [System.Configuration.ConfigurationProperty(_culturePropertyName, DefaultValue = "")]
        public string CultureName
        {
            get { return (string)base[_culturePropertyName]; }
            set { base[_culturePropertyName] = value; }
        }
    }


    internal sealed class StoreConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        public void Add(StoreConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new StoreConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            return ((StoreConfigurationElement)element).TableName;
        }
    }
}
