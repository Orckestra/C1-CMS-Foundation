using System.Collections.Generic;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.Security;


namespace Composite.Workflow
{
    public sealed class WorkflowActionExecutor : IActionExecutorSerializedParameters
    {
        public FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            WorkflowActionToken workflowActionToken = (WorkflowActionToken)actionToken;

            WorkflowInstance workflowInstance = WorkflowFacade.CreateNewWorkflow(
                    workflowActionToken.WorkflowType,
                    new Dictionary<string, object> { 
                            { "SerializedEntityToken", serializedEntityToken },
                            { "SerializedActionToken", serializedActionToken },
                            { "ParentWorkflowInstanceId", workflowActionToken.ParentWorkflowInstanceId }
                        }
                );

            workflowInstance.Start();

            WorkflowFacade.SetFlowControllerServicesContainer(workflowInstance.InstanceId, flowControllerServicesContainer);
            WorkflowFacade.RunWorkflow(workflowInstance);

            WorkflowFacade.SetEventHandlerFilter(workflowInstance.InstanceId, workflowActionToken.EventHandleFilterType);

            return new WorkflowFlowToken(workflowInstance.InstanceId);
        }



        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            return Execute(EntityTokenSerializer.Serialize(entityToken), ActionTokenSerializer.Serialize(actionToken), actionToken, flowControllerServicesContainer);
        }
    }
}
