using System;
using System.Collections.Generic;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Core.Linq;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_C1Console_Users;

namespace Composite.C1Console.Users.Workflows
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnPasswordWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnPasswordWorkflow()
        {
            InitializeComponent();
        }

        private static class Fields
        {
            public const string OldPassword = "OldPassword";
            public const string NewPassword = "NewPassword";
            public const string NewPasswordConfirmed = "NewPasswordConfirmed";
        }

        private void ChangePasswordWorkflow_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add(Fields.OldPassword, "");
            this.Bindings.Add(Fields.NewPassword, "");
            this.Bindings.Add(Fields.NewPasswordConfirmed, "");
            this.BindingsValidationRules.Add(Fields.OldPassword, new List<ClientValidationRule>{ new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add(Fields.NewPassword, new List<ClientValidationRule>{new NotNullClientValidationRule()});
            this.BindingsValidationRules.Add(Fields.NewPasswordConfirmed, new List<ClientValidationRule>{new NotNullClientValidationRule()});
        }


        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string newPassword = this.GetBinding<string>(Fields.NewPassword);

            string currentUserName = UserValidationFacade.GetUsername();
            UserValidationFacade.FormSetUserPassword(currentUserName, newPassword);

            LoggingService.LogVerbose("ChangeOwnPasswordWorkflow", 
                string.Format("User '{0}' has changed password.", UserValidationFacade.GetUsername()),
                LoggingService.Category.Audit);
        }



        private void EnsurePasswordUpdatesAreSupported(object sender, ConditionalEventArgs e)
        {
            e.Result = UserValidationFacade.CanSetUserPassword;
        }

        private void ValidateSpecifiedPasswords(object sender, ConditionalEventArgs e)
        {
            string oldPassword = this.GetBinding<string>(Fields.OldPassword);
            string newPassword = this.GetBinding<string>(Fields.NewPassword);
            string newPasswordConfirmed = this.GetBinding<string>(Fields.NewPasswordConfirmed);

            e.Result = ValidateSpecifiedPasswords(oldPassword, newPassword, newPasswordConfirmed);
        }

        private bool ValidateSpecifiedPasswords(string oldPassword, string newPassword, string newPasswordConfirmed)
        {
            string currentUserName = UserValidationFacade.GetUsername();

            bool oldPasswordCorrect = UserValidationFacade.FormValidateUserWithoutLogin(currentUserName, oldPassword);

            if (!oldPasswordCorrect)
            {
                this.ShowFieldMessage(Fields.OldPassword, Texts.ChangeOwnPasswordWorkflow_Dialog_Validation_IncorrectPassword);
                return false;
            }

            if (newPassword != newPasswordConfirmed)
            {
                this.ShowFieldMessage(Fields.NewPasswordConfirmed, Texts.ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordFieldsNotMatch);
                return false;
            }

            if (newPassword == oldPassword)
            {
                this.ShowFieldMessage(Fields.NewPassword, Texts.ChangeOwnPasswordWorkflow_Dialog_Validation_PasswordsAreTheSame);
                return false;
            }

            if (string.IsNullOrEmpty(newPassword))
            {
                this.ShowFieldMessage(Fields.NewPassword, Texts.ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordIsEmpty);
                return false;
            }

            string userName = UserValidationFacade.GetUsername();

            var user = DataFacade.GetData<IUser>(u => string.Compare(u.Username, userName, StringComparison.InvariantCultureIgnoreCase) == 0)
                .FirstOrException("No user found with name '{0}'", userName);

            IList<string> newPasswordValidationMessages;
            if (!PasswordPolicyFacade.ValidatePassword(user, newPassword, out newPasswordValidationMessages))
            {
                foreach (var message in newPasswordValidationMessages)
                {
                    this.ShowFieldMessage(Fields.NewPassword, message);
                }
                return false;
            }

            return true;
        }

        private void InitializeConditionsNotMetAlertActivity_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(DialogType.Error, Texts.ChangeOwnPasswordWorkflow_NotSupportedErrorLabel, Texts.ChangeOwnPasswordWorkflow_NotSupportedErrorText);
        }
    }
}
