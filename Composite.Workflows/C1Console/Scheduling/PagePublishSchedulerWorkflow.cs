using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

using Composite.Core;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;

namespace Composite.C1Console.Scheduling
{
    public sealed class PagePublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        private static readonly string LogTitle = typeof(PagePublishSchedulerWorkflow).Name;

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid PageId { get; set; }

        protected override void Execute()
        {
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                IPage page;

                using (var transaction = TransactionsFacade.CreateNewScope())
                {
                    var pagePublishSchedule =
                        (from ps in DataFacade.GetData<IPublishSchedule>()
                         where ps.DataType == typeof(IPage).FullName &
                         ps.DataId == PageId.ToString() &&
                               ps.LocaleCultureName == LocaleName
                         select ps).Single();

                    DataFacade.Delete(pagePublishSchedule);

                    page = DataFacade.GetData<IPage>(p => p.Id == PageId).FirstOrDefault();


                    Verify.IsNotNull(page, "The page with the id {0} does not exist", PageId);

                    var transitions = ProcessControllerFacade.GetValidTransitions(page).Keys;
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

                PublishControlledHelper.ReloadPageElementInConsole(page);
            }
        }
    }
}
