using System;
using System.ComponentModel;
using System.Workflow.Activities;
using System.Workflow.ComponentModel.Compiler;


namespace Composite.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DefaultEvent("Invoked")]
    [ActivityValidator(typeof(HandleExternalEventActivityValidator))]
    public sealed class ChildWorkflowDoneHandleExternalEventActivity : HandleExternalEventActivity
    {
        public ChildWorkflowDoneHandleExternalEventActivity()
            : base()
        {
            Initialize();
        }


        public ChildWorkflowDoneHandleExternalEventActivity(string name)
            : base(name)
        {
            Initialize();
        }


        [Browsable(false)]
        public override string EventName
        {
            get { return base.EventName; }
            set { base.EventName = value; }
        }


        [Browsable(false)]
        public override Type InterfaceType
        {
            get { return base.InterfaceType; }
            set { base.InterfaceType = value; }
        }


        private void Initialize()
        {
            this.InterfaceType = typeof(IFormsWorkflowEventService);
            this.EventName = "ChildWorkflowDone";

            this.Invoked += new EventHandler<ExternalDataEventArgs>(OnEventInvoked);
        }


        private void OnEventInvoked(object sender, ExternalDataEventArgs e)
        {
            FormEventArgs args = (FormEventArgs)e;

            FormsWorkflow formsWorkflow = this.GetRoot<FormsWorkflow>();

            formsWorkflow.ChildWorkflowResult = args.WorkflowResult;

            base.OnInvoked(e);
        }
    }
}
