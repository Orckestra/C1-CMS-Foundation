using System;
using System.Collections.Generic;
using Composite.Core.Extensions;


namespace Composite.C1Console.Actions
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FlowControllerServicesContainer
    {
        private readonly Dictionary<Type, List<object>> _services = new Dictionary<Type, List<object>>();


        /// <exclude />
        public FlowControllerServicesContainer()
        { }


        /// <exclude />
        public FlowControllerServicesContainer(params IFlowControllerService[] services)
        {
            foreach (var service in services)
            {
                AddService(service);
            }
        }

        // Creates a new service container and initialized it with the services from servicesContainerToClone.
        /// <exclude />
        public FlowControllerServicesContainer(FlowControllerServicesContainer servicesContainerToClone)
        { 
           _services = new Dictionary<Type,List<object>>(servicesContainerToClone._services);
        }



        /// <exclude />
        public void AddService(IFlowControllerService flowControllerService)
        {
            Type type = flowControllerService.GetType();

            foreach (Type interfaceType in type.GetInterfaces())
            {
                List<object> list = _services.GetOrAdd(interfaceType, () => new List<object>());

                list.Add(flowControllerService);
            }
        }



        /// <exclude />
        public void RemoveService(IFlowControllerService flowControllerService)
        {
            Type type = flowControllerService.GetType();

            foreach (Type interfaceType in type.GetInterfaces())
            {
                if (!_services.TryGetValue(interfaceType, out var list)) throw new InvalidOperationException();

                list.Remove(flowControllerService);
            }
        }


        /// <summary>
        /// <para>Returns a concrete service interface, if available. Sample service interfaces are:</para>
        /// <para> - Composite.C1Console.Events.IManagementConsoleMessageService</para>
        /// <para> - Composite.C1Console.Actions.IActionExecutionService</para>
        /// <para> - Composite.C1Console.Forms.Flows.IFormFlowRenderingService</para>
        /// <para> - Composite.C1Console.Actions.IElementInformationService</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetService<T>() where T : IFlowControllerService
        {
            return (T)GetService(typeof(T));
        }



        /// <exclude />
        public IFlowControllerService GetService(Type serviceType)
        {
            if (!_services.TryGetValue(serviceType, out var list))
            {
                return null;
            }

            if (list.Count > 1)
            {
                throw new InvalidOperationException($"More than one service of type '{serviceType}' was added");
            }

            return (IFlowControllerService)list[0];
        }
    }
}
