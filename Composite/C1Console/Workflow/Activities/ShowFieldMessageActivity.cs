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
    public sealed class ShowFieldMessageActivity : Activity
    {
        /// <exclude />
        public static readonly DependencyProperty FieldBindingPathProperty = DependencyProperty.Register("FieldBindingPath", typeof(string), typeof(ShowFieldMessageActivity));

        /// <exclude />
        public static readonly DependencyProperty MessageProperty = DependencyProperty.Register("Message", typeof(string), typeof(ShowFieldMessageActivity));


        /// <exclude />
        public ShowFieldMessageActivity()
        {
        }



        /// <exclude />
        public ShowFieldMessageActivity(string name)
            : base(name)
        {
        }



        /// <exclude />
        public string FieldBindingPath
        {
            get { return (string)GetValue(FieldBindingPathProperty); }
            set { SetValue(FieldBindingPathProperty, value); }
        }



        /// <exclude />
        public string Message
        {
            get { return (string)GetValue(MessageProperty); }
            set { SetValue(MessageProperty, value); }
        }



        /// <exclude />
        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IFormFlowRenderingService service = container.GetService<IFormFlowRenderingService>();

            service.ShowFieldMessage( this.FieldBindingPath, this.Message);

            return ActivityExecutionStatus.Closed;
        }
    }
}
