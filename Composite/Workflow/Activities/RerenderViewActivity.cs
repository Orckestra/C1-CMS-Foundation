using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Forms.Flows;


namespace Composite.C1Console.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RerenderViewActivity : Activity
    {
        public RerenderViewActivity()
        {
        }



        public RerenderViewActivity(string name)
            : base(name)
        {
        }



        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                        
            IFormFlowRenderingService formFlowRenderingService = flowControllerServicesContainer.GetService<IFormFlowRenderingService>();
            
            formFlowRenderingService.RerenderView();

            return ActivityExecutionStatus.Closed;
        }
    }
}
