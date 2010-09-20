using System;
using System.Collections.Generic;
using System.IO;
using System.Transactions;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Functions.Inline;
using Composite.Functions.ManagedParameters;
using Composite.C1Console.Users;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    public sealed partial class AddInlineFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {


        public AddInlineFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_InitBindings_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction function = DataFacade.BuildNew<IInlineFunction>();
            function.Id = Guid.NewGuid();
            function.Namespace = UserSettings.LastSpecifiedNamespace;

            this.Bindings.Add("NewFunction", function);

            Dictionary<string, string> templates = new Dictionary<string, string>();
            templates.Add("clean", StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "InlineFunctionMethodTemplate.Clean"));
            templates.Add("parameter", StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "InlineFunctionMethodTemplate.WithParameters"));
            templates.Add("dataconnection", StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "InlineFunctionMethodTemplate.DataConnection"));

            this.Bindings.Add("TemplateOptions", templates);
            this.Bindings.Add("SelectedTemplate", "clean");
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction function = this.GetBinding<IInlineFunction>("NewFunction");
            function.UpdateCodePath();

            string selectedTemplate = this.GetBinding<string>("SelectedTemplate");

            string codeTemplate;
            switch (selectedTemplate)
            {
                case "clean":
                    codeTemplate = _cleanTemplate;
                    break;

                case "parameter":
                    codeTemplate = _parameterTemplate;

                    List<ManagedParameterDefinition> parameters = new List<ManagedParameterDefinition>();

                    ManagedParameterDefinition parameter1 = new ManagedParameterDefinition();
                    parameter1.Id = Guid.NewGuid();
                    parameter1.Name = "myIntValue";
                    parameter1.Label = "myIntValue";
                    parameter1.HelpText = "myIntValue";
                    parameter1.Position = 0;
                    parameter1.Type = typeof(int);
                    parameter1.TestValueFunctionMarkup = "<f:function xmlns:f=\"http://www.composite.net/ns/function/1.0\" name=\"Composite.Constant.Integer\"><f:param name=\"Constant\" value=\"0\" /></f:function>";
                    parameter1.WidgetFunctionMarkup = "<f:widgetfunction xmlns:f=\"http://www.composite.net/ns/function/1.0\" name=\"Composite.Widgets.Integer.TextBox\" label=\"myIntValue\" bindingsourcename=\"\"><f:helpdefinition xmlns:f=\"http://www.composite.net/ns/function/1.0\" helptext=\"myIntValue\" /></f:widgetfunction>";
                    parameters.Add(parameter1);


                    ManagedParameterDefinition parameter2 = new ManagedParameterDefinition();
                    parameter2.Id = Guid.NewGuid();
                    parameter2.Name = "myStringValue";
                    parameter2.Label = "myStringValue";
                    parameter2.HelpText = "myStringValue";
                    parameter2.Position = 1;
                    parameter2.Type = typeof(string);
                    parameter2.TestValueFunctionMarkup = "<f:function xmlns:f=\"http://www.composite.net/ns/function/1.0\" name=\"Composite.Constant.String\"><f:param name=\"Constant\" value=\"Hello world!\" /></f:function>";
                    parameter2.WidgetFunctionMarkup = "<f:widgetfunction xmlns:f=\"http://www.composite.net/ns/function/1.0\" name=\"Composite.Widgets.String.TextBox\" label=\"myStringValue\" bindingsourcename=\"\"><f:helpdefinition xmlns:f=\"http://www.composite.net/ns/function/1.0\" helptext=\"myStringValue\" /></f:widgetfunction>";
                    parameters.Add(parameter2);

                    ManagedParameterManager.Save(function.Id, parameters);
                    break;

                case "dataconnection":
                    codeTemplate = _dataConnectionTemplate;
                    break;

                default:
                    throw new NotImplementedException();
            }

            string code = string.Format(codeTemplate, function.Namespace, InlineFunctionHelper.MethodClassContainerName, function.Name);
            code = code.Replace('·', '\t');

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                foreach (string assemblyPath in InlineFunctionHelper.DefaultAssemblies)
                {
                    IInlineFunctionAssemblyReference reference = DataFacade.BuildNew<IInlineFunctionAssemblyReference>();
                    reference.Id = Guid.NewGuid();
                    reference.Function = function.Id;
                    reference.Name = Path.GetFileName(assemblyPath);
                    reference.Location = InlineFunctionHelper.GetAssemblyLocation(assemblyPath);

                    DataFacade.AddNew(reference);
                }

                function.SetFunctinoCode(code);

                function = DataFacade.AddNew(function);
            }

            this.CloseCurrentView();
            this.CreateAddNewTreeRefresher(this.EntityToken).PostRefreshMesseges(function.GetDataEntityToken());
            this.ExecuteWorklow(function.GetDataEntityToken(), WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.EditInlineFunctionWorkflow"));
        }


        private static string _cleanTemplate = @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace {0}
{{
·public static class {1}
·{{
··public static bool {2}()
··{{
···return true;
··}}
·}}
}}
";


        private static string _parameterTemplate = @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace {0}
{{
·public static class {1}
·{{
··public static bool {2}(int myIntValue, string myStringValue)
··{{
···return true;
··}}
·}}
}}
";


        private static string _dataConnectionTemplate = @"using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace {0}
{{
·public static class {1}
·{{
··public static XElement {2}()
··{{            
···using (DataConnection connection = new DataConnection(PublicationScope.Unpublished))
···{{
····XElement element = new XElement(""Pages"");    

····foreach (IPage page in connection.Get<IPage>())
····{{
·····element.Add(
·····   new XElement(""Page"", new XAttribute(""title"", page.Title))
·····);
····}}

····return element;
···}}            
··}}
·}}
}}
";
    }
}
