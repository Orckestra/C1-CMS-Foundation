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

            C1File.Delete(markupFilePath);
            C1File.Delete(codeFilePath);

            provider.ReloadFunctions();

            RefreshFunctionsTree(functionEntityToken.FunctionProviderName);
        }

        private void RefreshFunctionsTree(string providerName)
        {
            string id = BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider.CreateId("", providerName);

            var folderEntityToken = new BaseFunctionFolderElementEntityToken(id);

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(folderEntityToken);
        }
    }
}
