using System;
using System.Linq;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    public sealed partial class AddWebsiteFolderToWhiteListWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddWebsiteFolderToWhiteListWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            WorkflowActionToken workflowActionToken = (WorkflowActionToken)this.ActionToken;

            string folderPath = null;
            if (this.EntityToken is WebsiteFileElementProviderRootEntityToken)
            {
                folderPath = "";
            }
            else
            {
                WebsiteFileElementProviderEntityToken entityToken = (WebsiteFileElementProviderEntityToken)this.EntityToken;
                folderPath = entityToken.Path;
            }

            string keyName = workflowActionToken.Payload;

            string relativeFolderPath = IFolderWhiteListExtensions.GetTildePath(folderPath);

            if (!DataFacade.GetData<IFolderWhiteList>().Any(f => f.TildeBasedPath == relativeFolderPath && f.KeyName == keyName))
            {
                IFolderWhiteList folderWhiteList = DataFacade.BuildNew<IFolderWhiteList>();
                folderWhiteList.KeyName = keyName;
                folderWhiteList.TildeBasedPath = IFolderWhiteListExtensions.GetTildePath(folderPath);
                DataFacade.AddNew(folderWhiteList);
            }

            updateTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }
    }
}
