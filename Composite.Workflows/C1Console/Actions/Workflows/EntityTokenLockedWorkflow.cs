using System;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Actions.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EntityTokenLockedWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EntityTokenLockedWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            EntityTokenLockedEntityToken entityToken = (EntityTokenLockedEntityToken)this.EntityToken;

            this.Bindings.Add("LockedByUsername", entityToken.LockedByUsername);
            this.Bindings.Add("IsSameUser", entityToken.LockedByUsername == UserValidationFacade.GetUsername());
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            EntityTokenLockedEntityToken entityToken = (EntityTokenLockedEntityToken)this.EntityToken;

            ActionLockingFacade.RemoveLock(entityToken.LockedEntityToken);

            this.CloseCurrentView();

            this.ExecuteAction(entityToken.LockedEntityToken, entityToken.LockedActionToken);
        }
    }
}
