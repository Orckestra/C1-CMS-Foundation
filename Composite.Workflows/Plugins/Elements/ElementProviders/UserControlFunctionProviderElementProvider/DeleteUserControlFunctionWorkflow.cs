using System;
using System.Linq;
using Composite.AspNet.Security;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Functions;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider;


namespace Composite.Plugins.Elements.ElementProviders.UserControlFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteUserControlFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteUserControlFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            var functionEntityToken = (FileBasedFunctionEntityToken)EntityToken;

            var provider = (UserControlFunctionProvider)FunctionProviderPluginFacade.GetFunctionProvider(functionEntityToken.FunctionProviderName);
            var function = FunctionFacade.GetFunction(functionEntityToken.FunctionName);
            Verify.IsNotNull(function, "Failed to get function '{0}'", functionEntityToken.FunctionName);

            if(function is FunctionWrapper)
            {
                function = (function as FunctionWrapper).InnerFunction;
            }

            string markupFilePath = PathUtil.Resolve((function as FileBasedFunction<UserControlBasedFunction>).VirtualPath);
            string codeFilePath = markupFilePath + ".cs";

            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            C1File.Delete(markupFilePath);
            C1File.Delete(codeFilePath);

            provider.ReloadFunctions();

            string namespacePrefix = GetFunctionNamespace(functionEntityToken.FunctionName) + ".";
            int functionsLeftInNamespace = FunctionFacade.GetFunctionNamesByProvider(provider.Name)
                                           .Count(name => name.StartsWith(namespacePrefix, StringComparison.Ordinal));
            if (functionsLeftInNamespace == 0)
            {
                WorkflowActionToken actionToken = (WorkflowActionToken)this.ActionToken;

                string id = BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider.CreateId("", actionToken.Payload);

                var folderEntityToken = new BaseFunctionFolderElementEntityToken(id);

                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(folderEntityToken);
            }
            else
            {
                deleteTreeRefresher.PostRefreshMesseges();
            }
        }

        private string GetFunctionNamespace(string functionName)
        {
            return functionName.Substring(0, functionName.LastIndexOf('.'));
        }
    }
}
