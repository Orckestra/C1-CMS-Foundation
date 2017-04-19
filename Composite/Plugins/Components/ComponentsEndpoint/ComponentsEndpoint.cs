using System;
using System.Collections.Generic;
using System.Linq;
using Castle.Core.Internal;
using Composite.C1Console.RichContent.Components;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core.Application;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
    [ApplicationStartup]
    internal class ComponentsEndpoint
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

        internal ComponentsRpcService(ComponentManager componentManager)
        {
            _componentManager = componentManager;
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

    /// <summary>
    /// Publisher for interaction with components
    /// </summary>
    public class ComponentPublisher : IWampEventHandler<ComponentChange,bool>
    {
        private readonly ComponentChangeNotifier _componentChangeNotifier;

        /// <summary>
        /// Change in components topic
        /// </summary>
        public static string Topic => "components.new";

        string IWampEventHandler<ComponentChange, bool>.Topic => Topic;

        /// <summary>
        /// Event to observe when there is any change in components
        /// </summary>
        public IObservable<ComponentChange> Event => _componentChangeNotifier;

        internal ComponentPublisher(ComponentChangeNotifier componentChangeNotifier)
        {
            _componentChangeNotifier = componentChangeNotifier;
        }

        /// <summary>
        /// Data returning after any change happens in components
        /// </summary>
        public bool GetNewData()
        {
            return true;
        }
    }
}
