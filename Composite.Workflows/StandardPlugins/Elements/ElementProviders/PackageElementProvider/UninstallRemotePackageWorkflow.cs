using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.EventSystem;
using Composite.GlobalSettings;
using Composite.Logging;
using Composite.PackageSystem;
using Composite.ResourceSystem;
using Composite.Users;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class UninstallRemotePackageWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public UninstallRemotePackageWorkflow()
        {
            InitializeComponent();
        }



        private void DidValidate(object sender, ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("Errors") == false;
        }


        private void DidUnregistre(object sender, ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("UnregisterError") == false;
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
            PackageElementProviderInstalledPackageItemEntityToken castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;
            PackageManagerUninstallProcess packageManagerUninstallProcess = this.GetBinding<PackageManagerUninstallProcess>("AddOnManagerUninstallProcess");

            Exception exception = null;
            try
            {
                string packageServerAddress =
                    (from a in PackageManager.GetInstalledPackages()
                     where a.Id == castedToken.AddOnId
                     select a.PackageServerAddress).Single();

                List<PackageFragmentValidationResult> uninstallResult = packageManagerUninstallProcess.Uninstall();

                try
                {
                    PackageServerFacade.RegisterAddOnUninstall(packageServerAddress, InstallationInformationFacade.InstallationId, castedToken.AddOnId, UserSettings.Username, UserSettings.UserIPAddress.ToString());
                }
                catch (Exception ex)
                {
                    LoggingService.LogWarning("UninstallRemoveAddOnWorkflow", ex);
                    this.UpdateBinding("UnregisterError", true);
                }

                if (uninstallResult.Count > 0)
                {
                    this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(uninstallResult));
                }
            }
            catch (Exception ex)
            {
                exception = ex;

                this.UpdateBinding("Errors", new List<List<string>> { new List<string> { ex.Message, "" } });
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
            rowHeader.Add(StringResourceSystemFacade.ParseString("${Composite.StandardPlugins.PackageElementProvider, UninstallRemoteAddOn.ShowError.MessageTitle}"));

            this.UpdateBinding("ErrorHeader", rowHeader);
        }
    }
}
