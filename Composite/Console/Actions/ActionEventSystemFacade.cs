using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Events;


namespace Composite.C1Console.Actions
{
    internal class BeforeActionEventArgs : EventArgs
    {
        public BeforeActionEventArgs(EntityToken entityToken, ActionToken actionToken)
        {
            this.EntityToken = entityToken;
            this.ActionToken = actionToken;
        }


        public EntityToken EntityToken { get; private set; }
        public ActionToken ActionToken { get; private set; }
    }



    internal class AfterActionEventArgs : EventArgs
    {
        public AfterActionEventArgs(EntityToken entityToken, ActionToken actionToken, FlowToken flowToken)
        {
            this.EntityToken = entityToken;
            this.ActionToken = actionToken;
            this.FlowToken = flowToken;
        }


        public EntityToken EntityToken { get; private set; }
        public ActionToken ActionToken { get; private set; }
        public FlowToken FlowToken { get; private set; }
    }



    internal static class ActionEventSystemFacade
    {
        internal delegate void OnBeforeActionExecutionDelegate(BeforeActionEventArgs actionEventArgs);
        internal delegate void OnAfterActionExecutionDelegate(AfterActionEventArgs actionEventArgs);


        private static OnBeforeActionExecutionDelegate _onBeforeActionExecutionDelegates = null;
        private static OnAfterActionExecutionDelegate _onAfterActionExecutionDelegates = null;



        static ActionEventSystemFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static void SubscribeToOnBeforeActionExecution(OnBeforeActionExecutionDelegate onBeforeActionExecutionDelegate)
        {
            Verify.ArgumentNotNull(onBeforeActionExecutionDelegate, "onBeforeActionExecutionDelegate");

            _onBeforeActionExecutionDelegates += onBeforeActionExecutionDelegate;
        }



        public static void UnsubscribeToOnBeforeActionExecution(OnBeforeActionExecutionDelegate onBeforeActionExecutionDelegate)
        {
            Verify.ArgumentNotNull(onBeforeActionExecutionDelegate, "onBeforeActionExecutionDelegate");

            _onBeforeActionExecutionDelegates -= onBeforeActionExecutionDelegate;
        }



        public static void SubscribeToOnAfterActionExecution(OnAfterActionExecutionDelegate onAfterActionExecutionDelegate)
        {
            Verify.ArgumentNotNull(onAfterActionExecutionDelegate, "onAfterActionExecutionDelegate");

            _onAfterActionExecutionDelegates += onAfterActionExecutionDelegate;
        }



        public static void UnsubscribeToOnAfterActionExecution(OnAfterActionExecutionDelegate onAfterActionExecutionDelegate)
        {
            Verify.ArgumentNotNull(onAfterActionExecutionDelegate, "onAfterActionExecutionDelegate");

            _onAfterActionExecutionDelegates -= onAfterActionExecutionDelegate;
        }



        internal static void FireOnBeforeActionExecution(EntityToken entityToken, ActionToken actionToken)
        {
            if (_onBeforeActionExecutionDelegates != null)
            {
                _onBeforeActionExecutionDelegates(new BeforeActionEventArgs(entityToken, actionToken));
            }
        }



        internal static void FireOnAfterActionExecution(EntityToken entityToken, ActionToken actionToken, FlowToken flowToken)
        {
            if (_onAfterActionExecutionDelegates != null)
            {
                _onAfterActionExecutionDelegates(new AfterActionEventArgs(entityToken, actionToken, flowToken));
            }
        }



        private static void Flush()
        {
            _onBeforeActionExecutionDelegates = null;
            _onAfterActionExecutionDelegates = null;
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
