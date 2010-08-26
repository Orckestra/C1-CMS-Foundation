using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.Core.Logging;


namespace Composite.C1Console.Actions.Foundation
{
    internal static class FlowControllerCache
    {
        private static Dictionary<Type, IFlowController> _flowControllerCache = new Dictionary<Type, IFlowController>();

        private static object _lock = new object();



        static FlowControllerCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static IFlowController GetFlowController(FlowToken flowToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (flowToken == null) throw new ArgumentNullException("flowToken");


            IFlowController flowController;


            if (_flowControllerCache.TryGetValue(flowToken.GetType(), out flowController) == false)
            {
                object[] attributes = flowToken.GetType().GetCustomAttributes(typeof(FlowControllerAttribute), true);

                if (attributes.Length == 0) throw new InvalidOperationException(string.Format("Missing '{0}' attribute on the flow token '{1}'", typeof(FlowControllerAttribute), flowToken.GetType()));

                FlowControllerAttribute attribute = (FlowControllerAttribute)attributes[0];

                if (attribute.FlowControllerType == null) throw new InvalidOperationException(string.Format("Flow controller type can not be null on the action token '{0}'", flowToken.GetType()));
                if (typeof(IFlowController).IsAssignableFrom(attribute.FlowControllerType) == false) throw new InvalidOperationException(string.Format("Flow controller '{0}' should implement the interface '{1}'", attribute.FlowControllerType, typeof(IFlowController)));

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



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
