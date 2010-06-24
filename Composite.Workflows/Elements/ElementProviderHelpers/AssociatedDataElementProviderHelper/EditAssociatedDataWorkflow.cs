using System;
using System.Collections.Generic;
using Composite.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Validation;
using Composite.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditAssociatedDataWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
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
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            IData data = ((DataEntityToken)this.EntityToken).Data;

            Dictionary<string, string> errorMessages = helper.BindingsToObject(this.Bindings, data);

            // published data stayed as published data - change to draft if status is published
            if (data is IPublishControlled)
            {
                IPublishControlled publishControlledData = (IPublishControlled)data;
                if (publishControlledData.PublicationStatus == GenericPublishProcessController.Published)
                {
                    publishControlledData.PublicationStatus = GenericPublishProcessController.Draft;
                }
            }

            ValidationResults validationResults = ValidationFacade.Validate(data.DataSourceId.InterfaceType, data);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage(result.Key, result.Message);
            }

            if (errorMessages != null)
            {
                foreach (var kvp in errorMessages)
                {
                    this.ShowFieldMessage(kvp.Key, kvp.Value);
                }
            }


            if ((validationResults.IsValid == true) && (errorMessages == null))
            {
                DataFacade.Update(data);

                updateTreeRefresher.PostRefreshMesseges(this.EntityToken);

                SetSaveStatus(true);
            }
            else
            {
                SetSaveStatus(false);
            }
        }
    }
}
