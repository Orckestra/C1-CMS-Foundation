using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.ConsoleEventSystem;


namespace Composite.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class CloseCurrentViewActivity : Activity
    {
        public CloseCurrentViewActivity()
        {
        }



        public CloseCurrentViewActivity(string name)
            : base(name)
        {
        }



        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FormsWorkflow formsWorkflow = this.GetRoot<FormsWorkflow>();

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            if (container != null)
            {
                IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

                if (service != null)
                {
                    service.CloseCurrentView();
                }
            }

            return ActivityExecutionStatus.Closed;
        }
    }
}
