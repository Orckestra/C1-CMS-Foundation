using System;
using System.IO;
using Composite.GlobalSettings;
using Composite.IO;
using Composite.StandardPlugins.Elements.ElementProviders.DeveloperApplicationProvider;
using Composite.Workflow;


namespace Composite.Workflows.Trees.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteTreeDefinitionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteTreeDefinitionWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DeveloperApplicationProviderEntityToken castedEntityToken = (DeveloperApplicationProviderEntityToken)this.EntityToken;

            FileEx.Delete(castedEntityToken.FullTreePath);

            this.RefreshRootEntityToken();
        }
    }
}
