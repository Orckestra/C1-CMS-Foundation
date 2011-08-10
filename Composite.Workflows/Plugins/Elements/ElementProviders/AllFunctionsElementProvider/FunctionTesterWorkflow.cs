using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Workflow.Runtime;
using System.Xml.Serialization;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Serialization;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Functions;
using Composite.Functions.ManagedParameters;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    public sealed partial class FunctionTesterWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public FunctionTesterWorkflow()
        {
            InitializeComponent();
        }



        private void initalizeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("FunctionMarkup", "");

            this.Bindings.Add("FunctionCalls", new List<NamedFunctionCall>());
            this.Bindings.Add("Parameters", new List<ManagedParameterDefinition>());


            Guid stateId = Guid.NewGuid();
            var state = new FunctionCallDesignerState { WorkflowId = WorkflowInstanceId, ConsoleIdInternal = GetCurrentConsoleId() };
            SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

            this.Bindings.Add("SessionStateProvider", SessionStateManager.DefaultProviderName);
            this.Bindings.Add("SessionStateId", stateId);
        }



        private void editCodeActivity_Preview_ExecuteCode(object sender, EventArgs e)
        {
            List<NamedFunctionCall> namedFunctionCalls = GetBinding<List<NamedFunctionCall>>("FunctionCalls");

            StringBuilder output = new StringBuilder();
            foreach (NamedFunctionCall namedFunctionCall in namedFunctionCalls)
            {
                output.AppendLine(namedFunctionCall.FunctionCall.GetCompositeName() + " result:");

                object functionResult = namedFunctionCall.FunctionCall.GetValue();
                output.AppendLine(PrettyPrinter.Print(functionResult));

                output.AppendLine();
            }

            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowWebRenderingService formFlowWebRenderingService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            Control outputControl = new LiteralControl("<pre>" + HttpUtility.HtmlEncode(output) + "</pre>");
            formFlowWebRenderingService.SetNewPageOutput(outputControl);
        }



        [Serializable]
        public sealed class FunctionCallDesignerState : IFunctionCallEditorState
        {
            public Guid WorkflowId { get; set; }
            public string ConsoleIdInternal { get; set; }

            private FormData GetFormData()
            {
                return WorkflowFacade.GetFormData(WorkflowId);
            }

            #region IFunctionCallEditorState Members

            [XmlIgnore]
            public List<NamedFunctionCall> FunctionCalls
            {
                get { return GetFormData().Bindings["FunctionCalls"] as List<NamedFunctionCall>; }
                set { GetFormData().Bindings["FunctionCalls"] = value; }
            }

            [XmlIgnore]
            public List<ManagedParameterDefinition> Parameters
            {
                get { return GetFormData().Bindings["Parameters"] as List<ManagedParameterDefinition>; }
                set { GetFormData().Bindings["Parameters"] = value; }
            }

            [XmlIgnore]
            public List<Type> ParameterTypeOptions
            {
                get { return (GetFormData().Bindings["ParameterTypeOptions"] as IEnumerable<Type>).ToList(); }
                set { GetFormData().Bindings["ParameterTypeOptions"] = value.ToList(); }
            }


            public string ConsoleId
            {
                get { return ConsoleIdInternal; }
            }


            public bool StartInSourceMode
            {
                get { return true; }
            }

            public bool ShowLocalFunctionNames { get { return false; } }
            public bool AllowLocalFunctionNameEditing { get { return false; } }

            public bool WidgetFunctionSelection { get { return false; } }

            public bool AllowSelectingInputParameters { get { return true; } }

            public Type[] AllowedResultTypes { get { return new[] { typeof(object) }; } }

            public int MaxFunctionAllowed { get { return 1000; } }

            #endregion
        }        
    }
}
