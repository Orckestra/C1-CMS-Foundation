using System;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [FlowController(typeof(WorkflowFlowController))]
    public sealed class WorkflowFlowToken : FlowToken
    {
        private Guid _workflowInstanceId;


        /// <exclude />
        public WorkflowFlowToken(Guid workflowInstanceId)
        {
            _workflowInstanceId = workflowInstanceId;
        }


        /// <exclude />
        public Guid WorkflowInstanceId
        {
            get { return _workflowInstanceId; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return _workflowInstanceId.ToString();
        }


        /// <exclude />
        public static FlowToken Deserialize(string serializedFlowToken)
        {
            return new WorkflowFlowToken(new Guid(serializedFlowToken));
        }
    }
}
