using System;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    public sealed partial class RemoveWebsiteFolderFromWhiteListWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public RemoveWebsiteFolderFromWhiteListWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
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

            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            string keyName = workflowActionToken.Payload;

            DataFacade.Delete<IFolderWhiteList>(f => f.TildeBasedPath == IFolderWhiteListExtensions.GetTildePath(folderPath) && f.KeyName == keyName);

            updateTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }
    }
}
