using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Core.Types;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Composite.Plugins.Elements.ElementProviders.Common;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditAggregationTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static class BindingNames
        {
            public const string TypeName = "TypeName";
            public const string TypeNamespace = "TypeNamespace";
            public const string TypeTitle = "TypeTitle";
            public const string DataFieldDescriptors = "DataFieldDescriptors";
            public const string LabelFieldName = "LabelFieldName";
            public const string HasCaching = "HasCaching";
            public const string HasPublishing = "HasPublishing";

            public const string OldTypeName = "OldTypeName";
            public const string OldTypeNamespace = "OldTypeNamespace";
            
            public const string KeyFieldType = "KeyFieldType";
            public const string KeyFieldTypeOptions = "KeyFieldTypeOptions";
        }
        
        public EditAggregationTypeWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type type = TypeManager.GetType(this.Payload);

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }



        private void initializeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Type type = TypeManager.GetType(this.Payload);

            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();
            var helper = new GeneratedTypesHelper(dataTypeDescriptor);

            List<DataFieldDescriptor> fieldDescriptors = helper.EditableOwnDataFields.ToList();

            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.TypeName, dataTypeDescriptor.Name},
                {BindingNames.TypeNamespace, dataTypeDescriptor.Namespace},
                {BindingNames.TypeTitle, dataTypeDescriptor.Title},
                {BindingNames.LabelFieldName, dataTypeDescriptor.LabelFieldName},
                {BindingNames.HasCaching, helper.IsCachable},
                {BindingNames.HasPublishing, helper.IsPublishControlled},
                {BindingNames.DataFieldDescriptors, fieldDescriptors},
                {BindingNames.OldTypeName, dataTypeDescriptor.Name},
                {BindingNames.OldTypeNamespace, dataTypeDescriptor.Namespace},
                {BindingNames.KeyFieldType, KeyFieldHelper.GetKeyFieldType(dataTypeDescriptor).ToString()},
                {BindingNames.KeyFieldTypeOptions, KeyFieldHelper.GetKeyFieldOptions()}
            };

            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>
            {
                {BindingNames.TypeName, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.TypeNamespace, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.TypeTitle, new List<ClientValidationRule> {new NotNullClientValidationRule()}}
            };
        }


        private Type GetOldTypeFromBindings()
        {
            string typeFullName = GetBinding<string>("OldTypeNamespace") + "." + GetBinding<string>("OldTypeName");

            return TypeManager.GetType(typeFullName);
        }


        private void saveTypeCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                Type oldType = GetOldTypeFromBindings();

                string typeName = this.GetBinding<string>(BindingNames.TypeName);
                string typeNamespace = this.GetBinding<string>(BindingNames.TypeNamespace);
                string typeTitle = this.GetBinding<string>(BindingNames.TypeTitle);
                bool hasCaching = this.GetBinding<bool>(BindingNames.HasCaching);
                bool hasPublishing = this.GetBinding<bool>(BindingNames.HasPublishing);
                string labelFieldName = this.GetBinding<string>(BindingNames.LabelFieldName);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(BindingNames.DataFieldDescriptors);

                var helper = new GeneratedTypesHelper(oldType);

                string errorMessage;
                if (!helper.ValidateNewTypeName(typeName, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.TypeName, errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.TypeNamespace, errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.TypeName, errorMessage);
                    return;
                }

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.EditAggregationTypeWorkflow_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

                bool hasLocalization = DataLocalizationFacade.IsLocalized(oldType);

                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetCachable(hasCaching);
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                }

                bool originalTypeDataExists = DataFacade.HasDataInAnyScope(oldType);

                if (!helper.TryValidateUpdate(originalTypeDataExists, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.EditAggregationTypeWorkflow_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                helper.CreateType(originalTypeDataExists);

                UpdateBinding(BindingNames.OldTypeName, typeName);
                UpdateBinding(BindingNames.OldTypeNamespace, typeNamespace);

                SetSaveStatus(true);

                var rootEntityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId);
                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(rootEntityToken);

                IFile markupFile = DynamicTypesAlternateFormFacade.GetAlternateFormMarkupFile(typeNamespace, typeName);
                if (markupFile != null)
                {
                    ShowMessage(DialogType.Message,
                        Texts.FormMarkupInfo_Dialog_Label,
                        Texts.FormMarkupInfo_Message(Texts.EditFormMarkup, markupFile.GetRelativeFilePath()));
                }
            }
            catch (Exception ex)
            {
                Log.LogCritical("EditAggregationTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }
    }
}
