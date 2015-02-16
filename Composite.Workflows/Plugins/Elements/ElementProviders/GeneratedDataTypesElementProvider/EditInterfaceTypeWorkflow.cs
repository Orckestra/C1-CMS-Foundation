using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Core.Types;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditInterfaceTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditInterfaceTypeWorkflow()
        {
            InitializeComponent();
        }


        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type type = GetTypeFromEntityToken();

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }


        private Type GetTypeFromEntityToken()
        {
            var entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
            return TypeManager.GetType(entityToken.SerializedTypeName);
        }


        private void initialStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            var helper = new GeneratedTypesHelper(dataTypeDescriptor);

            List<DataFieldDescriptor> fieldDescriptors = helper.EditableOwnDataFields.ToList();

            var bindings = new Dictionary<string, object>
            {
                {"TypeName", dataTypeDescriptor.Name},
                {"TypeNamespace", dataTypeDescriptor.Namespace},
                {"TypeTitle", dataTypeDescriptor.Title},
                {"LabelFieldName", dataTypeDescriptor.LabelFieldName},
                {"DataFieldDescriptors", fieldDescriptors},
                {"HasCaching", helper.IsCachable},
                {"HasPublishing", helper.IsPublishControlled},
                {"EditProcessControlledAllowed", helper.IsEditProcessControlledAllowed},
                {"OldTypeName", dataTypeDescriptor.Name},
                {"OldTypeNamespace", dataTypeDescriptor.Namespace}
            };

            this.UpdateBindings(bindings);

            this.BindingsValidationRules.Add("TypeName", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("TypeNamespace", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("TypeTitle", new List<ClientValidationRule> { new NotNullClientValidationRule() });
        }


        private Type GetOldTypeFromBindings()
        {
            string typeFullName = GetBinding<string>("OldTypeNamespace") + "." + GetBinding<string>("OldTypeName");

            return TypeManager.GetType(typeFullName);
        }

        private void finalizeStateCodeActivity_ExecuteCode(object sender, EventArgs e)
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
            bool hasLocalization = typeof (ILocalizedControlled).IsAssignableFrom(oldType);

            string errorMessage;
            if (!helper.ValidateNewTypeName(typeName, out errorMessage))
            {
                this.ShowFieldMessage("TypeName", errorMessage);
                return;
            }

            if (!helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage))
            {
                this.ShowFieldMessage("TypeNamespace", errorMessage);
                return;
            }

            if (!helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage))
            {
                this.ShowFieldMessage("TypeName", errorMessage);
                return;
            }

            if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, out errorMessage))
            {
                this.ShowMessage(
                        DialogType.Warning,
                        Texts.EditInterfaceTypeStep1_ErrorTitle,
                        errorMessage
                    );
                return;
            }


            helper.SetNewTypeFullName(typeName, typeNamespace);
            helper.SetNewTypeTitle(typeTitle);
            helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

            if (helper.IsEditProcessControlledAllowed)
            {
                helper.SetCachable(hasCaching);
                helper.SetPublishControlled(hasPublishing);
                helper.SetLocalizedControlled(hasLocalization);
            }

            bool originalTypeHasData = DataFacade.HasDataInAnyScope(oldType);

            if (!helper.TryValidateUpdate(originalTypeHasData, out errorMessage))
            {
                this.ShowMessage(
                        DialogType.Warning,
                        Texts.EditInterfaceTypeStep1_ErrorTitle,
                        errorMessage
                    );
                return;
            }

            //string newOldDataTypeFullName = typeNamespace + "." + typeName;
            
            string oldSerializedTypeName = GetSerializedTypeName(GetBinding<string>("OldTypeNamespace"), GetBinding<string>("OldTypeName"));
            string newSerializedTypeName = GetSerializedTypeName(typeNamespace, typeName);
            if (newSerializedTypeName != oldSerializedTypeName)
            {
                UpdateWhiteListedGeneratedTypes(oldSerializedTypeName, newSerializedTypeName);
            }

            helper.CreateType(originalTypeHasData);

            UpdateBinding("OldTypeName", typeName);
            UpdateBinding("OldTypeNamespace", typeNamespace);

            SetSaveStatus(true);

            var rootEntityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, 
                GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId);

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

        private static void UpdateWhiteListedGeneratedTypes(string oldTypeName, string newTypeName)
        {
            var referencesToOldTypeName = DataFacade.GetData<IGeneratedTypeWhiteList>(item => item.TypeManagerTypeName == oldTypeName).ToList();
            if (!referencesToOldTypeName.Any())
            {
                return;
            }

            if(!DataFacade.GetData<IGeneratedTypeWhiteList>(item => item.TypeManagerTypeName == newTypeName).Any())
            {
                var newWhiteListItem = DataFacade.BuildNew<IGeneratedTypeWhiteList>();
                newWhiteListItem.TypeManagerTypeName = newTypeName;

                DataFacade.AddNew(newWhiteListItem);
            }

            DataFacade.Delete<IGeneratedTypeWhiteList>(referencesToOldTypeName);
        }

        private static string GetSerializedTypeName(string typeNamespace, string typeName)
        {
            return "DynamicType:" + (typeName.Length == 0 ? typeName : typeNamespace + "." + typeName);
        }
    }
}
