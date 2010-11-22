using System;
using System.Collections.Generic;
//using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Transactions;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.Common;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{    
    [ConfigurationElementType(typeof(XmlDataProviderData))]
    internal class XmlDataProvider : IWritableDataProvider, IDynamicDataProvider, IGeneratedTypesDataProvider, ILocalizedDataProvider, ISupportCachingDataProvider
    {
        private string _storeDirectory;

        private List<XmlProviderInterfaceConfigurationElement> _dataTypeConfigurationElements;
        private List<XmlProviderInterfaceConfigurationElement> _generatedDataTypeConfigurationElements;

        private bool _generatedTypesHasBeenGenerated = false;

        private XmlDataProviderCodeGeneratorResult _dataTypesGeneratorResult;

        private DataProviderContext _dataProviderContext;

        private readonly object _lock = new object();


        public XmlDataProvider(string storeDirectory, List<XmlProviderInterfaceConfigurationElement> dataTypeConfigurationElements, List<XmlProviderInterfaceConfigurationElement> generatedDataTypeConfigurationElements)
        {
            if (storeDirectory == null) throw new ArgumentNullException("storeDirectory");
            if (dataTypeConfigurationElements == null) throw new ArgumentNullException("dataTypeConfigurationElements");
            if (generatedDataTypeConfigurationElements == null) throw new ArgumentNullException("generatedDataTypeConfigurationElements");

            _storeDirectory = storeDirectory;
            _dataTypeConfigurationElements = dataTypeConfigurationElements;
            _generatedDataTypeConfigurationElements = generatedDataTypeConfigurationElements;
        }



        public DataProviderContext Context
        {
            set
            {
                _dataProviderContext = value;
                _dataTypesGeneratorResult = GenerateResult(_dataTypeConfigurationElements, true);
            }
        }



        public IEnumerable<Type> GetSupportedInterfaces()
        {
            return _dataTypesGeneratorResult.ConfiguredInterfaceTypes;
        }



        public IEnumerable<Type> GetKnownInterfaces()
        {
            return _dataTypesGeneratorResult.AllInterfaceTypes;
        }


        public IEnumerable<Type> GetGeneratedInterfaces()
        {
            if (_generatedTypesHasBeenGenerated == false)
            {
                lock (_lock)
                {
                    if (_generatedTypesHasBeenGenerated == false)
                    {
                        _dataTypesGeneratorResult = GenerateResult(_dataTypeConfigurationElements.Concat(_generatedDataTypeConfigurationElements), false);
                    }
                }
            }

            var generatedTypes = new Hashset<Type>();

            foreach(var configElement in _generatedDataTypeConfigurationElements) 
            {
                var dataType = TypeManager.TryGetType(configElement.InterfaceType);
                if (dataType != null) 
                {
                    generatedTypes.Add(dataType);
                }
            }

            return
                from cit in _dataTypesGeneratorResult.ConfiguredInterfaceTypes
                where generatedTypes.Contains(cit)
                select cit;
        }


        private XmlDataProviderDocumentCache.FileRecord GetFileRecord(XmlDataProviderCodeGeneratorStoreResult storeResult, XmlDataProviderCodeGeneratorStoreResult.StoreInformaion storeInformation)
        {
            return XmlDataProviderDocumentCache.GetFileRecord(storeInformation.Filename, storeInformation.ElementName, storeResult.Helper.CreateDataId);
        }


        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            CheckTransactionNotInAbortedState();

            XmlDataProviderCodeGeneratorStoreResult storeResult = _dataTypesGeneratorResult.GetInterfaceResult(typeof (T));

            string currentDataScope = DataScopeManager.MapByType(typeof (T)).Name;
            if (!storeResult.DataScopes.Contains(currentDataScope))
            {
                return new List<T>().AsQueryable();
            }

            Func<XElement, T> fun = storeResult.Helper.CreateSelectFunction<T>(_dataProviderContext.ProviderName);

            string cultureName = LocalizationScopeManager.MapByType(typeof (T)).Name;
            var storeInformation = storeResult.GetStoreInformation(currentDataScope, cultureName);

            IEnumerable<XElement> elements = XmlDataProviderDocumentCache.GetElements(storeInformation.Filename,
                                                                                      storeInformation.ElementName,
                                                                                      storeResult.Helper);

            IEnumerable<T> result = Enumerable.Select<XElement, T>(elements, fun).ToList();

            return Queryable.AsQueryable(result);
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            if (dataId == null) throw new ArgumentNullException("dataId");

            XmlDataProviderCodeGeneratorStoreResult storeResult = _dataTypesGeneratorResult.GetInterfaceResult(typeof(T));

            string currentDataScope = DataScopeManager.MapByType(typeof(T)).Name;
            if (storeResult.DataScopes.Contains(currentDataScope) == false) throw new InvalidOperationException(string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope, typeof(T)));
            string cultureName = LocalizationScopeManager.MapByType(typeof(T)).Name;
            var storeInformation = storeResult.GetStoreInformation(currentDataScope, cultureName);

            var fileRecord = GetFileRecord(storeResult, storeInformation);

            XElement element = fileRecord.RecordSet.Index[dataId];

            if (element == null) return null;
            
            Func<XElement, T> selectFun = storeResult.Helper.CreateSelectFunction<T>(_dataProviderContext.ProviderName);

            return selectFun(element);
        }

        public void Update(IEnumerable<IData> dataset)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            CheckTransactionNotInAbortedState();

            using (XmlDataProviderDocumentCache.CreateEditingContext())
            {
                foreach (IData data in dataset)
                {
                    Verify.ArgumentCondition(data != null, "dataset", "Collection contains a null element.");
                    Verify.ArgumentCondition(data.DataSourceId != null, "dataset", "Collection contains a data item with DataSourceId null property.");

                    ValidationHelper.Validate(data);

                    XmlDataProviderCodeGeneratorStoreResult storeResult = _dataTypesGeneratorResult.GetInterfaceResult(data.DataSourceId.InterfaceType);

                    string currentDataScope = data.DataSourceId.DataScopeIdentifier.Name;
                    if (storeResult.DataScopes.Contains(currentDataScope) == false) throw new InvalidOperationException(string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope, data.DataSourceId.InterfaceType));
                    string cultureName = data.DataSourceId.LocaleScope.Name;
                    var storeInformation = storeResult.GetStoreInformation(currentDataScope, cultureName);

                    storeResult.Helper.ValidateDataType(data);

                    if (null == data.DataSourceId) throw new ArgumentException("The DataSourceId property of the data argument must not be null", "data");
                    if (data.DataSourceId.ProviderName != _dataProviderContext.ProviderName) throw new ArgumentException("The data element does not belong to this provider", "data");

                    var fileRecord = GetFileRecord(storeResult, storeInformation);

                    var index = fileRecord.RecordSet.Index;

                    IDataId dataId = data.DataSourceId.DataId;

                    XElement element = index[dataId];

                    Verify.ArgumentCondition(element != null, "dataset", "No data element corresponds to the given data id");

                    IXElementWrapper wrapper = data as IXElementWrapper;
                    Verify.ArgumentCondition(wrapper != null, "dataset", "The type of data was expected to be of type {0}".FormatWith(typeof(IXElementWrapper)));

                    fileRecord.Dirty = true;

                    XElement updatedElement = CreateUpdatedXElement(wrapper, element);

                    index[dataId] = updatedElement;
                }

                XmlDataProviderDocumentCache.SaveChanges();

                SubscribeToTransactionRollbackEvent();
            }
        }

        private XElement CreateUpdatedXElement(IXElementWrapper wrapper, XElement originalElement)
        {
            XElement result = new XElement(originalElement.Name);
            foreach (XAttribute attribute in originalElement.Attributes())
            {
                result.Add(new XAttribute(attribute.Name, attribute.Value));
            }

            wrapper.CommitData(result);

            return result;
        }

        public List<T> AddNew<T>(IEnumerable<T> dataset) where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            CheckTransactionNotInAbortedState();

            List<T> resultList = new List<T>();

            using (XmlDataProviderDocumentCache.CreateEditingContext())
            {
                foreach (IData data in dataset)
                {
                    Verify.ArgumentCondition(data != null, "dataset", "The enumeration datas may not contain nulls");

                    ValidationHelper.Validate(data);

                    var storeResult = _dataTypesGeneratorResult.GetInterfaceResult(typeof (T));

                    string currentDataScope = DataScopeManager.MapByType(typeof (T)).Name;
                    Verify.That(storeResult.DataScopes.Contains(currentDataScope), "The store named '{0}' is not supported for type '{1}'", currentDataScope, typeof (T));

                    string cultureName = LocalizationScopeManager.MapByType(typeof(T)).Name;
                    var storeInformation = storeResult.GetStoreInformation(currentDataScope, cultureName);

                    XElement newElement;
                    T newData = storeResult.Helper.CreateNewElement<T>(data, out newElement, storeInformation.ElementName, _dataProviderContext.ProviderName);

                    var fileRecord = GetFileRecord(storeResult, storeInformation);

                    IDataId dataId = storeResult.Helper.CreateDataId(newElement);

                    XElement element = fileRecord.RecordSet.Index[dataId];

                    Verify.ArgumentCondition(element == null, "dataset", "Key violation error. An data element with the same dataId is already added");

                    fileRecord.Dirty = true;
                    fileRecord.RecordSet.Index.Add(dataId, newElement);

                    resultList.Add(newData);
                }

                XmlDataProviderDocumentCache.SaveChanges();

                SubscribeToTransactionRollbackEvent();
            }

            return resultList;
        }



        public void Delete(IEnumerable<DataSourceId> dataSourceIds)
        {
            Verify.ArgumentNotNull(dataSourceIds, "dataSourceIds");

            CheckTransactionNotInAbortedState();

            using(XmlDataProviderDocumentCache.CreateEditingContext())
            {
                foreach (DataSourceId dataSourceId in dataSourceIds)
                {
                    Verify.ArgumentCondition(dataSourceId != null, "dataSourceIds", "The enumeration may not contain null values");

                    XmlDataProviderCodeGeneratorStoreResult storeResult =
                        _dataTypesGeneratorResult.GetInterfaceResult(dataSourceId.InterfaceType);

                    string currentDataScope = dataSourceId.DataScopeIdentifier.Name;
                    if (storeResult.DataScopes.Contains(currentDataScope) == false)
                        throw new InvalidOperationException(
                            string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope,
                                          dataSourceId.InterfaceType));
                    string cultureName = dataSourceId.LocaleScope.Name;
                    var storeInformation = storeResult.GetStoreInformation(currentDataScope, cultureName);

                    if (storeResult.Helper._DataIdType != dataSourceId.DataId.GetType())
                    {
                        throw new ArgumentException("Only data ids from this provider is allowed to be deleted on on the provider");
                    }

                    var fileRecord = GetFileRecord(storeResult, storeInformation);

                    var index = fileRecord.RecordSet.Index;

                    Verify.ArgumentCondition(index.ContainsKey(dataSourceId.DataId), "No data element corresponds to the given data id", "dataSourceIds");

                    fileRecord.Dirty = true;
                    index.Remove(dataSourceId.DataId);
                }

                XmlDataProviderDocumentCache.SaveChanges();

                SubscribeToTransactionRollbackEvent();
            }
        }

        private static void CheckTransactionNotInAbortedState()
        {
            var transaction = Transaction.Current;

            if (transaction == null)
            {
                return;
            }

            if(transaction.TransactionInformation.Status == TransactionStatus.Aborted)
            {
                LoggingService.LogWarning(typeof(XmlDataProvider).Name, new TransactionException("Transaction is in aborted state"));
            }
        }

        private static void SubscribeToTransactionRollbackEvent()
        {
            var transaction = Transaction.Current;

            if (transaction == null)
            {
                return;
            }

            var currentThreadData = ThreadDataManager.GetCurrentNotNull();

            Hashset<string> transactions;

            string tlsKey = "XmlDataProvider enlisted transactions";
            if (!currentThreadData.HasValue(tlsKey))
            {
                transactions = new Hashset<string>();
                currentThreadData.SetValue(tlsKey, transactions);
            }
            else
            {
                transactions = (Hashset<string>)currentThreadData[tlsKey];
            }

            string transactionId = transaction.TransactionInformation.LocalIdentifier;

            if(transactions.Contains(transactionId))
            {
                return;
            }

            transactions.Add(transactionId);


            ThreadStart logging = () =>
            {
                var exception = new TransactionException( "XML data provider does not support transaction's API, changes were not rolled back.");
                LoggingService.LogWarning(typeof (XmlDataProvider).Name, exception);
            };

            transaction.EnlistVolatile(new TransactionRollbackHandler(logging), EnlistmentOptions.None);
        }

        private XmlDataProviderCodeGeneratorResult GenerateResult(IEnumerable<XmlProviderInterfaceConfigurationElement> storeElementsToGenerated, bool staticOnly)
        {
            var stores = new List<XmlDataProviderCodeGeneratorStore>();

            foreach (XmlProviderInterfaceConfigurationElement element in storeElementsToGenerated)
            {
                string interfaceTypeName = element.InterfaceType;
                Type interfaceType = TypeManager.TryGetType(interfaceTypeName);

                if(interfaceType == null)
                {
                    LoggingService.LogWarning("XmlDataProvider", "Cannot load type '{0}', related data storage will not be loaded.".FormatWith(interfaceTypeName));
                    continue;
                }

                XmlDataProviderCodeGeneratorStore store = new XmlDataProviderCodeGeneratorStore
                {
                    InterfaceType = interfaceType,
                    InterfaceTypeName = element.InterfaceType,
                    DataIdProperties = element.DataIdProperties,
                    PropertyNameMapping = element.PropertyNameMappings,
                    PropertyInitializers = element.PropertyInitializers
                };

                store.DataScopes = new List<string>();
                store.Stores = new Dictionary<string, Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion>>();

                string resolvedDirectoryPath = PathUtil.Resolve(_storeDirectory);
                if (C1Directory.Exists(resolvedDirectoryPath) == false)
                {
                    C1Directory.CreateDirectory(resolvedDirectoryPath);
                }

                foreach (DataScopeConfigurationElement storeElement in element.ConfigurationStores)
                {
                    if (store.DataScopes.Contains(storeElement.DataScope) == false)
                    {
                        store.DataScopes.Add(storeElement.DataScope);
                    }

                    string filename = PathUtil.Resolve(Path.Combine(_storeDirectory, storeElement.Filename));

                    if (C1File.Exists(filename) == false)
                    {
                        XDocument document = new XDocument();
                        document.Add(new XElement(string.Format("{0}s", storeElement.DataScope)));
                        XDocumentUtils.Save(document, filename);

                    }

                    Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion> dic;
                    if (store.Stores.TryGetValue(storeElement.DataScope, out dic) == false)
                    {
                        dic = new Dictionary<string, XmlDataProviderCodeGeneratorStore.StoreInformaion>();
                        store.Stores.Add(storeElement.DataScope, dic);
                    }

                    dic.Add(
                        storeElement.CultureName,
                        new XmlDataProviderCodeGeneratorStore.StoreInformaion { ElementName = storeElement.ElementName, Filename = filename }
                        );
                }

                stores.Add(store);
            }

            XmlDataProviderHelperGenerator generator = new XmlDataProviderHelperGenerator(_dataProviderContext.ProviderName, stores);

            XmlDataProviderCodeGeneratorResult result = generator.Generate(staticOnly);

            return result;
        }


        public void CreateStore(DataTypeDescriptor typeDescriptor)
        {
            InterfaceConfigurationManipulator.AddNew(_dataProviderContext.ProviderName, typeDescriptor);
        }



        public void AlterStore(DataTypeChangeDescriptor changeDescriptor)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.Change(_dataProviderContext.ProviderName, changeDescriptor);
        }



        public void DropStore(DataTypeDescriptor typeDescriptor)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.Remove(_dataProviderContext.ProviderName, typeDescriptor);
        }

        

        public void AddLocale(CultureInfo cultureInfo)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.AddLocale(_dataProviderContext.ProviderName, this.GetSupportedInterfaces(), cultureInfo);
        }



        public void RemoveLocale(CultureInfo cultureInfo)
        {
            XmlDataProviderDocumentCache.ClearCache();

            InterfaceConfigurationManipulator.RemoveLocale(_dataProviderContext.ProviderName, this.GetSupportedInterfaces(), cultureInfo);
        }

        public bool AllowResultsWrapping
        {
            get { return false; }
        }
    }




    internal sealed class XmlDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            string pathToConfigFile = PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory);
            return Assemble(context, objectConfiguration, configurationSource, reflectionCache, pathToConfigFile);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        internal IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache, string configurationFolderPath)
        {
            XmlDataProviderData data = (XmlDataProviderData)objectConfiguration;            

            C1Configuration configuration = new C1Configuration(Path.Combine(configurationFolderPath, string.Format("{0}.config", data.Name)));

            XmlDataProviderConfigurationSection section = configuration.GetSection(XmlDataProviderConfigurationSection.SectionName) as XmlDataProviderConfigurationSection;
            if (section == null)
            {
                section = new XmlDataProviderConfigurationSection();
                configuration.Sections.Add(XmlDataProviderConfigurationSection.SectionName, section);
                configuration.Save();
            }


            List<XmlProviderInterfaceConfigurationElement> dataTypeConfigurationElements = new List<XmlProviderInterfaceConfigurationElement>();
            List<XmlProviderInterfaceConfigurationElement> generatedDataTypeConfigurationElements = new List<XmlProviderInterfaceConfigurationElement>();

            foreach (XmlProviderInterfaceConfigurationElement interfaceElement in section.Interfaces)            
            {
                if (interfaceElement.IsGeneratedType == false)
                {
                    dataTypeConfigurationElements.Add(interfaceElement);
                }
                else
                {
                    generatedDataTypeConfigurationElements.Add(interfaceElement);
                }
            }


            XmlDataProvider provider = new XmlDataProvider(data.StoreDirectory, dataTypeConfigurationElements, generatedDataTypeConfigurationElements);

            return provider;
        }
    }




    [Assembler(typeof(XmlDataProviderAssembler))]
    internal sealed class XmlDataProviderData : DataProviderData
    {
        private const string _storeDirectoryPropertyName = "storeDirectory";
        [System.Configuration.ConfigurationProperty(_storeDirectoryPropertyName, IsRequired = true)]
        public string StoreDirectory
        {
            get { return (string)base[_storeDirectoryPropertyName]; }
            set { base[_storeDirectoryPropertyName] = value; }
        }
    }



    internal sealed class XmlDataProviderConfigurationSection : System.Configuration.ConfigurationSection
    {
        public const string SectionName = "Composite.Data.Plugins.XmlDataProviderConfiguration";


        private const string _interfacesPropertyName = "Interfaces";
        [System.Configuration.ConfigurationProperty(_interfacesPropertyName)]
        public XmlProviderInterfaceConfigurationElementCollection Interfaces
        {
            get { return (XmlProviderInterfaceConfigurationElementCollection)base[_interfacesPropertyName]; }
            set { base[_interfacesPropertyName] = value; }
        }
    }




    internal sealed class XmlProviderInterfaceConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        internal void Add(XmlProviderInterfaceConfigurationElement element)
        {
            BaseAdd(element);
        }


        internal void Remove(object key)
        {
            BaseRemove(key);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new XmlProviderInterfaceConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            return ((XmlProviderInterfaceConfigurationElement)element).InterfaceType;
        }

        internal object GetKey(string typeManagerInterfaceTypeName)
        {
            object[] allKeys = BaseGetAllKeys();

            foreach (string key in allKeys)
            {
                if (key == typeManagerInterfaceTypeName) return key;
            }

            return null;
        }

        internal XmlProviderInterfaceConfigurationElement Get(object key)
        {
            return (XmlProviderInterfaceConfigurationElement)BaseGet(key);
        }
    }




    internal sealed class XmlProviderInterfaceConfigurationElement : System.Configuration.ConfigurationElement
    {
        public Dictionary<string, Dictionary<string, DataScopeConfigurationElement>> DataScopes
        {
            get
            {
                Dictionary<string, Dictionary<string, DataScopeConfigurationElement>> scopes = new Dictionary<string, Dictionary<string, DataScopeConfigurationElement>>();

                foreach (DataScopeConfigurationElement scopeElement in this.ConfigurationStores)
                {
                    Dictionary<string, DataScopeConfigurationElement> dic;
                    if (scopes.TryGetValue(scopeElement.DataScope, out dic) == false)
                    {
                        dic = new Dictionary<string, DataScopeConfigurationElement>();
                        scopes.Add(scopeElement.DataScope, dic);
                    }

                    dic.Add(scopeElement.CultureName, scopeElement);                    
                }

                return scopes;
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

                foreach (SimpleNameTypeConfigurationElement element in ConfigurationPropertyInitializers)
                {
                    dic.Add(element.Name, element.Type);
                }

                return dic;
            }
        }



        public void AddPropertyInitializer(string name, Type type)
        {
            ConfigurationPropertyInitializers.Add(name, type);
        }


        private const string _interfaceTypePropertyName = "interfaceType";
        [System.Configuration.ConfigurationProperty(_interfaceTypePropertyName, IsKey = true, IsRequired = true)]
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


        private const string _storesPropertyName = "Stores";
        [System.Configuration.ConfigurationProperty(_storesPropertyName, IsRequired = true)]
        public DataScopeConfigurationElementCollection ConfigurationStores
        {
            get { return (DataScopeConfigurationElementCollection)base[_storesPropertyName]; }
            set { base[_storesPropertyName] = value; }
        }


        private const string _dataIdPropertiesPropertyName = "DataIdProperties";
        [System.Configuration.ConfigurationProperty(_dataIdPropertiesPropertyName, IsRequired = true)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationDataIdProperties
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_dataIdPropertiesPropertyName]; }
            set { base[_dataIdPropertiesPropertyName] = value; }
        }


        private const string _propertyNameMappingsPropertyName = "PropertyNameMappings";
        [System.Configuration.ConfigurationProperty(_propertyNameMappingsPropertyName)]
        public PropertyNameMappingConfigurationElementCollection ConfigurationPropertyNameMappings
        {
            get { return (PropertyNameMappingConfigurationElementCollection)base[_propertyNameMappingsPropertyName]; }
            set { base[_propertyNameMappingsPropertyName] = value; }
        }


        private const string _propertyInitializersPropertyName = "PropertyInitializers";
        [System.Configuration.ConfigurationProperty(_propertyInitializersPropertyName)]
        public SimpleNameTypeConfigurationElementCollection ConfigurationPropertyInitializers
        {
            get { return (SimpleNameTypeConfigurationElementCollection)base[_propertyInitializersPropertyName]; }
            set { base[_propertyInitializersPropertyName] = value; }
        }
    }



    internal sealed class DataScopeConfigurationElement : System.Configuration.ConfigurationElement
    {
        private const string _dataScopePropertyName = "dataScope";
        [System.Configuration.ConfigurationProperty(_dataScopePropertyName, IsRequired = true)]
        public string DataScope
        {
            get { return (string)base[_dataScopePropertyName]; }
            set { base[_dataScopePropertyName] = value; }
        }


        private const string _cultureNamePropertyName = "cultureName";
        [System.Configuration.ConfigurationProperty(_cultureNamePropertyName, IsRequired = false, DefaultValue = "")]
        public string CultureName
        {
            get { return (string)base[_cultureNamePropertyName]; }
            set { base[_cultureNamePropertyName] = value; }
        }


        private const string _filenamePropertyName = "filename";
        [System.Configuration.ConfigurationProperty(_filenamePropertyName, IsRequired = true)]
        public string Filename
        {
            get { return (string)base[_filenamePropertyName]; }
            set { base[_filenamePropertyName] = value; }
        }


        private const string _elementNamePropertyName = "elementName";
        [System.Configuration.ConfigurationProperty(_elementNamePropertyName, IsRequired = true)]
        public string ElementName
        {
            get { return (string)base[_elementNamePropertyName]; }
            set { base[_elementNamePropertyName] = value; }
        }
    }




    internal sealed class DataScopeConfigurationElementCollection : System.Configuration.ConfigurationElementCollection
    {
        internal void Add(DataScopeConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override System.Configuration.ConfigurationElement CreateNewElement()
        {
            return new DataScopeConfigurationElement();
        }

        protected override object GetElementKey(System.Configuration.ConfigurationElement element)
        {
            DataScopeConfigurationElement castedElement = (DataScopeConfigurationElement)element;
            return string.Format("{0}.{1}", castedElement.DataScope, castedElement.CultureName);                
        }
    }
}
