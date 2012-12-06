using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Linq;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;



namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class PageUnpublishSchedulerWorkflow : StateMachineWorkflowActivity
    {
        private static readonly string LogTitle = typeof(PagePublishSchedulerWorkflow).Name;

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
            Log.LogVerbose(LogTitle, string.Format("Current time: {0}, Publish time: {1}", this.UnpublishDate, now));

            if (this.UnpublishDate > now)
            {
                delayActivity.TimeoutDuration = this.UnpublishDate - now;
            }
            else
            {
                delayActivity.TimeoutDuration = new TimeSpan(0);
            }

            Log.LogVerbose(LogTitle, "Timeout in: " + delayActivity.TimeoutDuration);
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (ThreadDataManager.Initialize())
            {
                IPage page;

                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(this.LocaleName)))
                {
                    IPageUnpublishSchedule pageUnpublishSchedule =
                        (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                            where ps.PageId == this.PageId &&
                                ps.LocaleCultureName == this.LocaleName
                            select ps).Single();

                    DataFacade.Delete<IPageUnpublishSchedule>(pageUnpublishSchedule);


                    bool deletePublished = false;


                    page = DataFacade.GetData<IPage>(p => p.Id == this.PageId).FirstOrDefault();

                    IEnumerable<string> transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;

                    if (transitions.Contains(GenericPublishProcessController.Draft) == true)
                    {
                        page.PublicationStatus = GenericPublishProcessController.Draft;

                        DataFacade.Update(page);

                        deletePublished = true;
                    }
                    else
                    {
                        Log.LogWarning(LogTitle, string.Format("Scheduled unpublishing of page with title '{0}' could not be done because the page is not in a unpublisheble state", page.Title));
                    }


                    if (deletePublished)
                    {
                        using (new DataScope(DataScopeIdentifier.Public))
                        {
                            IPage deletePage = DataFacade.GetData<IPage>(p => p.Id == this.PageId).FirstOrDefault();

                            if (deletePage != null)
                            {
                                IEnumerable<IData> metaDataSet = deletePage.GetMetaData(DataScopeIdentifier.Public).Evaluate();

                                DataFacade.Delete(deletePage, CascadeDeleteType.Disable);
                                DataFacade.Delete(metaDataSet, CascadeDeleteType.Disable);

                                Log.LogVerbose(LogTitle, string.Format("Scheduled unpublishing of page with title '{0}' is complete", deletePage.Title));
                            }
                        }
                    }
                    

                    transactionScope.Complete();
                }

                ReloadPageElementInConsole(page);
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
