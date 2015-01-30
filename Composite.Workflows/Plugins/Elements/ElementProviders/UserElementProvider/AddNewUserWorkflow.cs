using System;
using System.Collections.Generic;
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
        private static string NewUserBindingName { get { return "NewUser"; } }


        private static class BindingNames
        {
            public const string Username = "NewUser.Username";
            public const string EncryptedPassword = "NewUser.EncryptedPassword";
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
            IUser newUser = this.GetBinding<IUser>(NewUserBindingName);

            NormalizeUsername(newUser);
            
            ValidationResults validationResults = ValidationFacade.Validate(newUser);

            bool isValid = validationResults.IsValid;

            if(isValid)
            {
                IQueryable<IUser> usersWithTheSameName =
                    from user in DataFacade.GetData<IUser>()
                    where string.Compare(user.Username, newUser.Username, StringComparison.InvariantCultureIgnoreCase) == 0
                    select user;

                if(usersWithTheSameName.Any())
                {
                    ShowFieldMessage(BindingNames.Username,
                        StringResourceSystemFacade.GetString("Composite.Management", "UserElementProvider.UserLoginIsAlreadyUsed"));

                    isValid = false;
                }

                IList<string> validationMessages;
                if (!PasswordPolicyFacade.ValidatePassword(newUser, newUser.EncryptedPassword, out validationMessages))
                {
                    foreach (var message in validationMessages)
                    {
                        this.ShowFieldMessage(BindingNames.EncryptedPassword, message);
                    }

                    isValid = false;
                }
            }

            e.Result = isValid;
        }


        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Management", "UserElementProvider.MissingActiveLanguageTitle"),
                StringResourceSystemFacade.GetString("Composite.Management", "UserElementProvider.MissingActiveLanguageMessage"));
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser newUser = DataFacade.BuildNew<IUser>();
            newUser.Id = Guid.NewGuid();

            var groupEntityToken = this.EntityToken as UserElementProviderGroupEntityToken;

            if (groupEntityToken != null)
            {
                newUser.Group = groupEntityToken.Id;
            }

            CultureInfo userCulture = UserSettings.CultureInfo; // Copy admins settings
            CultureInfo c1ConsoleUiLanguage = UserSettings.C1ConsoleUiLanguage; // Copy admins settings

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetSupportedCulturesList();
            Dictionary<string, string> culturesDictionary = StringResourceSystemFacade.GetAllCultures();
            
            this.Bindings.Add(NewUserBindingName, newUser);

            this.Bindings.Add("AllCultures", culturesDictionary);
            this.Bindings.Add("CultureName", userCulture.Name);

            this.Bindings.Add("C1ConsoleUiCultures", regionLanguageList);
            this.Bindings.Add("C1ConsoleUiLanguageName", c1ConsoleUiLanguage.Name);
        }



        private void step1CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser newUser = this.GetBinding<IUser>(NewUserBindingName);
            NormalizeUsername(newUser);

            ValidationResults validationResults = ValidationFacade.Validate(newUser);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage(string.Format("{0}.{1}", NewUserBindingName, result.Key), result.Message);
            }

            IQueryable<IUser> usersWithTheSameName =
                 from user in DataFacade.GetData<IUser>()
                 where string.Compare(user.Username, newUser.Username, StringComparison.InvariantCultureIgnoreCase) == 0
                 select user;

            if (usersWithTheSameName.Any())
            {
                this.ShowFieldMessage(BindingNames.Username, StringResourceSystemFacade.GetString("Composite.Management", "AddNewUserWorkflow.UsernameDuplicateError"));
            }
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IUser newUser = this.GetBinding<IUser>(NewUserBindingName);
            NormalizeUsername(newUser);

            string password = newUser.EncryptedPassword;

            newUser.EncryptedPassword = "";
            newUser = DataFacade.AddNew<IUser>(newUser);

            UserPasswordManager.SetPassword(newUser, password);

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

            LoggingService.LogVerbose("UserManagement", String.Format("New C1 Console user '{0}' created by '{1}'.", newUser.Username, UserValidationFacade.GetUsername()), LoggingService.Category.Audit);


            this.ExecuteWorklow(newUser.GetDataEntityToken(), typeof(EditUserWorkflow));
        }



        private static void NormalizeUsername(IUser user)
        {
            // User names are lower-cased
            user.Username =  user.Username.Trim().ToLowerInvariant();
        }
    }
}
