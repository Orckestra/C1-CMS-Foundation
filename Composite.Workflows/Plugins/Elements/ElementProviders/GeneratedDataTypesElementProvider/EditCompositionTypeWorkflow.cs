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

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditCompositionTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private string NewTypeNameBindingName { get { return "NewTypeName"; } }
        private string NewTypeNamespaceBindingName { get { return "NewTypeNamespace"; } }
        private string NewTypeTitleBindingName { get { return "NewTypeTitle"; } }
        private string DataFieldDescriptorsBindingName { get { return "DataFieldDescriptors"; } }
        private string LabelFieldNameBindingName { get { return "LabelFieldName"; } }

        private string HasCachingBindingName { get { return "HasCaching"; } }
        private string HasPublishingBindingName { get { return "HasPublishing"; } }



        public EditCompositionTypeWorkflow()
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
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();
            var helper = new GeneratedTypesHelper(dataTypeDescriptor);
            var fieldDescriptors = helper.EditableInDesignerOwnDataFields.ToList();

            this.Bindings = new Dictionary<string, object>
            {
                {"TypeName", dataTypeDescriptor.Name},
                {"TypeNamespace", dataTypeDescriptor.Namespace},
                {"TypeTitle", dataTypeDescriptor.Title},
                {"LabelFieldName", dataTypeDescriptor.LabelFieldName},
                {"HasCaching", helper.IsCachable},
                {"HasPublishing", helper.IsPublishControlled},
                {"DataFieldDescriptors", fieldDescriptors},
                {"OldTypeName", dataTypeDescriptor.Name},
                {"OldTypeNamespace", dataTypeDescriptor.Namespace}
            };

            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>
            {
                {this.NewTypeNameBindingName, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {this.NewTypeNamespaceBindingName, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {this.NewTypeTitleBindingName, new List<ClientValidationRule> {new NotNullClientValidationRule()}}
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

                string typeName = this.GetBinding<string>("TypeName");
                string typeNamespace = this.GetBinding<string>("TypeNamespace");
                string typeTitle = this.GetBinding<string>("TypeTitle");
                bool hasCaching = this.GetBinding<bool>("HasCaching");
                bool hasPublishing = this.GetBinding<bool>("HasPublishing");
                string labelFieldName = this.GetBinding<string>("LabelFieldName");
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>("DataFieldDescriptors");

                var helper = new GeneratedTypesHelper(oldType);

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
                            Texts.EditCompositionTypeWorkflow_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                // TODO: fix
                helper.SetNewFieldDescriptors(dataFieldDescriptors, null, labelFieldName);
                helper.SetCachable(hasCaching);

                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetPublishControlled(hasPublishing);
                }

                bool originalTypeDataExists = DataFacade.HasDataInAnyScope(oldType);

                if (!helper.TryValidateUpdate(originalTypeDataExists, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.EditCompositionTypeWorkflow_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                helper.CreateType(originalTypeDataExists);

                UpdateBinding("OldTypeName", typeName);
                UpdateBinding("OldTypeNamespace", typeNamespace);

                SetSaveStatus(true);
                
                var rootEntityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId);
                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(rootEntityToken);

                IFile markupFile = DynamicTypesCustomFormFacade.GetCustomFormMarkupFile(typeNamespace, typeName);
                if (markupFile != null)
                {
                    ShowMessage(DialogType.Message,
                        Texts.FormMarkupInfo_Dialog_Label,
                        Texts.FormMarkupInfo_Message(Texts.EditFormMarkup, markupFile.GetRelativeFilePath()));
                }
            }
            catch (Exception ex)
            {
                Log.LogCritical("EditCompositionTypeWorkflow", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }
    }
}
