using System;
using System.Collections.Generic;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FlowControllerServicesContainer
    {
        private Dictionary<Type, List<object>> _services = new Dictionary<Type, List<object>>();


        public FlowControllerServicesContainer()
        { }

        // Creates a new service container and initialized it with the services from servicesContainerToClone.
        public FlowControllerServicesContainer(FlowControllerServicesContainer servicesContainerToClone)
        { 
           _services = new Dictionary<Type,List<object>>(servicesContainerToClone._services);
        }

        

        public void AddService(IFlowControllerService flowControllerService)
        {
            Type type = flowControllerService.GetType();

            foreach (Type interfaceType in type.GetInterfaces())
            {
                List<object> list;

                if (_services.TryGetValue(interfaceType, out list) == false)
                {
                    list = new List<object>();

                    _services.Add(interfaceType, list);
                }

                list.Add(flowControllerService);
            }
        }



        public void RemoveService(IFlowControllerService flowControllerService)
        {
            Type type = flowControllerService.GetType();

            foreach (Type interfaceType in type.GetInterfaces())
            {
                List<object> list;
                if (_services.TryGetValue(interfaceType, out list) == false) throw new InvalidOperationException();

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



        public IFlowControllerService GetService(Type serviceType)
        {
            List<object> list;

            if (_services.TryGetValue(serviceType, out list) == false)
            {
                return null;
            }

            if (list.Count > 1)
            {
                throw new InvalidOperationException(string.Format("More than one services of type '{0}' is added", serviceType));
            }

            return (IFlowControllerService)list[0];
        }
    }
}
