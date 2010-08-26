using System;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Core.WebClient.State.Runtime;

namespace Composite.Core.WebClient.State
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SessionStateManager
    {
        public static readonly string DefaultProviderName = "Default"; 

        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static SessionStateManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        public static ISessionStateProvider DefaultProvider
        {
            get { return GetProvider(DefaultProviderName); }
        }

        public static ISessionStateProvider GetProvider(string name)
        {
            var resources = _resourceLocker;

            ISessionStateProvider provider;

            if (!resources.Resources.Providers.TryGetValue(name, out provider))
            {
                lock (resources)
                {
                    if (!resources.Resources.Providers.TryGetValue(name, out provider))
                    {
                        try
                        {
                            provider = resources.Resources.Factory.Create(name);

                            resources.Resources.Providers.Add(name, provider);
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
            }

            return provider;
        }

        private static void Flush()
        {
            var resourceLocker = _resourceLocker;
            lock (resourceLocker)
            {
                resourceLocker.ResetInitialization();
            }
        }

        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }

        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException("Failed to load the configuration section '{0}' from the configuration.".FormatWith(SessionStateProviderSettings.SectionName), ex);
        }

        private sealed class Resources
        {
            public SessionStateProviderFactory Factory { get; set; }
            public Hashtable<string, ISessionStateProvider> Providers { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new SessionStateProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.Providers = new Hashtable<string, ISessionStateProvider>();
            }
        }
    }
}
