using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
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



        private void initialStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            Dictionary<string, object> bindings = new Dictionary<string, object>();

            bindings.Add("ViewLabel", Texts.AddNewInterfaceTypeStep1_DocumentTitle);
            bindings.Add("NewTypeName", "");
            bindings.Add("NewTypeNamespace", UserSettings.LastSpecifiedNamespace);
            bindings.Add("NewTypeTitle", "");
            bindings.Add("DataFieldDescriptors", new List<DataFieldDescriptor>());
            bindings.Add("HasCaching", false);
            bindings.Add("HasPublishing", false);
            bindings.Add("HasLocalization", false);
            bindings.Add("LabelFieldName", "");

            this.Bindings = bindings;

            this.BindingsValidationRules.Add("NewTypeName", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("NewTypeNamespace", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            this.BindingsValidationRules.Add("NewTypeTitle", new List<ClientValidationRule> { new NotNullClientValidationRule() });

            if (RuntimeInformation.IsDebugBuild && DynamicTempTypeCreator.UseTempTypeCreator)
            {
                DynamicTempTypeCreator dynamicTempTypeCreator = new DynamicTempTypeCreator("GlobalTest");

                this.UpdateBinding("NewTypeName", dynamicTempTypeCreator.TypeName);
                this.UpdateBinding("NewTypeTitle", dynamicTempTypeCreator.TypeTitle);
                this.UpdateBinding("DataFieldDescriptors", dynamicTempTypeCreator.DataFieldDescriptors);

                this.UpdateBinding("LabelFieldName", dynamicTempTypeCreator.DataFieldDescriptors.First().Name);
            }
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                string typeName = this.GetBinding<string>("NewTypeName");
                string typeNamespace = this.GetBinding<string>("NewTypeNamespace");
                string typeTitle = this.GetBinding<string>("NewTypeTitle");
                bool hasCaching = this.GetBinding<bool>("HasCaching");
                bool hasPublishing = this.GetBinding<bool>("HasPublishing");
                bool hasLocalization = this.GetBinding<bool>("HasLocalization");
                string labelFieldName = this.GetBinding<string>("LabelFieldName");
                List<DataFieldDescriptor> dataFieldDescriptors = this.GetBinding<List<DataFieldDescriptor>>("DataFieldDescriptors");


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
                            Texts.AddNewInterfaceTypeStep1_ErrorTitle,
                            errorMessage
                        );
                    return;
                }

                if(interfaceType != null)
                {
                    if(hasLocalization != DataLocalizationFacade.IsLocalized(interfaceType)
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
                }   

                helper.SetNewTypeFullName(typeName, typeNamespace);
                helper.SetNewTypeTitle(typeTitle);
                helper.SetNewFieldDescriptors(dataFieldDescriptors, labelFieldName);

                bool originalTypeDataExists = false;
                if (interfaceType != null)
                {
                    originalTypeDataExists = DataFacade.HasDataInAnyScope(interfaceType);
                }

                if (helper.TryValidateUpdate(originalTypeDataExists, out errorMessage) == false)
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
                    GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId);

                if(originalTypeDataExists)
                {
                    SetSaveStatus(true);
                }
                else
                {
                    SetSaveStatus(true, entityToken);
                }
                

                if (!this.BindingExist("InterfaceType"))
                {                    
                    this.AcquireLock(entityToken);
                }

                this.UpdateBinding("InterfaceType", helper.InterfaceType);

                this.UpdateBinding("ViewLabel", typeTitle);
                RerenderView();

                UserSettings.LastSpecifiedNamespace = typeNamespace;

                ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMesseges(this.EntityToken, 2);

                
               
            }
            catch (Exception ex)
            {
                Log.LogCritical("Add New Interface Failed", ex);

                this.ShowMessage(DialogType.Error, "Error", ex.Message);
            }
        }
    }
}
