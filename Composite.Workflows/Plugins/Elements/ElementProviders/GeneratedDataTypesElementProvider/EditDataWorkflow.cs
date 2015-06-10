using System;
using System.Collections.Generic;
using System.Linq;

using Composite.C1Console.Actions;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditDataWorkflow : FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;

        [NonSerialized]
        private DataTypeDescriptorFormsHelper _helper;

        [NonSerialized]
        private string _typeName;

        public EditDataWorkflow()
        {
            InitializeComponent();
        }

        private DataTypeDescriptorFormsHelper GetDataTypeDescriptorFormsHelper()
        {
            if (_helper == null)
            {
                var dataEntityToken = (DataEntityToken)EntityToken;
                var guid = dataEntityToken.Data.DataSourceId.InterfaceType.GetImmutableTypeId();
                var typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);

                var generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor) { AllowForeignKeyEditing = true };

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, EntityToken)
                {
                    LayoutIconHandle = "generated-type-data-edit"
                };

                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }

        private void editCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
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

            var helper = GetDataTypeDescriptorFormsHelper();

            if (publishedControlled != null)
            {
                if (publishedControlled.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishedControlled.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            helper.UpdateWithBindings(data, Bindings);
            helper.LayoutLabel = data.GetLabel(true);

            DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    Bindings,
                    helper.GetBindingsValidationRules(data)
                );
        }

        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var isValid = ValidateBindings();
            var updateTreeRefresher = CreateUpdateTreeRefresher(EntityToken);
            var helper = GetDataTypeDescriptorFormsHelper();

            var data = ((DataEntityToken)EntityToken).Data;

            if (!BindAndValidate(helper, data))
            {
                isValid = false;
            }

            var fieldsWithBrokenReferences = new List<string>();
            if (!data.TryValidateForeignKeyIntegrity(fieldsWithBrokenReferences))
            {
                isValid = false;

                foreach (var fieldName in fieldsWithBrokenReferences)
                {
                    ShowFieldMessage(fieldName, StringResourceSystemFacade.GetString("Composite.Management", "Validation.BrokenReference"));
                }
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

                updateTreeRefresher.PostRefreshMesseges(EntityToken);

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
