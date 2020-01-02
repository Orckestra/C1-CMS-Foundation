using System;
using System.Configuration;
using System.Net;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.C1Console.Security.BuildinPlugins.BuildinLoginSessionStore;
using Composite.C1Console.Security.Plugins.LoginSessionStore;
using Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime;


namespace Composite.C1Console.Security.Foundation.PluginFacades
{
    internal class LoginSessionStorePluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);



        static LoginSessionStorePluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static bool HasConfiguration()
        {
            return ConfigurationServices.ConfigurationSource?.GetSection(LoginSessionStoreSettings.SectionName) != null;
        }



        public static bool CanPersistAcrossSessions
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.Provider.CanPersistAcrossSessions;
                }
            }
        }


        public static void StoreUsername(string userName, bool persistAcrossSessions)
        {
            using (_resourceLocker.ReadLocker)
            {
                _resourceLocker.Resources.Provider.StoreUsername(userName, persistAcrossSessions);
            }
        }


        public static string Logout()
        {
            using (_resourceLocker.ReadLocker)
            {
                var provider = _resourceLocker.Resources.Provider;

                provider.FlushUsername();

                return (provider as ILoginSessionStoreRedirectedLogout)?.LogoutUrl;
            }
        }



        public static string StoredUsername => _resourceLocker.Resources.Provider.StoredUsername;


        public static IPAddress UserIpAddress
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.Provider.UserIpAddress;
                }
            }
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException($"Failed to load the configuration section '{LoginSessionStoreSettings.SectionName}' from the configuration.", ex);
        }



        private sealed class Resources
        {
            private LoginSessionStoreFactory Factory { get; set; }
            public ILoginSessionStore Provider { get; private set; }

            public static void DoInitializeResources(Resources resources)
            {
                if (LoginSessionStorePluginFacade.HasConfiguration())
                {
                    try
                    {
                        resources.Factory = new LoginSessionStoreFactory();
                        resources.Provider = resources.Factory.CreateDefault();
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
                else if (RuntimeInformation.IsUnittest)
                {
                    // This is a fallback for unittests
                    resources.Provider = new BuildinLoginSessionStore();
                }
            }
        }
    }
}
