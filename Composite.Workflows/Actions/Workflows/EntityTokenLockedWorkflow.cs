using System;
using Composite.Security;
using Composite.Workflow;


namespace Composite.Actions.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EntityTokenLockedWorkflow : Composite.Workflow.Activities.FormsWorkflow
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
