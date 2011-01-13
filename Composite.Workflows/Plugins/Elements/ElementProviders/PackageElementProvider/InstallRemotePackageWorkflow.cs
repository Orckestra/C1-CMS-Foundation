using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.Logging;
using Composite.Core.PackageSystem;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class InstallRemotePackageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        bool _packageIsFree = false;


        public InstallRemotePackageWorkflow()
        {
            InitializeComponent();
        }



        private PackageDescription GetAddOnDescription()
        {
            PackageElementProviderAvailablePackagesItemEntityToken castedEntityToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

            PackageDescription packageDescription =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                 where description.Id == castedEntityToken.AddOnId
                 select description).SingleOrDefault();

            if (packageDescription == null)
            {
                this.UpdateBinding("ServerError", true);
            }

            return packageDescription;
        }



        private void IsAddOnFree(object sender, ConditionalEventArgs e)
        {
            e.Result = _packageIsFree;
        }



        private void EulaAccepted(object sender, ConditionalEventArgs e)
        {
            e.Result = this.GetBinding<bool>("EulaAccepted");
        }



        private void DidValidate(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("Errors") == false;
        }



        private void initializeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                _packageIsFree = GetAddOnDescription().IsFree;
            }
            catch (Exception ex)
            {
                LoggingService.LogVerbose("InstallRemoteAddOnWorkflowRGB(100, 100, 255)", ex.Message);
                this.UpdateBinding("Errors", new List<List<string>> { new List<string> { ex.Message, "" } });
            }
        }



        private void step2StateStepcodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                if (this.BindingExist("EulaText") == false)
                {
                    PackageDescription packageDescription = GetAddOnDescription();
                    string eulaText = PackageSystemServices.GetEulaText(packageDescription);
                    this.Bindings.Add("EulaText", eulaText);
                }

                if (this.BindingExist("EulaAccepted") == false)
                {
                    this.Bindings.Add("EulaAccepted", false);
                }

            }
            catch (Exception ex)
            {
                this.UpdateBinding("Errors", new List<List<string>> { new List<string> { ex.Message, "" } });
            }
        }



        private void step3CodeActivity_DownloadAndValidate_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                PackageDescription packageDescription = GetAddOnDescription();

                string packageServerSource = PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id, InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

                System.IO.Stream installFileStream = PackageServerFacade.GetInstallFileStream(packageDescription.PackageFileDownloadUrl);

                PackageManagerInstallProcess packageManagerInstallProcess = PackageManager.Install(installFileStream, false, packageServerSource);
                this.Bindings.Add("AddOnManagerInstallProcess", packageManagerInstallProcess);

                this.Bindings.Add("FlushOnCompletion", packageManagerInstallProcess.FlushOnCompletion);
                this.Bindings.Add("ReloadConsoleOnCompletion", packageManagerInstallProcess.ReloadConsoleOnCompletion);

                if (packageManagerInstallProcess.PreInstallValidationResult.Count > 0)
                {
                    this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(packageManagerInstallProcess.PreInstallValidationResult));
                }
                else
                {
                    List<PackageFragmentValidationResult> validationResult = packageManagerInstallProcess.Validate();

                    if (validationResult.Count > 0)
                    {
                        this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(validationResult));
                    }
                    else
                    {
                        this.UpdateBinding("Uninstallable", packageManagerInstallProcess.CanBeUninstalled == false);
                    }
                }
            }
            catch (Exception ex)
            {
                this.UpdateBinding("Errors", new List<List<string>> { new List<string> { ex.Message, "" } });
            }
        }



        private void showErrorCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            List<string> rowHeader = new List<string>();
            rowHeader.Add(StringResourceSystemFacade.ParseString("${Composite.Plugins.PackageElementProvider, InstallRemoteAddOn.ShowError.MessageTitle}"));

            this.UpdateBinding("ErrorHeader", rowHeader);
        }



        private void step4CodeActivity_Install_ExecuteCode(object sender, EventArgs e)
        {
            PackageDescription packageDescription = GetAddOnDescription();

            PackageManagerInstallProcess packageManagerInstallProcess = this.GetBinding<PackageManagerInstallProcess>("AddOnManagerInstallProcess");

            bool installOk = false;
            string packageServerUrl = null;
            Exception exception = null;
            try
            {
                packageServerUrl = PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id, InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

                List<PackageFragmentValidationResult> installResult = packageManagerInstallProcess.Install();
                if (installResult.Count > 0)
                {
                    this.UpdateBinding("Errors", WorkflowHelper.ValidationResultToBinding(installResult));
                }
                else
                {
                    installOk = true;
                }
            }
            catch (Exception ex)
            {
                exception = ex;

                this.UpdateBinding("Errors", new List<List<string>> { new List<string> { ex.Message, "" } });
            }

            try
            {
                if (installOk == true)
                {
                    PackageServerFacade.RegisterAddonInstallationCompletion(packageServerUrl, InstallationInformationFacade.InstallationId, packageDescription.Id, UserSettings.Username, UserSettings.UserIPAddress.ToString());
                }
                else
                {
                    StringBuilder sb = new StringBuilder();
                    if (exception != null)
                    {
                        sb.Append(exception.ToString());
                    }
                    else
                    {
                        List<List<string>> errors = this.GetBinding<List<List<string>>>("Errors");
                        foreach (List<string> list in errors)
                        {
                            sb.AppendLine(list[0]);
                        }
                    }

                    PackageServerFacade.RegisterAddonInstallationFailure(packageServerUrl, InstallationInformationFacade.InstallationId, packageDescription.Id, UserSettings.Username, UserSettings.UserIPAddress.ToString(), sb.ToString());
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogWarning("InstallRemoteAddOnWorkflow", ex);
            }
        }



        private void cleanupCodeActivity_Cleanup_ExecuteCode(object sender, EventArgs e)
        {
            PackageManagerInstallProcess packageManagerInstallProcess;
            if (this.TryGetBinding<PackageManagerInstallProcess>("AddOnManagerInstallProcess", out packageManagerInstallProcess) == true)
            {
                packageManagerInstallProcess.CancelInstallation();
            }
        }



        private void step5CodeActivity_RefreshTree_ExecuteCode(object sender, EventArgs e)
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

            if (this.GetBinding<bool>("ReloadConsoleOnCompletion") == false)
            {

                PackageElementProviderAvailablePackagesItemEntityToken castedEntityToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

                InstalledPackageInformation installedPackage = PackageManager.GetInstalledPackages().FirstOrDefault(f => f.Id == castedEntityToken.AddOnId);

                var installedPackageEntityToken = new PackageElementProviderInstalledPackageItemEntityToken(
                    installedPackage.Id,
                    installedPackage.GroupName,
                    installedPackage.IsLocalInstalled,
                    installedPackage.CanBeUninstalled);

                ExecuteWorklow(installedPackageEntityToken, WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.ViewInstalledPackageInfoWorkflow"));
            }

        }
    }
}

