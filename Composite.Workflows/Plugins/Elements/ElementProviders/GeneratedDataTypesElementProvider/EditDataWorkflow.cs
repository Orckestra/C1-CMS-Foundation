using System;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
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
            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            IData data = ((DataEntityToken)this.EntityToken).Data;

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

            // published data stayed as published data - change to draft if status is published
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
                SetSaveStatus(true);
                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }
            else
            {
                SetSaveStatus(false);
            }
        }
    }
}
