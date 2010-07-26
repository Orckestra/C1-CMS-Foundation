using System;

using Composite.Actions;


namespace Composite.Workflow
{
    [FlowController(typeof(WorkflowFlowController))]
    public sealed class WorkflowFlowToken : FlowToken
    {
        private Guid _workflowInstanceId;


        public WorkflowFlowToken(Guid workflowInstanceId)
        {
            _workflowInstanceId = workflowInstanceId;
        }


        public Guid WorkflowInstanceId
        {
            get { return _workflowInstanceId; }
        }


        public override string Serialize()
        {
            return _workflowInstanceId.ToString();
        }


        public static FlowToken Deserialize(string serializedFlowToken)
        {
            return new WorkflowFlowToken(new Guid(serializedFlowToken));
        }
    }
}
