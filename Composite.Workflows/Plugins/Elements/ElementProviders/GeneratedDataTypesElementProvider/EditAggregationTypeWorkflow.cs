using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Core.Logging;
using Composite.Core.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditAggregationTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private string NewTypeNameBindingName { get { return "NewTypeName"; } }
        private string NewTypeNamespaceBindingName { get { return "NewTypeNamespace"; } }
        private string NewTypeTitleBindingName { get { return "NewTypeTitle"; } }
        private string DataFieldDescriptorsBindingName { get { return "DataFieldDescriptors"; } }
        private string LabelFieldNameBindingName { get { return "LabelFieldName"; } }

        private string HasCachingBindingName { get { return "HasCaching"; } }
        private string HasPublishingBindingName { get { return "HasPublishing"; } }
        private string HasLocalizationBindingName { get { return "HasLocalization"; } }



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
            GeneratedTypesHelper helper = new GeneratedTypesHelper(dataTypeDescriptor);
            List<DataFieldDescriptor> fieldDescriptors = helper.EditableOwnDataFields.ToList();

            this.Bindings.Add("TypeName", dataTypeDescriptor.Name);
            this.Bindings.Add("TypeNamespace", dataTypeDescriptor.Namespace);
            this.Bindings.Add("TypeTitle", dataTypeDescriptor.Title);
            this.Bindings.Add("LabelFieldName", dataTypeDescriptor.LabelFieldName);

            this.Bindings.Add("HasCaching", helper.IsCachable);
            this.Bindings.Add("HasPublishing", helper.IsPublishControlled);
            this.Bindings.Add("HasLocalization", helper.IsLocalizedControlled);

            this.Bindings.Add("DataFieldDescriptors", fieldDescriptors);

            this.Bindings.Add("OldTypeName", dataTypeDescriptor.Name);
            this.Bindings.Add("OldTypeNamespace", dataTypeDescriptor.Namespace);

            this.BindingsValidationRules.Add(this.NewTypeNameBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add(this.NewTypeNamespaceBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add(this.NewTypeTitleBindingName, new List<ClientValidationRule> { new NotNullClientValidationRule() });           
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

                string typeName = this.GetBinding<string>("TypeName");
                string typeNamespace = this.GetBinding<string>("TypeNamespace");
                string typeTitle = this.GetBinding<string>("TypeTitle");
                bool hasCaching = this.GetBinding<bool>("HasCaching");
                bool hasPublishing = this.GetBinding<bool>("HasPublishing");
                bool hasLocalization = this.GetBinding<bool>("HasLocalization");
                string labelFieldName = this.GetBinding<string>("LabelFieldName");
                List<DataFieldDescriptor> dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>("DataFieldDescriptors");

                GeneratedTypesHelper helper = new GeneratedTypesHelper(oldType);

                string errorMessage;
                if (helper.ValidateNewTypeName(typeName, out errorMessage) == false)
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    return;
                }

                if (helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage) == false)
                {
                    this.ShowFieldMessage("NewTypeNamespace", errorMessage);
                    return;
                }

                if (helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage) == false)
                {
                    this.ShowFieldMessage("NewTypeName", errorMessage);
                    return;
                }

                if (helper.ValidateNewFieldDescriptors(dataFieldDescriptors, out errorMessage) == false)
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            "${Composite.Plugins.GeneratedDataTypesElementProvider, EditAggregationTypeWorkflow.ErrorTitle}",
                            errorMessage
                        );
                    return;
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

                if (helper.IsEditProcessControlledAllowed == true)
                {
                    helper.SetCachable(hasCaching);
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                }

                bool originalTypeDataExists = DataFacade.HasDataInAnyScope(oldType);

                if (helper.TryValidateUpdate(originalTypeDataExists, out errorMessage) == false)
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            "${Composite.Plugins.GeneratedDataTypesElementProvider, EditAggregationTypeWorkflow.ErrorTitle}",
                            errorMessage
                        );
                    return;
                }

                helper.CreateType(originalTypeDataExists);

                UpdateBinding("OldTypeName", typeName);
                UpdateBinding("OldTypeNamespace", typeNamespace);

                SetSaveStatus(true);

                GeneratedDataTypesElementProviderRootEntityToken rootEntityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId);
                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(rootEntityToken);
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("EditAggregationTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }
    }
}
