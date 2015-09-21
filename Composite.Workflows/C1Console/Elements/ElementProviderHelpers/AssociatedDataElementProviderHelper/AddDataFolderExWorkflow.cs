using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Data;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.C1Console.Actions;
using Composite.Data.GeneratedTypes;
using Composite.Data.DynamicTypes;
using Composite.C1Console.Users;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    [Obsolete("To be removed")]
    public sealed partial class AddDataFolderExWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private string TypesBindingName { get { return "Types"; } }
        private string SelectedTypeBindingName { get { return "SelectedType"; } }

        private string NewTypeNameBindingName { get { return "NewTypeName"; } }
        private string NewTypeNamespaceBindingName { get { return "NewTypeNamespace"; } }
        private string NewTypeTitleBindingName { get { return "NewTypeTitle"; } }
        private string DataFieldDescriptorsBindingName { get { return "DataFieldDescriptors"; } }
        private string LabelFieldNameBindingName { get { return "LabelFieldName"; } }
        private string HasRecycleBinBindingName { get { return "HasRecycleBin"; } }
        private string HasPublishingBindingName { get { return "HasPublishing"; } }
        private string HasLocalizationBindingName { get { return "HasLocalization"; } }


        public AddDataFolderExWorkflow()
        {
            InitializeComponent();
        }



        private void ShouldCreateNewType(object sender, ConditionalEventArgs e)
        {
            e.Result = this.ExtraPayload == "CreateNew";
        }



        private void UnunsedTypesExist(object sender, ConditionalEventArgs e)
        {
            Type associatedType = TypeManager.GetType(this.Payload);

            IEnumerable<Type> associationTypes = PageFolderFacade.GetAllFolderTypes();
            IEnumerable<Type> usedAssociationTypes = PageFolderFacade.GetDefinedFolderTypes(this.GetDataItemFromEntityToken<IPage>());

            e.Result = associationTypes.Except(usedAssociationTypes).Any();
        }



        private void UseExistingType(object sender, ConditionalEventArgs e)
        {
            Type type = this.GetBinding<Type>(this.SelectedTypeBindingName);

            e.Result = type != typeof(AddDataFolderExWorkflow);
        }



        private void IsTypeCreated(object sender, ConditionalEventArgs e)
        {
            e.Result = this.BindingExist(this.SelectedTypeBindingName);
        }        



        private void selectTypeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Type associatedType = TypeManager.GetType(this.Payload);

            IEnumerable<Type> associationTypes = PageFolderFacade.GetAllFolderTypes();
            IEnumerable<Type> usedAccociationTypes = PageFolderFacade.GetDefinedFolderTypes(this.GetDataItemFromEntityToken<IPage>());

            var types = new Dictionary<Type, string>();
            foreach (var kvp in associationTypes.Except(usedAccociationTypes).ToDictionary(f => f, f => f.GetTypeTitle()))
            {
                types.Add(kvp.Key, kvp.Value);
            }

            this.Bindings.Add(this.TypesBindingName, types);
            this.Bindings.Add(this.SelectedTypeBindingName, types.Keys.First());
        }



        private void selectTypeCodeActivity_StartCreateNewTypeWorkflow_ExecuteCode(object sender, EventArgs e)
        {
            this.CloseCurrentView();
            this.ExecuteAction(this.EntityToken, new WorkflowActionToken(typeof(AddDataFolderExWorkflow), this.ActionToken.PermissionTypes) { Payload = this.Payload, ExtraPayload = "CreateNew", DoIgnoreEntityTokenLocking = this.ActionToken.IgnoreEntityTokenLocking });
        }



        private void createNewTypeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            if (!this.BindingExist(this.NewTypeNameBindingName))
            {
                this.Bindings.Add(this.NewTypeNameBindingName, "");
                this.Bindings.Add(this.NewTypeNamespaceBindingName, UserSettings.LastSpecifiedNamespace);
                this.Bindings.Add(this.NewTypeTitleBindingName, "");
                this.Bindings.Add(this.DataFieldDescriptorsBindingName, new List<DataFieldDescriptor>());
                this.Bindings.Add(this.LabelFieldNameBindingName, "");

                this.Bindings.Add(this.HasRecycleBinBindingName, false);
                this.Bindings.Add(this.HasPublishingBindingName, false);
                this.Bindings.Add(this.HasLocalizationBindingName, false);

                this.BindingsValidationRules.Add(this.NewTypeNameBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
                this.BindingsValidationRules.Add(this.NewTypeNamespaceBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
                this.BindingsValidationRules.Add(this.NewTypeTitleBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
            }

            //if (RuntimeInformation.IsDebugBuild)
            //{
            //    DynamicTempTypeCreator dynamicTempTypeCreator = new DynamicTempTypeCreator("IAggTest");

            //    this.UpdateBinding(this.NewTypeNameBindingName, dynamicTempTypeCreator.TypeName);
            //    this.UpdateBinding(this.NewTypeTitleBindingName, dynamicTempTypeCreator.TypeTitle);
            //    this.UpdateBinding(this.DataFieldDescriptorsBindingName, dynamicTempTypeCreator.DataFieldDescriptors);
            //}
        }        



        private void saceNewTypeCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            bool saveResult = false;

            try
            {
                string typeName = this.GetBinding<string>(this.NewTypeNameBindingName);
                string typeNamespace = this.GetBinding<string>(this.NewTypeNamespaceBindingName);
                string typeTitle = this.GetBinding<string>(this.NewTypeTitleBindingName);
                bool hasRecycleBin = this.GetBinding<bool>(this.HasRecycleBinBindingName);
                bool hasPublishing = this.GetBinding<bool>(this.HasPublishingBindingName);
                bool hasLocalization = this.GetBinding<bool>(this.HasLocalizationBindingName);
                string labelFieldName = this.GetBinding<string>(this.LabelFieldNameBindingName);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(this.DataFieldDescriptorsBindingName);

                var helper = new GeneratedTypesHelper();
                helper = new GeneratedTypesHelper();

                string errorMessage;
                if (!helper.ValidateNewTypeName(typeName, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    SetSaveStatus(false);
                    return;
                }

                if (!helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeNamespace", errorMessage);
                    SetSaveStatus(false);
                    return;
                }

                if (!helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    SetSaveStatus(false);
                    return;
                }

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, null, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            "${Composite.Management, AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ErrorTitle}",
                            errorMessage
                        );
                    SetSaveStatus(false);
                    return;
                }

                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);

                // TODO: fix and check where the workflow is actually used
                helper.SetNewFieldDescriptors(dataFieldDescriptors, null, labelFieldName);

                Type targetType = TypeManager.GetType(this.Payload);
                helper.SetForeignKeyReference(targetType, Composite.Data.DataAssociationType.Aggregation);

                helper.CreateType(false);

                this.UpdateBinding(this.SelectedTypeBindingName, helper.InterfaceType);

                UserSettings.LastSpecifiedNamespace = typeNamespace;

                saveResult = true;
            }
            catch (Exception ex)
            {
                Log.LogCritical("AddNewAggregationTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);                
            }

            SetSaveStatus(saveResult);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            var dataEntityToken = (DataEntityToken)this.EntityToken;
            Type type = this.GetBinding<Type>(SelectedTypeBindingName);

            IPage page = (IPage)dataEntityToken.Data;

            page.AddFolderDefinition(type.GetImmutableTypeId());

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);

            var folderEntityToken = new AssociatedDataElementProviderHelperEntityToken(
                TypeManager.SerializeType(typeof (IPage)),
                PageElementProvider.DefaultConfigurationName,
                page.Id.ToString(),
                TypeManager.SerializeType(type));

            SelectElement(folderEntityToken);
        }



        private void noTypesToAddCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            Type associatedType = TypeManager.GetType(this.Payload);
            var associationTypes = PageFolderFacade.GetAllFolderTypes();

            if (!associationTypes.Any())
            {
                this.ShowMessage(
                    DialogType.Message,
                    "${Composite.Management, AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesTitle}",
                    "${Composite.Management, AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesMessage}"
                    );
            }
            else
            {
                this.ShowMessage(
                    DialogType.Message,
                    "${Composite.Management, AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesTitle}",
                    "${Composite.Management, AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesMessage}"
                    );

            }
        }                
    }
}
