using System;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditFormWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditFormWorkflow()
        {
            InitializeComponent();
        }


        
        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            string formMarkup = DynamicTypesAlternateFormFacade.GetAlternateFormMarkup(dataTypeDescriptor);

            if (formMarkup == null)
            {
                DataTypeDescriptorFormsHelper formsHelper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);

                GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
                formsHelper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                formMarkup = formsHelper.GetForm();
            }

            this.Bindings.Add("Title", string.Format("{0}.{1} XML", dataTypeDescriptor.Namespace, dataTypeDescriptor.Name));
            this.Bindings.Add("FileContent", formMarkup);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string fileContent = this.GetBinding<string>("FileContent");

            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            try
            {
                DynamicTypesAlternateFormFacade.SetAlternateForm(dataTypeDescriptor, fileContent);

                SetSaveStatus(true);
            }
            catch (Exception ex)
            {
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                var consoleMessageService = serviceContainer.GetService<IManagementConsoleMessageService>();
                consoleMessageService.ShowMessage(
                    DialogType.Error,
                    "Error",
                    ex.Message);
            }

        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            GeneratedDataTypesElementProviderTypeEntityToken entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
            Type type = TypeManager.GetType(entityToken.SerializedTypeName);

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }
    }
}
