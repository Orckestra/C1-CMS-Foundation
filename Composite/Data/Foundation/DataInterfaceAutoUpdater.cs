using System;
using System.Linq;
using Composite.Core;
using Composite.Core.Application;
using Composite.Data.DynamicTypes;
using Composite.Core.Instrumentation;


namespace Composite.Data.Foundation
{
    internal static class DataInterfaceAutoUpdater
    {
        private static readonly string LogTitle = typeof (DataInterfaceAutoUpdater).Name;

        internal static bool EnsureUpdateAllInterfaces()
        {
            using (AppDomainLocker.NewLock())
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                bool doFlush = false;

                var knownInterfaces = DataProviderRegistry.AllKnownInterfaces.ToList();

                foreach (Type interfaceType in knownInterfaces)
                {
                    if (!interfaceType.IsAutoUpdateble())
                    {
                        continue;
                    }

                    foreach (string providerName in DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType))
                    {
                        try
                        {
                            if (DynamicTypeManager.EnsureUpdateStore(interfaceType, providerName, true))
                            {
                                doFlush = true;
                            }
                        }
                        catch (TypeUpdateVersionException)
                        {
                            throw;
                        }
                        catch (TypeInitializationException tiex)
                        {
                            throw new InvalidOperationException("The data type meta stored did not initialize. Check configuration", tiex);
                        }
                        catch (Exception ex)
                        {
                            Log.LogCritical(LogTitle, "Update failed for the interface '{0}' on the '{1}' data provider", interfaceType, providerName);
                            Log.LogCritical(LogTitle, ex);
                        }
                    }
                }

                return doFlush;
            }
        }



        internal static void TestEnsureUpdateAllInterfaces()
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                foreach (Type interfaceType in DataProviderRegistry.AllInterfaces)
                {
                    if (!interfaceType.IsAutoUpdateble() || interfaceType.IsGenerated())
                    {
                        continue;
                    }
                    

                    foreach (string providerName in DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType))
                    {
                        try
                        {
                            if (DynamicTypeManager.IsEnsureUpdateStoreNeeded(interfaceType))
                            {
                                Log.LogError(LogTitle, "Autoupdating the data interface '{0}' on the '{1}' data provider failed!", interfaceType, providerName);
                            }
                        }
                        catch (Exception ex)
                        {
                            Log.LogCritical(LogTitle, "Update failed for the interface '{0}' on the '{1}' data provider", interfaceType, providerName);
                            Log.LogCritical(LogTitle, ex);
                        }
                    }
                }
            }
        }
    }
}
