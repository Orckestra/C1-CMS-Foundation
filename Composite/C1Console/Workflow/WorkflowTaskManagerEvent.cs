using Composite.C1Console.Tasks;
using System;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class WorkflowTaskManagerEvent : FlowTaskManagerEvent
    {
        /// <exclude />
        public WorkflowTaskManagerEvent(FlowToken flowToken, Guid workflowInstanceId)
            : base(flowToken)
        {
            this.WorkflowInstanceId = workflowInstanceId;
            this.EventName = "";
        }


        /// <exclude />
        public string EventName { get; set ;}


        /// <exclude />
        public Guid WorkflowInstanceId { get; private set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class WorkflowCreationTaskManagerEvent : TaskManagerEvent
    {
        /// <exclude />
        public WorkflowCreationTaskManagerEvent(Guid parentWorkflowInstanceId)
        {
            this.ParentWorkflowInstanceId = parentWorkflowInstanceId;
        }

        /// <exclude />
        public Guid ParentWorkflowInstanceId { get; private set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SaveWorklowTaskManagerEvent : WorkflowTaskManagerEvent
    {
        /// <exclude />
        public SaveWorklowTaskManagerEvent(FlowToken flowToken, Guid workflowInstanceId, bool succeeded)
            : base(flowToken, workflowInstanceId)
        {
            this.Succeeded = succeeded;
        }


        /// <exclude />
        public bool Succeeded { get; private set; }


        /// <exclude />
        public override string ToString()
        {
            return string.Format("WorkflowInstanceId: {0}, SaveStaus: {1}", this.WorkflowInstanceId, this.Succeeded);
        }
    }
}
