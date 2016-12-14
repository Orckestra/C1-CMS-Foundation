using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
using Composite.C1Console.RichContent.Components;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.WebClient.Services.WampRouter;
using Composite.Plugins.Components.ComponentTags;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
    [ApplicationStartup]
    class ComponentsEndpoint
    {
        public static void OnInitialized(ComponentManager componentManager, ComponentChangeNotifier componentChangeNotifier)
        {
            WampRouterFacade.RegisterCallee(new ComponentsRpcService(componentManager));
            WampRouterFacade.RegisterPublisher(new ComponentPublisher(componentChangeNotifier));
        }
    }

    /// <summary>
    /// Rpc service collection for interaction with components
    /// </summary>
    public class ComponentsRpcService : IRpcService
    {
        private static ComponentManager _componentManager;

        public ComponentsRpcService(ComponentManager componentManager)
        {
            _componentManager = componentManager;
        }

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
        [WampProcedure("components.get")]
        public IEnumerable<Component> GetComponents(string containerclass=null)
        {
            
            if (!containerclass.IsNullOrEmpty())
            {
                return _componentManager.GetComponents().Where(f => f.ContainerClasses.Contains(containerclass));
            }
            return _componentManager.GetComponents();
        }

        /// <summary>
        /// Select a component for use, signal that dialog is finished
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("components.pick")]
        public void FinishProvider()
        {
        }

        /// <summary>
        /// Close dialog without changes
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("structure.dialog.cancel")]
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

    public class ComponentPublisher : IWampEventHandler<ComponentChange,bool>
    {
        private readonly ComponentChangeNotifier _componentChangeNotifier;

        public static string Topic => "components.new";

        string IWampEventHandler<ComponentChange, bool>.Topic => Topic;

        public IObservable<ComponentChange> Event => _componentChangeNotifier;

        public ComponentPublisher(ComponentChangeNotifier componentChangeNotifier)
        {
            _componentChangeNotifier = componentChangeNotifier;
        }

        public bool GetNewData()
        {
            return true;
        }
    }
}
