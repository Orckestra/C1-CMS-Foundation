using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using System.Xml.Linq;
using Composite.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Forms;
using Composite.Forms.DataServices;
using Composite.Forms.Flows;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider;
using Composite.Validation;
using Composite.Validation.ClientValidationRules;
using Composite.Xml;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider
{
    public sealed partial class EditUserGroupWorkflow : Composite.Workflow.Activities.FormsWorkflow
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

            XDocument formDocument = XDocument.Load(markupProvider.GetReader());

            XElement bindingsElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            XElement layoutElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            XElement placeHolderElement = layoutElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "PlaceHolder");


            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");

            UpdateFormDefinitionWithActivePerspectives(userGroup, bindingsElement, placeHolderElement);
            UpdateFormDefinitionWithGlobalPermissions(userGroup, bindingsElement, placeHolderElement);

            Dictionary<string, List<ClientValidationRule>> clientValidationRules = new Dictionary<string, List<ClientValidationRule>>();
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

            e.Result = exists == false;
        }



        private void ShowGroupValidationError(object sender, EventArgs e)
        {
            this.ShowFieldMessage(
                "UserGroup.Name",
                StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.UserGroupNameAlreadyExists"));
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = CreateUpdateTreeRefresher(this.EntityToken);
            IUserGroup userGroup = this.GetBinding<IUserGroup>("UserGroup");

            EntityToken rootEntityToken = ElementFacade.GetRootsWithNoSecurity().Select(f => f.ElementHandle.EntityToken).Single();
            IEnumerable<PermissionType> newPermissionTypes = GlobalPermissionsFormsHelper.GetSelectedPermissionTypes(this.Bindings);

            UserGroupPermissionDefinition userGroupPermissionDefinition =
                        new ConstructorBasedUserGroupPermissionDefinition(
                            userGroup.Id,
                            newPermissionTypes,
                            EntityTokenSerializer.Serialize(rootEntityToken)
                        );

            PermissionTypeFacade.SetUserGroupPermissionDefinition(userGroupPermissionDefinition);

            UserGroupPerspectiveFacade.SetSerializedEntityTokens(userGroup.Id, ActivePerspectiveFormsHelper.GetSelectedSerializedEntityTokens(this.Bindings));

            SetSaveStatus(true);

            if (userGroup.Name != this.GetBinding<string>("OldName"))
            {
                DataFacade.Update(userGroup);

                this.UpdateBinding("OldName", userGroup.Name);

                updateTreeRefresher.PostRefreshMesseges(userGroup.GetDataEntityToken());
            }
        }



        private void UpdateFormDefinitionWithGlobalPermissions(IUserGroup userGroup, XElement bindingsElement, XElement placeHolderElement)
        {
            GlobalPermissionsFormsHelper helper = new GlobalPermissionsFormsHelper(
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsFieldLabel"),
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectLabel"),
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectHelp")
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

            ActivePerspectiveFormsHelper helper = new ActivePerspectiveFormsHelper(
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveFieldLabel"),
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectLabel"),
                    StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectHelp")
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
            if (validationResults.IsValid == true)
            {
                return;
            }
            else
            {
                this.ShowFieldMessage(
                    "UserGroup.Name",
                    validationResults.First().Message);
            }
        }
    }
}
