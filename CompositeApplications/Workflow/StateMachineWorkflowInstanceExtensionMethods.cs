using System;
using System.Collections.Generic;
using System.Workflow.Activities;
using System.Workflow.ComponentModel;


namespace Composite.Workflow
{
	internal static class StateMachineWorkflowInstanceExtensionMethods
	{
        public static IEnumerable<string> GetCurrentEventNames(this StateMachineWorkflowInstance stateMachineWorkflowInstance, Type eventServiceType)
        {
            if (stateMachineWorkflowInstance == null) throw new ArgumentNullException("stateMachineWorkflowInstance");
            if (eventServiceType == null) throw new ArgumentNullException("eventServiceType");

            Verify.IsNotNull(stateMachineWorkflowInstance.CurrentState, "The workflow has already been canceled.");

            foreach (Activity currentStateActivity in stateMachineWorkflowInstance.CurrentState.Activities)
            {
                if (currentStateActivity.Enabled == false) continue;
                if ((currentStateActivity is EventDrivenActivity) == false) continue;

                HandleExternalEventActivity handleExternalEventActivity = ((EventDrivenActivity)currentStateActivity).EventActivity as HandleExternalEventActivity;
                if (handleExternalEventActivity == null) continue;
                if (handleExternalEventActivity.Enabled == false) continue;
                if (handleExternalEventActivity.InterfaceType != eventServiceType) continue;

                yield return handleExternalEventActivity.EventName;
            }
        }
	}
}
