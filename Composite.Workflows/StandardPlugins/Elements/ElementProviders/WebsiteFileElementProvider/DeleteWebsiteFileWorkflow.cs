using System;
using System.IO;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteWebsiteFileWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteWebsiteFileWorkflow()
        {
            InitializeComponent();
        }



        private void deleteCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);
         
            WebsiteFileElementProviderEntityToken entityToken = (WebsiteFileElementProviderEntityToken)this.EntityToken;

            try
            {
                File.Delete(entityToken.Path);

                treeRefresher.PostRefreshMesseges();
            }
            catch (Exception)
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.WebsiteFileElementProvider", "DeleteWebsiteFileWorkflow.DeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.WebsiteFileElementProvider", "DeleteWebsiteFileWorkflow.DeleteErrorMessage")
                    );
            }
        }
    }
}
