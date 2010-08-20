using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.ResourceSystem;
using Composite.Security.Cryptography;
using Composite.Types;
using Composite.Users;
using Composite.Validation;
using Composite.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.ConsoleEventSystem;
using System.Workflow.Runtime;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewUserWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        private static string NewUserBindingName { get { return "NewUser"; } }


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
            newUser.Username = newUser.Username.Trim();

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
                    ShowFieldMessage(NewUserBindingName + ".Username",
                        StringResourceSystemFacade.GetString("Composite.Management", "UserElementProvider.UserLoginIsAlreadyUsed"));

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

            UserElementProviderGroupEntityToken groupEntityToken = this.EntityToken as UserElementProviderGroupEntityToken;

            if (groupEntityToken != null)
            {
                newUser.Group = groupEntityToken.Id;
            }

            CultureInfo userCulture = UserSettings.CultureInfo; // Copy admins settings
            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetApplicationRegionAndLanguageList();

            this.Bindings.Add(NewUserBindingName, newUser);
            this.Bindings.Add("CultureName", userCulture.Name);
            this.Bindings.Add("RegionLanguageList", regionLanguageList);
        }



        private void step1CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser newUser = this.GetBinding<IUser>(NewUserBindingName);

            ValidationResults validationResults = ValidationFacade.Validate(newUser);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage(string.Format("{0}.{1}", NewUserBindingName, result.Key), result.Message);
            }

            int count =
                (from user in DataFacade.GetData<IUser>()
                 where user.Username == newUser.Username
                 select user).Count();

            if (count > 0)
            {
                this.ShowFieldMessage(string.Format("{0}.{1}", NewUserBindingName, "Username"), StringResourceSystemFacade.GetString("Composite.Management", "AddNewUserWorkflow.UsernameDuplicateError"));
            }
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IUser newUser = this.GetBinding<IUser>(NewUserBindingName);
            newUser.EncryptedPassword = newUser.EncryptedPassword.Encrypt();
            newUser = DataFacade.AddNew<IUser>(newUser);

            string cultureName = this.GetBinding<string>("CultureName");

            UserSettings.SetUserCultureInfo(newUser.Username, CultureInfo.CreateSpecificCulture(cultureName));

            CultureInfo locale = DataLocalizationFacade.DefaultLocalizationCulture;

            UserSettings.AddActiveLocaleCultureInfo(newUser.Username, locale);
            UserSettings.SetCurrentActiveLocaleCultureInfo(newUser.Username, locale);
            UserSettings.SetForeignLocaleCultureInfo(newUser.Username, locale);

            this.CloseCurrentView();

            addNewTreeRefresher.PostRefreshMesseges(newUser.GetDataEntityToken());

            this.ExecuteWorklow(newUser.GetDataEntityToken(), typeof(EditUserWorkflow));
        }
    }
}
