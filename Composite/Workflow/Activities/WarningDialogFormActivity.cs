using System.Workflow.Activities;
using System.Workflow.ComponentModel;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;


namespace Composite.C1Console.Workflow.Activities
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class WarningDialogFormActivity : Activity
    {
        public static readonly DependencyProperty ContainerLabelProperty = DependencyProperty.Register("ContainerLabel", typeof(string), typeof(WarningDialogFormActivity));
        public static readonly DependencyProperty FormDefinitionFileNameProperty = DependencyProperty.Register("FormDefinitionFileName", typeof(string), typeof(WarningDialogFormActivity));


        public WarningDialogFormActivity()
        {
        }



        public WarningDialogFormActivity(string name)
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
                    StandardUiContainerTypes.WarningDialog,
                    markupProvider,
                    formsWorkflow.Bindings,
                    formsWorkflow.BindingsValidationRules
                );

            return ActivityExecutionStatus.Closed;
        }
    }
}
