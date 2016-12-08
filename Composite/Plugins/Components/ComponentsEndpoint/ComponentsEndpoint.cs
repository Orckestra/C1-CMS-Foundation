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
using Composite.Plugins.Components.ComponentTags;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
    [ApplicationStartup]
    class ComponentsEndpoint
    {
        public static void OnInitialized()
        {
            WampRouterFacade.RegisterCallee(new ComponentsRpcService());
            WampRouterFacade.RegisterPublisher("components.newComponents", new ComponentPublisher());
        }
    }

    /// <summary>
    /// Rpc service collection for interaction with components
    /// </summary>
    public class ComponentsRpcService : IRpcService
    {
        /// <summary>
        /// To test if service is in its place
        /// </summary>
        public void Ping()
        {
        }

        /// <summary>
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("structure.page")]
        public ComponentsResponseMessage Get()
        {
            return new ComponentsResponseMessage();
        }

        /// <summary>
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("components.getComponents")]
        public IEnumerable<Component> GetComponents()
        {
            var componentManager = ServiceLocator.GetRequiredService<ComponentManager>();
            return componentManager.GetComponents();
        }

        /// <summary>
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("mock.provider.components.pick")]
        public void FinishProvider()
        {
        }

        /// <summary>
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("mock.struct.dialog.cancel")]
        public void CancelProvider()
        {
        }

        /// <summary>
        /// To get all tags based on configuration ordering
        /// </summary>
        /// <returns>list of strings</returns>
        [WampProcedure("components.getOrderedTags")]
        public IEnumerable<string> GetOrderedTags()
        {
            var tagManager = ServiceLocator.GetRequiredService<TagManager>();
            return tagManager.GetRegisteredTagOrdering();
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
