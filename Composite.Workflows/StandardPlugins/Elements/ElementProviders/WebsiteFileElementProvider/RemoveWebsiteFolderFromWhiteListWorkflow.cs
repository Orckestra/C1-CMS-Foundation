using System;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    public sealed partial class RemoveWebsiteFolderFromWhiteListWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
