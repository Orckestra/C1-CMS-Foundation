using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.IO;
using Composite.Core.Serialization;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;


namespace Composite.C1Console.Trees.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class GenericEditDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish = false;


        [NonSerialized]
        private DataTypeDescriptorFormsHelper _dataTypeDescriptorFormsHelper = null;

        [NonSerialized]
        private string _typeName = null;


        private DataTypeDescriptorFormsHelper FormsHelper
        {
            get
            {
                if (_dataTypeDescriptorFormsHelper == null)
                {
                    if (String.IsNullOrEmpty(this.Payload))
                    {
                        throw new InvalidOperationException("The interface type should be a part of the workflows payload");
                    }

                    Dictionary<string, string> serializedValues = StringConversionServices.ParseKeyValueCollection(this.Payload);

                    string iconResourceName = StringConversionServices.DeserializeValueString(serializedValues["_IconResourceName_"]);

                    string customFormMarkupPath = null;
                    if (serializedValues.ContainsKey("_CustomFormMarkupPath_"))
                    {
                        customFormMarkupPath = StringConversionServices.DeserializeValueString(serializedValues["_CustomFormMarkupPath_"]);
                    }

                    Type interfaceType;

                    DataEntityToken dataEntityToken = this.EntityToken as DataEntityToken;
                    if (dataEntityToken != null)
                    {
                        interfaceType = dataEntityToken.InterfaceType;
                    }
                    else
                    {
                        throw new InvalidOperationException("The given entity token is of wrong type");
                    }

                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);
                    if (dataTypeDescriptor == null) throw new InvalidOperationException(string.Format("Can not find the type descriptor for the type '{0}'", interfaceType));

                    _typeName = dataTypeDescriptor.Name;

                    GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor) { AllowForiegnKeyEditing = true };

                    _dataTypeDescriptorFormsHelper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, true, this.EntityToken);
                    if (string.IsNullOrEmpty(customFormMarkupPath) == false)
                    {
                        _dataTypeDescriptorFormsHelper.AlternateFormDefinition = C1File.ReadAllText(customFormMarkupPath);
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

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !(data is IPublishControlled))
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

            if (data is IPublishControlled)
            {
                IPublishControlled publishControlledData = (IPublishControlled)data;
                if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            if (isValid == true)
            {
                DataFacade.Update(data);

                PublishIfNeeded(data);

                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }

            SetSaveStatus(isValid);
        }


        private void PublishIfNeeded(IData newData)
        {
            if (newData is IPublishControlled && _doPublish)
            {
                GenericPublishProcessController.PublishActionToken actionToken = new GenericPublishProcessController.PublishActionToken();
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                ActionExecutorFacade.Execute(newData.GetDataEntityToken(), actionToken, serviceContainer);
            }
        }

        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
