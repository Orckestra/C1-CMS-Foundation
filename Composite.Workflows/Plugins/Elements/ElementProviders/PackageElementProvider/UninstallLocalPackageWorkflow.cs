using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.PackageElementProvider;
using Composite.C1Console.Workflow;


namespace Composite.Core.PackageSystem.Workflow
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class UninstallLocalPackageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public UninstallLocalPackageWorkflow()
        {
            InitializeComponent();
        }



        private void DidValidate(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("Errors") == false;
        }



        private void step2CodeActivity_Validate_ExecuteCode(object sender, EventArgs e)
        {
            PackageElementProviderInstalledPackageItemEntityToken castedEntityToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;

            PackageManagerUninstallProcess packageManagerUninstallProcess = PackageManager.Uninstall(castedEntityToken.PackageId);
            this.Bindings.Add("PackageManagerUninstallProcess", packageManagerUninstallProcess);

            this.Bindings.Add("FlushOnCompletion", packageManagerUninstallProcess.FlushOnCompletion);
            this.Bindings.Add("ReloadConsoleOnCompletion", packageManagerUninstallProcess.ReloadConsoleOnCompletion);

            if (packageManagerUninstallProcess.PreUninstallValidationResult.Count > 0)
            {
                this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(packageManagerUninstallProcess.PreUninstallValidationResult));
            }
            else
            {
                List<PackageFragmentValidationResult> validationResult = packageManagerUninstallProcess.Validate();

                if (validationResult.Count > 0)
                {
                    this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(validationResult));
                }
            }
        }



        private void step2CodeActivity_Uninstall_ExecuteCode(object sender, EventArgs e)
        {
            PackageManagerUninstallProcess packageManagerUninstallProcess = this.GetBinding<PackageManagerUninstallProcess>("PackageManagerUninstallProcess");

            List<PackageFragmentValidationResult> uninstallResult = packageManagerUninstallProcess.Uninstall();
            if (uninstallResult.Count > 0)
            {
                this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(uninstallResult));
            }
        }



        private void step3CodeActivity_RefreshTree_ExecuteCode(object sender, EventArgs e)
        {
            if (this.GetBinding<bool>("ReloadConsoleOnCompletion"))
            {
                ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);
            }

            if (this.GetBinding<bool>("FlushOnCompletion"))
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(new PackageElementProviderRootEntityToken());
        }



        private void showErrorCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            List<string> rowHeader = new List<string>();
            rowHeader.Add(StringResourceSystemFacade.ParseString("${Composite.Plugins.PackageElementProvider, UninstallLocalPackage.ShowError.MessageTitle}"));

            this.UpdateBinding("ErrorHeader", rowHeader);
        }
    }
}
