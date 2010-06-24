using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Types.StoreIdFilter;
using Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper;
using Composite.Linq;
using Composite.ResourceSystem;
using Composite.Transactions;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteMediaFolderWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteMediaFolderWorkflow()
        {
            InitializeComponent();
        }

        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFileFolder folder = (IMediaFileFolder)token.Data;

            string storeId = folder.StoreId;
            string parentPath = folder.Path;

            string innerElementsPathPrefix = string.Format("{0}/", parentPath);

            var fileQueryable = new StoreIdFilterQueryable<IMediaFile>(DataFacade.GetData<IMediaFile>(), storeId);
            IEnumerable<IMediaFile> childFiles =
                (from item in fileQueryable
                 where item.FolderPath.StartsWith(innerElementsPathPrefix) || item.FolderPath == parentPath
                 select item).Evaluate();

            var brokenReferences = new List<IData>();

            foreach (IMediaFile mediaFile in childFiles)
            {
                List<IData> references = DataReferenceFacade.GetNotOptionalReferences(mediaFile);
                foreach (IData reference in references)
                {
                    if (brokenReferences.Any(data => data.DataSourceId.Equals(reference.DataSourceId)))
                    {
                        continue;
                    }
                    brokenReferences.Add(reference);
                }
            }

            e.Result = brokenReferences.Count > 0;
            if (brokenReferences.Count == 0)
            {
                return;
            }

            Bindings.Add("ReferencedData", DataReferenceFacade.GetBrokenReferencesReport(brokenReferences));
        }


        private void deleteCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);
            DataEntityToken token = (DataEntityToken)this.EntityToken;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IMediaFileFolder folder = DataFacade.GetDataFromDataSourceId(token.DataSourceId, false) as IMediaFileFolder;

                // Media folder may already be deleted at this point
                if (folder != null)
                {
                    if (!DataFacade.WillDeleteSucceed(folder))
                    {
                        this.ShowMessage(
                                DialogType.Error,
                                StringResourceSystemFacade.GetString("Composite.Management", "DeleteMediaFolderWorkflow.CascadeDeleteErrorTitle"),
                                StringResourceSystemFacade.GetString("Composite.Management", "DeleteMediaFolderWorkflow.CascadeDeleteErrorMessage")
                            );

                        return;
                    }

                    DataFacade.Delete(folder);
                }

                transactionScope.Complete();
            }

            treeRefresher.PostRefreshMesseges();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFileFolder folder = (IMediaFileFolder)token.Data;

            string storeId = folder.StoreId;
            string parentPath = folder.Path;

            StoreIdFilterQueryable<IMediaFileFolder> folderQueryable = new StoreIdFilterQueryable<IMediaFileFolder>(DataFacade.GetData<IMediaFileFolder>(), storeId);
            StoreIdFilterQueryable<IMediaFile> fileQueryable = new StoreIdFilterQueryable<IMediaFile>(DataFacade.GetData<IMediaFile>(), storeId);

            string innerElementsPathPrefix = string.Format("{0}/", parentPath);

            bool anyFiles =
                (from item in fileQueryable
                 where item.FolderPath.StartsWith(innerElementsPathPrefix) || item.FolderPath == parentPath
                 select item).Any();

            bool anyFolders =
                (from item in folderQueryable
                 where item.Path.StartsWith(innerElementsPathPrefix)
                 select item).Any();


            if ((anyFiles == false) && (anyFolders == false))
            {
                this.Bindings.Add("MessageText", StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.DeleteMediaFolder.Text"));
            }
            else
            {
                this.Bindings.Add("MessageText", StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.DeleteMediaFolder.HasChildringText"));
            }
        }
    }
}
