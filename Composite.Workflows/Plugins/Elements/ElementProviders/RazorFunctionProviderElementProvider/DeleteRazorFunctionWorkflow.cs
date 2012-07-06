using System;
using Composite.AspNet.Security;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Functions;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider;


namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteRazorFunctionWorkflow : BaseFunctionWorkflow
    {
        public DeleteRazorFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            var functionEntityToken = (FileBasedFunctionEntityToken)EntityToken;

            var provider = (RazorFunctionProvider)FunctionProviderPluginFacade.GetFunctionProvider(functionEntityToken.FunctionProviderName);
            var function = FunctionFacade.GetFunction(functionEntityToken.FunctionName);
            Verify.IsNotNull(function, "Failed to get function '{0}'", functionEntityToken.FunctionName);

            if (function is FunctionWrapper)
            {
                function = (function as FunctionWrapper).InnerFunction;
            }

            string markupFilePath = PathUtil.Resolve((function as FileBasedFunction<RazorBasedFunction>).VirtualPath);
            string codeFilePath = markupFilePath + ".cs";

            C1File.Delete(markupFilePath);
            C1File.Delete(codeFilePath);

            provider.ReloadFunctions();

            RefreshFunctionTree();
        }
    }
}
