using System;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteUserWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        private bool _deleteSelf = false;



        public DeleteUserWorkflow()
        {
            InitializeComponent();
        }



        private void IsDeleteSelf(object sender, ConditionalEventArgs e)
        {
            e.Result = _deleteSelf;
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUser user = (IUser)dataEntityToken.Data;

            _deleteSelf = user.Username == UserValidationFacade.GetUsername();
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            
            IUser user = (IUser)dataEntityToken.Data;

            if (DataFacade.WillDeleteSucceed(user) == true)
            {
                UserPerspectiveFacade.DeleteAll(user.Username);

                DataFacade.Delete(user);

                deleteTreeRefresher.PostRefreshMesseges();
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Management", "DeleteUserWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Management", "DeleteUserWorkflow.CascadeDeleteErrorMessage")
                    );
            }
        }        
    }
}
