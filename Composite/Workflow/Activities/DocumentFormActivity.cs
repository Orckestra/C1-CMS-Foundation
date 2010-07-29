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
    public sealed class DocumentFormActivity : Activity
    {
        public static readonly DependencyProperty ContainerLabelProperty = DependencyProperty.Register("ContainerLabel", typeof(string), typeof(DocumentFormActivity));
        public static readonly DependencyProperty FormDefinitionFileNameProperty = DependencyProperty.Register("FormDefinitionFileName", typeof(string), typeof(DocumentFormActivity));
        public static readonly DependencyProperty CustomToolbarDefinitionFileNameProperty = DependencyProperty.Register("CustomToolbarDefinitionFileName", typeof(string), typeof(DocumentFormActivity));
        

        public DocumentFormActivity()
        {
        }



        public DocumentFormActivity(string name)
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



        public string CustomToolbarDefinitionFileName
        {
            get { return (string)GetValue(CustomToolbarDefinitionFileNameProperty); }
            set { SetValue(CustomToolbarDefinitionFileNameProperty, value); }
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



        //public static readonly DependencyProperty ExecuteCodeEvent = DependencyProperty.Register("ExecuteCode", typeof(EventHandler), typeof(MyCodeActivity));

        /*// Events
        public event EventHandler ExecuteCode
        {
            add
            {
                base.AddHandler(ExecuteCodeEvent, value);
            }
            remove
            {
                base.RemoveHandler(ExecuteCodeEvent, value);
            }
        }

        // Methods
        public MyCodeActivity()
        {
        }

        public MyCodeActivity(string name)
            : base(name)
        {
        }

        protected sealed override ActivityExecutionStatus Execute(ActivityExecutionContext executionContext)
        {
            base.RaiseEvent(ExecuteCodeEvent, this, new MyCodeActivityEventArgs(executionContext));
            return ActivityExecutionStatus.Closed;
        }

        // Nested Types
        private class CodeActivityValidator : ActivityValidator
        {
            // Methods
            public override ValidationErrorCollection Validate(ValidationManager manager, object obj)
            {
                ValidationErrorCollection errors = new ValidationErrorCollection();
                MyCodeActivity activity = obj as MyCodeActivity;
                if (activity == null)
                {
                    throw new InvalidOperationException();
                }
                if ((activity.GetInvocationList<EventHandler>(CodeActivity.ExecuteCodeEvent).Length == 0) && (activity.GetBinding(CodeActivity.ExecuteCodeEvent) == null))
                {
                    Hashtable hashtable = activity.GetValue(WorkflowMarkupSerializer.EventsProperty) as Hashtable;
                    if ((hashtable == null) || (hashtable["ExecuteCode"] == null))
                    {
                        errors.Add(ValidationError.GetNotSetValidationError("ExecuteCode"));
                    }
                }
                errors.AddRange(base.Validate(manager, obj));
                return errors;
            }
        }*/
    }
}
