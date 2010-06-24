using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.ComponentModel;

using Composite.Actions;
using Composite.Forms.Flows;
using Composite.Forms.DataServices;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;


namespace Composite.Workflow.Activities
{
    public sealed class ShowConsoleMessageBoxActivity : Activity
    {
        public static readonly DependencyProperty TitleProperty = DependencyProperty.Register("Title", typeof(string), typeof(ShowConsoleMessageBoxActivity));
        public static readonly DependencyProperty MessageProperty = DependencyProperty.Register("Message", typeof(string), typeof(ShowConsoleMessageBoxActivity));
        public static readonly DependencyProperty DialogTypeProperty = DependencyProperty.Register("DialogType", typeof(DialogType), typeof(ShowConsoleMessageBoxActivity));

        public ShowConsoleMessageBoxActivity()
        {
        }



        public ShowConsoleMessageBoxActivity(string name)
            : base(name)
        {
        }



        public DialogType DialogType
        {
            get { return (DialogType)GetValue(DialogTypeProperty); }
            set { SetValue(DialogTypeProperty, value); }
        }



        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }



        public string Message
        {
            get { return (string)GetValue(MessageProperty); }
            set { SetValue(MessageProperty, value); }
        }





        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

            IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();

            service.ShowMessage(this.DialogType, StringResourceSystemFacade.ParseString(this.Title), StringResourceSystemFacade.ParseString(this.Message));

            return ActivityExecutionStatus.Closed;
        }
    }
}
