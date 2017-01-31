using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Application.Plugins.ApplicationOnlineHandler.Runtime;
using Composite.Core.Application.Plugins.ApplicationStartupHandler;
using Composite.Core.Application.Plugins.ApplicationStartupHandler.Runtime;
using Composite.Core.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;


namespace Composite.Core.Application.Foundation.PluginFacades
{
    internal static class ApplicationStartupHandlerPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);


        public static void ConfigureServices(string handlerName, IServiceCollection serviceCollection)
        {
            Verify.ArgumentNotNullOrEmpty(handlerName, nameof(handlerName));
            Verify.ArgumentNotNull(serviceCollection, nameof(serviceCollection));

            using (_resourceLocker.Locker)
            {
                IApplicationStartupHandler provider = GetApplicationStartupHandler(handlerName);

                provider.ConfigureServices(serviceCollection);
            }
        }


        public static void OnBeforeInitialize(string handlerName, IServiceProvider serviceProvider)
        {
            Verify.ArgumentNotNullOrEmpty(handlerName, nameof(handlerName));

            using (_resourceLocker.Locker)
            {
                IApplicationStartupHandler provider = GetApplicationStartupHandler(handlerName);

                provider.OnBeforeInitialize(serviceProvider);
            }
        }

        public static void OnInitialized(string handlerName, IServiceProvider serviceProvider)
        {
            Verify.ArgumentNotNullOrEmpty(handlerName, nameof(handlerName));

            using (_resourceLocker.Locker)
            {
                IApplicationStartupHandler provider = GetApplicationStartupHandler(handlerName);

                provider.OnInitialized(serviceProvider);
            }
        }



        private static IApplicationStartupHandler GetApplicationStartupHandler(string handlerName)
        {
            IApplicationStartupHandler applicationStartupHandler;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ProviderCache.TryGetValue(handlerName, out applicationStartupHandler) == false)
                {
                    try
                    {
                        applicationStartupHandler = _resourceLocker.Resources.Factory.Create(handlerName);

                        _resourceLocker.Resources.ProviderCache.Add(handlerName, applicationStartupHandler);
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ApplicationOnlineHandlerSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ApplicationStartupHandlerFactory Factory { get; set; }
            public Dictionary<string, IApplicationStartupHandler> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ApplicationStartupHandlerFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IApplicationStartupHandler>();
            }
        }
    }
}
