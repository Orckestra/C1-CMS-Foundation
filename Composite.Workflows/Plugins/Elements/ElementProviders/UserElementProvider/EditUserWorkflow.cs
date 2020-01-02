using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;
using Composite.Plugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Core.Logging;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Management;

namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditUserWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static string NotPassword { get { return Uri.UnescapeDataString("%C9%AF%C7%9D%C9%A5%CA%87pu%C4%B1qo%CA%87s%C9%AF%C9%94%C7%9Duo"); } } // should be a very unlikely real life password

        public EditUserWorkflow()
        {
            InitializeComponent();
        }


        private static class BindingNames
        {
            public const string User = "User";
            public const string UserFormLogin = "UserFormLogin";
            public const string NewPassword = "NewPassword";
            public const string ActiveContentLanguage = "ActiveLocaleName";
        }

        private void CheckActiveLanguagesExists(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Any();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var dataEntityToken = (DataEntityToken)this.EntityToken;

            var user = (IUser)dataEntityToken.Data;
            var userFormLogin = user.GetUserFormLogin();

            this.Bindings.Add(BindingNames.User, user);
            this.Bindings.Add(BindingNames.UserFormLogin, userFormLogin);
            this.Bindings.Add(BindingNames.NewPassword, NotPassword);

            CultureInfo userCulture = UserSettings.GetUserCultureInfo(user.Username);
            CultureInfo c1ConsoleUiLanguage = UserSettings.GetUserC1ConsoleUiLanguage(user.Username);

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetSupportedCulturesList();
            Dictionary<string, string> culturesDictionary = StringResourceSystemFacade.GetAllCultures();

            this.Bindings.Add("AllCultures", culturesDictionary);
            this.Bindings.Add("CultureName", userCulture.Name);

            this.Bindings.Add("C1ConsoleUiCultures", regionLanguageList);
            this.Bindings.Add("C1ConsoleUiLanguageName", c1ConsoleUiLanguage.Name);

            var currentActiveCulture = UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username);
            this.Bindings.Add("ActiveLocaleName", currentActiveCulture != null ? currentActiveCulture.Name : null);
            this.Bindings.Add("ActiveLocaleList", DataLocalizationFacade.ActiveLocalizationCultures.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle));

            var clientValidationRules = new Dictionary<string, List<ClientValidationRule>>
            {
                {"Username", ClientValidationRuleFacade.GetClientValidationRules(user, "Username")},
                {"Group", ClientValidationRuleFacade.GetClientValidationRules(user, "Group")}
            };


            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(@"\Administrative\EditUserStep1.xml");

            XDocument formDocument;
            using (var reader = markupProvider.GetReader())
            {
                formDocument = XDocument.Load(reader);
            }

            XElement bindingsElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            XElement layoutElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            XElement tabPanelsElement = layoutElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "TabPanels");
            List<XElement> placeHolderElements = tabPanelsElement.Elements(DataTypeDescriptorFormsHelper.MainNamespace + "PlaceHolder").ToList();

            UpdateFormDefinitionWithUserGroups(user, bindingsElement, placeHolderElements[1]);
            UpdateFormDefinitionWithActivePerspectives(user, bindingsElement, placeHolderElements[2]);
            //UpdateFormDefinitionWithGlobalPermissions(user, bindingsElement, placeHolderElements[1]);

            if (DataLocalizationFacade.ActiveLocalizationCultures.Any())
            {
                UpdateFormDefinitionWithActiveLocales(user, bindingsElement, placeHolderElements[1]);
            }

            string formDefinition = formDocument.GetDocumentAsString();

            this.DeliverFormData(
                    user.Username,
                    StandardUiContainerTypes.Document,
                    formDefinition,
                    this.Bindings,
                    clientValidationRules
                );
        }



        private void UpdateFormDefinitionWithActivePerspectives(IUser user, XElement bindingsElement, XElement placeHolderElement)
        {
            List<string> serializedEntityToken = UserPerspectiveFacade.GetSerializedEntityTokens(user.Username).ToList();

            var helper = new ActivePerspectiveFormsHelper(
                    GetText("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveFieldLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            helper.UpdateWithNewBindings(this.Bindings, serializedEntityToken);
        }



        private void UpdateFormDefinitionWithActiveLocales(IUser user, XElement bindingsElement, XElement placeHolderElement)
        {
            var helper = new ActiveLocalesFormsHelper(
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesFieldLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            helper.UpdateWithNewBindings(this.Bindings, UserSettings.GetActiveLocaleCultureInfos(user.Username, false));
        }



        private void UpdateFormDefinitionWithUserGroups(IUser user, XElement bindingsElement, XElement placeHolderElement)
        {
            var helper = new UserGroupsFormsHelper(
                    GetText("Website.Forms.Administrative.EditUserStep1.UserGroupsFieldLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.UserGroupsMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            List<Guid> relations = DataFacade.GetData<IUserUserGroupRelation>(f => f.UserId == user.Id).Select(f => f.UserGroupId).ToList();

            helper.UpdateWithNewBindings(this.Bindings, relations);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUser user = this.GetBinding<IUser>(BindingNames.User);
            var userFormLogin = GetBinding<IUserFormLogin>(BindingNames.UserFormLogin);

            var userFormLoginFromDatabase = user.GetUserFormLogin();

            bool userValidated = true;

            ValidationResults validationResults = ValidationFacade.Validate(user);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage($"{BindingNames.User}.{result.Key}", result.Message);
                userValidated = false;
            }


            List<CultureInfo> newActiveLocales = ActiveLocalesFormsHelper.GetSelectedLocalesTypes(this.Bindings).ToList();
            List<CultureInfo> currentActiveLocales = UserSettings.GetActiveLocaleCultureInfos(user.Username, false).ToList();

            string selectedActiveLocaleName = this.GetBinding<string>("ActiveLocaleName");

            CultureInfo selectedActiveLocale = CultureInfo.CreateSpecificCulture(selectedActiveLocaleName);

            string systemPerspectiveEntityToken = EntityTokenSerializer.Serialize(AttachingPoint.SystemPerspective.EntityToken);

            List<Guid> newUserGroupIds = UserGroupsFormsHelper.GetSelectedUserGroupIds(this.Bindings);
            List<string> newSerializedEnitityTokens = ActivePerspectiveFormsHelper.GetSelectedSerializedEntityTokens(this.Bindings).ToList();


            if (string.Compare(user.Username, UserSettings.Username, StringComparison.InvariantCultureIgnoreCase) == 0)
            {
                // Current user shouldn't be able to lock itself 
                if (userFormLogin.IsLocked)
                {
                    this.ShowMessage(DialogType.Message,
                             Texts.EditUserWorkflow_EditErrorTitle,
                             Texts.EditUserWorkflow_LockingOwnUserAccount);

                    userValidated = false;
                }

                // Current user shouldn't be able to remove its own access to "System" perspective
                var groupsWithAccessToSystemPerspective = new HashSet<Guid>(GetGroupsThatHasAccessToPerspective(systemPerspectiveEntityToken));

                if (!newSerializedEnitityTokens.Contains(systemPerspectiveEntityToken)
                    && !newUserGroupIds.Any(groupsWithAccessToSystemPerspective.Contains))
                {
                    this.ShowMessage(DialogType.Message,
                             Texts.EditUserWorkflow_EditErrorTitle,
                             Texts.EditUserWorkflow_EditOwnAccessToSystemPerspective);

                    userValidated = false;
                }
            }

            string newPassword = this.GetBinding<string>(BindingNames.NewPassword);
            if (newPassword == NotPassword || UserFormLoginManager.ValidatePassword(userFormLoginFromDatabase, newPassword))
            {
                newPassword = null;
            }
            else
            {
                IList<string> validationMessages;
                if (!PasswordPolicyFacade.ValidatePassword(user, newPassword, out validationMessages))
                {
                    foreach (var message in validationMessages)
                    {
                        this.ShowFieldMessage(BindingNames.NewPassword, message);
                    }

                    userValidated = false;
                }
            }

            if (!userValidated)
            {
                return;
            }

            if (!userFormLogin.IsLocked)
            {
                userFormLogin.LockoutReason = (int)UserLockoutReason.Undefined;
            }
            else
            {
                bool wasLockedBefore = userFormLoginFromDatabase.IsLocked;

                if (!wasLockedBefore)
                {
                    userFormLoginFromDatabase.LockoutReason = (int)UserLockoutReason.LockedByAdministrator;
                }
            }

            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            bool reloadUsersConsoles = false;

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataFacade.Update(user);

                userFormLoginFromDatabase.Folder = userFormLogin.Folder;
                userFormLoginFromDatabase.IsLocked = userFormLogin.IsLocked;
                DataFacade.Update(userFormLoginFromDatabase);

                if (newPassword != null)
                {
                    UserFormLoginManager.SetPassword(userFormLoginFromDatabase, newPassword);
                }

                string cultureName = this.GetBinding<string>("CultureName");
                string c1ConsoleUiLanguageName = this.GetBinding<string>("C1ConsoleUiLanguageName");

                UserSettings.SetUserCultureInfo(user.Username, CultureInfo.CreateSpecificCulture(cultureName));
                UserSettings.SetUserC1ConsoleUiLanguage(user.Username, CultureInfo.CreateSpecificCulture(c1ConsoleUiLanguageName));

                List<string> existingSerializedEntityTokens = UserPerspectiveFacade.GetSerializedEntityTokens(user.Username).ToList();

                int intersectCount = existingSerializedEntityTokens.Intersect(newSerializedEnitityTokens).Count();
                if ((intersectCount != newSerializedEnitityTokens.Count)
                    || (intersectCount != existingSerializedEntityTokens.Count))
                {
                    UserPerspectiveFacade.SetSerializedEntityTokens(user.Username, newSerializedEnitityTokens);

                    if (UserSettings.Username == user.Username)
                    {
                        reloadUsersConsoles = true;
                    }
                }

                if (DataLocalizationFacade.ActiveLocalizationCultures.Any())
                {
                    foreach (CultureInfo cultureInfo in newActiveLocales)
                    {
                        if (!currentActiveLocales.Contains(cultureInfo))
                        {
                            UserSettings.AddActiveLocaleCultureInfo(user.Username, cultureInfo);
                        }
                    }

                    foreach (CultureInfo cultureInfo in currentActiveLocales)
                    {
                        if (!newActiveLocales.Contains(cultureInfo))
                        {
                            UserSettings.RemoveActiveLocaleCultureInfo(user.Username, cultureInfo);
                        }
                    }

                    if (selectedActiveLocale != null)
                    {
                        if (!selectedActiveLocale.Equals(UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username)))
                        {
                            reloadUsersConsoles = true;
                        }

                        UserSettings.SetCurrentActiveLocaleCultureInfo(user.Username, selectedActiveLocale);
                    }
                    else if (UserSettings.GetActiveLocaleCultureInfos(user.Username).Any())
                    {
                        UserSettings.SetCurrentActiveLocaleCultureInfo(user.Username, UserSettings.GetActiveLocaleCultureInfos(user.Username).First());
                    }
                }


                List<IUserUserGroupRelation> oldRelations = DataFacade.GetData<IUserUserGroupRelation>(f => f.UserId == user.Id).ToList();

                IEnumerable<IUserUserGroupRelation> deleteRelations =
                    from r in oldRelations
                    where !newUserGroupIds.Contains(r.UserGroupId)
                    select r;

                DataFacade.Delete(deleteRelations);


                foreach (Guid newUserGroupId in newUserGroupIds)
                {
                    Guid groupId = newUserGroupId;
                    if (oldRelations.Any(f => f.UserGroupId == groupId)) continue;

                    var userUserGroupRelation = DataFacade.BuildNew<IUserUserGroupRelation>();
                    userUserGroupRelation.UserId = user.Id;
                    userUserGroupRelation.UserGroupId = newUserGroupId;

                    DataFacade.AddNew(userUserGroupRelation);
                }

                LoggingService.LogEntry("UserManagement",
                    $"C1 Console user '{user.Username}' updated by '{UserValidationFacade.GetUsername()}'.",
                    LoggingService.Category.Audit,
                    TraceEventType.Information);

                transactionScope.Complete();
            }

            if (UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username) == null)
            {
                this.ShowFieldMessage(BindingNames.ActiveContentLanguage, "The user doesn't have permissions to access the language you selected here. Assign permissions so the user may access this.");
                this.ShowMessage(DialogType.Warning, "User missing permissions for language", "The user doesn't have permissions to access the language you selected as 'Active content language'.");
            }
            else
            {
                if (reloadUsersConsoles)
                {
                    foreach (string consoleId in GetConsoleIdsOpenedByUser(user.Username))
                    {
                        ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), consoleId);
                    }
                }
            }

            SetSaveStatus(true);
            updateTreeRefresher.PostRefreshMesseges(user.GetDataEntityToken());
        }

        private List<Guid> GetGroupsThatHasAccessToPerspective(string usersPerspectiveEntityToken)
        {
            return DataFacade.GetData<IUserGroupActivePerspective>()
                             .Where(ug => ug.SerializedEntityToken == usersPerspectiveEntityToken)
                             .Select(ug => ug.UserGroupId).ToList();
        }

        private void IsUserLoggedOn(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUser user = (IUser)dataEntityToken.Data;

            string selectedActiveLocaleName = (user.Username != UserSettings.Username ?
                    this.GetBinding<string>("ActiveLocaleName") :
                    UserSettings.ActiveLocaleCultureInfo.ToString());

            if (selectedActiveLocaleName != null)
            {
                CultureInfo selectedActiveLocale = CultureInfo.CreateSpecificCulture(selectedActiveLocaleName);

                if (!selectedActiveLocale.Equals(UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username)))
                {
                    e.Result = ConsoleFacade.GetConsoleIdsByUsername(user.Username).Any();
                    return;
                }
            }

            e.Result = false;
        }



        private void IsSameUser(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUser user = (IUser)dataEntityToken.Data;

            e.Result = user.Username == UserSettings.Username;
        }



        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.ShowMessage(
                DialogType.Message,
                GetText("UserElementProvider.MissingActiveLanguageTitle"),
                GetText("UserElementProvider.MissingActiveLanguageMessage"));
        }

        private string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }
    }
}
