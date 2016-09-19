using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Data.Caching;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Types;
using Composite.Data.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Core;


namespace Composite.Data
{
    internal class DataFacadeImpl : IDataFacade
    {
        private static readonly string LogTitle = nameof(DataFacade);

        internal Dictionary<Type, DataInterceptor> GlobalDataInterceptors = new Dictionary<Type, DataInterceptor>();

        static readonly Cache<string, IData> _dataBySourceIdCache = new Cache<string, IData>("Data by sourceId", 2000);
        private static readonly object _storeCreationLock = new object();

        static DataFacadeImpl()
        {
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IData>(OnDataChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IData>(OnDataChanged, true);

            DataEventSystemFacade.SubscribeToDataBeforeAdd<ICreationHistory>(SetCreationHistoryInformation, true);
            DataEventSystemFacade.SubscribeToDataBeforeAdd<IChangeHistory>(SetChangeHistoryInformation, true);
            DataEventSystemFacade.SubscribeToDataBeforeUpdate<IChangeHistory>(SetChangeHistoryInformation, true);
        }

        public IQueryable<T> GetData<T>(bool useCaching, IEnumerable<string> providerNames)
            where T : class, IData
        {
            IQueryable<T> resultQueryable;

            if (DataProviderRegistry.AllInterfaces.Contains(typeof (T)))
            {
                if (useCaching 
                    && providerNames == null
                    && DataCachingFacade.IsDataAccessCacheEnabled(typeof (T)))
                {
                    resultQueryable = DataCachingFacade.GetDataFromCache<T>(
                        () => BuildQueryFromProviders<T>(null));
                }
                else
                {
                    resultQueryable = BuildQueryFromProviders<T>(providerNames);
                }
            }
            else
            {
                DataProviderRegistry.CheckInitializationErrors(typeof(T));

                if (!typeof(T).GetCustomInterfaceAttributes<AutoUpdatebleAttribute>().Any())
                {
                    throw new ArgumentException($"The given interface type ({typeof (T)}) is not supported by any data providers");
                    
                }

                resultQueryable = new List<T>().AsQueryable();
            }

            foreach (var dataInterceptor in GetDataInterceptors(typeof(T)))
            {
                try
                {
                    resultQueryable = dataInterceptor.InterceptGetData<T>(resultQueryable);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                }
            }

            return resultQueryable;
        }


        private IQueryable<T> BuildQueryFromProviders<T>(IEnumerable<string> providerNames) where T : class, IData
        {
            if (providerNames == null)
            {
                providerNames = DataProviderRegistry.GetDataProviderNamesByInterfaceType(typeof(T));
            }

            var queries = new List<IQueryable<T>>();
            foreach (string providerName in providerNames)
            {
                IQueryable<T> query = DataProviderPluginFacade.GetData<T>(providerName);

                queries.Add(query);
            }

            bool resultIsCached = queries.Count == 1 && queries[0] is ICachedQuery;

            if (resultIsCached)
            {
                return queries[0];
            }
            
            return  new DataFacadeQueryable<T>(queries);
        }


        public T GetDataFromDataSourceId<T>(DataSourceId dataSourceId, bool useCaching)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataSourceId, nameof(dataSourceId));

            useCaching = useCaching && DataCachingFacade.IsTypeCacheable(typeof(T));

            using (new DataScope(dataSourceId.DataScopeIdentifier, dataSourceId.LocaleScope))
            {
                T resultData = null;

                string cacheKey = string.Empty;
                if (useCaching)
                {
                    cacheKey = dataSourceId.ToString();
                    resultData = (T)_dataBySourceIdCache.Get(cacheKey);
                }

                if (resultData == null)
                {
                    resultData = DataProviderPluginFacade.GetData<T>(dataSourceId.ProviderName, dataSourceId.DataId);

                    if (useCaching && resultData != null && _dataBySourceIdCache.Enabled)
                    {
                        _dataBySourceIdCache.Add(cacheKey, resultData);
                    }
                }

                if (useCaching && resultData != null)
                {
                    resultData = DataWrappingFacade.Wrap(resultData);
                }
                
                foreach (var dataInterceptor in GetDataInterceptors(typeof(T)))
                {
                    try
                    {
                        resultData = dataInterceptor.InterceptGetDataFromDataSourceId<T>(resultData);
                    }
                    catch (Exception ex)
                    {
                        Log.LogError(LogTitle, ex);
                    }
                }

                return resultData;
            }
        }


