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
    public sealed class CustomEvent02HandleExternalEventActivity : HandleExternalEventActivity
    {
        public CustomEvent02HandleExternalEventActivity()
            : base()
        {
            Initialize();
        }


        public CustomEvent02HandleExternalEventActivity(string name)
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
            this.EventName = "CustomEvent02";
        }
    }
}
