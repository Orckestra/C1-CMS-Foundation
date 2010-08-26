using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime;


namespace Composite.C1Console.Forms.Foundation.PluginFacades
{
    internal static class FunctionFactoryPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static FunctionFactoryPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IFormFunction GetFunction(string namespaceName, string name)
        {
            string compositeName = string.Format("{0}->{1}", namespaceName, name);

            if (false == _resourceLocker.Resources.FactoryCache.ContainsKey(compositeName))
            {
                try
                {
                    IFormFunctionFactory formFunctionFactory = _resourceLocker.Resources.Factory.Create(compositeName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.FactoryCache.ContainsKey(compositeName) == false)
                        {
                            _resourceLocker.Resources.FactoryCache.Add(compositeName, formFunctionFactory);
                        }
                    }
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


                return _resourceLocker.Resources.FactoryCache[compositeName].CreateFunction();
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", FunctionFactorySettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public FunctionFactoryFactory Factory { get; set; }
            public Dictionary<string, IFormFunctionFactory> FactoryCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new FunctionFactoryFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }


                resources.FactoryCache = new Dictionary<string, IFormFunctionFactory>();
            }
        }
    }
}
