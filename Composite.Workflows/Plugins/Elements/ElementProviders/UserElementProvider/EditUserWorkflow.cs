using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
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
using Composite.C1Console.Security.Cryptography;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Core.Logging;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditUserWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static string UserBindingName { get { return "User"; } }
        private static string NotPassword { get { return Uri.UnescapeDataString("%C9%AF%C7%9D%C9%A5%CA%87pu%C4%B1qo%CA%87s%C9%AF%C9%94%C7%9Duo"); } } // should be a very unlikely real life password

        public EditUserWorkflow()
        {
            InitializeComponent();
        }



        private void CheckActiveLanguagesExists(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Any();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUser user = (IUser)dataEntityToken.Data;

            user.EncryptedPassword = NotPassword;

            this.Bindings.Add(UserBindingName, user);

            CultureInfo userCulture = UserSettings.GetUserCultureInfo(user.Username);
            CultureInfo c1ConsoleUiLanguage = UserSettings.GetUserC1ConsoleUiLanguage(user.Username);

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetSupportedCulturesList();
            Dictionary<string, string> culturesDictionary = StringResourceSystemFacade.GetAllCultures();

            this.Bindings.Add("AllCultures", culturesDictionary);
            this.Bindings.Add("CultureName", userCulture.Name);

            this.Bindings.Add("C1ConsoleUiCultures", regionLanguageList);
            this.Bindings.Add("C1ConsoleUiLanguageName", c1ConsoleUiLanguage.Name);

            if (UserSettings.GetActiveLocaleCultureInfos(user.Username).Any() && (user.Username != UserSettings.Username))
            {
                this.Bindings.Add("ActiveLocaleName", UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username).Name);
                this.Bindings.Add("ActiveLocaleList", DataLocalizationFacade.ActiveLocalizationCultures.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle));
            }

            Dictionary<string, List<ClientValidationRule>> clientValidationRules = new Dictionary<string, List<ClientValidationRule>>();
            clientValidationRules.Add("Username", ClientValidationRuleFacade.GetClientValidationRules(user, "Username"));
            clientValidationRules.Add("EncryptedPassword", ClientValidationRuleFacade.GetClientValidationRules(user, "EncryptedPassword"));
            clientValidationRules.Add("Group", ClientValidationRuleFacade.GetClientValidationRules(user, "Group"));


            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(@"\Administrative\EditUserStep1.xml");

            XDocument formDocument = XDocument.Load(markupProvider.GetReader());

            XElement bindingsElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            XElement layoutElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            XElement tabPanelsElement = layoutElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "TabPanels");
            List<XElement> placeHolderElements = tabPanelsElement.Elements(DataTypeDescriptorFormsHelper.MainNamespace + "PlaceHolder").ToList();

            UpdateFormDefinitionWithUserGroups(user, bindingsElement, placeHolderElements[1]);
            UpdateFormDefinitionWithActivePerspectives(user, bindingsElement, placeHolderElements[2]);
            //UpdateFormDefinitionWithGlobalPermissions(user, bindingsElement, placeHolderElements[1]);

            if (DataLocalizationFacade.ActiveLocalizationCultures.Count() > 0)
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

            ActivePerspectiveFormsHelper helper = new ActivePerspectiveFormsHelper(
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
            ActiveLocalesFormsHelper helper = new ActiveLocalesFormsHelper(
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesFieldLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectLabel"),
                    GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            helper.UpdateWithNewBindings(this.Bindings, UserSettings.GetActiveLocaleCultureInfos(user.Username));
        }



        private void UpdateFormDefinitionWithUserGroups(IUser user, XElement bindingsElement, XElement placeHolderElement)
        {
            UserGroupsFormsHelper helper = new UserGroupsFormsHelper(
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
            IUser user = this.GetBinding<IUser>(UserBindingName);

            bool userValidated = true;

            ValidationResults validationResults = ValidationFacade.Validate(user);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage(string.Format("{0}.{1}", UserBindingName, result.Key), result.Message);
                userValidated = false;
            }


            List<CultureInfo> newActiveLocales = ActiveLocalesFormsHelper.GetSelectedLocalesTypes(this.Bindings).ToList();
            List<CultureInfo> currentActiveLocales = null;
            CultureInfo selectedActiveLocal = null;

            if (newActiveLocales.Count > 0)
            {
                currentActiveLocales = UserSettings.GetActiveLocaleCultureInfos(user.Username).ToList();


                string selectedActiveLocaleName = (user.Username != UserSettings.Username ?
                    this.GetBinding<string>("ActiveLocaleName") :
                    UserSettings.ActiveLocaleCultureInfo.ToString());

                if (selectedActiveLocaleName != null)
                {
                    selectedActiveLocal = CultureInfo.CreateSpecificCulture(selectedActiveLocaleName);
                    if (newActiveLocales.Contains(selectedActiveLocal) == false)
                    {
                        if (user.Username != UserSettings.Username)
                        {
                            this.ShowFieldMessage("ActiveLocaleName", GetText("Website.Forms.Administrative.EditUserStep1.ActiveLocaleNotChecked"));
                        }
                        else
                        {
                            this.ShowFieldMessage("ActiveLocalesFormsHelper_Selected", GetText("Website.Forms.Administrative.EditUserStep1.NoActiveLocaleSelected"));
                        }
                        userValidated = false;
                    }
                }
            }
            else
            {
                this.ShowFieldMessage("ActiveLocalesFormsHelper_Selected", GetText("Website.Forms.Administrative.EditUserStep1.NoActiveLocaleSelected"));
                userValidated = false;
            }


            string systemPerspectiveEntityToken = EntityTokenSerializer.Serialize(AttachingPoint.SystemPerspective.EntityToken);

            List<Guid> newUserGroupIds = UserGroupsFormsHelper.GetSelectedUserGroupIds(this.Bindings);
            List<string> newSerializedEnitityTokens = ActivePerspectiveFormsHelper.GetSelectedSerializedEntityTokens(this.Bindings).ToList();

            // Current user shouldn't be able to remove its own access to "System" perspective
            if(string.Compare(user.Username, UserSettings.Username, StringComparison.InvariantCultureIgnoreCase) == 0)
            {
                HashSet<Guid> groupsWithAccessToSystemPerspective = new HashSet<Guid>(GetGroupsThatHasAccessToPerspective(systemPerspectiveEntityToken));

               if(!newSerializedEnitityTokens.Contains(systemPerspectiveEntityToken)
                   && !newUserGroupIds.Any(groupsWithAccessToSystemPerspective.Contains))
               {
                   this.ShowMessage(DialogType.Message,
                            GetText("EditUserWorkflow.EditErrorTitle"),
                            GetText("EditUserWorkflow.EditOwnAccessToSystemPerspective"));

                   userValidated = false;
               }
            }


            if (userValidated)
            {
                UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

                if (user.EncryptedPassword != NotPassword)
                {
                    user.EncryptedPassword = user.EncryptedPassword.Encrypt();
                }
                else
                {
                    using(var connection = new DataConnection())
                    {
                        string currentPwdFromDataProvider = connection.Get<IUser>().First(f => f.Id == user.Id).EncryptedPassword;
                        user.EncryptedPassword = currentPwdFromDataProvider;
                    }
                }

                bool reloadUsersConsoles = false;

                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    DataFacade.Update(user);

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
                            if (currentActiveLocales.Contains(cultureInfo) == false)
                            {
                                UserSettings.AddActiveLocaleCultureInfo(user.Username, cultureInfo);
                            }
                        }

                        foreach (CultureInfo cultureInfo in currentActiveLocales)
                        {
                            if (newActiveLocales.Contains(cultureInfo) == false)
                            {
                                UserSettings.RemoveActiveLocaleCultureInfo(user.Username, cultureInfo);
                            }
                        }

                        if (selectedActiveLocal != null)
                        {
                            if (UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username).Equals(selectedActiveLocal) == false)
                            {
                                reloadUsersConsoles = true;
                            }

                            UserSettings.SetCurrentActiveLocaleCultureInfo(user.Username, selectedActiveLocal);
                        }
                        else if (UserSettings.GetActiveLocaleCultureInfos(user.Username).Any())
                        {
                            UserSettings.SetCurrentActiveLocaleCultureInfo(user.Username, UserSettings.GetActiveLocaleCultureInfos(user.Username).First());
                        }
                    }


                    List<IUserUserGroupRelation> oldRelations = DataFacade.GetData<IUserUserGroupRelation>(f => f.UserId == user.Id).ToList();

                    IEnumerable<IUserUserGroupRelation> deleteRelations =
                        from r in oldRelations
                        where newUserGroupIds.Contains(r.UserGroupId) == false
                        select r;

                    DataFacade.Delete(deleteRelations);


                    foreach (Guid newUserGroupId in newUserGroupIds)
                    {
                        Guid groupId = newUserGroupId;
                        if (oldRelations.Any(f => f.UserGroupId == groupId)) continue;

                        IUserUserGroupRelation userUserGroupRelation = DataFacade.BuildNew<IUserUserGroupRelation>();
                        userUserGroupRelation.UserId = user.Id;
                        userUserGroupRelation.UserGroupId = newUserGroupId;

                        DataFacade.AddNew(userUserGroupRelation);
                    }

                    LoggingService.LogVerbose("UserManagement", String.Format("C1 Console user '{0}' updated by '{1}'.", user.Username, UserValidationFacade.GetUsername()), LoggingService.Category.Audit);

                    transactionScope.Complete();
                }

                if (reloadUsersConsoles)
                {
                    foreach (string consoleId in GetConsoleIdsOpenedByCurrentUser())
                    {
                        ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), consoleId);
                    }
                }

                SetSaveStatus(true);
                updateTreeRefresher.PostRefreshMesseges(user.GetDataEntityToken());
            }
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

                if (UserSettings.GetCurrentActiveLocaleCultureInfo(user.Username).Equals(selectedActiveLocale) == false)
                {
                    e.Result = ConsoleFacade.GetConsoleIdsByUsername(user.Username).Count() > 0;
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
