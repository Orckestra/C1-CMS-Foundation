using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ExtendedDataType.Debug;
using Composite.Data.GeneratedTypes;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewInterfaceTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewInterfaceTypeWorkflow()
        {
            InitializeComponent();
        }

        private static class BindingNames
        {
            public const string ViewLabel = "ViewLabel";
            public const string InterfaceType = "InterfaceType";
            public const string NewTypeName = "NewTypeName";
            public const string NewTypeNamespace = "NewTypeNamespace";
            public const string NewTypeTitle = "NewTypeTitle";
            public const string DataFieldDescriptors = "DataFieldDescriptors";
            public const string KeyFieldName = "KeyFieldName";
            public const string LabelFieldName = "LabelFieldName";
            public const string InternalUrlPrefix = "InternalUrlPrefix";
            public const string HasCaching = "HasCaching";
            public const string HasPublishing = "HasPublishing";
            public const string HasLocalization = "HasLocalization";
            public const string IsSearchable = nameof(IsSearchable);
            public const string KeyFieldReadOnly = "KeyFieldReadOnly";
        }

        private bool IsPageDataFolder
        {
            get { return this.EntityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId; }
        }

        private void initialStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var dataFieldDescriptors = new List<DataFieldDescriptor>
            {
                GeneratedTypesHelper.BuildIdField()
            };

            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.ViewLabel, IsPageDataFolder ? Texts.AddNewAggregationTypeWorkflow_DocumentTitle : Texts.AddNewInterfaceTypeStep1_DocumentTitle},
                {BindingNames.NewTypeName, ""},
                {BindingNames.NewTypeNamespace, UserSettings.LastSpecifiedNamespace},
                {BindingNames.NewTypeTitle, ""},
                {BindingNames.DataFieldDescriptors, dataFieldDescriptors},
                {BindingNames.HasCaching, false},
                {BindingNames.HasPublishing, false},
                {BindingNames.HasLocalization, false},
                {BindingNames.IsSearchable, true},
                {BindingNames.KeyFieldName, dataFieldDescriptors.First().Name},
                {BindingNames.LabelFieldName, ""},
                {BindingNames.KeyFieldReadOnly, false}
            };

            this.BindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>
            {
                {BindingNames.NewTypeName, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.NewTypeNamespace, new List<ClientValidationRule> {new NotNullClientValidationRule()}},
                {BindingNames.NewTypeTitle, new List<ClientValidationRule> {new NotNullClientValidationRule()}}
            };

            if (RuntimeInformation.IsDebugBuild && DynamicTempTypeCreator.UseTempTypeCreator)
            {
                var dynamicTempTypeCreator = new DynamicTempTypeCreator(IsPageDataFolder ? "PageFolder" : "GlobalTest");

                dataFieldDescriptors.AddRange(dynamicTempTypeCreator.DataFieldDescriptors);

                this.UpdateBinding(BindingNames.NewTypeName, dynamicTempTypeCreator.TypeName);
                this.UpdateBinding(BindingNames.NewTypeTitle, dynamicTempTypeCreator.TypeTitle);
                this.UpdateBinding(BindingNames.LabelFieldName, dynamicTempTypeCreator.DataFieldDescriptors.First().Name);
            }
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                string typeName = this.GetBinding<string>(BindingNames.NewTypeName);
                string typeNamespace = this.GetBinding<string>(BindingNames.NewTypeNamespace);
                string typeTitle = this.GetBinding<string>(BindingNames.NewTypeTitle);
                bool hasCaching = this.GetBinding<bool>(BindingNames.HasCaching);
                bool hasPublishing = this.GetBinding<bool>(BindingNames.HasPublishing);
                bool hasLocalization = this.GetBinding<bool>(BindingNames.HasLocalization);
                bool isSearchable = this.GetBinding<bool>(BindingNames.IsSearchable);
                string keyFieldName = this.GetBinding<string>(BindingNames.KeyFieldName);
                string labelFieldName = this.GetBinding<string>(BindingNames.LabelFieldName);
                string internalUrlPrefix = this.GetBinding<string>(BindingNames.InternalUrlPrefix);
                var dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>(BindingNames.DataFieldDescriptors);

                GeneratedTypesHelper helper;
                Type interfaceType = null;
                if (this.BindingExist(BindingNames.InterfaceType))
                {
                    interfaceType = this.GetBinding<Type>(BindingNames.InterfaceType);

                    helper = new GeneratedTypesHelper(interfaceType);
                }
                else
                {
                    helper = new GeneratedTypesHelper();
                }

                string errorMessage;
                if (!helper.ValidateNewTypeName(typeName, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.NewTypeName, errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeNamespace(typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.NewTypeNamespace, errorMessage);
                    return;
                }

                if (!helper.ValidateNewTypeFullName(typeName, typeNamespace, out errorMessage))
                {
                    this.ShowFieldMessage(BindingNames.NewTypeName, errorMessage);
                    return;
                }

                if (!helper.ValidateNewFieldDescriptors(dataFieldDescriptors, keyFieldName, out errorMessage))
                {
                    this.ShowMessage(
                            DialogType.Warning,
                            Texts.AddNewInterfaceTypeStep1_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                if (interfaceType != null)
                {
                    if (hasLocalization != DataLocalizationFacade.IsLocalized(interfaceType)
                        && DataFacade.GetData(interfaceType).ToDataEnumerable().Any())
                    {
                        this.ShowMessage(
                            DialogType.Error,
                            Texts.AddNewInterfaceTypeStep1_ErrorTitle,
                            "It's not possible to change localization through the current tab"
                        );
                        return;
                    }
                }


                if (helper.IsEditProcessControlledAllowed)
                {
                    helper.SetCachable(hasCaching);
                    helper.SetPublishControlled(hasPublishing);
                    helper.SetLocalizedControlled(hasLocalization);
                    helper.SetSearchable(isSearchable);
                }

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewInternalUrlPrefix(internalUrlPrefix);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, keyFieldName, labelFieldName);


                if (IsPageDataFolder && !this.BindingExist(BindingNames.InterfaceType))
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
                            Texts.AddNewInterfaceTypeStep1_ErrorTitle,
                            errorMessage
                        );
                    return;
                }


                helper.CreateType(originalTypeDataExists);

                string serializedTypeName = TypeManager.SerializeType(helper.InterfaceType);

                EntityToken entityToken = new GeneratedDataTypesElementProviderTypeEntityToken(
                    serializedTypeName,
                    this.EntityToken.Source,
                    IsPageDataFolder ? GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId
                                     : GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId
                );

                if (originalTypeDataExists)
                {
                    SetSaveStatus(true);
                }
                else
                {
                    SetSaveStatus(true, entityToken);
                }


                if (!this.BindingExist(BindingNames.InterfaceType))
                {
                    this.AcquireLock(entityToken);
                }

                this.UpdateBinding(BindingNames.InterfaceType, helper.InterfaceType);
                this.UpdateBinding(BindingNames.KeyFieldReadOnly, true);

                this.UpdateBinding(BindingNames.ViewLabel, typeTitle);
                RerenderView();

                //this.WorkflowResult = TypeManager.SerializeType(helper.InterfaceType);


                UserSettings.LastSpecifiedNamespace = typeNamespace;

                var parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMessages(entityToken);
            }
            catch (Exception ex)
            {
                Log.LogCritical("Add New Interface Failed", ex);

                this.ShowMessage(DialogType.Error, ex.Message, ex.Message);
            }
        }

        private void codeActivity_RefreshViewHandler(object sender, EventArgs e)
        {
            RerenderView();
        }
    }
}
