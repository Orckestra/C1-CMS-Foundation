using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.Forms.Flows;


namespace Composite.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ShowFieldMessageActivity : Activity
    {
        public static readonly DependencyProperty FieldBindingPathProperty = DependencyProperty.Register("FieldBindingPath", typeof(string), typeof(ShowFieldMessageActivity));
        public static readonly DependencyProperty MessageProperty = DependencyProperty.Register("Message", typeof(string), typeof(ShowFieldMessageActivity));
        
        public ShowFieldMessageActivity()
        {
        }



        public ShowFieldMessageActivity(string name)
            : base(name)
        {
        }



        public string FieldBindingPath
        {
            get { return (string)GetValue(FieldBindingPathProperty); }
            set { SetValue(FieldBindingPathProperty, value); }
        }



        public string Message
        {
            get { return (string)GetValue(MessageProperty); }
            set { SetValue(MessageProperty, value); }
        }





        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IFormFlowRenderingService service = container.GetService<IFormFlowRenderingService>();

            service.ShowFieldMessage( this.FieldBindingPath, this.Message);

            return ActivityExecutionStatus.Closed;
        }
    }
}