        public IEnumerable<DataInterceptor> GetDataInterceptors(Type dataType)
        {
            DataInterceptor globalDataInterceptor = GlobalDataInterceptors
                .FirstOrDefault(kvp => kvp.Key.IsAssignableFrom(dataType)).Value;

            DataInterceptor threadedDataInterceptor = null;
            var threadData = ThreadDataManager.Current;
            if (threadData != null)
            {
                GetDataInterceptors(threadData).TryGetValue(dataType, out threadedDataInterceptor);
            }

            if (threadedDataInterceptor == null && globalDataInterceptor == null)
            {
                return Enumerable.Empty<DataInterceptor>();
            }

            var dataInterceptors = new List<DataInterceptor> { threadedDataInterceptor, globalDataInterceptor };

            return dataInterceptors.Where(d => d != null);
        } 


        public void SetDataInterceptor<T>(DataInterceptor dataInterceptor) where T : class, IData
        {
            if (this.DataInterceptors.ContainsKey(typeof(T))) throw new InvalidOperationException("A data interceptor has already been set");

            this.DataInterceptors.Add(typeof(T), dataInterceptor);

            Log.LogVerbose(LogTitle, $"Data interception added to the data type '{typeof (T)}' with interceptor type '{dataInterceptor.GetType()}'");
        }



        public bool HasDataInterceptor<T>() where T : class, IData
        {
            return this.DataInterceptors.ContainsKey(typeof(T));
        }



        public void ClearDataInterceptor<T>() where T : class, IData
        {
            if (this.DataInterceptors.ContainsKey(typeof(T)))
            {
                this.DataInterceptors.Remove(typeof(T));

                Log.LogVerbose(LogTitle, $"Data interception cleared for the data type '{typeof (T)}'");
            }
        }

        public void SetGlobalDataInterceptor<T>(DataInterceptor dataInterceptor) where T : class, IData
        {
            if (GlobalDataInterceptors.ContainsKey(typeof(T))) throw new InvalidOperationException("A data interceptor has already been set");

            GlobalDataInterceptors.Add(typeof(T), dataInterceptor);

            Log.LogVerbose(LogTitle,
                $"Global Data interception added to the data type '{typeof (T)}' with interceptor type '{dataInterceptor.GetType()}'");
        }

        public bool HasGlobalDataInterceptor<T>() where T : class, IData
        {
            return GlobalDataInterceptors.ContainsKey(typeof(T));
        }



        public void ClearGlobalDataInterceptor<T>() where T : class, IData
        {
            if (GlobalDataInterceptors.ContainsKey(typeof(T)))
            {
                GlobalDataInterceptors.Remove(typeof(T));

                Log.LogVerbose(LogTitle, $"Global Data interception cleared for the data type '{typeof (T)}'");
            }
        }

        private Dictionary<Type, DataInterceptor> GetDataInterceptors(ThreadDataManagerData threadData)
        {
            Verify.ArgumentNotNull(threadData, nameof(threadData));
            const string threadDataKey = "DataFacade:DataInterceptors";

            var dataInterceptors = threadData.GetValue(threadDataKey) as Dictionary<Type, DataInterceptor>;

            if (dataInterceptors == null)
            {
                dataInterceptors = new Dictionary<Type, DataInterceptor>();
                threadData.SetValue(threadDataKey, dataInterceptors);
            }

            return dataInterceptors;
        }

        private Dictionary<Type, DataInterceptor> DataInterceptors 
            => GetDataInterceptors(ThreadDataManager.Current);


        public void Update(IEnumerable<IData> dataset, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performValidation)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            var sortedDataset = dataset.ToDataProviderAndInterfaceTypeSortedDictionary();

            if (!suppressEventing)
            {
                foreach (IData data in dataset)
                {
                    DataEventSystemFacade.FireDataBeforeUpdateEvent(data.DataSourceId.InterfaceType, data);
                }
            }


            foreach (IData data in dataset)
            {
                if (performValidation)
                {
                    CheckValidationResult(ValidationFacade.Validate(data), data.DataSourceId.InterfaceType);
                }

                if (performForeignKeyIntegrityCheck)
                {
                    data.ValidateForeignKeyIntegrity();
                }
            }


