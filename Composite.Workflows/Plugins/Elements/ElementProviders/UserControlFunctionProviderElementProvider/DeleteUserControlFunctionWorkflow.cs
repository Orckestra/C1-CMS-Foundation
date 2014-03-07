using System;
using Composite.AspNet.Security;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider;
using Composite.Plugins.Elements.ElementProviders.Common;


namespace Composite.Plugins.Elements.ElementProviders.UserControlFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteUserControlFunctionWorkflow : BaseFunctionWorkflow
    {
        public DeleteUserControlFunctionWorkflow()
        {
            InitializeComponent();
        }

        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            var functionEntityToken = (FileBasedFunctionEntityToken)EntityToken;

            FileBasedFunctionProvider<UserControlBasedFunction> provider;
            FileBasedFunction<UserControlBasedFunction> function;

            GetProviderAndFunction(functionEntityToken, out provider, out function);

            string markupFilePath = PathUtil.Resolve(function.VirtualPath);
            string codeFilePath = markupFilePath + ".cs";

            C1File.Delete(markupFilePath);
            C1File.Delete(codeFilePath);

            DeleteEmptyAncestorFolders(markupFilePath);

            provider.ReloadFunctions();

            RefreshFunctionTree();
        }
    }
}
