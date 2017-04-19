using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Instrumentation;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.Common;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    [ConfigurationElementType(typeof(SqlDataProviderData))]
    internal partial class SqlDataProvider : IGeneratedTypesDataProvider, ILocalizedDataProvider
    {
        private readonly string _connectionString;
        private readonly List<InterfaceConfigurationElement> _interfaceConfigurationElements;
        private SqlDataTypeStoresContainer _sqlDataTypeStoresContainer;
        private readonly SqlLoggingContext _sqlLoggingContext;
        private DataProviderContext _dataProviderContext;
        private SqlDataProviderStoreManipulator _sqlDataProviderStoreManipulator;

        private readonly object _lock = new object();

        


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

                CodeGenerationManager.AddAssemblyCodeProvider(new SqlDataProviderCodeProvider(_dataProviderContext.ProviderName));

                InitializeExistingStores();
            }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return _sqlDataTypeStoresContainer.SupportedInterfaces;
        }



        public IEnumerable<Type> GetKnownInterfaces()
        {
            return _sqlDataTypeStoresContainer.KnownInterfaces;
        }



        public IEnumerable<Type> GetGeneratedInterfaces()
        {
            return _sqlDataTypeStoresContainer.GeneratedInterfaces;            
        }



        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler(typeof(T).ToString()))
            {
                string errorMessage;
                if (!DataTypeValidationRegistry.IsValidForProvider(typeof(T), _dataProviderContext.ProviderName, out errorMessage))
                {
                    throw new InvalidOperationException(errorMessage);
                }

                SqlDataTypeStore result = _sqlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

                return (IQueryable<T>)result.GetQueryable();
            }
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataId, "dataId");

            using (TimerProfilerFacade.CreateTimerProfiler(string.Format("dataId ({0})", typeof(T))))
            {
                string errorMessage;
                if (!DataTypeValidationRegistry.IsValidForProvider(typeof(T), _dataProviderContext.ProviderName, out errorMessage))
                {
                    throw new InvalidOperationException(errorMessage);
                }

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

                string errorMessage;
                if (!DataTypeValidationRegistry.IsValidForProvider(interfaceType, _dataProviderContext.ProviderName, out errorMessage))
                {
                    throw new InvalidOperationException(errorMessage);
                }

                _sqlDataTypeStoresContainer.Update(datas);
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> dataset)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                string errorMessage;
                if (!DataTypeValidationRegistry.IsValidForProvider(typeof(T), _dataProviderContext.ProviderName, out errorMessage))
                {
                    throw new InvalidOperationException(errorMessage);
                }

                using (var scope = new RequireTransactionScope())
                {
                    var result = _sqlDataTypeStoresContainer.AddNew<T>(dataset, _dataProviderContext);

                    scope.Complete();

                    return result;
                }
            }
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            Verify.ArgumentNotNull(dataSourceIds, "dataSourceIds");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                

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

                string errorMessage;
                if (!DataTypeValidationRegistry.IsValidForProvider(interfaceType, _dataProviderContext.ProviderName, out errorMessage))
                {
                    throw new InvalidOperationException(errorMessage);
                }

                _sqlDataTypeStoresContainer.Delete(dataSourceIds, _dataProviderContext);
            }
        }        
       


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

                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Single(f => f.DataTypeId == typeDesrciptor.DataTypeId);

                InterfaceConfigurationElement newElement = InterfaceConfigurationManipulator.RefreshLocalizationInfo(_dataProviderContext.ProviderName, typeDesrciptor);
                
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

                InterfaceConfigurationElement oldElement = _interfaceConfigurationElements.Where(f => f.DataTypeId == typeDesrciptor.DataTypeId).Single();

                InterfaceConfigurationElement newElement = InterfaceConfigurationManipulator.RefreshLocalizationInfo(_dataProviderContext.ProviderName, typeDesrciptor);
                                
                _interfaceConfigurationElements.Remove(oldElement);
                _interfaceConfigurationElements.Add(newElement);
            }
        }



        internal void BuildAllCode(CodeGenerationBuilder codeGenerationBuilder)
        {
            var codeBuilder = new SqlDataProviderCodeBuilder(_dataProviderContext.ProviderName, codeGenerationBuilder);

            foreach (InterfaceConfigurationElement element in _interfaceConfigurationElements)
            {
                if (element.DataTypeId == Guid.Empty) continue;

                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(element.DataTypeId);

                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError(LogTitle, string.Format("The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor));
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

                codeBuilder.AddDataType(dataTypeDescriptor, sqlDataTypeStoreDataScopes);
            }

            codeBuilder.AddDataContext();
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
    }





    internal sealed class SqlDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        private static readonly string LogTitle = typeof (SqlDataProviderAssembler).Name;

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var sqlDataProviderData = (SqlDataProviderData)objectConfiguration;

            string  configFilePath = InterfaceConfigurationManipulator.GetConfigurationFilePath(sqlDataProviderData.Name);
            var configuration = new C1Configuration(configFilePath);

            var section = configuration.GetSection(SqlDataProviderConfigurationSection.SectionName) as SqlDataProviderConfigurationSection;
            if (section == null)
            {
                section = new SqlDataProviderConfigurationSection();
                configuration.Sections.Add(SqlDataProviderConfigurationSection.SectionName, section);
                configuration.Save();
            }


            var interfaceConfigurationElements = new List<InterfaceConfigurationElement>();
            foreach (InterfaceConfigurationElement table in section.Interfaces)
            {
                interfaceConfigurationElements.Add(table);
            }

            var sqlLoggingContext = new SqlLoggingContext
            {
                Enabled = sqlDataProviderData.SqlQueryLoggingEnabled,
                IncludeStack = sqlDataProviderData.SqlQueryLoggingIncludeStack,
                TypesToIgnore = new List<Type>(),
                TablesToIgnore = new List<string>()
            };

            if (sqlDataProviderData.SqlQueryLoggingEnabled)
            {
                foreach (LoggingIgnoreInterfacesConfigurationElement element in sqlDataProviderData.LoggingIgnoreInterfaces)
                {
                    Type interfaceType = TypeManager.TryGetType(element.InterfaceType);
                    if (interfaceType != null)
                    {
                        sqlLoggingContext.TypesToIgnore.Add(interfaceType);

                        InterfaceConfigurationElement interfaceElement = interfaceConfigurationElements.SingleOrDefault(f => f.DataTypeId == interfaceType.GetImmutableTypeId());
                        if (interfaceElement == null) continue;

                        foreach (StoreConfigurationElement store in interfaceElement.ConfigurationStores)
                        {
                            sqlLoggingContext.TablesToIgnore.Add(store.TableName);
                        }
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
                Verify.IsNotNull(connStringConfigNode, "Failed to find an SQL connection string by name '{0}'", connectionStringName);

                connectionString = connStringConfigNode.ConnectionString;
            }

            return new SqlDataProvider(connectionString, interfaceConfigurationElements, sqlLoggingContext);
        }
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
                var dic = new Dictionary<string, Type>();

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
                var dic = new Dictionary<string, string>();

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
                var dic = new Dictionary<string, Type>();

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
        [System.Configuration.ConfigurationProperty(_dataTypeIdName, IsRequired = true)]
        public Guid DataTypeId
        {
            get { return (Guid)base[_dataTypeIdName]; }
            set { base[_dataTypeIdName] = value; }
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
            Verify.IsNotNull(dataTypeId, "Configuration element is missing attribute 'dataTypeId'");

            return dataTypeId;
        }

        internal bool ContainsInterfaceType(InterfaceConfigurationElement interfaceConfigurationElement)
        {
            return ContainsInterfaceType(interfaceConfigurationElement.DataTypeId);
        }

        internal bool ContainsInterfaceType(DataTypeDescriptor dataTypeDescriptor)
        {
            return ContainsInterfaceType(dataTypeDescriptor.DataTypeId);
        }

        internal InterfaceConfigurationElement Get(DataTypeDescriptor dataTypeDescriptor)
        {
            foreach (InterfaceConfigurationElement element in this)
            {
                object key = GetElementKey(element);

                if ((Guid)key == dataTypeDescriptor.DataTypeId)
                {
                    return element;
                }
            }

            return null;
        }

        internal bool ContainsInterfaceType(Guid dataTypeId)
        {
            object[] allKeys = BaseGetAllKeys();

            return allKeys.Contains(dataTypeId);
        }

        internal void Remove(DataTypeDescriptor dataTypeDescriptor)
        {
            Remove(dataTypeDescriptor.DataTypeId);
        }

        internal void Remove(Guid dataTypeId)
        {
            this.BaseRemove(dataTypeId);
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
