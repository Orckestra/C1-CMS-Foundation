using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.C1Console.Events;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Data.Types;


namespace Composite.Data.Foundation.PluginFacades
{
    internal static class DataProviderPluginFacade
    {
        internal static string UnittestDataProviderName { get { return "FallbackUnittestMemoryDataProvider"; } }

        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        internal static Func<IDataProviderFactory> DataProviderFactoryCreationDelegate = () => new ConfigurationDataProviderFactory();


        static DataProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool HasConfiguration()
        {
            return (ConfigurationServices.ConfigurationSource != null) &&
                   (ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName) != null);
        }



        public static IEnumerable<Type> GetSupportedInterfaces(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler(providerName))
            {
                using (_resourceLocker.Locker)
                {
                    IDataProvider provider = GetDataProvider(providerName);

                    return provider.GetSupportedInterfaces();
                }
            }
        }



        public static IEnumerable<Type> GetKnownInterfaces(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IDynamicDataProvider provider = GetDynamicDataProvider(providerName);

                    List<Type> knownInterfaces = provider.GetKnownInterfaces().ToList();

                    if (knownInterfaces.Contains(null))
                    {
                        LoggingService.LogWarning("DataProviderPluginFacade", string.Format("Data Provider '{0}' returned (null) as a known interface type. Value is ignored.", providerName));
                        knownInterfaces.RemoveAll(f => f == null);
                    }

                    return knownInterfaces;
                }
            }
        }



        public static IEnumerable<Type> GetGeneratedInterfaces(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IGeneratedTypesDataProvider provider = GetGeneratedTypesDataProvider(providerName);

                    return provider.GetGeneratedInterfaces();
                }
            }
        }



        public static IQueryable<T> GetData<T>(string providerName)
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                return SyncronizedCall<IDataProvider, IQueryable<T>>(providerName, provider => provider.GetData<T>());
            }
        }



        public static T GetData<T>(string providerName, IDataId dataId)
             where T : class, IData
        {
            Verify.ArgumentNotNull(dataId, "dataId");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                return SyncronizedCall<IDataProvider, T>(providerName, provider => provider.GetData<T>(dataId));
            }
        }



        public static void Update(string providerName, IEnumerable<IData> dataset)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                IData firstData = dataset.FirstOrDefault();
                if (firstData == null) return;

                SyncronizedCall<IWritableDataProvider>(providerName, provider => provider.Update(dataset));
            }
        }



        public static List<T> AddNew<T>(string providerName, IEnumerable<T> dataset)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                return SyncronizedCall<IWritableDataProvider, List<T>>(providerName, provider => provider.AddNew<T>(dataset));
            }
        }



        public static void Delete(string providerName, IEnumerable<DataSourceId> dataSourceIds)
        {
            Verify.ArgumentNotNull(dataSourceIds, "dataSourceIds");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                DataSourceId firstDataSourceId = dataSourceIds.FirstOrDefault();
                if (firstDataSourceId == null) return;

                SyncronizedCall<IWritableDataProvider>(providerName, provider => provider.Delete(dataSourceIds));
            }
        }



        public static bool ValidatePath<TFile>(TFile file, string providerName, out string errorMessage)
            where TFile : IFile
        {
            Verify.ArgumentNotNull(file, "dataSourceIds");

            string message = null;
            bool result = false;
            SyncronizedCall<IFileSystemDataProvider>(providerName, provider => result = provider.ValidatePath<TFile>(file, out message));

            errorMessage = message;

            return result;
        }


        public static void CreateStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (null == typeDescriptor) throw new ArgumentNullException("typeDescriptor");

                using (_resourceLocker.Locker)
                {
                    IDynamicDataProvider provider = GetDynamicDataProvider(providerName);

                    provider.CreateStore(typeDescriptor);
                }
            }
        }



        public static void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (null == changeDescriptor) throw new ArgumentNullException("changeDescriptor");

                using (_resourceLocker.Locker)
                {
                    IDynamicDataProvider provider = GetDynamicDataProvider(providerName);

                    provider.AlterStore(changeDescriptor);
                }
            }
        }



        public static void DropStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (null == typeDescriptor) throw new ArgumentNullException("typeDescriptor");

                using (_resourceLocker.Locker)
                {
                    IDynamicDataProvider provider = GetDynamicDataProvider(providerName);

                    provider.DropStore(typeDescriptor);
                }
            }
        }



        public static void AddLocale(string providerName, CultureInfo cultureInfo)
        {
            if (null == cultureInfo) throw new ArgumentNullException("cultureInfo");

            using (_resourceLocker.Locker)
            {
                ILocalizedDataProvider provider = GetLocalizedDataProvider(providerName);

                provider.AddLocale(cultureInfo);
            }
        }



        public static void RemoveLocale(string providerName, CultureInfo cultureInfo)
        {
            if (null == cultureInfo) throw new ArgumentNullException("cultureInfo");

            using (_resourceLocker.Locker)
            {
                ILocalizedDataProvider provider = GetLocalizedDataProvider(providerName);

                provider.RemoveLocale(cultureInfo);
            }
        }

        private delegate void SyncronizedCallDelegate<T>(T provider) where T : class, IDataProvider;
        private delegate TResult SyncronizedCallDelegate<T, TResult>(T provider)
            where T : class, IDataProvider
            where TResult : class;

        private static void SyncronizedCall<TProvider>(string providerName, SyncronizedCallDelegate<TProvider> func) where TProvider : class, IDataProvider
        {
            SyncronizedCall<TProvider, object>(providerName, provider =>
                                                               {
                                                                   func(provider);
                                                                   return null;
                                                               });
        }

        private static TResult SyncronizedCall<TProvider, TResult>(string providerName, SyncronizedCallDelegate<TProvider, TResult> func)
            where TProvider : class, IDataProvider
            where TResult : class
        {
            IDataProvider provider = GetDataProvider(providerName);

            Verify.That(provider is TProvider, "The data provider {0} does not implement the interface {1}", providerName, typeof(TProvider).FullName);

            // DDZ: hardcoded for now, to be fixed
            bool syncDisabled = provider.GetType().Name == "SqlDataProvider";

            IDisposable scope = null;
            try
            {
                if (!syncDisabled)
                {
                    scope = _resourceLocker.Locker;
                }

                return (TResult)func(provider as TProvider);
            }
            finally
            {
                if (scope != null)
                {
                    scope.Dispose();
                }
            }
        }

        public static bool IsWriteableProvider(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IDataProvider dataProvider = GetDataProvider(providerName);

                    return (dataProvider is IWritableDataProvider);
                }
            }
        }



        public static bool IsDynamicProvider(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IDataProvider dataProvider = GetDataProvider(providerName);

                    return (dataProvider is IDynamicDataProvider);
                }
            }
        }



        public static bool IsGeneratedTypesProvider(string providerName)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IDataProvider dataProvider = GetDataProvider(providerName);

                    return (dataProvider is IGeneratedTypesDataProvider);
                }
            }
        }



        public static bool IsLocalizedDataProvider(string providerName)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    IDataProvider dataProvider = GetDataProvider(providerName);

                    return (dataProvider is ILocalizedDataProvider);
                }
            }
        }

        /// <summary>
        /// Indicates whether it has sense to cache the query results.
        /// </summary>
        /// <returns></returns>
        public static bool AllowsResultsWrapping(string providerName)
        {
            IDataProvider dataProvider = GetDataProvider(providerName);

            return dataProvider != null && ((dataProvider is ISupportCachingDataProvider) == false
                                               || (dataProvider as ISupportCachingDataProvider).AllowResultsWrapping);
        }


        private static IDynamicDataProvider GetDynamicDataProvider(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                IDataProvider provider = GetDataProvider(providerName);

                if (false == (provider is IDynamicDataProvider))
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} does not implement the interface {1}", providerName, typeof(IDynamicDataProvider)));
                }

                return provider as IDynamicDataProvider;
            }
        }



        private static IWritableDataProvider GetWritableDataProvider(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                IDataProvider provider = GetDataProvider(providerName);

                if (false == (provider is IWritableDataProvider))
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} does not implement the interface {1}", providerName, typeof(IWritableDataProvider)));
                }

                return provider as IWritableDataProvider;
            }
        }



        private static IGeneratedTypesDataProvider GetGeneratedTypesDataProvider(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                IDataProvider provider = GetDataProvider(providerName);

                if (false == (provider is IGeneratedTypesDataProvider))
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} does not implement the interface {1}", providerName, typeof(IGeneratedTypesDataProvider)));
                }

                return provider as IGeneratedTypesDataProvider;
            }
        }



        private static ILocalizedDataProvider GetLocalizedDataProvider(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                IDataProvider provider = GetDataProvider(providerName);

                if (false == (provider is ILocalizedDataProvider))
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} does not implement the interface {1}", providerName, typeof(ILocalizedDataProvider)));
                }

                return provider as ILocalizedDataProvider;
            }
        }



        internal static IDataProvider GetDataProvider(string providerName)
        {
            IDataProvider dataProvider = _resourceLocker.Resources.ProviderCache[providerName];

            if (dataProvider != null)
            {
                return dataProvider;
            }

            using (_resourceLocker.Locker)
            {
                dataProvider = _resourceLocker.Resources.ProviderCache[providerName];

                if (dataProvider != null)
                {
                    return dataProvider;
                }

                try
                {
                    dataProvider = _resourceLocker.Resources.Factory.Create(providerName);

                    dataProvider.Context = new DataProviderContext(providerName);

                    _resourceLocker.Resources.ProviderCache.Add(providerName, dataProvider);
                }
                catch (ArgumentException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }
            }

            return dataProvider;
        }



        internal static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", DataProviderSettings.SectionName), ex);
        }



        private static IDataProvider BuildFallbackUnittestDataProvider()
        {
            Composite.Plugins.Data.DataProviders.MemoryDataProvider.MemoryDataProvider provider = new Composite.Plugins.Data.DataProviders.MemoryDataProvider.MemoryDataProvider();

            foreach (Type interfaceType in DataStoreExistenceVerifier.InterfaceTypes)
            {
                Dictionary<string, Type> dataIdProperties = interfaceType.GetKeyPropertyInfoes().ToDictionary(f => f.Name, f => f.PropertyType);
                List<string> dataScopes = interfaceType.GetSupportedDataScopes().Select(f => f.Name).Distinct().ToList();

                provider.AddSupportedInterface(interfaceType, dataIdProperties, dataScopes);
            }

            return provider;
        }



        private sealed class Resources
        {
            public IDataProviderFactory Factory { get; set; }
            public Hashtable<string, IDataProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = DataProviderFactoryCreationDelegate();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Hashtable<string, IDataProvider>();
            }
        }
    }
}
