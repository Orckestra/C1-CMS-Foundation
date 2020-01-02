using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Data.Types;
using Composite.C1Console.Events;
using Composite.Core.Instrumentation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider;


namespace Composite.Data.Foundation.PluginFacades
{
    internal static class DataProviderPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        internal static Func<IDataProviderFactory> DataProviderFactoryCreationDelegate = () => new ConfigurationDataProviderFactory();


        static DataProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static bool HasConfiguration()
        {
            return ConfigurationServices.ConfigurationSource?.GetSection(DataProviderSettings.SectionName) != null;
        }



        public static IEnumerable<Type> GetSupportedInterfaces(string providerName)
        {
            using (TimerProfilerFacade.CreateTimerProfiler(providerName))
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
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    var provider = GetDataProvider<IDynamicDataProvider>(providerName);

                    List<Type> knownInterfaces = provider.GetKnownInterfaces().ToList();

                    if (knownInterfaces.Contains(null))
                    {
                        Log.LogWarning(nameof(DataProviderPluginFacade), $"Data Provider '{providerName}' returned (null) as a known interface type. Value is ignored.");
                        knownInterfaces.RemoveAll(f => f == null);
                    }

                    return knownInterfaces;
                }
            }
        }


        public static IEnumerable<Type> GetGeneratedInterfaces(string providerName)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    var provider = GetDataProvider<IGeneratedTypesDataProvider>(providerName);

                    return provider.GetGeneratedInterfaces();
                }
            }
        }


        public static IQueryable<T> GetData<T>(string providerName)
            where T : class, IData
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                return Call<IDataProvider, IQueryable<T>>(providerName, provider => provider.GetData<T>());
            }
        }



        public static T GetData<T>(string providerName, IDataId dataId)
             where T : class, IData
        {
            Verify.ArgumentNotNull(dataId, "dataId");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                return Call<IDataProvider, T>(providerName, provider => provider.GetData<T>(dataId));
            }
        }



        public static void Update(string providerName, IEnumerable<IData> dataset)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
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
            CreateStores(providerName, new[] { typeDescriptor });
        }

        public static void CreateStores(string providerName, IReadOnlyCollection<DataTypeDescriptor> typeDescriptors)
        {
            Verify.ArgumentNotNull(typeDescriptors, "typeDescriptors");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    var provider = GetDataProvider<IDynamicDataProvider>(providerName);

                    provider.CreateStores(typeDescriptors);
                }
            }

        }


        public static void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceCompile)
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    var provider = GetDataProvider<IDynamicDataProvider>(updateDataTypeDescriptor.ProviderName);

                    provider.AlterStore(updateDataTypeDescriptor, forceCompile);
                }
            }
        }


        public static void DropStore(string providerName, DataTypeDescriptor typeDescriptor)
        {
            Verify.ArgumentNotNull(typeDescriptor, "typeDescriptor");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                using (_resourceLocker.Locker)
                {
                    var provider = GetDataProvider<IDynamicDataProvider>(providerName);

                    provider.DropStore(typeDescriptor);
                }
            }
        }


        public static void AddLocale(string providerName, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNull(cultureInfo, "cultureInfo");

            using (_resourceLocker.Locker)
            {
                var provider = GetDataProvider<ILocalizedDataProvider>(providerName);

                provider.AddLocale(cultureInfo);
            }
        }



        public static void RemoveLocale(string providerName, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNull(cultureInfo, "cultureInfo");

            using (_resourceLocker.Locker)
            {
                var provider = GetDataProvider<ILocalizedDataProvider>(providerName);

                provider.RemoveLocale(cultureInfo);
            }
        }

        private static TResult Call<TProvider, TResult>(string providerName, Func<TProvider, TResult> func)
            where TProvider : class, IDataProvider
            where TResult : class
        {
            var provider = GetDataProvider(providerName) as TProvider
                ?? throw new InvalidOperationException($"The data provider '{providerName}' does not implement the interface '{typeof(TProvider).FullName}'");

            return func(provider);
        }

        private static void SyncronizedCall<TProvider>(string providerName, Action<TProvider> func) where TProvider : class, IDataProvider
        {
            SyncronizedCall<TProvider, object>(providerName, provider =>
            {
                func(provider);
                return null;
            });
        }

        private static TResult SyncronizedCall<TProvider, TResult>(string providerName, Func<TProvider, TResult> func)
            where TProvider : class, IDataProvider
            where TResult : class
        {
            var provider = GetDataProvider(providerName) as TProvider
                ?? throw new InvalidOperationException($"The data provider '{providerName}' does not implement the interface '{typeof(TProvider).FullName}'");

            // DDZ: hardcoded for now, to be fixed
            bool syncDisabled = provider is SqlDataProvider;

            IDisposable scope = null;
            try
            {
                if (!syncDisabled)
                {
                    scope = _resourceLocker.Locker;
                }

                return func(provider);
            }
            finally
            {
                scope?.Dispose();
            }
        }

        public static bool IsWriteableProvider(string providerName)
        {
            return GetDataProvider(providerName) is IWritableDataProvider;
        }


        public static bool IsDynamicProvider(string providerName)
        {
            return GetDataProvider(providerName) is IDynamicDataProvider;
        }


        public static bool IsGeneratedTypesProvider(string providerName)
        {
            return GetDataProvider(providerName) is IGeneratedTypesDataProvider;
        }


        public static bool IsLocalizedDataProvider(string providerName)
        {
            return GetDataProvider(providerName) is ILocalizedDataProvider;
        }

        /// <summary>
        /// Indicates whether it has sense to cache the query results.
        /// </summary>
        /// <returns></returns>
        public static bool AllowsResultsWrapping(string providerName)
        {
            var dataProvider = GetDataProvider(providerName);

            return (dataProvider as ISupportCachingDataProvider)?.AllowResultsWrapping ?? true;
        }


        private static T GetDataProvider<T>(string providerName) where T : class, IDataProvider
        {
            var provider = GetDataProvider(providerName) as T;

            return provider ?? throw new InvalidOperationException($"The data provider '{providerName}' does not implement the interface '{typeof(T)}'"); ;
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
                catch (Exception ex) when (ex is ArgumentException || ex is ConfigurationErrorsException)
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


        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException($"Failed to load the configuration section '{DataProviderSettings.SectionName}' from the configuration.", ex);
        }



        private sealed class Resources
        {
            public IDataProviderFactory Factory { get; private set; }
            public Hashtable<string, IDataProvider> ProviderCache { get; private set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = DataProviderFactoryCreationDelegate();
                }
                catch (Exception ex) when (ex is NullReferenceException || ex is ConfigurationErrorsException)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Hashtable<string, IDataProvider>();
            }
        }
    }
}