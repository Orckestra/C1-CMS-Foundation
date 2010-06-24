using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Logging;
using Composite.Transactions;
using Composite.Workflow;
using Composite.Threading;
using Composite.Linq;



namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PageUnpublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
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
            DelayActivity delayActivity = (DelayActivity)this.GetActivityByName("waitDelayActivity");

            DateTime now = DateTime.Now;
            LoggingService.LogVerbose("PageUnpublishSchedulerWorkflow", string.Format("Current time: {0}, Publish time: {1}", this.UnpublishDate, now));

            if (this.UnpublishDate > now)
            {
                delayActivity.TimeoutDuration = this.UnpublishDate - DateTime.Now;
            }
            else
            {
                delayActivity.TimeoutDuration = new TimeSpan(0);
            }

            LoggingService.LogVerbose("PageUnpublishSchedulerWorkflow", string.Format("Timeout in: {0}", delayActivity.TimeoutDuration));
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (ThreadDataManager.Initialize())
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(this.LocaleName)))
                    {
                        IPageUnpublishSchedule pageUnpublishSchedule =
                            (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                             where ps.PageId == this.PageId &&
                                   ps.LocaleCultureName == this.LocaleName
                             select ps).Single();

                        DataFacade.Delete<IPageUnpublishSchedule>(pageUnpublishSchedule);


                        bool deletePublished = false;


                        IPage page =
                            (from p in DataFacade.GetData<IPage>()
                             where p.Id == this.PageId
                             select p).FirstOrDefault();

                        IEnumerable<string> transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;

                        if (transitions.Contains(GenericPublishProcessController.Draft) == true)
                        {
                            page.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.Update(page);

                            deletePublished = true;
                        }
                        else
                        {
                            LoggingService.LogWarning("PageUnpublishSchedulerWorkflow", string.Format("Scheduled unpublishing of page with title '{0}' could not be done because the page is not in a unpublisheble state", page.Title));
                        }


                        if (deletePublished == true)
                        {
                            using (new DataScope(DataScopeIdentifier.Public))
                            {
                                IPage deletePage =
                                    (from p in DataFacade.GetData<IPage>()
                                     where p.Id == this.PageId
                                     select p).FirstOrDefault();

                                if (deletePage != null)
                                {
                                    IEnumerable<IData> metaDatas = deletePage.GetMetaData(DataScopeIdentifier.Public).Evaluate();

                                    DataFacade.Delete(deletePage, CascadeDeleteType.Disable);
                                    DataFacade.Delete(metaDatas, CascadeDeleteType.Disable);

                                    LoggingService.LogVerbose("PageUnpublishSchedulerWorkflow", string.Format("Scheduled unpublishing of page with title '{0}' is complete", deletePage.Title));
                                }
                            }
                        }
                    }

                    transactionScope.Complete();
                }
            }
        }
    }
}
