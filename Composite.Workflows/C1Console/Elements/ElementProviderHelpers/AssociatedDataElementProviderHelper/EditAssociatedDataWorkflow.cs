using System;
using System.Collections.Generic;
using System.Linq;

using Composite.C1Console.Actions;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditAssociatedDataWorkflow : FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;

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
                var dataEntityToken = (DataEntityToken)EntityToken;
                var interfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;
                var guid = interfaceType.GetImmutableTypeId();
                var typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);

                var generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor);

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, EntityToken);
                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }

        private void editDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var helper = GetDataTypeDescriptorFormsHelper();
            helper.LayoutIconHandle = "associated-data-edit";

            var data = ((DataEntityToken)EntityToken).Data;
            var publishedControlled = data as IPublishControlled;

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || publishedControlled == null)
            {
                var formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                {
                    formData.ExcludedEvents = new List<string>();
                }

                formData.ExcludedEvents.Add("SaveAndPublish");
            }

            if (publishedControlled != null)
            {
                if (publishedControlled.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishedControlled.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            helper.UpdateWithBindings(data, Bindings);

            DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    Bindings,
                    helper.GetBindingsValidationRules(data)
                );
        }

        private void saveDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var isValid = ValidateBindings();
            var updateTreeRefresher = CreateUpdateTreeRefresher(EntityToken);
            var helper = GetDataTypeDescriptorFormsHelper();

            var data = ((DataEntityToken)EntityToken).Data;

            if (!BindAndValidate(helper, data))
            {
                isValid = false;
            }

            if (isValid)
            {
                // published data stayed as published data - change to draft if status is published
                if (data is IPublishControlled)
                {
                    var publishControlledData = (IPublishControlled)data;
                    if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                    {
                        publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                    }
                }

                DataFacade.Update(data);

                EntityTokenCacheFacade.ClearCache(EntityToken);

                updateTreeRefresher.PostRefreshMessages(EntityToken);

                PublishControlledHelper.PublishIfNeeded(data, _doPublish, Bindings, ShowMessage);

                SetSaveStatus(true);
            }
            else
            {
                SetSaveStatus(false);
            }
        }

        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
