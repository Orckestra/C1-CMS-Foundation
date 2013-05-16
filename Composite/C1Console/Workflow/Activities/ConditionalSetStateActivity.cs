using System;
using System.ComponentModel;
using System.Workflow.Activities;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Compiler;


namespace Composite.C1Console.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConditionalSetStateActivity : Activity
    {
        /// <exclude />
        public static readonly DependencyProperty ConditionProperty = DependencyProperty.Register("Condition", typeof(ActivityCondition), typeof(ConditionalSetStateActivity), new PropertyMetadata(DependencyPropertyOptions.Metadata));

        /// <exclude />
        public static readonly DependencyProperty TrueTargetStateNameProperty = DependencyProperty.Register("TrueTargetStateName", typeof(string), typeof(ConditionalSetStateActivity), new PropertyMetadata("", DependencyPropertyOptions.Metadata, new Attribute[] { new ValidationOptionAttribute(ValidationOption.Optional) }));

        /// <exclude />
        public static readonly DependencyProperty FalseTargetStateNameProperty = DependencyProperty.Register("FalseTargetStateName", typeof(string), typeof(ConditionalSetStateActivity), new PropertyMetadata("", DependencyPropertyOptions.Metadata, new Attribute[] { new ValidationOptionAttribute(ValidationOption.Optional) }));



        /// <exclude />
        public ConditionalSetStateActivity()
        {
        }


        /// <exclude />
        public ConditionalSetStateActivity(string name) 
            : base(name)
        {
        }



        /// <exclude />
        protected override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            StateMachineWorkflowInstance instance = WorkflowFacade.GetStateMachineWorkflowInstance(this.WorkflowInstanceId);

            bool result = Condition.Evaluate(this, executionContext);

            SetStateEventArgs args;
            if (result)
            {
                args = new SetStateEventArgs(this.TrueTargetStateName);
            }
            else
            {
                args = new SetStateEventArgs(this.FalseTargetStateName);
            }

          //  instance.EnqueueItemOnIdle("SetStateQueue", args, null, null);

            return ActivityExecutionStatus.Closed;
        }



        /// <exclude />
        [Browsable(true)]
        public ActivityCondition Condition
        {
            get { return (base.GetValue(ConditionProperty) as ActivityCondition); }
            set { base.SetValue(ConditionProperty, value); }
        }


        /// <exclude />
        [DefaultValue((string)null)]
        public string TrueTargetStateName
        {
            get { return (base.GetValue(TrueTargetStateNameProperty) as string); }
            set { base.SetValue(TrueTargetStateNameProperty, value); }
        }


        /// <exclude />
        [DefaultValue((string)null)]
        public string FalseTargetStateName
        {
            get { return (base.GetValue(FalseTargetStateNameProperty) as string); }
            set { base.SetValue(FalseTargetStateNameProperty, value); }
        }
    }
}
