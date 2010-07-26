using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Instrumentation.Plugin;
using Composite.Instrumentation.Plugin.Runtime;


namespace Composite.Instrumentation.Foundation.PluginFacades
{
    internal static class PerformanceCounterProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static PerformanceCounterProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static void SystemStartupIncrement(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.SystemStartupIncrement();
                }
        }



        public static IPerformanceCounterToken BeginElementCreation(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    return provider.BeginElementCreation();
                }
        }



        public static void EndElementCreation(string providerName, IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.EndElementCreation(performanceToken, resultElementCount, totalElementCount);
                }
        }

        

        public static IPerformanceCounterToken BeginAspNetControlCompile(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    return provider.BeginAspNetControlCompile();
                }
        }



        public static void EndAspNetControlCompile(string providerName, IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.EndAspNetControlCompile(performanceToken, controlsCompiledCount);
                }
        }



        public static IPerformanceCounterToken BeginPageHookCreation(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    return provider.BeginPageHookCreation();
                }
        }



        public static void EndPageHookCreation(string providerName, IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.EndPageHookCreation(performanceToken, controlsCompiledCount);
                }
        }



        public static void EntityTokenParentCacheHitIncrement(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.EntityTokenParentCacheHitIncrement();
                }
        }



        public static void EntityTokenParentCacheMissIncrement(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

                using (_resourceLocker.Locker)
                {
                    IPerformanceCounterProvider provider = GetPerformanceCounterProvider(providerName);

                    provider.EntityTokenParentCacheMissIncrement();
                }
        }

        
        
        private static IPerformanceCounterProvider GetPerformanceCounterProvider(string providerName)
        {
            IPerformanceCounterProvider provider;

            if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
            {
                try
                {
                    provider = _resourceLocker.Resources.Factory.Create(providerName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ProviderCache.ContainsKey(providerName) == false)
                        {
                            _resourceLocker.Resources.ProviderCache.Add(providerName, provider);
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

            return provider;
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", PerformanceCounterProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public PerformanceCounterProviderFactory Factory { get; set; }
            public Dictionary<string, IPerformanceCounterProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new PerformanceCounterProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IPerformanceCounterProvider>();
            }
        }
    }
}
