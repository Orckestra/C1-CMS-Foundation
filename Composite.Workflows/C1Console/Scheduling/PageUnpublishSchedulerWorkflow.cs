using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

using Composite.Core;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.PublishScheduling;
using Composite.Data.Transactions;
using Composite.Data.Types;

namespace Composite.C1Console.Scheduling
{
    public sealed class PageUnpublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        private static readonly string LogTitle = typeof(PageUnpublishSchedulerWorkflow).Name;

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid PageId { get; set; }

        protected override void Execute()
        {
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                IPage page;

                using (var transaction = TransactionsFacade.CreateNewScope())
                {
                    var pageUnpublishSchedule = PublishScheduleHelper.GetUnpublishSchedule(typeof (IPage), PageId.ToString(), LocaleName);
                    Verify.IsNotNull(pageUnpublishSchedule, "Missing an unpublish page schedule record.");

                    DataFacade.Delete(pageUnpublishSchedule);

                    var deletePublished = false;

                    page = DataFacade.GetData<IPage>(p => p.Id == PageId).FirstOrDefault();

                    var transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;
                    if (transitions.Contains(GenericPublishProcessController.Draft))
                    {
                        page.PublicationStatus = GenericPublishProcessController.Draft;

                        DataFacade.Update(page);

                        deletePublished = true;
                    }
                    else
                    {
                        Log.LogWarning(LogTitle, "Scheduled unpublishing of page with title '{0}' could not be done because the page is not in a unpublisheble state", page.Title);
                    }

                    if (deletePublished)
                    {
                        using (new DataScope(DataScopeIdentifier.Public))
                        {
                            var deletePage = DataFacade.GetData<IPage>(p => p.Id == PageId).FirstOrDefault();
                            if (deletePage != null)
                            {
                                var metaDataSet = deletePage.GetMetaData(DataScopeIdentifier.Public).Evaluate();

                                DataFacade.Delete(deletePage, CascadeDeleteType.Disable);
                                DataFacade.Delete(metaDataSet, CascadeDeleteType.Disable);

                                Log.LogVerbose(LogTitle, "Scheduled unpublishing of page with title '{0}' is complete", deletePage.Title);
                            }
                        }
                    }

                    transaction.Complete();
                }

                PublishControlledHelper.ReloadPageElementInConsole(page);
            }
        }
    }
}
