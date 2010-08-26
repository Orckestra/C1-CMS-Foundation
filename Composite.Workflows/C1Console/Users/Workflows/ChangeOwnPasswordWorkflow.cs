using System;
using System.Collections.Generic;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Users.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnPasswordWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnPasswordWorkflow()
        {
            InitializeComponent();
        }


        private void ChangePasswordWorkflow_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("OldPassword", "");
            this.Bindings.Add("NewPassword", "");
            this.Bindings.Add("NewPasswordConfirmed", "");
            this.BindingsValidationRules.Add("OldPassword", new List<ClientValidationRule>{ new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("NewPassword", new List<ClientValidationRule>{new NotNullClientValidationRule()});
            this.BindingsValidationRules.Add("NewPasswordConfirmed", new List<ClientValidationRule>{new NotNullClientValidationRule()});
        }


        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string oldPassword = this.GetBinding<string>("OldPassword");
            string newPassword = this.GetBinding<string>("NewPassword");
            string newPasswordConfirmed = this.GetBinding<string>("NewPasswordConfirmed");

            string currentUserName = UserValidationFacade.GetUsername();
            UserValidationFacade.FormSetUserPassword(currentUserName, newPassword);

            LoggingService.LogVerbose("ChangeOwnPasswordWorkflow", string.Format("User '{0}' has changed password.", UserValidationFacade.GetUsername()));
        }



        private void EnsurePasswordUpdatesAreSupported(object sender, ConditionalEventArgs e)
        {
            e.Result = UserValidationFacade.CanSetUserPassword;
        }

        private void ValidateSpecifiedPasswords(object sender, ConditionalEventArgs e)
        {
            string oldPassword = this.GetBinding<string>("OldPassword");
            string newPassword = this.GetBinding<string>("NewPassword");
            string newPasswordConfirmed = this.GetBinding<string>("NewPasswordConfirmed");

            string currentUserName = UserValidationFacade.GetUsername();

            bool oldPasswordOk = UserValidationFacade.FormValidateUserWithoutLogin(currentUserName, oldPassword);

            if (oldPasswordOk == false)
            {
                this.ShowFieldMessage("OldPassword", "The specified password is incorrect.");
                e.Result = false;
            }
            else
            {
                if (newPassword != newPasswordConfirmed)
                {
                    this.ShowFieldMessage("NewPasswordConfirmed", "The new passwords you typed do not match.");
                    e.Result = false;
                }
                else
                {
                    if (string.IsNullOrEmpty(newPassword)==true)
                    {
                        this.ShowFieldMessage("NewPassword", "The new password may not be an empty string.");
                        e.Result = false;
                    }
                    else
                    {
                        e.Result = true;
                    }
                }
            }
        }

        private void InitializeConditionsNotMetAlertActivity_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(DialogType.Error, "${Composite.C1Console.Users, ChangeOwnPasswordWorkflow.NotSupportedErrorLabel}", "${Composite.C1Console.Users, ChangeOwnPasswordWorkflow.NotSupportedErrorText}");
        }
    }
}
