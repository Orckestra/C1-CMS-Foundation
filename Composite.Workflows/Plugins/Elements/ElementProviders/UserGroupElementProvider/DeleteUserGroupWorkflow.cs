using System;
using System.Diagnostics;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Actions;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.UserGroupElementProvider
{
    public sealed partial class DeleteUserGroupWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", "DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersTitle"),
                StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", "DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersMessage")
                );
        }


        private void finalizeCodeActivity_Delete_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = CreateDeleteTreeRefresher(this.EntityToken);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUserGroup userGroup = (IUserGroup)dataEntityToken.Data;

            DataFacade.Delete(userGroup);

            LoggingService.LogEntry("UserManagement",
                $"C1 Console user group '{userGroup.Name}' deleted by '{UserValidationFacade.GetUsername()}'.", 
                LoggingService.Category.Audit,
                TraceEventType.Information);

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
