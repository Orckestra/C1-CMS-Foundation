using System;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using System.Collections.Generic;
using System.Transactions;
using Composite.Data.Transactions;
using Composite.Data.ProcessControlled;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    public sealed partial class UndoUnpublishedChangesWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public UndoUnpublishedChangesWorkflow()
        {
            InitializeComponent();
        }

        private void undoCodeActivity_Undo_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            List<string> propertyNamesToIgnore = new List<string> { "PublicationStatus" };

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IPage administrativePage = (IPage)dataEntityToken.Data;
                IPage publicPage = DataFacade.GetDataFromOtherScope<IPage>(administrativePage, DataScopeIdentifier.Public).Single();

                List<IData> administrativeCompositions = administrativePage.GetMetaData(DataScopeIdentifier.Administrated).ToList();
                List<IData> publicCompositions = publicPage.GetMetaData(DataScopeIdentifier.Public).ToList();

                Guid pageId = administrativePage.Id;
                Guid versionId = administrativePage.Id;

                List<IPagePlaceholderContent> administrativePlaceholders;
                using (new DataScope(DataScopeIdentifier.Administrated))
                {
                    administrativePlaceholders =
                        (from ph in DataFacade.GetData<IPagePlaceholderContent>()
                         where ph.PageId == pageId && ph.VersionId == versionId
                         select ph).ToList();
                }

                List<IPagePlaceholderContent> publicPlaceholders;
                using (new DataScope(DataScopeIdentifier.Public))
                {
                    publicPlaceholders =
                        (from ph in DataFacade.GetData<IPagePlaceholderContent>()
                         where ph.PageId == pageId && ph.VersionId == versionId
                         select ph).ToList();
                }

                using (ProcessControllerFacade.NoProcessControllers)
                {
                    publicPage.FullCopyChangedTo(administrativePage, propertyNamesToIgnore);
                    DataFacade.Update(administrativePage);

                    foreach (IData publicComposition in publicCompositions)
                    {
                        IData administrativeComposition =
                            (from com in administrativeCompositions
                             where com.DataSourceId.DataId.CompareTo(publicComposition.DataSourceId.DataId, false) 
                             select com).Single();

                        publicComposition.FullCopyChangedTo(administrativeComposition, propertyNamesToIgnore);
                        DataFacade.Update(administrativeComposition);
                    }

                    foreach (IPagePlaceholderContent publicPagePlaceholderContent in publicPlaceholders)
                    {
                        IPagePlaceholderContent administrativePagePlaceholderContent =
                            (from pc in administrativePlaceholders
                             where pc.PlaceHolderId == publicPagePlaceholderContent.PlaceHolderId
                             select pc).Single();

                        publicPagePlaceholderContent.FullCopyChangedTo(administrativePagePlaceholderContent, propertyNamesToIgnore);
                        DataFacade.Update(administrativePagePlaceholderContent);
                    }
                }

                transactionScope.Complete();
            }
        }
    }
}
