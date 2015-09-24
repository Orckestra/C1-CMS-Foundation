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

        private bool IsPageFolder
        {
            get { return this.EntityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId; }
        }

        private static class BindingNames
        {
            public const string TypeName = "TypeName";
            public const string TypeNamespace = "TypeNamespace";
            public const string TypeTitle = "TypeTitle";
            public const string DataFieldDescriptors = "DataFieldDescriptors";
            public const string KeyFieldName = "KeyFieldName";
            public const string LabelFieldName = "LabelFieldName";
            public const string InternalUrlPrefix = "InternalUrlPrefix";
            public const string HasCaching = "HasCaching";
            public const string HasPublishing = "HasPublishing";

            public const string OldTypeName = "OldTypeName";
            public const string OldTypeNamespace = "OldTypeNamespace";
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

            List<DataFieldDescriptor> fieldDescriptors = helper.EditableInDesignerOwnDataFields.ToList();

            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.TypeName, dataTypeDescriptor.Name},
                {BindingNames.TypeNamespace, dataTypeDescriptor.Namespace},
                {BindingNames.TypeTitle, dataTypeDescriptor.Title},
                {BindingNames.KeyFieldName, dataTypeDescriptor.KeyPropertyNames.Single() },
                {BindingNames.LabelFieldName, dataTypeDescriptor.LabelFieldName},
                {BindingNames.InternalUrlPrefix, dataTypeDescriptor.InternalUrlPrefix},
                {BindingNames.HasCaching, helper.IsCachable},
                {BindingNames.HasPublishing, helper.IsPublishControlled},
                {BindingNames.DataFieldDescriptors, fieldDescriptors},
                {BindingNames.OldTypeName, dataTypeDescriptor.Name},
                {BindingNames.OldTypeNamespace, dataTypeDescriptor.Namespace}
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
            string typeFullName = GetBinding<string>(BindingNames.OldTypeNamespace) + "." + GetBinding<string>(BindingNames.OldTypeName);

            return TypeManager.GetType(typeFullName);
        }

        private void finalizeStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                Type oldType = GetOldTypeFromBindings();

                string typeName = this.GetBinding<string>(BindingNames.TypeName);
                string typeNamespace = this.GetBinding<string>(BindingNames.TypeNamespace);
                string typeTitle = this.GetBinding<string>(BindingNames.TypeTitle);
                bool hasCaching = this.GetBinding<bool>(BindingNames.HasCaching);
                bool hasPublishing = this.GetBinding<bool>(BindingNames.HasPublishing);
                string keyFieldName = this.GetBinding<string>(BindingNames.KeyFieldName);
                string labelFieldName = this.GetBinding<string>(BindingNames.LabelFieldName);
                string internalUrlPrefix = this.GetBinding<string>(BindingNames.InternalUrlPrefix);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(BindingNames.DataFieldDescriptors);

                var helper = new GeneratedTypesHelper(oldType);
                bool hasLocalization = typeof (ILocalizedControlled).IsAssignableFrom(oldType);

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

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, keyFieldName, out errorMessage))
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
                helper.SetNewInternalUrlPrefix(internalUrlPrefix);
                
                helper.SetNewFieldDescriptors(dataFieldDescriptors, keyFieldName, labelFieldName);

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


                if (!IsPageFolder)
                {
                    string oldSerializedTypeName = GetSerializedTypeName(GetBinding<string>(BindingNames.OldTypeNamespace), GetBinding<string>(BindingNames.OldTypeName));
                    string newSerializedTypeName = GetSerializedTypeName(typeNamespace, typeName);
                    if (newSerializedTypeName != oldSerializedTypeName)
                    {
                        UpdateWhiteListedGeneratedTypes(oldSerializedTypeName, newSerializedTypeName);
                    }
                }

                helper.CreateType(originalTypeHasData);

                UpdateBinding(BindingNames.OldTypeName, typeName);
                UpdateBinding(BindingNames.OldTypeNamespace, typeNamespace);

                SetSaveStatus(true);

                var rootEntityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, 
                    IsPageFolder ? GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId
                                 : GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId);

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
                Log.LogCritical(this.GetType().Name, ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
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
