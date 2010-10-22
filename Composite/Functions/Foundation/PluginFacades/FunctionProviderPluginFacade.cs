using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Functions.Plugins.FunctionProvider.Runtime;


namespace Composite.Functions.Foundation.PluginFacades
{
    internal static class FunctionProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static FunctionProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<IFunction> Functions(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                List<IFunction> functions = new List<IFunction>();

                IFunctionProvider provider = GetFunctionProvider(providerName);

                foreach (IFunction function in provider.Functions)
                {
                    functions.Add(new FunctionWrapper(function));
                }

                return functions;
            }
        }



        public static IEnumerable<IFunction> DynamicTypeDependentFunctions(string providerName)
        {
            using (_resourceLocker.Locker)
            {
                List<IFunction> functions = new List<IFunction>();

                IDynamicTypeFunctionProvider provider = GetFunctionProvider(providerName) as IDynamicTypeFunctionProvider;

                if (provider != null)
                {
                    foreach (IFunction function in provider.DynamicTypeDependentFunctions)
                    {
                        functions.Add(new FunctionWrapper(function));
                    }
                }

                return functions;
            }
        }



        private static IFunctionProvider GetFunctionProvider(string providerName)
        {
            IFunctionProvider functionProvider;

            var resources = _resourceLocker;

            using (resources.Locker)
            {
                if (resources.Resources.ProviderCache.TryGetValue(providerName, out functionProvider) == false)
                {
                    try
                    {
                        functionProvider = resources.Resources.Factory.Create(providerName);

                        functionProvider.FunctionNotifier = new FunctionNotifier(providerName);

                        resources.Resources.ProviderCache.Add(providerName, functionProvider);
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

            return functionProvider;
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", FunctionProviderSettings.SectionName), ex);
        }


        private sealed class Resources
        {
            public FunctionProviderFactory Factory { get; set; }
            public Dictionary<string, IFunctionProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new FunctionProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IFunctionProvider>();
            }
        }
    }
}
