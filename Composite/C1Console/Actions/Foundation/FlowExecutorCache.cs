using System;
using System.Collections.Concurrent;
using Composite.C1Console.Events;


namespace Composite.C1Console.Actions.Foundation
{
    internal static class FlowControllerCache
    {
        private static readonly ConcurrentDictionary<Type, IFlowController> _flowControllerCache = new ConcurrentDictionary<Type, IFlowController>();


        static FlowControllerCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


        public static IFlowController GetFlowController(FlowToken flowToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(flowToken, "flowToken");

            Type flowTokenType = flowToken.GetType();

            return _flowControllerCache.GetOrAdd(flowTokenType, type =>
            {
                object[] attributes = type.GetCustomAttributes(typeof(FlowControllerAttribute), true);
                Verify.That(attributes.Length > 0, "Missing '{0}' attribute on the flow token '{1}'", typeof(FlowControllerAttribute), type);

                FlowControllerAttribute attribute = (FlowControllerAttribute) attributes[0];
                Verify.IsNotNull(attribute.FlowControllerType, "Flow controller type can not be null on the action token '{0}'", type);
                Verify.That(typeof(IFlowController).IsAssignableFrom(attribute.FlowControllerType), "Flow controller '{0}' should implement the interface '{1}'", attribute.FlowControllerType, typeof(IFlowController));

                var flowController = (IFlowController) Activator.CreateInstance(attribute.FlowControllerType);
                flowController.ServicesContainer = flowControllerServicesContainer;

                return flowController;
            });
        }


        private static void Flush()
        {
            _flowControllerCache.Clear();
        }
    }
}
