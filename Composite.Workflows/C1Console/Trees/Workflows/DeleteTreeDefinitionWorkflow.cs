using System;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.DeveloperApplicationProvider;


namespace Composite.C1Console.Trees.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteTreeDefinitionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
