using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Serialization;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;


namespace Composite.C1Console.Trees.Workflows
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class GenericEditDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;


        [NonSerialized]
        private DataTypeDescriptorFormsHelper _dataTypeDescriptorFormsHelper;

        [NonSerialized]
        private string _typeName;


        private DataTypeDescriptorFormsHelper FormsHelper
        {
            get
            {
                if (_dataTypeDescriptorFormsHelper == null)
                {
                    if (String.IsNullOrEmpty(this.Payload))
                    {
                        throw new InvalidOperationException("Action token's 'Payload' property is null or empty");
                    }

                    Dictionary<string, string> serializedValues = StringConversionServices.ParseKeyValueCollection(this.Payload);

                    string iconResourceName = StringConversionServices.DeserializeValueString(serializedValues["_IconResourceName_"]);

                    string customFormMarkupPath = null;
                    if (serializedValues.ContainsKey("_CustomFormMarkupPath_"))
                    {
                        customFormMarkupPath = StringConversionServices.DeserializeValueString(serializedValues["_CustomFormMarkupPath_"]);
                    }

                    DataEntityToken dataEntityToken = this.EntityToken as DataEntityToken;
                    Verify.IsNotNull(dataEntityToken, "The given entity token is of wrong type");

                    Type interfaceType = dataEntityToken.InterfaceType;
                    

                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);
                    Verify.IsNotNull(dataTypeDescriptor, "Can not find the type descriptor for the type '{0}'", interfaceType);

                    _typeName = dataTypeDescriptor.Name;

                    var generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor) { AllowForeignKeyEditing = true };

                    _dataTypeDescriptorFormsHelper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, true, this.EntityToken);
                    if (!string.IsNullOrEmpty(customFormMarkupPath))
                    {
                        _dataTypeDescriptorFormsHelper.CustomFormDefinition =
                            XDocument.Load(customFormMarkupPath, LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);
                    }
                    _dataTypeDescriptorFormsHelper.LayoutIconHandle = iconResourceName;
                    _dataTypeDescriptorFormsHelper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);
                }

                return _dataTypeDescriptorFormsHelper;
            }
        }



        private string TypeName
        {
            get
            {
                return _typeName;
            }
        }



        public GenericEditDataWorkflow()
        {
            InitializeComponent();
        }



        private void editCodeActivity_DisplayForm_ExecuteCode(object sender, EventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) 
                || !(data is IPublishControlled))
            {
                FormData formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                    formData.ExcludedEvents = new List<string>();

                formData.ExcludedEvents.Add("SaveAndPublish");
            }

            if (data is IPublishControlled)
            {
                IPublishControlled publishControlledData = (IPublishControlled)data;
                if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            this.FormsHelper.UpdateWithBindings(data, this.Bindings);
            this.FormsHelper.LayoutLabel = data.GetLabel(true);

            this.DeliverFormData(
                    this.TypeName,
                    StandardUiContainerTypes.Document,
                    this.FormsHelper.GetForm(),
                    this.Bindings,
                    this.FormsHelper.GetBindingsValidationRules(data)
                );
        }



        private void saveCodeActivity_UpdateData_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            IData data = ((DataEntityToken)this.EntityToken).Data;

            bool isValid = ValidateBindings();
            if (!BindAndValidate(this.FormsHelper, data))
            {
                isValid = false;
            }

            var fieldsWithBrokenReferences = new List<string>();
            if (!data.TryValidateForeignKeyIntegrity(fieldsWithBrokenReferences))
            {
                isValid = false;

                foreach (string fieldName in fieldsWithBrokenReferences)
                {
                    ShowFieldMessage(fieldName, LocalizationFiles.Composite_Management.Validation_BrokenReference);
                }
            }

            if (isValid)
            {
                if (data is IPublishControlled)
                {
                    IPublishControlled publishControlledData = (IPublishControlled)data;
                    if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                    {
                        publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                    }
                }

                DataFacade.Update(data);

                EntityTokenCacheFacade.ClearCache(EntityToken);

                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);

                PublishControlledHelper.PublishIfNeeded(data, _doPublish, Bindings, ShowMessage);
            }

            SetSaveStatus(isValid);
        }


        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
