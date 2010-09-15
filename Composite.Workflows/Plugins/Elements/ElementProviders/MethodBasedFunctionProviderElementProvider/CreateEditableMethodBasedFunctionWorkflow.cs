using System;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    public sealed partial class CreateEditableMethodBasedFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static string _fileTemplate = @"using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace {0}
{{
    public static class {1}
    {{
        public static bool {2}(int myValue)
        {{
            return myValue == 0;
        }}
    }}
}}
";

        public CreateEditableMethodBasedFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_InitBindings_ExecuteCode(object sender, EventArgs e)
        {
            ICSharpFunction function = DataFacade.BuildNew<ICSharpFunction>();
            function.Id = Guid.NewGuid();

            this.Bindings.Add("NewFunction", function);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            ICSharpFunction function = this.GetBinding<ICSharpFunction>("NewFunction");

            function.UpdateCodePath();

            string code = string.Format(_fileTemplate, function.Namespace, CSharpFunctionHelper.MethodClassContainerName, function.Name);

            function.SetFunctinoCode(code);

            function = DataFacade.AddNew(function);

            this.CloseCurrentView();
            this.CreateAddNewTreeRefresher(this.EntityToken).PostRefreshMesseges(function.GetDataEntityToken());            
            this.ExecuteWorklow(function.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.EditEditableMethodBasedFunctionWorkflow"));
        }
    }
}
