using System;
using Composite.AspNet.Security;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider;


namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider
{
    [EntityTokenLock]
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

            FileBasedFunctionProvider<RazorBasedFunction> provider;
            FileBasedFunction<RazorBasedFunction> function;

            GetProviderAndFunction(functionEntityToken, out provider, out function);

            string markupFilePath = PathUtil.Resolve(function.VirtualPath);
            string codeFilePath = markupFilePath + ".cs";

            C1File.Delete(markupFilePath);
            C1File.Delete(codeFilePath);

            provider.ReloadFunctions();

            RefreshFunctionTree();
        }
    }
}
