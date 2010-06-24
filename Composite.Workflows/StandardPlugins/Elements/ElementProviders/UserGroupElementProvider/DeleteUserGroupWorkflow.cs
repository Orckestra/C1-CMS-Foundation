using System;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Actions;
using System.Workflow.Activities;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider
{
    public sealed partial class DeleteUserGroupWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteUserGroupWorkflow()
        {
            InitializeComponent();
        }



        private void HasUsers(object sender, ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUserGroup userGroup = (IUserGroup)dataEntityToken.Data;

            e.Result = DataFacade.GetData<IUserUserGroupRelation>(f => f.UserGroupId == userGroup.Id).Any();
        }



        private void initializeCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersTitle"),
                StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersMessage")
                );
        }


        private void finalizeCodeActivity_Delete_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = CreateDeleteTreeRefresher(this.EntityToken);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUserGroup userGroup = (IUserGroup)dataEntityToken.Data;

            DataFacade.Delete(userGroup);

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
