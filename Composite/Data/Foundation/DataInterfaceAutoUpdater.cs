using System;
using Composite.Data.DynamicTypes;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;


namespace Composite.Data.Foundation
{
    internal static class DataInterfaceAutoUpdater
    {
        internal static bool EnsureUpdateAllInterfaces()
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                bool doFlush = false;

                foreach (Type interfaceType in DataProviderRegistry.AllKnownInterfaces)
                {
                    if (!interfaceType.IsAutoUpdateble()) continue;
                    if (interfaceType.IsGenerated()) continue;

                    foreach (string providerName in DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType))
                    {
                        try
                        {
                            if (DynamicTypeManager.EnsureUpdateStore(interfaceType, providerName, true) == true)
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
                            LoggingService.LogCritical("DataInterfaceAutoUpdater", string.Format("Update failed for the interface '{0}' on the '{1}' data provider", interfaceType, providerName));
                            LoggingService.LogCritical("DataInterfaceAutoUpdater", ex);
                        }
                    }
                }

                return doFlush;
            }
        }



        internal static void TestEnsureUpdateAllInterfaces()
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                foreach (Type interfaceType in DataProviderRegistry.AllInterfaces)
                {
                    if (!interfaceType.IsAutoUpdateble()) continue;
                    if (interfaceType.IsGenerated()) continue;

                    foreach (string providerName in DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType))
                    {
                        try
                        {
                            if (DynamicTypeManager.IsEnsureUpdateStoreNeeded(interfaceType) == true)
                            {
                                LoggingService.LogError("DataInterfaceAutoUpdater", string.Format("Autoupdating the data interface '{0}' on the '{1}' data provider failed!", interfaceType, providerName));
                            }
                        }
                        catch (Exception ex)
                        {
                            LoggingService.LogCritical("DataInterfaceAutoUpdater", string.Format("Update failed for the interface '{0}' on the '{1}' data provider", interfaceType, providerName));
                            LoggingService.LogCritical("DataInterfaceAutoUpdater", ex);
                        }
                    }
                }
            }
        }
    }
}
