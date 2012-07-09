using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
using Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider;
using Composite.Plugins.Elements.ElementProviders.Common;

namespace Composite.Plugins.Elements.ElementProviders.UserControlFunctionProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewUserControlFunctionWorkflow : BaseFunctionWorkflow
    {
        private static readonly string Binding_Name = "Name";
        private static readonly string Binding_Namespace = "Namespace";
        private static readonly string Binding_CopyFromFunctionName = "CopyFromFunctionName";
        private static readonly string Binding_CopyFromOptions = "CopyFromOptions";


        private static readonly string Marker_CodeFile = "%CodeFile%";

        private static readonly string NewUserControl_Markup =
@"<%@ Control Language=""C#"" AutoEventWireup=""true"" CodeFile=""%CodeFile%"" Inherits=""C1Function"" %>

Hello <%= this.Name %>!";

        private static readonly string NewUserControl_CodeFile =
@"using System;
using Composite.Functions;

public partial class C1Function : Composite.AspNet.UserControlFunction
{
    public override string FunctionDescription
    {
        get 
        { 
            return ""A demo function that outputs a hello message.""; 
        }
    }

    [FunctionParameter(DefaultValue = ""World"")]
    public string Name { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {

    }
}";


        public AddNewUserControlFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            BaseFunctionFolderElementEntityToken token = (BaseFunctionFolderElementEntityToken)this.EntityToken;
            string @namespace = token.FunctionNamespace ?? UserSettings.LastSpecifiedNamespace;

            this.Bindings.Add(Binding_Name, string.Empty);
            this.Bindings.Add(Binding_Namespace, @namespace);

            var functionProvider = GetFunctionProvider<UserControlFunctionProvider>();
            var copyOfOptions = new List<KeyValuePair<string, string>>();

            copyOfOptions.Add(new KeyValuePair<string, string>(string.Empty, GetText("AddNewUserControlFunction.LabelCopyFromEmptyOption")));
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
            var provider = GetFunctionProvider<UserControlFunctionProvider>();

            e.Result = false;

            if (functionName == string.Empty)
            {
                ShowFieldMessage(Binding_Name, GetText("AddNewUserControlFunctionWorkflow.EmptyName"));
                return;
            }

            if (string.IsNullOrWhiteSpace(functionNamespace))
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewUserControlFunctionWorkflow.NamespaceEmpty"));
                return;
            }

            if (!functionNamespace.IsCorrectNamespace('.'))
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewUserControlFunctionWorkflow.InvalidNamespace"));
                return;
            }

            string functionFullName = functionNamespace + "." + functionName;

            bool nameIsUsed = FunctionFacade.FunctionNames.Contains(functionFullName, StringComparer.OrdinalIgnoreCase);
            if (nameIsUsed)
            {
                ShowFieldMessage(Binding_Namespace, GetText("AddNewUserControlFunctionWorkflow.DuplicateName"));
                return;
            }

            if ((provider.PhysicalPath + functionNamespace + functionName).Length > 240)
            {
                ShowFieldMessage(Binding_Name, GetText("AddNewUserControlFunctionWorkflow.TotalNameTooLang"));
                return;
            }

            e.Result = true;
        }



        private void finalizecodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string functionName = this.GetBinding<string>(Binding_Name);
            string functionNamespace = this.GetBinding<string>(Binding_Namespace);
            string copyFromFunctionName = this.GetBinding<string>(Binding_CopyFromFunctionName);
            string functionFullName = functionNamespace + "." + functionName;

            var provider = GetFunctionProvider<UserControlFunctionProvider>();

            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            string fileName = functionName + ".ascx";
            string folder = Path.Combine(provider.PhysicalPath, functionNamespace.Replace('.', '\\'));
            string markupFilePath = Path.Combine(folder, fileName);
            string codeFilePath = markupFilePath + ".cs";

            string markupTemplate = NewUserControl_Markup;
            string code = NewUserControl_CodeFile;
            if (!copyFromFunctionName.IsNullOrEmpty())
            {
                GetFunctionCode(copyFromFunctionName, out markupTemplate, out code);
            }

            C1Directory.CreateDirectory(folder);
            C1File.WriteAllText(codeFilePath, code);
            C1File.WriteAllText(markupFilePath, markupTemplate.Replace(Marker_CodeFile, functionName + ".ascx.cs"));


            UserSettings.LastSpecifiedNamespace = functionNamespace;

            provider.ReloadFunctions();

            var newFunctionEntityToken = new FileBasedFunctionEntityToken(provider.Name, functionFullName);

            addNewTreeRefresher.PostRefreshMesseges(newFunctionEntityToken);

            var container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var executionService = container.GetService<IActionExecutionService>();
            executionService.Execute(newFunctionEntityToken, new WorkflowActionToken(typeof(EditUserControlFunctionWorkflow)), null);
        }

        private void GetFunctionCode(string copyFromFunctionName, out string markupTemplate, out string code)
        {
            IFunction function = FunctionFacade.GetFunction(copyFromFunctionName);

            if (function is FunctionWrapper)
            {
                function = (function as FunctionWrapper).InnerFunction;
            }

            var razorFunction = (UserControlBasedFunction)function;
            string filePath = PathUtil.Resolve(razorFunction.VirtualPath);
            string codeFilePath = filePath + ".cs";
            Verify.That(C1File.Exists(codeFilePath), "Codebehind file not found: {0}", codeFilePath);

            markupTemplate = C1File.ReadAllText(filePath);
            code = C1File.ReadAllText(codeFilePath);

            const string quote = "\"";
            string codeFileReference = quote + Path.GetFileName(codeFilePath) + quote;

            int codeReferenceOffset = markupTemplate.IndexOf(codeFileReference, StringComparison.OrdinalIgnoreCase);
            Verify.That(codeReferenceOffset > 0, "Failed to find codebehind file reference '{0}'".FormatWith(codeFileReference));

            markupTemplate = ReplaceString(markupTemplate, 
                                           codeFileReference, 
                                           quote + Marker_CodeFile + quote, 
                                           StringComparison.OrdinalIgnoreCase);
        }

        static string ReplaceString(string str, string oldValue, string newValue, StringComparison comparison)
        {
            var sb = new StringBuilder();

            int previousIndex = 0;
            int index = str.IndexOf(oldValue, comparison);
            while (index != -1)
            {
                sb.Append(str.Substring(previousIndex, index - previousIndex));
                sb.Append(newValue);
                index += oldValue.Length;

                previousIndex = index;
                index = str.IndexOf(oldValue, index, comparison);
            }
            sb.Append(str.Substring(previousIndex));

            return sb.ToString();
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", key);
        }
    }
}
