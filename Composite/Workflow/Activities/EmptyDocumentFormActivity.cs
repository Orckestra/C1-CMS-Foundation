using System.Workflow.Activities;
using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.Forms.DataServices;
using Composite.Forms.Flows;


namespace Composite.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class EmptyDocumentFormActivity : Activity
    {
        public static readonly DependencyProperty ContainerLabelProperty = DependencyProperty.Register("ContainerLabel", typeof(string), typeof(EmptyDocumentFormActivity));
        public static readonly DependencyProperty FormDefinitionFileNameProperty = DependencyProperty.Register("FormDefinitionFileName", typeof(string), typeof(EmptyDocumentFormActivity));
        

        public EmptyDocumentFormActivity()
        {
        }



        public EmptyDocumentFormActivity(string name)
            : base(name)
        {
        }



        public string ContainerLabel
        {
            get { return (string)GetValue(ContainerLabelProperty); }
            set { SetValue(ContainerLabelProperty, value); }
        }



        public string FormDefinitionFileName
        {
            get { return (string)GetValue(FormDefinitionFileNameProperty); }
            set { SetValue(FormDefinitionFileNameProperty, value); }
        }        



        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FormsWorkflow formsWorkflow = this.GetRoot<FormsWorkflow>();

            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(this.FormDefinitionFileName);

            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            IFormsWorkflowActivityService service = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            service.DeliverFormData(
                    WorkflowEnvironment.WorkflowInstanceId,
                    this.ContainerLabel,
                    StandardUiContainerTypes.EmptyDocument,
                    markupProvider,
                    formsWorkflow.Bindings,
                    formsWorkflow.BindingsValidationRules
                );            

            return ActivityExecutionStatus.Closed;
        }
    }
}
