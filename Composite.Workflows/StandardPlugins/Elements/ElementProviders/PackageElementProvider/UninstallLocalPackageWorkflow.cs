using System;
using System.Linq;
using Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider;
using System.Collections.Generic;
using Composite.Workflow;
using Composite.Actions;
using Composite.ResourceSystem;
using Composite.ConsoleEventSystem;
using Composite.EventSystem;


namespace Composite.PackageSystem.Workflow
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class UninstallLocalAddOnWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public UninstallLocalAddOnWorkflow()
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

            PackageManagerUninstallProcess packageManagerUninstallProcess = PackageManager.Uninstall(castedEntityToken.AddOnId);
            this.Bindings.Add("AddOnManagerUninstallProcess", packageManagerUninstallProcess);

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
            PackageManagerUninstallProcess packageManagerUninstallProcess = this.GetBinding<PackageManagerUninstallProcess>("AddOnManagerUninstallProcess");

            List<PackageFragmentValidationResult> uninstallResult = packageManagerUninstallProcess.Uninstall();
            if (uninstallResult.Count > 0)
            {
                this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(uninstallResult));
            }
        }



        private void step3CodeActivity_RefreshTree_ExecuteCode(object sender, EventArgs e)
        {
            if (this.GetBinding<bool>("ReloadConsoleOnCompletion") == true)
            {
                ConsoleMessageQueueFacade.Enqueue(new RebootConsoleMessageQueueItem(), null);
            }

            if (this.GetBinding<bool>("FlushOnCompletion") == true)
            {
                GlobalEventSystemFacade.FlushTheSystem();
            }

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(new PackageElementProviderRootEntityToken());
        }



        private void showErrorCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            List<string> rowHeader = new List<string>();
            rowHeader.Add(StringResourceSystemFacade.ParseString("${Composite.StandardPlugins.PackageElementProvider, UninstallLocalAddOn.ShowError.MessageTitle}"));

            this.UpdateBinding("ErrorHeader", rowHeader);
        }
    }
}
