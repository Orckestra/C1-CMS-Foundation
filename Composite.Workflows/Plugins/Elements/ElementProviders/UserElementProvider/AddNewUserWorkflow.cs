using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Workflow.Runtime;
using System.Workflow.Activities;

using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation;
using Composite.C1Console.Workflow;
using Composite.C1Console.Events;
using Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewUserWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static class BindingNames
        {
            public const string NewUser = "NewUser";
            public const string Username = "NewUser.Username";
            public const string Password = "Password";
            public const string UserFormLogin = "UserFormLogin";
        }

        public AddNewUserWorkflow()
        {
            InitializeComponent();
        }


        private void CheckActiveLanguagesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Any();
        }


        private void IsUserValid(object sender, ConditionalEventArgs e)
        {
            IUser newUser = this.GetBinding<IUser>(BindingNames.NewUser);
            var bindedUserFormLogin = this.GetBinding<IUserFormLogin>(BindingNames.UserFormLogin);

            NormalizeUsername(newUser);
            
            ValidationResults validationResults = ValidationFacade.Validate(newUser);

            bool isValid = validationResults.IsValid;

            if (isValid)
            {
                validationResults = ValidationFacade.Validate(bindedUserFormLogin);

                isValid = validationResults.IsValid;
            }

            if(isValid)
            {
                IQueryable<IUser> usersWithTheSameName =
                    from user in DataFacade.GetData<IUser>()
                    where string.Compare(user.Username, newUser.Username, StringComparison.InvariantCultureIgnoreCase) == 0
                    select user;

                if(usersWithTheSameName.Any())
                {
                    ShowFieldMessage(BindingNames.Username,
                        LocalizationFiles.Composite_Management.UserElementProvider_UserLoginIsAlreadyUsed);

                    isValid = false;
                }

                string password = this.GetBinding<string>(BindingNames.Password);


                IList<string> validationMessages;
                if (!PasswordPolicyFacade.ValidatePassword(newUser, password, out validationMessages))
                {
                    foreach (var message in validationMessages)
                    {
                        this.ShowFieldMessage(BindingNames.Password, message);
                    }

                    isValid = false;
                }
            }

            e.Result = isValid;
        }


        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.ShowMessage(
                DialogType.Message,
                LocalizationFiles.Composite_Management.UserElementProvider_MissingActiveLanguageTitle,
                LocalizationFiles.Composite_Management.UserElementProvider_MissingActiveLanguageMessage);
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser newUser = DataFacade.BuildNew<IUser>();
            newUser.Id = Guid.NewGuid();

            var userFormLogin = DataFacade.BuildNew<IUserFormLogin>();

            userFormLogin.PasswordHash = "";
            userFormLogin.PasswordHashSalt = "";


            var groupEntityToken = this.EntityToken as UserElementProviderGroupEntityToken;

            if (groupEntityToken != null)
            {
                userFormLogin.Folder = groupEntityToken.Id;
            }

            CultureInfo userCulture = UserSettings.CultureInfo; // Copy admins settings
            CultureInfo c1ConsoleUiLanguage = UserSettings.C1ConsoleUiLanguage; // Copy admins settings

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetSupportedCulturesList();
            Dictionary<string, string> culturesDictionary = StringResourceSystemFacade.GetAllCultures();
            
            this.Bindings.Add(BindingNames.NewUser, newUser);
            this.Bindings.Add(BindingNames.UserFormLogin, userFormLogin);

            this.Bindings.Add("AllCultures", culturesDictionary);
            this.Bindings.Add("CultureName", userCulture.Name);

            this.Bindings.Add("C1ConsoleUiCultures", regionLanguageList);
            this.Bindings.Add("C1ConsoleUiLanguageName", c1ConsoleUiLanguage.Name);
        }



        private void step1CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser newUser = this.GetBinding<IUser>(BindingNames.NewUser);
            NormalizeUsername(newUser);

            ValidationResults validationResults = ValidationFacade.Validate(newUser);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage($"{BindingNames.NewUser}.{result.Key}", result.Message);
            }

            IQueryable<IUser> usersWithTheSameName =
                 from user in DataFacade.GetData<IUser>()
                 where string.Compare(user.Username, newUser.Username, StringComparison.InvariantCultureIgnoreCase) == 0
                 select user;

            if (usersWithTheSameName.Any())
            {
                this.ShowFieldMessage(BindingNames.Username,
                    LocalizationFiles.Composite_Management.AddNewUserWorkflow_UsernameDuplicateError);
                
            }
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IUser newUser = this.GetBinding<IUser>(BindingNames.NewUser);
            var bindedUserFormLogin = this.GetBinding<IUserFormLogin>(BindingNames.UserFormLogin);

            NormalizeUsername(newUser);

            string password = this.GetBinding<string>(BindingNames.Password);

            newUser = DataFacade.AddNew<IUser>(newUser);

            UserFormLoginManager.CreateUserFormLogin(newUser.Id, password, bindedUserFormLogin.Folder);

            string cultureName = this.GetBinding<string>("CultureName");
            string c1ConsoleUiLanguageName = this.GetBinding<string>("C1ConsoleUiLanguageName");

            UserSettings.SetUserCultureInfo(newUser.Username, CultureInfo.CreateSpecificCulture(cultureName));
            UserSettings.SetUserC1ConsoleUiLanguage(newUser.Username, CultureInfo.CreateSpecificCulture(c1ConsoleUiLanguageName));

            CultureInfo locale = DataLocalizationFacade.DefaultLocalizationCulture;

            UserSettings.AddActiveLocaleCultureInfo(newUser.Username, locale);
            UserSettings.SetCurrentActiveLocaleCultureInfo(newUser.Username, locale);
            UserSettings.SetForeignLocaleCultureInfo(newUser.Username, locale);

            this.CloseCurrentView();

            addNewTreeRefresher.PostRefreshMesseges(newUser.GetDataEntityToken());

            LoggingService.LogEntry("UserManagement",
                $"New C1 Console user '{newUser.Username}' created by '{UserValidationFacade.GetUsername()}'.", 
                LoggingService.Category.Audit,
                TraceEventType.Information);


            this.ExecuteWorklow(newUser.GetDataEntityToken(), typeof(EditUserWorkflow));
        }



        private static void NormalizeUsername(IUser user)
        {
            // User names are lower-cased
            user.Username =  user.Username.Trim().ToLowerInvariant();
        }
    }
}
