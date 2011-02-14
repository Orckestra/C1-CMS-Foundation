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
    public sealed class DocumentFormActivity : Activity
    {
        /// <exclude />
        public static readonly DependencyProperty ContainerLabelProperty = DependencyProperty.Register("ContainerLabel", typeof(string), typeof(DocumentFormActivity));

        /// <exclude />
        public static readonly DependencyProperty FormDefinitionFileNameProperty = DependencyProperty.Register("FormDefinitionFileName", typeof(string), typeof(DocumentFormActivity));

        /// <exclude />
        public static readonly DependencyProperty CustomToolbarDefinitionFileNameProperty = DependencyProperty.Register("CustomToolbarDefinitionFileName", typeof(string), typeof(DocumentFormActivity));


        /// <exclude />
        public DocumentFormActivity()
        {
        }



        /// <exclude />
        public DocumentFormActivity(string name)
            : base(name)
        {
        }



        /// <exclude />
        public string ContainerLabel
        {
            get { return (string)GetValue(ContainerLabelProperty); }
            set { SetValue(ContainerLabelProperty, value); }
        }



        /// <exclude />
        public string FormDefinitionFileName
        {
            get { return (string)GetValue(FormDefinitionFileNameProperty); }
            set { SetValue(FormDefinitionFileNameProperty, value); }
        }



        /// <exclude />
        public string CustomToolbarDefinitionFileName
        {
            get { return (string)GetValue(CustomToolbarDefinitionFileNameProperty); }
            set { SetValue(CustomToolbarDefinitionFileNameProperty, value); }
        }



        /// <exclude />
        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            FormsWorkflow formsWorkflow = this.GetRoot<FormsWorkflow>();

            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(this.FormDefinitionFileName);

            ExternalDataExchangeService externalDataExchangeService = WorkflowFacade.WorkflowRuntime.GetService<ExternalDataExchangeService>();
            IFormsWorkflowActivityService service = externalDataExchangeService.GetService(typeof(IFormsWorkflowActivityService)) as IFormsWorkflowActivityService;

            service.DeliverFormData(
                    WorkflowEnvironment.WorkflowInstanceId,
                    this.ContainerLabel,
                    StandardUiContainerTypes.Document,
                    markupProvider,
                    formsWorkflow.Bindings,
                    formsWorkflow.BindingsValidationRules
                );

            if (string.IsNullOrEmpty(this.CustomToolbarDefinitionFileName) == false)
            {
                IFormMarkupProvider customToolbarMarkupProvider = new FormDefinitionFileMarkupProvider(this.CustomToolbarDefinitionFileName);
                service.DeliverCustomToolbarDefinition(WorkflowEnvironment.WorkflowInstanceId, customToolbarMarkupProvider);
            }

            return ActivityExecutionStatus.Closed;
        }
    }
}
