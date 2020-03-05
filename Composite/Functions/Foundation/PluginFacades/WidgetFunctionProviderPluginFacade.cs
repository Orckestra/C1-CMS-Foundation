using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Functions.Plugins.WidgetFunctionProvider;
using Composite.Functions.Plugins.WidgetFunctionProvider.Runtime;


namespace Composite.Functions.Foundation.PluginFacades
{
    internal static class WidgetFunctionProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static WidgetFunctionProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<IWidgetFunction> Functions(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                var widgetFunctions = new List<IWidgetFunction>();

                var provider = GetFunctionProvider(providerName);

                provider.Functions?.ForEach(func => widgetFunctions.Add(new WidgetFunctionWrapper(func)));

                return widgetFunctions;
            }
        }



        public static IEnumerable<IWidgetFunction> DynamicTypeDependentFunctions(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                var widgetFunctions = new List<IWidgetFunction>();

                var provider = GetFunctionProvider(providerName);

                if (provider is IDynamicTypeWidgetFunctionProvider dtProvider)
                {
                    dtProvider.DynamicTypeDependentFunctions?.ForEach(func => widgetFunctions.Add(new WidgetFunctionWrapper(func)));
                }

                return widgetFunctions;
            }
        }



        private static IWidgetFunctionProvider GetFunctionProvider(string providerName)
        {
            IWidgetFunctionProvider widgetFunctionProvider;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out widgetFunctionProvider) == false)
                {
                    try
                    {
                        widgetFunctionProvider = _resourceLocker.Resources.Factory.Create(providerName);

                        widgetFunctionProvider.WidgetFunctionNotifier = new WidgetFunctionNotifier(providerName);

                        _resourceLocker.Resources.ProviderCache.Add(providerName, widgetFunctionProvider);
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

            return widgetFunctionProvider;
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", WidgetFunctionProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public WidgetFunctionProviderFactory Factory { get; set; }
            public Dictionary<string, IWidgetFunctionProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new WidgetFunctionProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }


                resources.ProviderCache = new Dictionary<string, IWidgetFunctionProvider>();
            }
        }
    }
}
