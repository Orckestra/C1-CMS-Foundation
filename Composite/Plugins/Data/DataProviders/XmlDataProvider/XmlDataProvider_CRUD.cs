using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Transactions;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal partial class XmlDataProvider
    {
        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            CheckTransactionNotInAbortedState();

            XmlDataTypeStore dataTypeStore = _xmlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

            string currentDataScope = DataScopeManager.MapByType(typeof(T)).Name;
            if (!dataTypeStore.HasDataScopeName(currentDataScope)) return new List<T>().AsQueryable();

            string cultureName = LocalizationScopeManager.MapByType(typeof(T)).Name;
            var dataTypeStoreScope = dataTypeStore.GetXmlDateTypeStoreDataScope(currentDataScope, cultureName);

            var fileRecord = XmlDataProviderDocumentCache.GetFileRecord(
                dataTypeStoreScope.Filename,
                dataTypeStoreScope.ElementName, 
                dataTypeStore.Helper.CreateDataId);

            if (fileRecord.CachedTable == null)
            {
                ICollection<XElement> elements = fileRecord.ReadOnlyElementsList;

                Func<XElement, T> fun = dataTypeStore.Helper.CreateSelectFunction<T>(_dataProviderContext.ProviderName);

                var list = new List<T>(elements.Count);
                list.AddRange(elements.Select(fun));

                var queryable = list.AsQueryable();

                fileRecord.CachedTable = new DataCachingFacade.CachedTable(queryable);
            }

            return new CachingQueryable<T>(fileRecord.CachedTable, () => fileRecord.CachedTable.Queryable);
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            if (dataId == null) throw new ArgumentNullException("dataId");

            XmlDataTypeStore dataTypeStore = _xmlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

            string currentDataScope = DataScopeManager.MapByType(typeof(T)).Name;
            if (dataTypeStore.HasDataScopeName(currentDataScope) == false) throw new InvalidOperationException(string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope, typeof(T)));

            string cultureName = LocalizationScopeManager.MapByType(typeof(T)).Name;
            var dataTypeStoreScope = dataTypeStore.GetXmlDateTypeStoreDataScope(currentDataScope, cultureName);

            var fileRecord = GetFileRecord(dataTypeStore, dataTypeStoreScope);

            XElement element = fileRecord.RecordSet.Index[dataId];

            if (element == null) return null;

            Func<XElement, T> selectFun = dataTypeStore.Helper.CreateSelectFunction<T>(_dataProviderContext.ProviderName);

            return selectFun(element);
        }



        public void Update(IEnumerable<IData> dataset)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            CheckTransactionNotInAbortedState();

            using (XmlDataProviderDocumentCache.CreateEditingContext())
            {
                var validatedFileRecords = new Dictionary<DataSourceId, FileRecord>();
                var validatedElements = new Dictionary<DataSourceId, XElement>();

                // verify phase
                foreach (IData wrappedData in dataset)
                {
                    var data = DataWrappingFacade.UnWrap(wrappedData);

                    Verify.ArgumentCondition(data != null, "dataset", "Collection contains a null element.");
                    Verify.ArgumentCondition(data.DataSourceId != null, "dataset", "Collection contains a data item with DataSourceId null property.");

                    ValidationHelper.Validate(data);

                    XmlDataTypeStore dataTypeStore = _xmlDataTypeStoresContainer.GetDataTypeStore(data.DataSourceId.InterfaceType);

                    string currentDataScope = data.DataSourceId.DataScopeIdentifier.Name;
                    if (dataTypeStore.HasDataScopeName(currentDataScope) == false) throw new InvalidOperationException(string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope, data.DataSourceId.InterfaceType));

                    string cultureName = data.DataSourceId.LocaleScope.Name;
                    var dataTypeStoreScope = dataTypeStore.GetXmlDateTypeStoreDataScope(currentDataScope, cultureName);

                    dataTypeStore.Helper.ValidateDataType(data);

                    if (null == data.DataSourceId) throw new ArgumentException("The DataSourceId property of the data argument must not be null", "data");
                    if (data.DataSourceId.ProviderName != _dataProviderContext.ProviderName) throw new ArgumentException("The data element does not belong to this provider", "data");

                    var fileRecord = GetFileRecord(dataTypeStore, dataTypeStoreScope);

                    var index = fileRecord.RecordSet.Index;

                    IDataId dataId = data.DataSourceId.DataId;

                    XElement element = index[dataId];

                    Verify.ArgumentCondition(element != null, "dataset", "No data element corresponds to the given data id");

                    IXElementWrapper wrapper = data as IXElementWrapper;
                    Verify.ArgumentCondition(wrapper != null, "dataset", "The type of data was expected to be of type {0}".FormatWith(typeof(IXElementWrapper)));

                    XElement updatedElement = CreateUpdatedXElement(wrapper, element);

                    validatedFileRecords.Add(data.DataSourceId, fileRecord);
                    validatedElements.Add(data.DataSourceId, updatedElement);

                }

                foreach (var key in validatedElements.Keys)
                {
                    FileRecord fileRecord = validatedFileRecords[key];
                    fileRecord.Dirty = true;
                    fileRecord.RecordSet.Index[key.DataId] = validatedElements[key];

                }

                XmlDataProviderDocumentCache.SaveChanges();

                SubscribeToTransactionRollbackEvent();
            }
        }        



        public List<T> AddNew<T>(IEnumerable<T> dataset) where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            CheckTransactionNotInAbortedState();

            List<T> resultList = new List<T>();

            using (XmlDataProviderDocumentCache.CreateEditingContext())
            {
                var validatedElements = new Dictionary<DataSourceId, XElement>();

                XmlDataTypeStore dataTypeStore = _xmlDataTypeStoresContainer.GetDataTypeStore(typeof(T));

                string currentDataScope = DataScopeManager.MapByType(typeof(T)).Name;
                Verify.That(dataTypeStore.HasDataScopeName(currentDataScope), "The store named '{0}' is not supported for type '{1}'", currentDataScope, typeof(T));

                string cultureName = LocalizationScopeManager.MapByType(typeof(T)).Name;
                var dataTypeStoreScope = dataTypeStore.GetXmlDateTypeStoreDataScope(currentDataScope, cultureName);

                var fileRecord = GetFileRecord(dataTypeStore, dataTypeStoreScope);

                // validating phase
                foreach (IData data in dataset)
                {
                    Verify.ArgumentCondition(data != null, "dataset", "The enumeration datas may not contain nulls");
                    ValidationHelper.Validate(data);

                    XElement newElement;

                    T newData = dataTypeStore.Helper.CreateNewElement<T>(data, out newElement, dataTypeStoreScope.ElementName, _dataProviderContext.ProviderName);
                    IDataId dataId = dataTypeStore.Helper.CreateDataId(newElement);
                    XElement violatingElement = fileRecord.RecordSet.Index[dataId];

                    Verify.ArgumentCondition(violatingElement == null, "dataset", "Key violation error. An data element with the same dataId is already added");

                    validatedElements.Add(newData.DataSourceId, newElement);
                    resultList.Add(newData);
                }

                // commit validated elements 
                foreach (var key in validatedElements.Keys)
	            {
                    fileRecord.RecordSet.Index.Add(key.DataId, validatedElements[key]);
                    fileRecord.Dirty = true;
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

            using (XmlDataProviderDocumentCache.CreateEditingContext())
            {
                var validated = new Dictionary<DataSourceId, FileRecord>();

                // verify phase
                foreach (DataSourceId dataSourceId in dataSourceIds)
                {
                    Verify.ArgumentCondition(dataSourceId != null, "dataSourceIds", "The enumeration may not contain null values");

                    XmlDataTypeStore dataTypeStore = _xmlDataTypeStoresContainer.GetDataTypeStore(dataSourceId.InterfaceType);

                    string currentDataScope = dataSourceId.DataScopeIdentifier.Name;
                    if (dataTypeStore.HasDataScopeName(currentDataScope) == false) throw new InvalidOperationException(string.Format("The store named '{0}' is not supported for type '{1}'", currentDataScope, dataSourceId.InterfaceType));

                    string cultureName = dataSourceId.LocaleScope.Name;
                    var dataTypeStoreScope = dataTypeStore.GetXmlDateTypeStoreDataScope(currentDataScope, cultureName);

                    if (dataTypeStore.Helper._DataIdType != dataSourceId.DataId.GetType())
                    {
                        throw new ArgumentException("Only data ids from this provider is allowed to be deleted on on the provider");
                    }

                    var fileRecord = GetFileRecord(dataTypeStore, dataTypeStoreScope);

                    var index = fileRecord.RecordSet.Index;

                    Verify.ArgumentCondition(index.ContainsKey(dataSourceId.DataId), "No data element corresponds to the given data id", "dataSourceIds");

                    validated.Add(dataSourceId, fileRecord);
                }

                // commit phase
                foreach (var dataSourceId in validated.Keys)
                {
                    FileRecord fileRecord = validated[dataSourceId];
                    fileRecord.RecordSet.Index.Remove(dataSourceId.DataId);
                    fileRecord.Dirty = true;
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

            if (transaction.TransactionInformation.Status == TransactionStatus.Aborted)
            {
                Log.LogWarning(typeof(XmlDataProvider).Name, new TransactionException("Transaction is in aborted state"));
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

            const string tlsKey = "XmlDataProvider enlisted transactions";
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

            if (transactions.Contains(transactionId))
            {
                return;
            }

            transactions.Add(transactionId);


            ThreadStart logging = () =>
            {
                var exception = new TransactionException("XML data provider does not support transaction's API, changes were not rolled back.");
                Log.LogWarning(typeof(XmlDataProvider).Name, exception);
            };

            transaction.EnlistVolatile(new TransactionRollbackHandler(logging), EnlistmentOptions.None);
        }



        private static FileRecord GetFileRecord(XmlDataTypeStore dataTypeStore, XmlDataTypeStoreDataScope dataTypeStoreDataScope)
        {
            return XmlDataProviderDocumentCache.GetFileRecord(dataTypeStoreDataScope.Filename, dataTypeStoreDataScope.ElementName, dataTypeStore.Helper.CreateDataId);
        }



        private static XElement CreateUpdatedXElement(IXElementWrapper wrapper, XElement originalElement)
        {
            XElement result = new XElement(originalElement.Name);
            foreach (XAttribute attribute in originalElement.Attributes())
            {
                result.Add(new XAttribute(attribute.Name, attribute.Value));
            }

            wrapper.CommitData(result);

            return result;
        }
    }
}
