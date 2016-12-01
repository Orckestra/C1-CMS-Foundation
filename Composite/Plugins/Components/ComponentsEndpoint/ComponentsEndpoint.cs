using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Composite.C1Console.Components;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.Logging;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
    [ApplicationStartup]
    class ComponentsEndpoint
    {
        public static void OnInitialized()
        {
            WampRouterFacade.RegisterCallee("ComponentsRealm", new ComponentsRpcService());
        }
    }

    public class ComponentsRpcService : IRpcService
    {
        public void Ping()
        {
        }

        [WampProcedure("GetComponents")]
        public IEnumerable<Component> GetComponents()
        {
            var componentManager = ServiceLocator.GetRequiredService<ComponentManager>();
            return componentManager.GetComponents();
        }
    }
}
