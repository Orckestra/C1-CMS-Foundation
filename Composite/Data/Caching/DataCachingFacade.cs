using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.Types;


namespace Composite.Data.Caching
{
    internal static class DataCachingFacade
    {
        private static readonly string CacheName = "DataAccess";
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        private static bool _isEnabled = true;
        private static int _maximumSize = -1;
        private static Hashtable _disabledTypes = new Hashtable();
        private static MethodInfo _queryableTakeMathodInfo;


        static DataCachingFacade()
        {
            ReadSettings();
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        public static bool Enabled
        {
            get
            {
                return _isEnabled;
            }
        }


        public static bool IsTypeCacheble(Type interfaceType)
        {
            DataTypeDescriptor dataTypeDescriptor;

            return _isEnabled
                   && (DataAttributeFacade.GetCachingType(interfaceType) == CachingType.Full
                  || (interfaceType.GetCustomInterfaceAttributes<ImmutableTypeIdAttribute>().Any()
                    && DynamicTypeManager.TryGetDataTypeDescriptor(interfaceType, out dataTypeDescriptor)
                    && dataTypeDescriptor.Cachable));
        }

        public static bool IsDataAccessCacheEnabled(Type interfaceType)
        {
            return IsTypeCacheble(interfaceType) && !_disabledTypes.ContainsKey(interfaceType);
        }


        public static IQueryable<T> GetDataFromCache<T>()
            where T : class, IData
        {
            Verify.That(_isEnabled, "The cache is disabled.");

            DataScopeIdentifier dataScopeIdentifier = DataScopeManager.MapByType(typeof(T));
            CultureInfo localizationScope = LocalizationScopeManager.MapByType(typeof(T));

            var cachedDataset = _resourceLocker.Resources.CachedData;

            Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, IQueryable>> dataScopeData;
            if (!cachedDataset.TryGetValue(typeof(T), out dataScopeData))
            {
                using (_resourceLocker.Locker)
                {
                    if (cachedDataset.TryGetValue(typeof(T), out dataScopeData) == false)
                    {
                        dataScopeData = new Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, IQueryable>>();

                        cachedDataset.Add(typeof(T), dataScopeData);
                    }
                }
            }

            Hashtable<CultureInfo, IQueryable> localizationScopeData;
            if (dataScopeData.TryGetValue(dataScopeIdentifier, out localizationScopeData) == false)
            {
                using (_resourceLocker.Locker)
                {
                    if (dataScopeData.TryGetValue(dataScopeIdentifier, out localizationScopeData) == false)
                    {
                        localizationScopeData = new Hashtable<CultureInfo, IQueryable>();
                        dataScopeData.Add(dataScopeIdentifier, localizationScopeData);
                    }
                }
            }

            IQueryable cachedData;
            if (localizationScopeData.TryGetValue(localizationScope, out cachedData) == false)
            {
                IQueryable wholeTable = DataFacade.GetData<T>(false, null);

                if(!DataProvidersSupportDataWrapping(typeof(T)))
                {
                    DisableCachingForType(typeof(T));

                    return Verify.ResultNotNull(wholeTable as IQueryable<T>);
                }

                if(_maximumSize != -1)
                {
                    List<IData> cuttedTable = TakeElements(wholeTable, _maximumSize + 1);
                    if(cuttedTable.Count > _maximumSize)
                    {
                        DisableCachingForType(typeof (T));

                        return Verify.ResultNotNull(wholeTable as IQueryable<T>);
                    } 
                    cachedData = cuttedTable.Cast<T>().AsQueryable();

                }
                else
                {
                    cachedData = wholeTable.ToDataList().Cast<T>().AsQueryable();
                }

                using (_resourceLocker.Locker)
                {
                    if (localizationScopeData.ContainsKey(localizationScope) == false)
                    {
                        localizationScopeData.Add(localizationScope, cachedData);
                    }
                }
            }

            var typedData = cachedData as IQueryable<T>;
            Verify.IsNotNull(typedData, "Cached value is invalid.");

            // Leaving a posibility to extract original query
            Func<IQueryable> originalQueryGetter = () =>
            {
                using (new DataScope(dataScopeIdentifier, localizationScope))
                {
                    return DataFacade.GetData<T>(false);
                }
            };

            return new CachingQueryable<T>(typedData, originalQueryGetter);
        }

        private static bool DataProvidersSupportDataWrapping(Type T)
        {
            var providerNames = DataProviderRegistry.GetDataProviderNamesByInterfaceType(T);
            Verify.IsNotNull(providerNames, "Failed to get data provider names list");

            foreach(string providerName in providerNames)
            {
                if(!DataProviderPluginFacade.AllowsResultsWrapping(providerName)) return false;
            }

            return true;
        }


        [Obsolete("This method isn't used any more.")]
        public static T GetDataFromCache<T>(DataSourceId dataSourceId)
            where T : class, IData
        {
            List<T> datas =
                (from d in GetDataFromCache<T>()
                 where d.DataSourceId.DataId.CompareTo(dataSourceId.DataId) == true &&
                        d.DataSourceId.ProviderName == dataSourceId.ProviderName 
                 select d).ToList();

            if (datas.Count == 0)
            {
                return null;
            }
            else if (datas.Count == 1)
            {
                return datas[0];
            }

            throw new InvalidOperationException("More than one data item matched the given data id");
        }


        public static void ClearCache(Type interfaceType)
        {
            ClearCache(interfaceType, null);
        }


        public static void ClearCache(Type interfaceType, DataScopeIdentifier dataScopeIdentifier)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.CachedData.ContainsKey(interfaceType) == true)
                {
                    if (dataScopeIdentifier == null)
                    {
                        dataScopeIdentifier = DataScopeManager.MapByType(interfaceType);
                    }

                    if (_resourceLocker.Resources.CachedData[interfaceType].ContainsKey(dataScopeIdentifier) == true)
                    {
                        _resourceLocker.Resources.CachedData[interfaceType].Remove(dataScopeIdentifier);

                        if (_resourceLocker.Resources.CachedData[interfaceType].Count == 0)
                        {
                            _resourceLocker.Resources.CachedData.Remove(interfaceType);
                        }
                    }
                }
            }
        }


        /// <summary>
        /// This method is also called by the DataFacade
        /// </summary>
        internal static void Flush()
        {
            _resourceLocker.ResetInitialization();
            _disabledTypes = new Hashtable();
        }



        private static void ReadSettings()
        {
            CachingSettings cachingSettings = GlobalSettingsFacade.GetNamedCaching(CacheName);
            _isEnabled = cachingSettings.Enabled;
            _maximumSize = cachingSettings.Size;
        }


        
        private static List<IData> TakeElements(IQueryable queryable, int count)
        {
            MethodInfo method = GetQueryableTakeMethodInfo(queryable.ElementType);

            var resultTable = (IQueryable) method.Invoke(null, new object[] {queryable, count});

            return resultTable.ToDataList();
        }

        private static MethodInfo GetQueryableTakeMethodInfo(Type type)
        {
            if(_queryableTakeMathodInfo == null)
            {
                _queryableTakeMathodInfo = (from method in typeof(Queryable).GetMethods(BindingFlags.Static | BindingFlags.Public)
                              where method.Name == "Take" &&
                              method.IsGenericMethod
                              select method).First();
            }
            return _queryableTakeMathodInfo.MakeGenericMethod(type);
        }

        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
            ReadSettings();
        }

        private static void DisableCachingForType(Type type)
        {
            lock (_disabledTypes)
            {
                if (!_disabledTypes.ContainsKey(type))
                {
                    _disabledTypes.Add(type, string.Empty);
                }
            }
        }

        private sealed class Resources
        {
            public Hashtable<Type, Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, IQueryable>>> CachedData { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.CachedData = new Hashtable<Type, Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, IQueryable>>>();
            }
        }
    }
}
