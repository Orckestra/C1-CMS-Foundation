using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
using Composite.C1Console.RichContent.Components;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core.Application;
using Composite.Core.WebClient.Services.WampRouter;
using Composite.Plugins.Search.Endpoint;
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
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("structure.page")]
        public object Get(string name)
        {
            // TODO: use an interface to resolve a page structure object
            if (name == "search")
            {
                return new ConsoleSearchPageStructure();
            }

            return new ComponentsResponseMessage();
        }

        /// <summary>
        /// To get all components
        /// </summary>
        /// <returns>list of Components</returns>
        [WampProcedure("components.get")]
        public IEnumerable<Component> GetComponents(string containerclass = null)
        {
            var sepratedContainerClass = ContainerClassManager.ParseToList(containerclass).ToList();

            if (!sepratedContainerClass.IsNullOrEmpty())
            {
                return
                    _componentManager.GetComponents()
                        .Where(
                            f =>
                                (f.ContainerClasses.IsNullOrEmpty() ||
                                 f.ContainerClasses.Intersect(sepratedContainerClass).Any()) &&
                                (f.AntiTags.IsNullOrEmpty() || 
                                !f.AntiTags.Intersect(sepratedContainerClass).Any()));
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
