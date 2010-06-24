using System;
using System.Configuration;
using System.Net;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.EventSystem;
using Composite.Security.BuildinPlugins.BuildinLoginSessionStore;
using Composite.Security.Plugins.LoginSessionStore;
using Composite.Security.Plugins.LoginSessionStore.Runtime;


namespace Composite.Security.Foundation.PluginFacades
{
    public class LoginSessionStorePluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);



        static LoginSessionStorePluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool HasConfiguration()
        {
            return (ConfigurationServices.ConfigurationSource != null) &&
                   (ConfigurationServices.ConfigurationSource.GetSection(LoginSessionStoreSettings.SectionName) != null);
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


        public static void FlushUsername()
        {
            using (_resourceLocker.ReadLocker)
            {
                _resourceLocker.Resources.Provider.FlushUsername();
            }
        }



        public static string StoredUsername
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.Provider.StoredUsername;
                }
            }
        }



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



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }


        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", LoginSessionStoreSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public LoginSessionStoreFactory Factory { get; set; }
            public ILoginSessionStore Provider { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                if (LoginSessionStorePluginFacade.HasConfiguration() == true)
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
                else if (RuntimeInformation.IsUnittest == true)
                {
                    // This is a fall bakc for unittests
                    resources.Provider = new BuildinLoginSessionStore();
                }
            }
        }
    }
}
