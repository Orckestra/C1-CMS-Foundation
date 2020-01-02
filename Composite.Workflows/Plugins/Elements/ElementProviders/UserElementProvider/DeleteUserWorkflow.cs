using System;
using System.Diagnostics;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Logging;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteUserWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private bool _deleteSelf;



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
            var dataEntityToken = (DataEntityToken)this.EntityToken;

            IUser user = (IUser)dataEntityToken.Data;

            _deleteSelf = user.Username == UserValidationFacade.GetUsername();
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var dataEntityToken = (DataEntityToken)this.EntityToken;
            
            IUser user = (IUser)dataEntityToken.Data;

            if (!DataFacade.WillDeleteSucceed(user))
            {
                this.ShowMessage(
                    DialogType.Error,
                    LocalizationFiles.Composite_Management.DeleteUserWorkflow_CascadeDeleteErrorTitle,
                    LocalizationFiles.Composite_Management.DeleteUserWorkflow_CascadeDeleteErrorMessage);
                return;
            }

            UserPerspectiveFacade.DeleteAll(user.Username);

            DataFacade.Delete(user);

            LoggingService.LogEntry("UserManagement",
                $"C1 Console user '{user.Username}' deleted by '{UserValidationFacade.GetUsername()}'.",
                LoggingService.Category.Audit,
                TraceEventType.Information);

            this.CreateParentTreeRefresher().PostRefreshMessages(dataEntityToken, 2);
        }
    }
}
