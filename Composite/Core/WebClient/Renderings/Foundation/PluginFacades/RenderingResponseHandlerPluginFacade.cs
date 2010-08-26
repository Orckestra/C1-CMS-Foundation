using System;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler;
using Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler.Runtime;


namespace Composite.Core.WebClient.Renderings.Foundation.PluginFacades
{
    internal static class RenderingResponseHandlerPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);


        public static RenderingResponseHandlerResult GetDataResponseHandling(string handlerName, DataEntityToken requestedItemEntityToken)
        {
            IDataRenderingResponseHandler handler = GetRenderingResponseHandler(handlerName) as IDataRenderingResponseHandler;
            Verify.IsNotNull(handler, "The Rendering Response Handler named '{0}' does not implement the required interface '{1}'", handlerName, typeof(IDataRenderingResponseHandler));

            return handler.GetDataResponseHandling(requestedItemEntityToken);
        }



        public static bool IsDataRenderingResponseHandler(string handlerName)
        {
            IDataRenderingResponseHandler handler = GetRenderingResponseHandler(handlerName) as IDataRenderingResponseHandler;

            return handler != null;
        }



        private static IRenderingResponseHandler GetRenderingResponseHandler(string handlerName)
        {
            IRenderingResponseHandler applicationStartupHandler;

            var resources = _resourceLocker;

            var providerCache = resources.Resources.ProviderCache;
            if (providerCache.TryGetValue(handlerName, out applicationStartupHandler))
            {
                return applicationStartupHandler;
            }

            using (resources.Locker)
            {
                if (providerCache.TryGetValue(handlerName, out applicationStartupHandler) == false)
                {
                    try
                    {
                        applicationStartupHandler = resources.Resources.Factory.Create(handlerName);

                        providerCache.Add(handlerName, applicationStartupHandler);
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

            return applicationStartupHandler;
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", RenderingResponseHandlerSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public RenderingResponseHandlerFactory Factory { get; set; }
            public Hashtable<string, IRenderingResponseHandler> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new RenderingResponseHandlerFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Hashtable<string, IRenderingResponseHandler>();
            }
        }
    }
}
