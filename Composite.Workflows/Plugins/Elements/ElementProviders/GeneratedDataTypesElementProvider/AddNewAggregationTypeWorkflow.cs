using System;
using System.Linq;
using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.Data.ExtendedDataType.Debug;
using Composite.Plugins.Elements.ElementProviders.Common;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewAggregationTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewAggregationTypeWorkflow()
        {
            InitializeComponent();
        }

        private static class BindingNames
        {
            public const string NewTypeName = "NewTypeName";
            public const string NewTypeNamespace = "NewTypeNamespace";
            public const string NewTypeTitle = "NewTypeTitle";
            public const string DataFieldDescriptors = "DataFieldDescriptors";
            public const string LabelFieldName = "LabelFieldName";
            public const string HasCaching = "HasCaching";
            public const string HasPublishing = "HasPublishing";
            public const string HasLocalization = "HasLocalization"; 
            public const string KeyFieldType = "KeyFieldType";
            public const string KeyFieldTypeOptions = "KeyFieldTypeOptions";
        }


        private void initializeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.NewTypeName, ""},
                {BindingNames.NewTypeNamespace, UserSettings.LastSpecifiedNamespace},
                {BindingNames.NewTypeTitle, ""},
                {BindingNames.DataFieldDescriptors, new List<DataFieldDescriptor>()},
                {BindingNames.LabelFieldName, ""},
                {BindingNames.HasCaching, false},
                {BindingNames.HasPublishing, false},
                {BindingNames.HasLocalization, false},
                {BindingNames.KeyFieldType, GeneratedTypesHelper.KeyFieldType.Guid.ToString()},
                {BindingNames.KeyFieldTypeOptions, KeyFieldHelper.GetKeyFieldOptions()}
            };

            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>
            {
                {BindingNames.NewTypeName, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.NewTypeNamespace, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.NewTypeTitle, new List<ClientValidationRule> {new NotNullClientValidationRule()}}
            };

            if (RuntimeInformation.IsDebugBuild && DynamicTempTypeCreator.UseTempTypeCreator)
            {
                var dynamicTempTypeCreator = new DynamicTempTypeCreator("PageFolder");

                this.UpdateBinding(BindingNames.NewTypeName, dynamicTempTypeCreator.TypeName);
                this.UpdateBinding(BindingNames.NewTypeTitle, dynamicTempTypeCreator.TypeTitle);
                this.UpdateBinding(BindingNames.DataFieldDescriptors, dynamicTempTypeCreator.DataFieldDescriptors);
                this.UpdateBinding(BindingNames.LabelFieldName, dynamicTempTypeCreator.DataFieldDescriptors.First().Name);
            }
        }



        private void saveTypeCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                string typeName = this.GetBinding<string>(BindingNames.NewTypeName);
                string typeNamespace = this.GetBinding<string>(BindingNames.NewTypeNamespace);
                string typeTitle = this.GetBinding<string>(BindingNames.NewTypeTitle);
                bool hasCaching = this.GetBinding<bool>(BindingNames.HasCaching);
                bool hasPublishing = this.GetBinding<bool>(BindingNames.HasPublishing);
                bool hasLocalization = this.GetBinding<bool>(BindingNames.HasLocalization);
                string labelFieldName = this.GetBinding<string>(BindingNames.LabelFieldName);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(BindingNames.DataFieldDescriptors);
                var keyFieldType = KeyFieldHelper.ParseKeyFieldType(GetBinding<string>(BindingNames.KeyFieldType));

                var helper = new GeneratedTypesHelper();
                Type interfaceType = null;
                if (this.BindingExist("InterfaceType"))
                {
                    interfaceType = this.GetBinding<Type>("InterfaceType");

                    helper = new GeneratedTypesHelper(interfaceType);
                }
                else
                {
                    helper = new GeneratedTypesHelper();
                    helper.SetKeyFieldType(keyFieldType);
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

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.AddNewAggregationTypeWorkflow_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetCachable(hasCaching);
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

                if (!this.BindingExist("InterfaceType"))
                {
                    Type targetType = TypeManager.GetType(this.Payload);

                    helper.SetForeignKeyReference(targetType, Composite.Data.DataAssociationType.Aggregation);
                }

                bool originalTypeDataExists = false;
                if (interfaceType != null)
                {
                    originalTypeDataExists = DataFacade.HasDataInAnyScope(interfaceType);
                }

                if (!helper.TryValidateUpdate(originalTypeDataExists, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.AddNewAggregationTypeWorkflow_ErrorTitle,
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
                    var entityToken = new GeneratedDataTypesElementProviderTypeEntityToken(
                        serializedTypeName,
                        this.EntityToken.Source,
                        GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId);

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
                Log.LogCritical("AddNewAggregationTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }
    }
}
