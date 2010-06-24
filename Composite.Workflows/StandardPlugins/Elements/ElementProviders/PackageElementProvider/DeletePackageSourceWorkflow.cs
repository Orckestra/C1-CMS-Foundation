using System;
using Composite.Data;
using Composite.Workflow;
using Composite.Actions;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePackageSourceWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeletePackageSourceWorkflow()
        {
            InitializeComponent();
        }

        private void step1CodeActivity_Delete_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            DataFacade.Delete(dataEntityToken.Data);

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(new PackageElementProviderRootEntityToken());
        }
    }
}
