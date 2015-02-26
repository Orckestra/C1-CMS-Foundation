using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
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
    [Obsolete("Is replaced by Composite.C1Console.Scheduling.PagePublishSchedulerWorkflow")]
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PagePublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private static readonly string LogTitle = typeof (PagePublishSchedulerWorkflow).Name;

        private DateTime _publishDate;
        private Guid _pageId;
        private string _localeName;

        private static readonly object _conversionSyncRoot = new object();


        public PagePublishSchedulerWorkflow()
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
        public DateTime PublishDate
        {
            get { return _publishDate; }
            set { _publishDate = value; }
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
            if(PageId == Guid.Empty) return;

            Log.LogVerbose(LogTitle, "Converting an obsolete page publishing workflow '{0}' into a new one.", workflowInstanceId);

            if (ConvertOldPublishingWorkflows(PageId, LocaleName))
            {
                PageId = Guid.Empty;
            }
        }

        internal static bool ConvertOldPublishingWorkflows(Guid pageId, string localeName)
        {
            lock (_conversionSyncRoot)
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                using (ThreadDataManager.EnsureInitialize())
                {
                    using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(localeName)))
                    {
                        using (var transaction = TransactionsFacade.CreateNewScope())
                        {
                            var pagePublishSchedule =
                                (from ps in DataFacade.GetData<IPagePublishSchedule>()
                                 where ps.PageId == pageId &&
                                       ps.LocaleCultureName == localeName
                                 select ps).SingleOrDefault();

                            var pageUnpublishSchedule =
                                (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                                 where ps.PageId == pageId &&
                                     ps.LocaleCultureName == localeName
                                 select ps).SingleOrDefault();

                            if (pagePublishSchedule == null && pageUnpublishSchedule == null)
                            {
                                return true;
                            }

                            if (pagePublishSchedule != null)
                            {
                                DataFacade.Delete(pagePublishSchedule);
                            }


                            if (pageUnpublishSchedule != null)
                            {
                                DataFacade.Delete(pageUnpublishSchedule);
                            }

                            DateTime? publishDate = pagePublishSchedule != null ? pagePublishSchedule.PublishDate : (DateTime?)null;
                            DateTime? unpublishDate = pageUnpublishSchedule != null ? pageUnpublishSchedule.UnpublishDate : (DateTime?)null;


                            IPage page = DataFacade.GetData<IPage>(p => p.Id == pageId).FirstOrDefault();
                            Verify.IsNotNull(page, "The page with the id {0} does not exist", pageId);

                            WorkflowInstance publishWorkflowInstance = null;
                            WorkflowInstance unpublishWorkflowInstance = null;

                            PublishControlledHelper.HandlePublishUnpublishWorkflows(page, localeName, publishDate, unpublishDate,
                                ref publishWorkflowInstance, ref unpublishWorkflowInstance);

                            transaction.Complete();
                        }
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);
                return false;
            }
        }
    }
}
