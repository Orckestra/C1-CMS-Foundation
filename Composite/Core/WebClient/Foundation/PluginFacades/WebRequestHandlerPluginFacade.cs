using System;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.Core.WebClient.Plugins.WebRequestHandler;
using Composite.Core.WebClient.Plugins.WebRequestHandler.Runtime;


namespace Composite.Core.WebClient.Foundation.PluginFacades
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class WebRequestHandlerPluginFacade
    {
        private static ResourceLocker<Resources> _resources = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        /// <exclude />
        static WebRequestHandlerPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static WebRequestHandlerData GetConfigurationForHandler(string name)
        {
            using (_resources.ReadLocker)
            {
                return _resources.Resources.Configuration.WebRequestHandlers.Get(name);
            }
        }



        /// <exclude />
        public static WebRequestHandler GetHandler(string name)
        {
            using (_resources.ReadLocker)
            {
                WebRequestHandler webRequestHandler = _resources.Resources.Factory.Create(name);

                return webRequestHandler;
            }
        }



        private static void Flush()
        {
            _resources.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", WebRequestHandlerSettings.SectionName), ex);
        }


        private sealed class Resources
        {
            public WebRequestHandlerFactory Factory { get; set; }
            public WebRequestHandlerSettings Configuration { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new WebRequestHandlerFactory();
                    resources.Configuration = (WebRequestHandlerSettings)ConfigurationServices.ConfigurationSource.GetSection(WebRequestHandlerSettings.SectionName);
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
}
