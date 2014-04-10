using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;



namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PagePublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private static readonly string LogTitle = typeof (PagePublishSchedulerWorkflow).Name;

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
            var delayActivity = (DelayActivity)this.GetActivityByName("waitDelayActivity");

            DateTime now = DateTime.Now;
            Log.LogVerbose(LogTitle, string.Format("Current time: {0}, Publish time: {1}", this.PublishDate, now));

            if (this.PublishDate > now)
            {
                delayActivity.TimeoutDuration = this.PublishDate - now;
            }
            else
            {
                delayActivity.TimeoutDuration = new TimeSpan(0);
            }

            Log.LogVerbose(LogTitle, "Timeout in: " + delayActivity.TimeoutDuration);
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (ThreadDataManager.EnsureInitialize())
            {
                IPage page;

                using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(this.LocaleName)))
                {
                    using (var transaction = TransactionsFacade.CreateNewScope())
                    {
                        IPagePublishSchedule pagePublishSchedule =
                            (from ps in DataFacade.GetData<IPagePublishSchedule>()
                             where ps.PageId == this.PageId &&
                                   ps.LocaleCultureName == this.LocaleName
                             select ps).Single();

                        DataFacade.Delete(pagePublishSchedule);

                        page = DataFacade.GetData<IPage>(p => p.Id == this.PageId).FirstOrDefault();


                        Verify.IsNotNull(page, "The page with the id {0} does not exist", PageId);

                        IEnumerable<string> transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;

                        if (transitions.Contains(GenericPublishProcessController.Published))
                        {
                            page.PublicationStatus = GenericPublishProcessController.Published;

                            DataFacade.Update(page);

                            Log.LogVerbose(LogTitle, "Scheduled publishing of page with title '{0}' is complete", page.Title);
                        }
                        else
                        {
                            Log.LogWarning(LogTitle, "Scheduled publishing of page with title '{0}' could not be done because the page is not in a publisheble state", page.Title);
                        }

                        transaction.Complete();
                    }

                    ReloadPageElementInConsole(page);
                }
            }
        }

        private void ReloadPageElementInConsole(IPage page)
        {
            Guid parentPageId = PageManager.GetParentId(page.Id);
            IPage parentPage = parentPageId != Guid.Empty ? PageManager.GetPageById(parentPageId) : null;

            EntityToken parentEntityToken = (parentPage != null)
                                        ? parentPage.GetDataEntityToken()
                                        : (EntityToken)new PageElementProviderEntityToken("PageElementProvider");

            ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = parentEntityToken }, null);
        }
    }
}
