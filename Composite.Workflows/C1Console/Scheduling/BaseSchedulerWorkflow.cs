using System;
using System.ComponentModel;
using System.Workflow.Activities;

using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Threading;

namespace Composite.C1Console.Scheduling
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public abstract partial class BaseSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private static readonly string LogTitle = typeof(BaseSchedulerWorkflow).Name;

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public DateTime Date { get; set; }

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string LocaleName { get; set; }

        protected BaseSchedulerWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var delayActivity = (DelayActivity)GetActivityByName("waitDelayActivity");

            var now = DateTime.Now;
            Log.LogVerbose(LogTitle, "Current time: {0}, Execution time: {1}", Date, now);

            delayActivity.TimeoutDuration = Date > now ? Date - now : new TimeSpan(0);

            Log.LogVerbose(LogTitle, "Timeout in: " + delayActivity.TimeoutDuration);
        }

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (ThreadDataManager.Initialize())
            {
                Execute();
            }
        }

        protected abstract void Execute();
    }
}
