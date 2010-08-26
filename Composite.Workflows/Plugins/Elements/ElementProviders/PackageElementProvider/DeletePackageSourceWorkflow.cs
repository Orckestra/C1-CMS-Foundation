using System;
using Composite.Data;
using Composite.C1Console.Workflow;
using Composite.C1Console.Actions;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePackageSourceWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
