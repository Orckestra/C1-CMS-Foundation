using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.C1Console.Actions.Plugins.DataActionProvider;
using Composite.C1Console.Actions.Plugins.DataActionProvider.Runtime;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.C1Console.Events;


namespace Composite.C1Console.Actions.Foundation.PluginFacades
{
    internal static class DataActionProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static DataActionProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IDataAction GetAction(string providerName, IDataActionId dataActionId)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (dataActionId == null) throw new ArgumentNullException("dataActionId");

            using (_resourceLocker.Locker)
            {
                return GetDataActionProvider(providerName).GetAction(dataActionId);
            }
        }



        public static IEnumerable<IDataActionId> GetActionsByType(string providerName, Type dataInterfaceType)
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (dataInterfaceType == null) throw new ArgumentNullException("dataInterfaceType");

            using (_resourceLocker.Locker)
            {
                return GetDataActionProvider(providerName).GetActionsByType(dataInterfaceType);
            }
        }



        public static Dictionary<DataSourceId, List<IDataActionId>> GetActionsByData<T>(string providerName, IQueryable<T> data)
            where T : class, IData
        {
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (data == null) throw new ArgumentNullException("data");

            using (_resourceLocker.Locker)
            {
                return GetDataActionProvider(providerName).GetActionsByData<T>(data);
            }
        }



        private static IDataActionProvider GetDataActionProvider(string providerName)
        {
            IDataActionProvider provider;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
                {
                    try
                    {
                        provider = _resourceLocker.Resources.Factory.Create(providerName);

                        provider.Context = new DataActionProviderContext(providerName);

                        _resourceLocker.Resources.ProviderCache.Add(providerName, provider);
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
            }

            return provider;
        }



        private static void Flush()
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", DataActionProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public DataActionProviderFactory Factory { get; set; }
            public Dictionary<string, IDataActionProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new DataActionProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IDataActionProvider>();
            }
        }
    }
}
