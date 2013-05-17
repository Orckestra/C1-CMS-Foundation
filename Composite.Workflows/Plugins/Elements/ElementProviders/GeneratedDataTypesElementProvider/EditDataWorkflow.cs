using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.C1Console.Workflow.Foundation;
using System.Collections.Generic;
using System.Workflow.Runtime;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish = false;

        [NonSerialized]
        private DataTypeDescriptorFormsHelper _helper;

        [NonSerialized]
        private string _typeName = null;


        public EditDataWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptorFormsHelper GetDataTypeDescriptorFormsHelper()
        {
            if (_helper == null)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

                Guid guid = dataEntityToken.Data.DataSourceId.InterfaceType.GetImmutableTypeId();

                DataTypeDescriptor typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);

                GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor) { AllowForiegnKeyEditing = true };

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, this.EntityToken);
                _helper.LayoutIconHandle = "generated-type-data-edit";

                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }



        private void editCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !(data is IPublishControlled))
            {
                FormData formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                    formData.ExcludedEvents = new List<string>();

                formData.ExcludedEvents.Add("SaveAndPublish");
            }

            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            if (data is IPublishControlled)
            {
                IPublishControlled publishControlledData = (IPublishControlled)data;
                if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            helper.UpdateWithBindings(data, this.Bindings);
            helper.LayoutLabel = data.GetLabel(true);

            this.DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(data)
                );
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            IData data = ((DataEntityToken)this.EntityToken).Data;            

            bool isValid = ValidateBindings();
            if (!BindAndValidate(helper, data))
            {
                isValid = false;
            }

            var fieldsWithBrokenReferences = new List<string>();
            if(!data.TryValidateForeignKeyIntegrity(fieldsWithBrokenReferences))
            {
                isValid = false;

                foreach(string fieldName in fieldsWithBrokenReferences)
                {
                    ShowFieldMessage(fieldName, SR.GetString("Composite.Management", "Validation.BrokenReference"));
                }
            }

            if (isValid)
            {
                // published data stayed as published data - change to draft if status is published
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

                PublishIfNeeded(data);

                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }
            
            SetSaveStatus(isValid);
        }


        private bool PublishIfNeeded(IData newData)
        {
            if (newData is IPublishControlled && _doPublish)
            {
                GenericPublishProcessController.PublishActionToken actionToken = new GenericPublishProcessController.PublishActionToken();
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                ActionExecutorFacade.Execute(newData.GetDataEntityToken(), actionToken, serviceContainer);
                return true;
            }
            return false;
        }


        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
