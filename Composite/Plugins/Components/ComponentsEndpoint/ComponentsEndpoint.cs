using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using Composite.C1Console.RichContent.Components;
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
            WampRouterFacade.RegisterPublisher("ComponentsRealm", "NewComponents", new ComponentPublisher());
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

    public class ComponentPublisher : IWampEventHandler<ComponentChange,Component>
    {
        public IObservable<ComponentChange> Event => ServiceLocator.GetRequiredService<ComponentChangeNotifier>();

        private int counter = 0;

        public Component GetNewData()
        {
            return new Component();
        }
    }
}
