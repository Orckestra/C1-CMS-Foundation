using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteWebsiteFolderWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteWebsiteFolderWorkflow()
        {
            InitializeComponent();
        }

        private void deleteCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            WebsiteFileElementProviderEntityToken entityToken = (WebsiteFileElementProviderEntityToken)this.EntityToken;

            try
            {                
                C1Directory.Delete(entityToken.Path, true);

                treeRefresher.PostRefreshMesseges();
            }
            catch (Exception) 
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFolderWorkflow.DeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFolderWorkflow.DeleteErrorMessage")
                    );
            }
        }
    }
}
