using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.Data.ExtendedDataType.Debug;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewCompositionTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private string NewTypeNameBindingName { get { return "NewTypeName"; } }
        private string NewTypeNamespaceBindingName { get { return "NewTypeNamespace"; } }
        private string NewTypeTitleBindingName { get { return "NewTypeTitle"; } }
        private string DataFieldDescriptorsBindingName { get { return "DataFieldDescriptors"; } }
        private string LabelFieldNameBindingName { get { return "LabelFieldName"; } }
        private string HasCachingNameBindingName { get { return "HasCaching"; } }
        private string HasPublishingBindingName { get { return "HasPublishing"; } }


        public AddNewCompositionTypeWorkflow()
        {
            InitializeComponent();
        }



        private void initializeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Type targetType = TypeManager.GetType(this.Payload);

            this.Bindings.Add(this.NewTypeNameBindingName, "");
            this.Bindings.Add(this.NewTypeNamespaceBindingName, UserSettings.LastSpecifiedNamespace);
            this.Bindings.Add(this.NewTypeTitleBindingName, "");
            this.Bindings.Add(this.DataFieldDescriptorsBindingName, new List<DataFieldDescriptor>());
            this.Bindings.Add(this.LabelFieldNameBindingName, "");
            this.Bindings.Add(this.HasCachingNameBindingName, false);

            this.Bindings.Add(this.HasPublishingBindingName, typeof(IPublishControlled).IsAssignableFrom(targetType));

            this.Bindings.Add("HasLocalization", true);

            this.BindingsValidationRules.Add(this.NewTypeNameBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add(this.NewTypeNamespaceBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add(this.NewTypeTitleBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });

            if ((RuntimeInformation.IsDebugBuild) && (DynamicTempTypeCreator.UseTempTypeCreator))
            {
                DynamicTempTypeCreator dynamicTempTypeCreator = new DynamicTempTypeCreator("PageMetaData");

                this.UpdateBinding(this.NewTypeNameBindingName, dynamicTempTypeCreator.TypeName);
                this.UpdateBinding(this.NewTypeTitleBindingName, dynamicTempTypeCreator.TypeTitle);
                this.UpdateBinding(this.DataFieldDescriptorsBindingName, dynamicTempTypeCreator.DataFieldDescriptors);
                this.UpdateBinding(this.LabelFieldNameBindingName, dynamicTempTypeCreator.DataFieldDescriptors.First().Name);
            }
        }



        private void saveTypeCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                string typeName = this.GetBinding<string>(this.NewTypeNameBindingName);
                string typeNamespace = this.GetBinding<string>(this.NewTypeNamespaceBindingName);
                string typeTitle = this.GetBinding<string>(this.NewTypeTitleBindingName);
                bool hasCaching = this.GetBinding<bool>(this.HasCachingNameBindingName);
                bool hasPublishing = this.GetBinding<bool>(this.HasPublishingBindingName);
                bool hasLocalization = this.GetBinding<bool>("HasLocalization");
                string labelFieldName = this.GetBinding<string>(this.LabelFieldNameBindingName);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(this.DataFieldDescriptorsBindingName);


                GeneratedTypesHelper helper;

                Type interfaceType = null;
                if (this.BindingExist("InterfaceType"))
                {
                    interfaceType = this.GetBinding<Type>("InterfaceType");

                    helper = new GeneratedTypesHelper(interfaceType);
                }
                else
                {
                    helper = new GeneratedTypesHelper();
                }

                string errorMessage;
                if (!helper.ValidateNewTypeName(typeName, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeNamespace", errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    return;
                }

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, null, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            "${Composite.Plugins.GeneratedDataTypesElementProvider, AddNewCompositionTypeWorkflow.ErrorTitle}",
                            errorMessage
                        );
                    return;
                }

                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                }

                helper.SetCachable(hasCaching);
                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, null, labelFieldName);

                if (!this.BindingExist("InterfaceType"))
                {
                    Type targetType = TypeManager.GetType(this.Payload);

                    helper.SetForeignKeyReference(targetType, Composite.Data.DataAssociationType.Composition);
                }

                bool originalTypeDataExists = false;
                if (interfaceType != null)
                {
                    originalTypeDataExists = DataFacade.HasDataInAnyScope(interfaceType);
                }

                if (helper.TryValidateUpdate(originalTypeDataExists, out errorMessage) == false)
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            "${Composite.Plugins.GeneratedDataTypesElementProvider, AddNewCompositionTypeWorkflow.ErrorTitle}",
                            errorMessage
                        );
                    return;
                }

                helper.CreateType(originalTypeDataExists);

                if (originalTypeDataExists)
                {
                    SetSaveStatus(true);
                }
                else
                {
                    string serializedTypeName = TypeManager.SerializeType(helper.InterfaceType);
                    EntityToken entityToken = new GeneratedDataTypesElementProviderTypeEntityToken(
                        serializedTypeName,
                        this.EntityToken.Source,
                        GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId);

                    SetSaveStatus(true, entityToken);
                }



                this.UpdateBinding("InterfaceType", helper.InterfaceType);

                this.WorkflowResult = TypeManager.SerializeType(helper.InterfaceType);

                UserSettings.LastSpecifiedNamespace = typeNamespace;

                ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("AddNewCompositionTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }
    }
}
