using System;
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
            string functionFullName = functionNamespace + "." + functionName;

            var provider = GetFunctionProvider<UserControlFunctionProvider>();

            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            string fileName = functionName + ".ascx";
            string folder = Path.Combine(provider.PhysicalPath, functionNamespace.Replace('.', '\\'));
            string markupFilePath = Path.Combine(folder, fileName);
            string codeFilePath = markupFilePath + ".cs";


            C1Directory.CreateDirectory(folder);
            C1File.WriteAllText(codeFilePath, NewUserControl_CodeFile);
            C1File.WriteAllText(markupFilePath, NewUserControl_Markup.Replace(Marker_CodeFile, functionName + ".ascx.cs"));


            UserSettings.LastSpecifiedNamespace = functionNamespace;

            provider.ReloadFunctions();

            var newFunctionEntityToken = new FileBasedFunctionEntityToken(provider.Name, functionFullName);

            addNewTreeRefresher.PostRefreshMesseges(newFunctionEntityToken);

            var container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var executionService = container.GetService<IActionExecutionService>();
            executionService.Execute(newFunctionEntityToken, new WorkflowActionToken(typeof(EditUserControlFunctionWorkflow)), null);
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", key);
        }
    }
}
