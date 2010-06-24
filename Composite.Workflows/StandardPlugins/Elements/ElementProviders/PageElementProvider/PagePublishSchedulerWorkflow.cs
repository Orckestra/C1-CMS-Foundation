using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Logging;
using Composite.StringExtensions;
using Composite.Workflow;
using System.Globalization;
using Composite.Threading;
using System.Transactions;
using Composite.Transactions;



namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PagePublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private DateTime _publishDate;
        private Guid _pageId;
        private string _localeName;


        public PagePublishSchedulerWorkflow()
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
            DelayActivity delayActivity = (DelayActivity)this.GetActivityByName("waitDelayActivity");

            DateTime now = DateTime.Now;
            LoggingService.LogVerbose("PagePublishSchedulerWorkflow", string.Format("Current time: {0}, Publish time: {1}", this.PublishDate, now));

            if (this.PublishDate > now)
            {
                delayActivity.TimeoutDuration = this.PublishDate - DateTime.Now;
            }
            else
            {
                delayActivity.TimeoutDuration = new TimeSpan(0);
            }

            LoggingService.LogVerbose("PagePublishSchedulerWorkflow", string.Format("Timeout in: {0}", delayActivity.TimeoutDuration));
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (ThreadDataManager.Initialize())
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(this.LocaleName)))
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IPagePublishSchedule pagePublishSchedule =
                    (from ps in DataFacade.GetData<IPagePublishSchedule>()
                     where ps.PageId == this.PageId &&
                           ps.LocaleCultureName == this.LocaleName
                     select ps).Single();

                DataFacade.Delete(pagePublishSchedule);

                IPage page =
                    (from p in DataFacade.GetData<IPage>()
                     where p.Id == this.PageId
                     select p).FirstOrDefault();


                Verify.IsNotNull(page, "The page with the id {0} does not exist", PageId);

                IEnumerable<string> transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;

                if (transitions.Contains(GenericPublishProcessController.Published) == true)
                {
                    page.PublicationStatus = GenericPublishProcessController.Published;

                    DataFacade.Update(page);

                    LoggingService.LogVerbose("PagePublishSchedulerWorkflow", 
                        "Scheduled publishing of page with title '{0}' is complete".FormatWith(page.Title));
                }
                else
                {
                    LoggingService.LogWarning("PagePublishSchedulerWorkflow",
                        "Scheduled publishing of page with title '{0}' could not be done because the page is not in a publisheble state".FormatWith(page.Title));
                }

                transactionScope.Complete();
            }
        }
    }
}
