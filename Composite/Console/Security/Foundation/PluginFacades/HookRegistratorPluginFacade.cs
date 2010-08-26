using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.C1Console.Security.Plugins.HookRegistrator;
using Composite.C1Console.Security.Plugins.HookRegistrator.Runtime;


namespace Composite.C1Console.Security.Foundation.PluginFacades
{
    internal static class HookRegistratorPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        private static object _lock = new object();


        static HookRegistratorPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<EntityTokenHook> GetHooks(string pluginName)
        {
                using (_resourceLocker.Locker)
                {
                    return GetHookRegistratorProvider(pluginName).GetHooks();
                }
        }



        private static IHookRegistrator GetHookRegistratorProvider(string pluginName)
        {
            using (_resourceLocker.Locker)
            {
                IHookRegistrator hookRegistrator;

                if (_resourceLocker.Resources.HookRegistratorCache.TryGetValue(pluginName, out hookRegistrator) == false)
                {
                    try
                    {
                        hookRegistrator = _resourceLocker.Resources.Factory.Create(pluginName);

                        _resourceLocker.Resources.HookRegistratorCache.Add(pluginName, hookRegistrator);
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

                return hookRegistrator;
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

            throw ex;

            /*            ConfigurationErrorsException newEx = new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", LoginProviderSettings.SectionName), ex);
                        if (ExceptionService.HandleException(newEx, Policy.Plugin) == HandleResult.Rethrow)
                        {
                            throw newEx;
                        }*/
        }



        private sealed class Resources
        {
            public HookRegistratorFactory Factory { get; set; }
            public Dictionary<string, IHookRegistrator> HookRegistratorCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new HookRegistratorFactory();
                    resources.HookRegistratorCache = new Dictionary<string, IHookRegistrator>();
                }
                catch (NullReferenceException ex)
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
