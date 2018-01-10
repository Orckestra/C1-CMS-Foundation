using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Configuration;

using ScopeKey = System.Tuple<Composite.Data.DataScopeIdentifier, System.Globalization.CultureInfo>;

using TypeData = System.Collections.Concurrent.ConcurrentDictionary<
    System.Tuple<Composite.Data.DataScopeIdentifier, System.Globalization.CultureInfo>,
    Composite.Data.Caching.CachedTable>;

namespace Composite.Data.Caching
{
    /// <summary>
    /// Provide information about data caching and means to flush data from the active cache.
    /// </summary>
    public static class DataCachingFacade
    {
        private static readonly string CacheName = "DataAccess";

        private static readonly ConcurrentDictionary<Type, TypeData> _cachedData = new ConcurrentDictionary<Type, TypeData>();
        private static readonly ConcurrentDictionary<Type, byte> _disabledTypes = new ConcurrentDictionary<Type, byte>();

        private static bool _isEnabled = true;
        private static int _maximumSize = -1;
        private static MethodInfo _queryableTakeMathodInfo;


        static DataCachingFacade()
        {
            ReadSettings();
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
            DataEvents<IData>.OnStoreChanged += (sender, args) =>
            {
                if (!args.DataEventsFired)
                {
                    ClearCache(args.DataType, args.PublicationScope, args.Locale);
                }
            };
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

            var dataScopeIdentifier = DataScopeManager.MapByType(typeof(T));
            var localizationScope = LocalizationScopeManager.MapByType(typeof(T));

            var typeData = _cachedData.GetOrAdd(typeof(T), t => new TypeData());

            var cacheKey = new Tuple<DataScopeIdentifier, CultureInfo>(dataScopeIdentifier, localizationScope);

            CachedTable cachedTable;
            if (!typeData.TryGetValue(cacheKey, out cachedTable))
            {
                IQueryable<T> wholeTable = getQueryFunc();

                if(!DataProvidersSupportDataWrapping(typeof(T)))
                {
                    DisableCachingForType(typeof(T));

                    return Verify.ResultNotNull(wholeTable);
                }

                if(_maximumSize != -1)
                {
                    List<T> cuttedTable = TakeElements(wholeTable, _maximumSize + 1).Cast<T>().ToList();
                    if(cuttedTable.Count > _maximumSize)
                    {
                        DisableCachingForType(typeof (T));

                        return Verify.ResultNotNull(wholeTable);
                    }
                    cachedTable = new CachedTable<T>(cuttedTable);
                }
                else
                {
                    cachedTable = new CachedTable<T>(wholeTable.ToList());
                }

                typeData[cacheKey] = cachedTable;
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
            ClearCache(interfaceType, DataScopeIdentifier.FromPublicationScope(publicationScope));
        }


        /// <summary>
        /// Flush cached data for a data type in the specified data scope.
        /// </summary>
        /// <param name="interfaceType">The type of data to flush from the cache</param>
        /// <param name="publicationScope">The publication scope to flush</param>
        /// <param name="localizationScope">The localization scope to flush</param>
        public static void ClearCache(Type interfaceType, PublicationScope publicationScope, CultureInfo localizationScope)
        {
            ClearCache(interfaceType, DataScopeIdentifier.FromPublicationScope(publicationScope), localizationScope);
        }

        /// <summary>
        /// Flush cached data for a data type in the specified data scope.
        /// </summary>
        /// <param name="interfaceType">The type of data to flush from the cache</param>
        /// <param name="dataScopeIdentifier">The data scope to flush</param>
        public static void ClearCache(Type interfaceType, DataScopeIdentifier dataScopeIdentifier)
        {
            TypeData typeData;
            if(!_cachedData.TryGetValue(interfaceType, out typeData)) return;

            dataScopeIdentifier = dataScopeIdentifier ?? DataScopeManager.MapByType(interfaceType);

            var toRemove = typeData.Keys.Where(key => key.Item1 == dataScopeIdentifier).ToList();

            foreach (var key in toRemove)
            {
                CachedTable value;
                typeData.TryRemove(key, out value);
            }
        }


        /// <summary>
        /// Removes the specified data collection from the cache. 
        /// </summary>
        /// <param name="dataset"></param>
        internal static void RemoveDataFromCache(IReadOnlyCollection<IData> dataset)
        {
            UpdateCachedTables(dataset, (table, data) => table.Remove(data));
        }

        /// <summary>
        /// Removes the specified data collection from the cache. 
        /// </summary>
        /// <param name="dataset"></param>
        internal static void UpdateCachedData(IReadOnlyCollection<IData> dataset)
        {
            UpdateCachedTables(dataset, (table, data) => table.Update(data));
        }

        /// <summary>
        /// Adds the specified data collection to the cache. 
        /// </summary>
        /// <param name="dataset"></param>
        internal static void AddDataToCache(IReadOnlyCollection<IData> dataset)
        {
            UpdateCachedTables(dataset, (table, data) => table.Add(data));
        }

        internal static void UpdateCachedTables(
            IReadOnlyCollection<IData> dataset,
            Func<CachedTable, IEnumerable<IData>, bool> action)
        {
            if (dataset.Count == 0) return;

            var groupedData = from data in dataset
                let ds = data.DataSourceId
                group data by new
                {
                    ds.InterfaceType,
                    ds.DataScopeIdentifier,
                    ds.LocaleScope
                };

            foreach (var group in groupedData)
            {
                TypeData typeData;
                if (!_cachedData.TryGetValue(group.Key.InterfaceType, out typeData))
                {
                    continue;
                }

                var scopeKey = new ScopeKey(group.Key.DataScopeIdentifier, group.Key.LocaleScope);
                CachedTable cachedTable;
                if (!typeData.TryGetValue(scopeKey, out cachedTable))
                {
                    continue;
                }

                bool success = action(cachedTable, group);
                if (!success)
                {
                    var key = group.Key;
                    Log.LogError(nameof(DataCachingFacade), $"Cache out of sync for type '{key.InterfaceType}' scope '{key.DataScopeIdentifier}' culture '{key.LocaleScope}'");

                    ClearCache(key.InterfaceType, key.DataScopeIdentifier, key.LocaleScope);
                }
            }

            // TODO: clear cache on transaction rollback?
        }

        internal static void ClearCache(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo localizationScope)
        {
            TypeData typeData;
            if (!_cachedData.TryGetValue(interfaceType, out typeData)) return;

            dataScopeIdentifier = dataScopeIdentifier ?? DataScopeManager.MapByType(interfaceType);
            localizationScope = localizationScope ?? LocalizationScopeManager.MapByType(interfaceType);

            var key = new Tuple<DataScopeIdentifier, CultureInfo>(dataScopeIdentifier, localizationScope);

            CachedTable value;
            typeData.TryRemove(key, out value);
        }


        /// <summary>
        /// This method is also called by the DataFacade
        /// </summary>
        internal static void Flush()
        {
            _cachedData.Clear();
            _disabledTypes.Clear();
        }



        private static void ReadSettings()
        {
            CachingSettings cachingSettings = GlobalSettingsFacade.GetNamedCaching(CacheName);
            _isEnabled = cachingSettings.Enabled;
            _maximumSize = cachingSettings.Size;
        }


        
        private static IQueryable TakeElements(IQueryable queryable, int count)
        {
            MethodInfo method = GetQueryableTakeMethodInfo(queryable.ElementType);

            var resultTable = (IQueryable) method.Invoke(null, new object[] {queryable, count});

            return resultTable;
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
            _disabledTypes.TryAdd(type, 0);

            TypeData data;
            _cachedData.TryRemove(type, out data);
        }
    }
}
