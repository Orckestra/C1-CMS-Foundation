using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.Core.Instrumentation;


namespace Composite.C1Console.Elements
{
    internal static class ElementHookRegistratorFacade
    {
        public static IEnumerable<EntityTokenHook> GetHooks()
        {
            int tt1 = System.Environment.TickCount;

            List<EntityTokenHook> hooks = new List<EntityTokenHook>();

            foreach (string providerName in ElementProviderRegistry.ElementProviderNames)
            {
                if (ElementProviderRegistry.IsProviderHookingProvider(providerName) == false) continue;

                int t1 = System.Environment.TickCount;
                hooks.AddRange(ElementProviderPluginFacade.GetHooks(providerName));
                int t2 = System.Environment.TickCount;

                Composite.Core.Logging.LoggingService.LogVerbose("ElementHookRegistratorFacade", string.Format("Time for {0}: {1} ms", providerName, t2 - t1));
            }

            int tt2 = System.Environment.TickCount;

            Composite.Core.Logging.LoggingService.LogInformation("ElementHookRegistratorFacade", string.Format("Total time for: {0} ms", tt2 - tt1));

            return hooks;
        }
    }
}
