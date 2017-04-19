using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Users;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.UserElementProvider;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Validation;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;
using Composite.Core.Logging;

namespace Composite.Plugins.Elements.ElementProviders.UserGroupElementProvider
{
    public sealed partial class EditUserGroupWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditUserGroupWorkflow()
        {
            InitializeComponent();
        }



        private void initalizeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IUserGroup userGroup = (IUserGroup)dataEntityToken.Data;

            this.Bindings.Add("UserGroup", userGroup);
            this.Bindings.Add("OldName", userGroup.Name);
        }



        private void step1CodeActivity_ShowDocument_ExecuteCode(object sender, EventArgs e)
        {
            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(@"\Administrative\UserGroupElementProviderEditUserGroupStep1.xml");

            XDocument formDocument;
            using (var reader = markupProvider.GetReader())
            {
                formDocument = XDocument.Load(reader);
            }

            XElement bindingsElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            XElement layoutElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            XElement placeHolderElement = layoutElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "PlaceHolder");


            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");

            UpdateFormDefinitionWithActivePerspectives(userGroup, bindingsElement, placeHolderElement);
            UpdateFormDefinitionWithGlobalPermissions(userGroup, bindingsElement, placeHolderElement);

            var clientValidationRules = new Dictionary<string, List<ClientValidationRule>>();
            clientValidationRules.Add("Name", ClientValidationRuleFacade.GetClientValidationRules(userGroup, "Name"));

            string formDefinition = formDocument.GetDocumentAsString();

            this.DeliverFormData(
                    userGroup.Name,
                    StandardUiContainerTypes.Document,
                    formDefinition,
                    this.Bindings,
                    clientValidationRules
                );
        }



        private void ValidateGroupName(object sender, ConditionalEventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");

            if (userGroup.Name == this.GetBinding<string>("OldName"))
            {
                e.Result = true;
                return;
            }

            bool exists =
                (from ug in DataFacade.GetData<IUserGroup>()
                 where ug.Name == userGroup.Name
                 select ug).Any();

            e.Result = !exists;
        }



        private void ShowGroupValidationError(object sender, EventArgs e)
        {
            this.ShowFieldMessage(
                "UserGroup.Name",
                SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.UserGroupNameAlreadyExists"));
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");
            List<string> newUserGroupEntityTokens = ActivePerspectiveFormsHelper.GetSelectedSerializedEntityTokens(this.Bindings).ToList();

            // If current user belongs to currently edited group -> checking that user won't lost access "Users" perspective
            if (!ValidateUserPreservesAdminRights(userGroup, newUserGroupEntityTokens))
            {
                return;
            }

            UpdateTreeRefresher updateTreeRefresher = CreateUpdateTreeRefresher(this.EntityToken);

            EntityToken rootEntityToken = ElementFacade.GetRootsWithNoSecurity().Select(f => f.ElementHandle.EntityToken).Single();
            IEnumerable<PermissionType> newPermissionTypes = GlobalPermissionsFormsHelper.GetSelectedPermissionTypes(this.Bindings);

            UserGroupPermissionDefinition userGroupPermissionDefinition =
                        new ConstructorBasedUserGroupPermissionDefinition(
                            userGroup.Id,
                            newPermissionTypes,
                            EntityTokenSerializer.Serialize(rootEntityToken)
                        );

            PermissionTypeFacade.SetUserGroupPermissionDefinition(userGroupPermissionDefinition);

            UserGroupPerspectiveFacade.SetSerializedEntityTokens(userGroup.Id, newUserGroupEntityTokens);

            SetSaveStatus(true);

            LoggingService.LogVerbose("UserManagement", $"C1 Console user group '{userGroup.Name}' updated by '{UserValidationFacade.GetUsername()}'.", LoggingService.Category.Audit);

            if (userGroup.Name != this.GetBinding<string>("OldName"))
            {
                DataFacade.Update(userGroup);

                this.UpdateBinding("OldName", userGroup.Name);

                updateTreeRefresher.PostRefreshMesseges(userGroup.GetDataEntityToken());
            }
        }

        private bool ValidateUserPreservesAdminRights(IUserGroup userGroup, List<string> newUserGroupEntityTokens)
        {
            string systemPerspectiveEntityToken = EntityTokenSerializer.Serialize(AttachingPoint.SystemPerspective.EntityToken);

            Guid groupId = userGroup.Id;
            string userName = UserSettings.Username;

            var userGroupIds = UserGroupFacade.GetUserGroupIds(userName);

            HashSet<Guid> groupsWithAccessToSystemPerspective = new HashSet<Guid>(GetGroupsThatHasAccessToPerspective(systemPerspectiveEntityToken));

            if (groupsWithAccessToSystemPerspective.Contains(groupId)
                && !newUserGroupEntityTokens.Contains(systemPerspectiveEntityToken)
                && !UserPerspectiveFacade.GetSerializedEntityTokens(userName).Contains(systemPerspectiveEntityToken)
                && !userGroupIds.Any(anotherGroupId => anotherGroupId != groupId && groupsWithAccessToSystemPerspective.Contains(anotherGroupId)))
            {
                this.ShowMessage(DialogType.Message,
                            SR.GetString("Composite.Management", "EditUserWorkflow.EditErrorTitle"),
                            SR.GetString("Composite.Management", "EditUserWorkflow.EditOwnAccessToSystemPerspective"));

                return false;
            }

            return true;
        }

        private List<Guid> GetGroupsThatHasAccessToPerspective(string usersPerspectiveEntityToken)
        {
            return DataFacade.GetData<IUserGroupActivePerspective>()
                             .Where(ug => ug.SerializedEntityToken == usersPerspectiveEntityToken)
                             .Select(ug => ug.UserGroupId).ToList();
        }

        private void UpdateFormDefinitionWithGlobalPermissions(IUserGroup userGroup, XElement bindingsElement, XElement placeHolderElement)
        {
            var helper = new GlobalPermissionsFormsHelper(
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsFieldLabel"),
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectLabel"),
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            EntityToken rootEntityToken = ElementFacade.GetRootsWithNoSecurity().Select(f => f.ElementHandle.EntityToken).Single();
            IEnumerable<PermissionType> permissionTypes = PermissionTypeFacade.GetLocallyDefinedUserGroupPermissionTypes(userGroup.Id, rootEntityToken).ToList();

            helper.UpdateWithNewBindings(this.Bindings, permissionTypes);
        }



        private void UpdateFormDefinitionWithActivePerspectives(IUserGroup userGroup, XElement bindingsElement, XElement placeHolderElement)
        {
            List<string> serializedEntityToken = UserGroupPerspectiveFacade.GetSerializedEntityTokens(userGroup.Id).ToList();

            var helper = new ActivePerspectiveFormsHelper(
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveFieldLabel"),
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectLabel"),
                    SR.GetString("Composite.Plugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectHelp")
                );

            bindingsElement.Add(helper.GetBindingsMarkup());
            placeHolderElement.Add(helper.GetFormMarkup());

            helper.UpdateWithNewBindings(this.Bindings, serializedEntityToken);
        }

        private void ValidateData(object sender, ConditionalEventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");

            ValidationResults validationResults = ValidationFacade.Validate<IUserGroup>(userGroup);
            e.Result = validationResults.IsValid;
            if (!validationResults.IsValid)
            {
                this.ShowFieldMessage(
                    "UserGroup.Name",
                    validationResults.First().Message);
            }
        }
    }
}
