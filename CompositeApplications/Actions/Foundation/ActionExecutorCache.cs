using System;
using System.Collections.Generic;
using Composite.EventSystem;
using Composite.Logging;
using Composite.Security;


namespace Composite.Actions.Foundation
{
    internal static class ActionExecutorCache
    {
        private static Dictionary<Type, IActionExecutor> _actionExecutorCache = new Dictionary<Type, IActionExecutor>();

        private static object _lock = new object();



        static ActionExecutorCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static IActionExecutor GetActionExecutor(ActionToken actionToken)
        {
            if (actionToken == null) throw new ArgumentNullException("actionToken");


            IActionExecutor actionExecutor;


            if (_actionExecutorCache.TryGetValue(actionToken.GetType(), out actionExecutor) == false)
            {
                object[] attributes = actionToken.GetType().GetCustomAttributes(typeof(ActionExecutorAttribute), true);

                if (attributes.Length == 0) throw new InvalidOperationException(string.Format("Missing {0} attribute on the flow token {1}", typeof(ActionExecutorAttribute), actionToken.GetType()));

                ActionExecutorAttribute attribute = (ActionExecutorAttribute)attributes[0];

                if (attribute.ActionExecutorType == null) throw new InvalidOperationException(string.Format("Action executor type can not be null on the action token {0}", actionToken.GetType()));
                if (typeof(IActionExecutor).IsAssignableFrom(attribute.ActionExecutorType) == false) throw new InvalidOperationException(string.Format("Action executor {0} should implement the interface {1}", attribute.ActionExecutorType, typeof(IActionExecutor)));

                actionExecutor = (IActionExecutor)Activator.CreateInstance(attribute.ActionExecutorType);

                _actionExecutorCache.Add(actionToken.GetType(), actionExecutor);
            }


            return actionExecutor;
        }



        private static void Flush()
        {
            _actionExecutorCache = new Dictionary<Type, IActionExecutor>();
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
