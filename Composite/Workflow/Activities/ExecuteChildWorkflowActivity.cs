using System;
using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.Actions;


namespace Composite.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ExecuteChildWorkflowActivity : Activity
    {
        public static readonly DependencyProperty ChildWorkflowTypeProperty = DependencyProperty.Register("ChildWorkflowType", typeof(Type), typeof(ExecuteChildWorkflowActivity));
        public static readonly DependencyProperty ChildWorkflowPayloadProperty = DependencyProperty.Register("ChildWorkflowPayload", typeof(string), typeof(ExecuteChildWorkflowActivity));


        public ExecuteChildWorkflowActivity()
        {
        }



        public ExecuteChildWorkflowActivity(string name)
            : base(name)
        {
        }



        public Type ChildWorkflowType
        {
            get { return (Type)GetValue(ChildWorkflowTypeProperty); }
            set { SetValue(ChildWorkflowTypeProperty, value); }
        }



        public string ChildWorkflowPayload
        {
            get { return (string)GetValue(ChildWorkflowPayloadProperty); }
            set { SetValue(ChildWorkflowPayloadProperty, value); }
        }



        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FormsWorkflow formsWorkflow = this.GetRoot<FormsWorkflow>();

            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IActionExecutionService actionExecutionService = flowControllerServicesContainer.GetService<IActionExecutionService>();

            WorkflowActionToken workflowActionToken = new WorkflowActionToken(this.ChildWorkflowType) {
                    Payload = this.ChildWorkflowPayload,
                    ParentWorkflowInstanceId = formsWorkflow.InstanceId
                };

            actionExecutionService.Execute(formsWorkflow.EntityToken, workflowActionToken, null);

            return ActivityExecutionStatus.Closed;
        }
    }
}
