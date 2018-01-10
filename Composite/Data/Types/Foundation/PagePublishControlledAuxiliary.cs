using System.Collections.Generic;
using System.Linq;

using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.PublishScheduling;
using Composite.Data.Transactions;

namespace Composite.Data.Types.Foundation
{
    internal sealed class PagePublishControlledAuxiliary : IPublishControlledAuxiliary
    {
        public void OnAfterDataUpdated(IData data)
        {
            var page = (IPage)data;

            IEnumerable<IPagePlaceholderContent> pagePlaceholderContents;
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                pagePlaceholderContents =
                    (from content in DataFacade.GetData<IPagePlaceholderContent>(false)
                     where content.PageId == page.Id && content.VersionId == page.VersionId
                     select content).ToList();
            }

            if (page.PublicationStatus == GenericPublishProcessController.Published)
            {
                using (var transactionScope = TransactionsFacade.CreateNewScope())
                {
                    using (new DataScope(DataScopeIdentifier.Public))
                    {
                        DataFacade.Delete<IPagePlaceholderContent>(
                            f => f.PageId == page.Id && f.VersionId == page.VersionId);
                    }

                    foreach (var pagePlaceholderContent in pagePlaceholderContents)
                    {
                        pagePlaceholderContent.PublicationStatus = page.PublicationStatus;

                        DataFacade.Update(pagePlaceholderContent);
                    }

                    using (new DataScope(DataScopeIdentifier.Administrated))
                    {
                        var publishSchedule = PublishScheduleHelper.GetPublishSchedule(typeof (IPage),
                            page.Id.ToString(), page.DataSourceId.LocaleScope.Name);

                        if (publishSchedule != null)
                        {
                            DataFacade.Delete(publishSchedule);
                        }
                    }

                    transactionScope.Complete();
                }
            }
            else
            {
                foreach (var pagePlaceholderContent in pagePlaceholderContents)
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