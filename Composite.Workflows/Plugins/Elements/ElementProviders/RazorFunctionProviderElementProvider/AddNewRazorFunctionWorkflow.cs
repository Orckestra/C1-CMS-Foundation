using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.AspNet.Security;
using Composite.C1Console.Actions;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Functions;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Core.Xml;

namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewRazorFunctionWorkflow : BaseFunctionWorkflow
    {
        private static readonly string Binding_Name = "Name";
        private static readonly string Binding_Namespace = "Namespace";
        private static readonly string Binding_CopyFromFunctionName = "CopyFromFunctionName";
        private static readonly string Binding_CopyFromOptions = "CopyFromOptions";

        private static readonly string NewRazorFunction_CSHTML =
@"@inherits RazorFunction

@functions {
    public override string FunctionDescription
    {
        get  { return ""Shortly describe this function here""; }
    }
     
    [FunctionParameter(Label = ""Heading label here..."", Help = ""Help text here..."", DefaultValue = ""Default value here..."")]
    public string Heading { get; set; }

    [FunctionParameter(Label = ""Article label here..."", Help = ""Help text here..."")]
    public XhtmlDocument Article { get; set; }

    [FunctionParameter(Label = ""Image label here..."", Help = ""Help text here..."")]
    public DataReference<IImageFile> Image { get; set; }
}

<html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:f=""" + Namespaces.Function10 + @""">
    <head>
    </head>
    <body>
        <h1>@Heading</h1>
        <div>
			<img src=""/media(@Image)"" style=""float:right"" />
            @Html.Raw(@Article)
        </div>
    </body>
</html>";


        public AddNewRazorFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            BaseFunctionFolderElementEntityToken token = (BaseFunctionFolderElementEntityToken)this.EntityToken;
            string @namespace = token.FunctionNamespace ?? UserSettings.LastSpecifiedNamespace;

            this.Bindings.Add(Binding_Name, string.Empty);
            this.Bindings.Add(Binding_Namespace, @namespace);

            var functionProvider = GetFunctionProvider<RazorFunctionProvider>();
            var copyOfOptions = new List<KeyValuePair<string, string>>();

            copyOfOptions.Add(new KeyValuePair<string, string>(string.Empty, GetText("AddNewRazorFunction.LabelCopyFromEmptyOption")));
            foreach (string functionName in FunctionFacade.GetFunctionNamesByProvider(functionProvider.Name))
            {
                copyOfOptions.Add(new KeyValuePair<string, string>(functionName, functionName));
            }

            this.Bindings.Add(Binding_CopyFromFunctionName, string.Empty);
            this.Bindings.Add(Binding_CopyFromOptions, copyOfOptions);
        }

        private void IsValidData(object sender, ConditionalEventArgs e)
        {
            string functionName = this.GetBinding<string>(Binding_Name);
            string functionNamespace = this.GetBinding<string>(Binding_Namespace);
            var provider = GetFunctionProvider<RazorFunctionProvider>();

            e.Result = false;

            if (functionName == string.Empty)
            {
                ShowFieldMessage(Binding_Name, GetText("AddNewRazorFunctionWorkflow.EmptyName"));
                return;
            }

            if (string.IsNullOrWhiteSpace(functionNamespace))
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewRazorFunctionWorkflow.NamespaceEmpty"));
                return;
            }

            if (!functionNamespace.IsCorrectNamespace('.'))
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewRazorFunctionWorkflow.InvalidNamespace"));
                return;
            }

            string functionFullName = functionNamespace + "." + functionName;

            bool nameIsUsed = FunctionFacade.FunctionNames.Contains(functionFullName, StringComparer.OrdinalIgnoreCase);
            if (nameIsUsed)
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewRazorFunctionWorkflow.DuplicateName"));
                return;
            }

            if ((provider.PhysicalPath + functionNamespace + functionName).Length > 240)
            {
                ShowFieldMessage(Binding_Name, GetText("AddNewRazorFunctionWorkflow.TotalNameTooLang"));
                return;
            }

            e.Result = true;
        }



        private void finalizecodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var provider = GetFunctionProvider<RazorFunctionProvider>();

            string functionName = this.GetBinding<string>(Binding_Name);
            string functionNamespace = ChangeNamespaceAccordingToExistingFolders(provider,this.GetBinding<string>(Binding_Namespace));
            string functionFullName = functionNamespace + "." + functionName;

            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            string fileName = functionName + ".cshtml";
            string folder = Path.Combine(provider.PhysicalPath, functionNamespace.Replace('.', '\\'));

            string cshtmlFilePath = Path.Combine(folder, fileName);

            string code;

            string copyFromFunction = this.GetBinding<string>(Binding_CopyFromFunctionName);
            if(string.IsNullOrEmpty(copyFromFunction))
            {
                code = NewRazorFunction_CSHTML;
            }
            else
            {
                code = GetFunctionCode(copyFromFunction);
            }

            C1Directory.CreateDirectory(folder);
            C1File.WriteAllText(cshtmlFilePath, code);

            UserSettings.LastSpecifiedNamespace = functionNamespace;

            provider.ReloadFunctions();

            var newFunctionEntityToken = new FileBasedFunctionEntityToken(provider.Name, functionFullName);

            addNewTreeRefresher.PostRefreshMesseges(newFunctionEntityToken);

            var container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var executionService = container.GetService<IActionExecutionService>();
            executionService.Execute(newFunctionEntityToken, new WorkflowActionToken(typeof(EditRazorFunctionWorkflow)), null);
        }

        private static string ChangeNamespaceAccordingToExistingFolders(RazorFunctionProvider provider, string nameSpace)
        {
            string folder = Path.Combine(provider.PhysicalPath, nameSpace.Replace('.', '\\'));
            
            if (Directory.Exists(folder))
            {
                return GetAlldirectoriesAndSubDirectories(provider.PhysicalPath)
                    .Single(f=>f.Equals(folder,StringComparison.InvariantCultureIgnoreCase))
                    .Replace(provider.PhysicalPath + "\\", "")
                    .Replace('\\','.');
            }

            return nameSpace;
        }

        private static List<string> GetAlldirectoriesAndSubDirectories(string physicalPath)
        {
            var res = new List<string>();

            foreach (var dir in Directory.GetDirectories(physicalPath))
            {
                res.Add(dir);
                res.AddRange(GetAlldirectoriesAndSubDirectories(dir));
            }

            return res;
        }

        private string GetFunctionCode(string copyFromFunction)
        {
            IFunction function = FunctionFacade.GetFunction(copyFromFunction);

            if (function is FunctionWrapper)
            {
                function = (function as FunctionWrapper).InnerFunction;
            }

            var razorFunction = (RazorBasedFunction) function;
            string filePath = PathUtil.Resolve(razorFunction.VirtualPath);

            return C1File.ReadAllText(filePath);
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", key);
        }
    }
}
