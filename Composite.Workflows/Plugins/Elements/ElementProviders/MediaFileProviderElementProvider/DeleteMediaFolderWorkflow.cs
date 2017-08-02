using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Types.StoreIdFilter;
using Composite.Core.Linq;
using Composite.Data.Transactions;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Management;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteMediaFolderWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteMediaFolderWorkflow()
        {
            InitializeComponent();
        }

        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            var token = (DataEntityToken)this.EntityToken;
            var folder = (IMediaFileFolder)token.Data;

            string storeId = folder.StoreId;
            string parentPath = folder.Path;

            string innerElementsPathPrefix = $"{parentPath}/";

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

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                IMediaFileFolder folder = DataFacade.GetDataFromDataSourceId(token.DataSourceId, false) as IMediaFileFolder;

                // Media folder may already be deleted at this point
                if (folder != null)
                {
                    if (!DataFacade.WillDeleteSucceed(folder))
                    {
                        this.ShowMessage(DialogType.Error,
                                Texts.DeleteMediaFolderWorkflow_CascadeDeleteErrorTitle,
                                Texts.DeleteMediaFolderWorkflow_CascadeDeleteErrorMessage);

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
            var token = (DataEntityToken)this.EntityToken;
            var folder = (IMediaFileFolder)token.Data;

            string storeId = folder.StoreId;
            string parentPath = folder.Path;

            var folderQueryable = new StoreIdFilterQueryable<IMediaFileFolder>(DataFacade.GetData<IMediaFileFolder>(), storeId);
            var fileQueryable = new StoreIdFilterQueryable<IMediaFile>(DataFacade.GetData<IMediaFile>(), storeId);

            string innerElementsPathPrefix = $"{parentPath}/";

            bool anyFiles =
                (from item in fileQueryable
                 where item.FolderPath.StartsWith(innerElementsPathPrefix) || item.FolderPath == parentPath
                 select item).Any();

            bool anyFolders =
                (from item in folderQueryable
                 where item.Path.StartsWith(innerElementsPathPrefix)
                 select item).Any();

            var message = !anyFiles && !anyFolders
                ? Texts.Website_Forms_Administrative_DeleteMediaFolder_Text
                : Texts.Website_Forms_Administrative_DeleteMediaFolder_HasChildringText;

            this.Bindings.Add("MessageText", message);
        }
    }
}
