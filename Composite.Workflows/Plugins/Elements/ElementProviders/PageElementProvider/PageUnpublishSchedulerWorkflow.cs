using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;



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
            Log.LogInformation(LogTitle, "Converting an obsolete page unpublishing workflow into a new one.");

            using (ThreadDataManager.Initialize())
            {
                using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(this.LocaleName)))
                {
                    using (var transaction = TransactionsFacade.CreateNewScope())
                    {
                        IPageUnpublishSchedule pageUnpublishSchedule =
                            (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                                where ps.PageId == this.PageId &&
                                    ps.LocaleCultureName == this.LocaleName
                                select ps).Single();

                        DataFacade.Delete(pageUnpublishSchedule);


                        IPage page = DataFacade.GetData<IPage>(p => p.Id == PageId).FirstOrDefault();
                        Verify.IsNotNull(page, "The page with the id {0} does not exist", PageId);

                        WorkflowInstance publishWorkflowInstance = null;
                        WorkflowInstance unpublishWorkflowInstance = null;

                        PublishControlledHelper.HandlePublishUnpublishWorkflows(page, null, UnpublishDate, ref publishWorkflowInstance, ref unpublishWorkflowInstance);

                        transaction.Complete();
                    }
                }
            }
        }
    }
}