            foreach (KeyValuePair<string, Dictionary<Type, List<IData>>> providerPair in sortedDataset)
            {
                foreach (KeyValuePair<Type, List<IData>> interfaceTypePair in providerPair.Value)
                {
                    List<IData> dataToUpdate = interfaceTypePair.Value;

                    if (DataCachingFacade.IsTypeCacheable(interfaceTypePair.Key))
                    {
                        List<IData> newDataToUpdate = new List<IData>();

                        foreach (IData d in interfaceTypePair.Value)
                        {
                            newDataToUpdate.Add(DataWrappingFacade.UnWrap(d));
                        }

                        dataToUpdate = newDataToUpdate;
                    }

                    DataProviderPluginFacade.Update(providerPair.Key, dataToUpdate);

                    if (DataCachingFacade.IsTypeCacheable(interfaceTypePair.Key))
                    {
                        DataCachingFacade.ClearCache(interfaceTypePair.Key);
                    }
                }
            }


            if (!suppressEventing)
            {
                foreach (IData data in dataset)
                {
                    DataEventSystemFacade.FireDataAfterUpdateEvent(data.DataSourceId.InterfaceType, data);
                }
            }
        }


        private List<string> GetWritableDataProviders(Type type)
        {
            var dataProviders = DataProviderRegistry.GetWriteableDataProviderNamesByInterfaceType(type);
            if (dataProviders.Count > 1 && dataProviders.Contains(DataProviderRegistry.DefaultDynamicTypeDataProviderName))
            {
                dataProviders = new List<string> { DataProviderRegistry.DefaultDynamicTypeDataProviderName };
            }

            return dataProviders;
        }

        public List<T> AddNew<T>(IEnumerable<T> datas, bool allowStoreCreation, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performValidation, List<string> writeableProviders)
            where T : class, IData
        {
            if (writeableProviders == null)
            {
                writeableProviders = GetWritableDataProviders(typeof (T));
            }

            if (writeableProviders.Count == 0
                && typeof(T).GetCustomInterfaceAttributes<AutoUpdatebleAttribute>().Any()
                && allowStoreCreation)
            {
                if (!DataTypeTypesManager.IsAllowedDataTypeAssembly(typeof(T)))
                {
                    string message = string.Format("The data interface '{0}' is not located in an assembly in the website Bin folder. Please move it to that location", typeof(T));
                    Log.LogError(LogTitle, message);
                    throw new InvalidOperationException(message);
                }

                lock (_storeCreationLock)
                {
                    writeableProviders = GetWritableDataProviders(typeof (T));

                    if (writeableProviders.Count == 0)
                    {
                        Log.LogVerbose(LogTitle, string.Format("Type data interface '{0}' is marked auto updateble and is not supported by any providers. Adding it to the default dynamic type data provider", typeof(T)));

                        List<T> result;
                        DynamicTypeManager.EnsureCreateStore(typeof(T));

                        result = AddNew<T>(datas, false, suppressEventing, performForeignKeyIntegrityCheck, performValidation, null);
                        return result;
                    }
                }
            }

            if (writeableProviders.Count == 1)
            {
                return AddNew_AddingMethod<T>(writeableProviders[0], datas, suppressEventing, performForeignKeyIntegrityCheck, performValidation);
            }

            throw new InvalidOperationException(string.Format("{0} writeable data providers exists for data '{1}'.", writeableProviders.Count, typeof(T)));
        }
        



        private static List<T> AddNew_AddingMethod<T>(string providerName, IEnumerable<T> dataset, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performValidation)
             where T : class, IData
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(dataset, "dataset");
            Verify.ArgumentCondition(!dataset.Contains(null), "dataset", "The enumeration may not contain null values");


            List<string> writeableProviders = DataProviderRegistry.GetWriteableDataProviderNamesByInterfaceType(typeof(T));
            if (writeableProviders.Contains(providerName) == false)
            {
                Log.LogVerbose(LogTitle, string.Format("Type data interface '{0}' is marked auto updateble and is not supported by the provider '{1}', adding it", typeof(T), providerName));

                DynamicTypeManager.EnsureCreateStore(typeof(T), providerName);
            }

            writeableProviders = DataProviderRegistry.GetWriteableDataProviderNamesByInterfaceType(typeof(T));
            if (writeableProviders.Contains(providerName) == false)
            {
                throw new InvalidOperationException(string.Format("The writeable data providers '{0}' does not support the interface '{1}'.", providerName, typeof(T)));
            }


            foreach (T data in dataset)
            {
                if (performValidation)
                {
                    CheckValidationResult(ValidationFacade.Validate<T>(data), typeof (T));
                }

                if (performForeignKeyIntegrityCheck)
                {
                    data.ValidateForeignKeyIntegrity();
                }
            }


            if (suppressEventing == false)
            {
                foreach (T data in dataset)
                {
                    DataEventSystemFacade.FireDataBeforeAddEvent<T>(data);
                }
            }

            List<T> addedDataset = DataProviderPluginFacade.AddNew<T>(providerName, dataset);

            if (DataCachingFacade.IsTypeCacheable(typeof(T)))
            {
                DataCachingFacade.ClearCache(typeof(T));
            }

            if (suppressEventing == false)
            {
                foreach (T data in addedDataset)
                {
                    DataEventSystemFacade.FireDataAfterAddEvent<T>(data);
                }
            }


            return addedDataset;
        }


        public void Delete<T>(IEnumerable<T> dataset, bool suppressEventing, CascadeDeleteType cascadeDeleteType, bool referencesFromAllScopes)
            where T : class, IData
        {
            Delete(dataset, suppressEventing, cascadeDeleteType, referencesFromAllScopes, new HashSet<DataSourceId>());
        }



        private void Delete<T>(IEnumerable<T> dataset, bool suppressEventing, CascadeDeleteType cascadeDeleteType, bool referencesFromAllScopes, HashSet<DataSourceId> dataPendingDeletion)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, nameof(dataset));

            dataset = dataset.Evaluate();

            foreach(var data in dataset)
            {
                var dataSourceId = data.DataSourceId;
                if(!dataPendingDeletion.Contains(dataSourceId))
                {
                    dataPendingDeletion.Add(dataSourceId);
                }
            }

            if (cascadeDeleteType != CascadeDeleteType.Disable)
            {
                foreach (IData element in dataset)
                {
                    Verify.ArgumentCondition(element != null, nameof(dataset), "dataset may not contain nulls");

                    if (!element.IsDataReferred()) continue;

                    Type interfaceType = element.DataSourceId.InterfaceType;

                    // Not deleting references if the data is versioned and not all of the 
                    // versions of the element are to be deleted
                    if (element is IVersioned)
                    {
                        var key = element.GetUniqueKey();
                        var versions = DataFacade.TryGetDataVersionsByUniqueKey(interfaceType, key).ToList();

                        if (versions.Count > 1 
                            && (dataset.Count() < versions.Count
                                || !versions.All(v => dataPendingDeletion.Contains(v.DataSourceId))))
                        {
                            continue;
                        }
                    }

                    Verify.IsTrue(cascadeDeleteType != CascadeDeleteType.Disallow, "One of the given datas is referenced by one or more datas");

                    element.RemoveOptionalReferences();

                    IEnumerable<IData> referees;
                    using (new DataScope(element.DataSourceId.DataScopeIdentifier))
                    {
                        // For some weird reason, this line does not work.... /MRJ
                        // IEnumerable<IData> referees = dataset.GetRefereesRecursively();
                        referees = element.GetReferees(referencesFromAllScopes)
                                           .Where(reference => !dataPendingDeletion.Contains(reference.DataSourceId))
                                           .Evaluate();
                    }

                    foreach (IData referee in referees)
                    {
                        if (!referee.CascadeDeleteAllowed(interfaceType))
                        {
                            throw new InvalidOperationException("One of the given datas is referenced by one or more datas that does not allow cascade delete");
                        }
                    }

                    Delete<IData>(referees, suppressEventing, cascadeDeleteType, referencesFromAllScopes);
                }
            }


            Dictionary<string, Dictionary<Type, List<IData>>> sortedDatas = dataset.ToDataProviderAndInterfaceTypeSortedDictionary();

            foreach (KeyValuePair<string, Dictionary<Type, List<IData>>> providerPair in sortedDatas)
            {
                foreach (KeyValuePair<Type, List<IData>> interfaceTypePair in providerPair.Value)
                {
                    DataProviderPluginFacade.Delete(providerPair.Key, interfaceTypePair.Value.Select(d => d.DataSourceId));

                    if (DataCachingFacade.IsTypeCacheable(interfaceTypePair.Key))
                    {
                        DataCachingFacade.ClearCache(interfaceTypePair.Key, interfaceTypePair.Value.First().DataSourceId.DataScopeIdentifier);
                    }
                }
            }


            if (!suppressEventing)
            {
                foreach (IData element in dataset)
                {
                    DataEventSystemFacade.FireDataDeletedEvent(element.DataSourceId.InterfaceType, element);
                }
            }
        }



        public T BuildNew<T>(bool suppressEventing)
            where T : class, IData
        {
            ValidateBuildNewType(typeof(T));

            Type generatedType = DataTypeTypesManager.GetDataTypeEmptyClass(typeof(T));            

            IData data = (IData)Activator.CreateInstance(generatedType, new object[] { });

            SetNewInstanceFieldDefaultValues(data);

            if (suppressEventing == false)
            {
                DataEventSystemFacade.FireDataAfterBuildNewEvent<T>(data);
            }

            return (T)data;
        }



        public IData BuildNew(Type interfaceType, bool suppressEventling)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            ValidateBuildNewType(interfaceType);

            Type generatedType = DataTypeTypesManager.GetDataTypeEmptyClass(interfaceType);

            IData data = (IData)Activator.CreateInstance(generatedType, new object[] { });

            SetNewInstanceFieldDefaultValues(data);

            if (!suppressEventling)
            {
                DataEventSystemFacade.FireDataAfterBuildNewEvent(generatedType, data);
            }

            return data;
        }



        private void ValidateBuildNewType(Type interfaceType)
        {
            string errorMessage;

            if(!DataTypeValidationRegistry.Validate(interfaceType, null, out errorMessage))
            {
                Log.LogCritical(LogTitle, errorMessage);
                throw new InvalidOperationException(errorMessage);
            }
        }



        private void SetNewInstanceFieldDefaultValues(IData data)
        {
            Type interfaceType = data.DataSourceId.InterfaceType;
            List<PropertyInfo> properties = interfaceType.GetPropertiesRecursively();
            foreach (PropertyInfo propertyInfo in properties)
            {
                try
                {
                    var attribute = propertyInfo.GetCustomAttributesRecursively<NewInstanceDefaultFieldValueAttribute>().SingleOrDefault();
                    if (attribute == null || !attribute.HasValue) continue;
                    if (!propertyInfo.CanWrite)
                    {
                        Log.LogError(LogTitle, string.Format("The property '{0}' on the interface '{1}' has defined a standard value, but no setter", propertyInfo.Name, interfaceType));
                        continue;
                    }

                    object value = attribute.GetValue();
                    value = ValueTypeConverter.Convert(value, propertyInfo.PropertyType);

                    PropertyInfo targetPropertyInfo = data.GetType().GetProperties().Single(f => f.Name == propertyInfo.Name);
                    targetPropertyInfo.SetValue(data, value, null);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, string.Format("Failed to set the standard value on the property '{0}' on the interface '{1}'", propertyInfo.Name, interfaceType));
                    Log.LogError(LogTitle, ex);
                }
            }
        }


        public bool ExistsInAnyLocale<T>(IEnumerable<CultureInfo> excludedCultureInfoes)
            where T : class, IData
        {
            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures.Except(excludedCultureInfoes))
            {
                using (new DataScope(cultureInfo))
                {
                    bool exists = DataFacade.GetData<T>().Any();
                    if (exists)
                    {
                        return true;
                    }
                }
            }

            return false;
        }



        public bool ValidatePath<TFile>(TFile file, string providerName, out string errorMessage) 
            where TFile : IFile
        {
            return DataProviderPluginFacade.ValidatePath<TFile>(file, providerName, out errorMessage);
        }


        private static void CheckValidationResult(ValidationResults validationResults, Type interfaceType)
        {
            if (validationResults.IsValid)
            {
                return;
            }

            System.Text.StringBuilder sb = new System.Text.StringBuilder();

            foreach (ValidationResult result in validationResults)
            {
                sb.AppendLine("Field: '{0}' Error: {1}".FormatWith(result.Key, result.Message));
            }

            string msg = "The data of type '{0}' did not validate, with the following errors:\r\n{1}".FormatWith(interfaceType, sb);
            throw new InvalidOperationException(msg);
        }


        private static void OnDataChanged(object sender, DataEventArgs dataEventArgs)
        {
            _dataBySourceIdCache.Remove(dataEventArgs.Data.DataSourceId.ToString());
        }



        private static void SetChangeHistoryInformation(object sender, DataEventArgs dataEventArgs)
        {
            IChangeHistory data = dataEventArgs.Data as IChangeHistory;
            if (data != null)
            {
                data.ChangeDate = DateTime.Now;

                try
                {
                    if (UserValidationFacade.IsLoggedIn())
                    {
                        data.ChangedBy = UserValidationFacade.GetUsername();
                    }
                }
                catch
                {
                    // silent
                }
            }
        }

        private static void SetCreationHistoryInformation(object sender, DataEventArgs dataEventArgs)
        {
            ICreationHistory data = dataEventArgs.Data as ICreationHistory;
            if (data != null)
            {
                data.CreationDate = DateTime.Now;

                try
                {
                    if (UserValidationFacade.IsLoggedIn())
                    {
                        data.CreatedBy = UserValidationFacade.GetUsername();
                    }
                }
                catch
                {
                    // silent
                }
            }
        }
    }
}
