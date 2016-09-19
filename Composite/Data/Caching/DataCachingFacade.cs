using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.Core.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.Core.Configuration;


namespace Composite.Data.Caching
{
    /// <summary>
    /// Provide information about data caching and means to flush data from the active cache.
    /// </summary>
    public static class DataCachingFacade
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
            DataEvents<IData>.OnStoreChanged += (sender, args) =>
            {
                if (!args.DataEventsFired)
                {
                    ClearCache(args.DataType, args.PublicationScope);
                }
            };
        }


        /// <summary>
        /// Cached table
        /// </summary>
        public class CachedTable
        {
            /// <summary>
            /// Initializes a new instance of the <see cref="CachedTable"/> class.
            /// </summary>
            /// <param name="queryable">The queryable.</param>
            public CachedTable(IQueryable queryable)
            {
                Queryable = queryable;
            }

            /// <summary>
            /// The queryable data
            /// </summary>
            public IQueryable Queryable;

            /// <summary>
            /// Row by key table
            /// </summary>
            public Dictionary<object, IEnumerable<IData>> RowsByKey;
        }

        /// <summary>
        /// Gets a value indicating if data caching is enabled
        /// </summary>
        public static bool Enabled => _isEnabled;


        /// <summary>
        /// Gets a value indicating if data caching is possible for a specific data type
        /// </summary>
        /// <param name="interfaceType">The data type to check</param>
        /// <returns>True if caching is possible</returns>
        public static bool IsTypeCacheable(Type interfaceType)
        {
            Guid dataTypeId;
            DataTypeDescriptor dataTypeDescriptor;

            return _isEnabled
                   && (DataAttributeFacade.GetCachingType(interfaceType) == CachingType.Full
                   || (interfaceType.TryGetImmutableTypeId(out dataTypeId)
                    && DynamicTypeManager.TryGetDataTypeDescriptor(interfaceType, out dataTypeDescriptor)
                    && dataTypeDescriptor.Cachable));
        }


        /// <summary>
        /// Gets a value indicating if data caching is enabled for a specific data type
        /// </summary>
        /// <param name="interfaceType">The data type to check</param>
        /// <returns>True if caching is enabled</returns>
        public static bool IsDataAccessCacheEnabled(Type interfaceType)
        {
            return IsTypeCacheable(interfaceType) && !_disabledTypes.ContainsKey(interfaceType);
        }



        /// <exclude />
        internal static IQueryable<T> GetDataFromCache<T>(Func<IQueryable<T>> getQueryFunc)
            where T : class, IData
        {
            Verify.That(_isEnabled, "The cache is disabled.");

            DataScopeIdentifier dataScopeIdentifier = DataScopeManager.MapByType(typeof(T));
            CultureInfo localizationScope = LocalizationScopeManager.MapByType(typeof(T));

            var cachedDataset = _resourceLocker.Resources.CachedData;

            Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, CachedTable>> dataScopeData;
            if (!cachedDataset.TryGetValue(typeof(T), out dataScopeData))
            {
                using (_resourceLocker.Locker)
                {
                    if (!cachedDataset.TryGetValue(typeof(T), out dataScopeData))
                    {
                        dataScopeData = new Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, CachedTable>>();

                        cachedDataset.Add(typeof(T), dataScopeData);
                    }
                }
            }

            Hashtable<CultureInfo, CachedTable> localizationScopeData;
            if (!dataScopeData.TryGetValue(dataScopeIdentifier, out localizationScopeData))
            {
                using (_resourceLocker.Locker)
                {
                    if (!dataScopeData.TryGetValue(dataScopeIdentifier, out localizationScopeData))
                    {
                        localizationScopeData = new Hashtable<CultureInfo, CachedTable>();
                        dataScopeData.Add(dataScopeIdentifier, localizationScopeData);
                    }
                }
            }

            CachedTable cachedTable;
            if (!localizationScopeData.TryGetValue(localizationScope, out cachedTable))
            {
                IQueryable<T> wholeTable = getQueryFunc();

                if(!DataProvidersSupportDataWrapping(typeof(T)))
                {
                    DisableCachingForType(typeof(T));

                    return Verify.ResultNotNull(wholeTable);
                }

                if(_maximumSize != -1)
                {
                    List<IData> cuttedTable = TakeElements(wholeTable, _maximumSize + 1);
                    if(cuttedTable.Count > _maximumSize)
                    {
                        DisableCachingForType(typeof (T));

                        return Verify.ResultNotNull(wholeTable);
                    }
                    cachedTable = new CachedTable(cuttedTable.Cast<T>().AsQueryable());

                }
                else
                {
                    cachedTable = new CachedTable(wholeTable.Evaluate().AsQueryable());
                }

                using (_resourceLocker.Locker)
                {
                    if (!localizationScopeData.ContainsKey(localizationScope))
                    {
                        localizationScopeData.Add(localizationScope, cachedTable);
                    }
                }
            }

            var typedData = cachedTable.Queryable as IQueryable<T>;
            Verify.IsNotNull(typedData, "Cached value is invalid.");

            // Leaving a possibility to extract original query
            Func<IQueryable> originalQueryGetter = () =>
            {
                using (new DataScope(dataScopeIdentifier, localizationScope))
                {
                    return getQueryFunc();
                }
            };

            return new CachingQueryable<T>(cachedTable, originalQueryGetter);
        }


        
        private static bool DataProvidersSupportDataWrapping(Type T)
        {
            var providerNames = DataProviderRegistry.GetDataProviderNamesByInterfaceType(T);
            Verify.IsNotNull(providerNames, "Failed to get data provider names list");

            return providerNames.All(DataProviderPluginFacade.AllowsResultsWrapping);
        }



        /// <summary>
        /// Flush cached data for a data type in the current data scope.
        /// </summary>
        /// <param name="interfaceType">The type of data to flush from the cache</param>
        public static void ClearCache(Type interfaceType)
        {
            ClearCache(interfaceType, null);
        }


        /// <summary>
        /// Flush cached data for a data type in the specified data scope.
        /// </summary>
        /// <param name="interfaceType">The type of data to flush from the cache</param>
        /// <param name="publicationScope">The publication scope to flush</param>
        public static void ClearCache(Type interfaceType, PublicationScope publicationScope)
        {
            ClearCache(interfaceType,DataScopeIdentifier.FromPublicationScope(publicationScope));
        }


        /// <summary>
        /// Flush cached data for a data type in the specified data scope.
        /// </summary>
        /// <param name="interfaceType">The type of data to flush from the cache</param>
        /// <param name="dataScopeIdentifier">The data scope to flush</param>
        public static void ClearCache(Type interfaceType, DataScopeIdentifier dataScopeIdentifier)
        {
            using (_resourceLocker.Locker)
            {
                var cachedData = _resourceLocker.Resources.CachedData;

                if (!cachedData.ContainsKey(interfaceType))
                {
                    return;
                }

                if (dataScopeIdentifier == null)
                {
                    dataScopeIdentifier = DataScopeManager.MapByType(interfaceType);
                }

                if (cachedData[interfaceType].ContainsKey(dataScopeIdentifier))
                {
                    cachedData[interfaceType].Remove(dataScopeIdentifier);

                    if (cachedData[interfaceType].Count == 0)
                    {
                        cachedData.Remove(interfaceType);
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
                              where method.Name == nameof(Queryable.Take) &&
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
            public Hashtable<Type, Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, CachedTable>>> CachedData { get; private set; }

            public static void Initialize(Resources resources)
            {
                resources.CachedData = new Hashtable<Type, Hashtable<DataScopeIdentifier, Hashtable<CultureInfo, CachedTable>>>();
            }
        }
    }
}
