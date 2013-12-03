using System;
using System.Collections.Generic;
using Composite.C1Console.Events;


namespace Composite.C1Console.Actions.Foundation
{
    internal static class FlowControllerCache
    {
        private static Dictionary<Type, IFlowController> _flowControllerCache = new Dictionary<Type, IFlowController>();


        static FlowControllerCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


        public static IFlowController GetFlowController(FlowToken flowToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(flowToken, "flowToken");

            IFlowController flowController;

            if (!_flowControllerCache.TryGetValue(flowToken.GetType(), out flowController))
            {
                object[] attributes = flowToken.GetType().GetCustomAttributes(typeof(FlowControllerAttribute), true);
                Verify.That(attributes.Length > 0, "Missing '{0}' attribute on the flow token '{1}'", typeof(FlowControllerAttribute), flowToken.GetType());

                FlowControllerAttribute attribute = (FlowControllerAttribute)attributes[0];
                Verify.IsNotNull(attribute.FlowControllerType, "Flow controller type can not be null on the action token '{0}'", flowToken.GetType());
                Verify.That(typeof(IFlowController).IsAssignableFrom(attribute.FlowControllerType), "Flow controller '{0}' should implement the interface '{1}'", attribute.FlowControllerType, typeof(IFlowController));

                flowController = (IFlowController)Activator.CreateInstance(attribute.FlowControllerType);
                flowController.ServicesContainer = flowControllerServicesContainer;

                _flowControllerCache.Add(flowToken.GetType(), flowController);
            }

            return flowController;
        }


        private static void Flush()
        {
            _flowControllerCache = new Dictionary<Type, IFlowController>();
        }
    }
}
