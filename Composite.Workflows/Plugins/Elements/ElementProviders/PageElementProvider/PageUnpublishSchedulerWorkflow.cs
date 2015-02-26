using System;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Workflow.Activities;
using Composite.C1Console.Workflow;
using Composite.Core;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [Obsolete("Is replaced by Composite.C1Console.Scheduling.PageUnpublishSchedulerWorkflow")]
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PageUnpublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private static readonly string LogTitle = typeof(PageUnpublishSchedulerWorkflow).Name;

        private DateTime _unpublishDate;
        private Guid _pageId;
        private string _localeName;


        public PageUnpublishSchedulerWorkflow()
        {
            InitializeComponent();
        }


        protected override void OnActivityExecutionContextLoad(IServiceProvider provider)
        {
            base.OnActivityExecutionContextLoad(provider);

            if (PageId == Guid.Empty) return;

            Guid workflowInstanceId = WorkflowInstanceId;

            Task.Factory.StartNew(async () =>
            {
                await Task.Delay(3000);
                ConvertObsoleteWorkflow(workflowInstanceId);
            });
        }


        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid PageId
        {
            get { return _pageId; }
            set { _pageId = value; }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public DateTime UnpublishDate
        {
            get { return _unpublishDate; }
            set { _unpublishDate = value; }
        }



        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string LocaleName
        {
            get { return _localeName; }
            set { _localeName = value; }
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var delayActivity = (DelayActivity)this.GetActivityByName("waitDelayActivity");

            delayActivity.TimeoutDuration = new TimeSpan(0);
        }


        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ConvertObsoleteWorkflow(WorkflowInstanceId);
        }

        private void ConvertObsoleteWorkflow(Guid workflowInstanceId)
        {
            if (PageId == Guid.Empty) return;

            Log.LogVerbose(LogTitle, "Converting an obsolete page unpublishing workflow '{0}' into a new one.", workflowInstanceId);

            if (PagePublishSchedulerWorkflow.ConvertOldPublishingWorkflows(PageId, LocaleName))
            {
                PageId = Guid.Empty;
            }
        }
    }
}
