using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;


namespace Composite.Data.Types.Foundation
{
    internal sealed class PagePublishControlledAuxiliary : IPublishControlledAuxiliary
    {
        public void OnAfterDataUpdated(IData data)
        {
            IPage page = (IPage)data;

            IEnumerable<IPagePlaceholderContent> pagePlaceholderContents;
            using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
            {
                pagePlaceholderContents =
                    (from content in DataFacade.GetData<IPagePlaceholderContent>()
                     where content.PageId == page.Id
                     select content).ToList();
            }

            if (page.PublicationStatus == GenericPublishProcessController.Published)
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                    {
                        DataFacade.Delete<IPagePlaceholderContent>(f => f.PageId == page.Id);
                    }

                    foreach (IPagePlaceholderContent pagePlaceholderContent in pagePlaceholderContents)
                    {
                        pagePlaceholderContent.PublicationStatus = page.PublicationStatus;

                        DataFacade.Update(pagePlaceholderContent);
                    }

                    using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
                    {
                        IPagePublishSchedule pagePublishSchedule =
                            (from pps in DataFacade.GetData<IPagePublishSchedule>()
                             where pps.PageId == page.Id
                             select pps).SingleOrDefault();

                        if (pagePublishSchedule != null)
                        {
                            DataFacade.Delete<IPagePublishSchedule>(pagePublishSchedule);
                        }
                    }

                    transactionScope.Complete();
                }
            }
            else
            {
                foreach (IPagePlaceholderContent pagePlaceholderContent in pagePlaceholderContents)
                {
                    if (pagePlaceholderContent.PublicationStatus != page.PublicationStatus)
                    {
                        pagePlaceholderContent.PublicationStatus = page.PublicationStatus;

                        DataFacade.Update(pagePlaceholderContent);
                    }
                }
            }
        }


        public void OnAfterBuildNew(IData data)
        {
            // Noop
        }
    }
}
