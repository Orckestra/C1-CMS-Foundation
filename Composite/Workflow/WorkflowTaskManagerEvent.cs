using Composite.C1Console.Tasks;
using System;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Workflow
{
    internal class WorkflowTaskManagerEvent : FlowTaskManagerEvent
    {
        public WorkflowTaskManagerEvent(FlowToken flowToken, Guid workflowInstanceId)
            : base(flowToken)
        {
            this.WorkflowInstanceId = workflowInstanceId;
            this.EventName = "";
        }

        public string EventName { get; set ;}


        public Guid WorkflowInstanceId { get; private set; }
    }

    internal class WorkflowCreationTaskManagerEvent : TaskManagerEvent
    {
        public WorkflowCreationTaskManagerEvent(Guid parentWorkflowInstanceId)
        {
            this.ParentWorkflowInstanceId = parentWorkflowInstanceId;
        }

        public Guid ParentWorkflowInstanceId { get; private set; }
    }

    internal class SaveWorklowTaskManagerEvent : WorkflowTaskManagerEvent
    {
        public SaveWorklowTaskManagerEvent(FlowToken flowToken, Guid workflowInstanceId, bool succeeded)
            : base(flowToken, workflowInstanceId)
        {
            this.Succeeded = succeeded;
        }


        public bool Succeeded { get; private set; }


        public override string ToString()
        {
            return string.Format("WorkflowInstanceId: {0}, SaveStaus: {1}", this.WorkflowInstanceId, this.Succeeded);
        }
    }
}
