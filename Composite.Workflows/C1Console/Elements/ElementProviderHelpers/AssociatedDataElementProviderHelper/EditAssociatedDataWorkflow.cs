using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditAssociatedDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish = false;

        [NonSerialized]
        private DataTypeDescriptorFormsHelper _helper;

        private string _typeName;


        public EditAssociatedDataWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptorFormsHelper GetDataTypeDescriptorFormsHelper()
        {
            if (_helper == null)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

                Type interfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;

                Guid guid = interfaceType.GetImmutableTypeId();

                DataTypeDescriptor typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);

                GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor);

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, this.EntityToken);
                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }



        private void editDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();
            helper.LayoutIconHandle = "associated-data-edit";

            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !(data is IPublishControlled))
            {
                FormData formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                    formData.ExcludedEvents = new List<string>();

                formData.ExcludedEvents.Add("SaveAndPublish");
            }

            if (data is IPublishControlled && (data as IPublishControlled).PublicationStatus == GenericPublishProcessController.Published)
            {
                (data as IPublishControlled).PublicationStatus = GenericPublishProcessController.Draft;
            }

            helper.UpdateWithBindings(data, this.Bindings);

            this.DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(data)
                );
        }



        private void saveDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            bool isValid = ValidateBindings();

            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (!BindAndValidate(helper, data))
            {
                isValid = false;
            }

            // published data stayed as published data - change to draft if status is published
            if (data is IPublishControlled)
            {
                IPublishControlled publishControlledData = (IPublishControlled)data;
                if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            if (isValid)
            {
                DataFacade.Update(data);

                EntityTokenCacheFacade.ClearCache(data.GetDataEntityToken());

                PublishIfNeeded(data);

                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);

                SetSaveStatus(true);
            }
            else
            {
                SetSaveStatus(false);
            }
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
