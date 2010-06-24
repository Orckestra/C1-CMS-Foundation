using System;
using System.Linq;
using Composite.PackageSystem;
using Composite.PackageSystem.Workflow;
using Composite.Forms.DataServices;
using Composite.Workflow;
using Composite.ConsoleEventSystem;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ViewInstalledPackageInfoWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public ViewInstalledPackageInfoWorkflow()
        {
            InitializeComponent();
        }



        private void viewStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            PackageElementProviderInstalledPackageItemEntityToken castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;

            if (this.BindingExist("InstalledPackageInformation") == false)
            {                
                InstalledPackageInformation installedAddOnInformation =
                    (from info in PackageManager.GetInstalledPackages()
                     where info.Id == castedToken.AddOnId
                     select info).Single();

                this.Bindings.Add("InstalledPackageInformation", installedAddOnInformation);
                this.Bindings.Add("InstallDate", installedAddOnInformation.InstallDate.ToLocalTime().ToString());
            }

            if (castedToken.CanBeUninstalled == true)
            {
                this.SetCustomToolbarDefinition(new FormDefinitionFileMarkupProvider(@"\Administrative\PackageElementProviderViewInstalledPackageInformationToolbar.xml"));
            }
        }



        private void uninstallCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            PackageElementProviderInstalledPackageItemEntityToken castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;

            InstalledPackageInformation installedAddOnInformation =
                (from info in PackageManager.GetInstalledPackages()
                 where info.Id == castedToken.AddOnId
                 select info).FirstOrDefault();

            if (installedAddOnInformation != null)
            {
                if (installedAddOnInformation.IsLocalInstalled == true)
                {
                    this.ExecuteWorklow(this.EntityToken, typeof(UninstallLocalAddOnWorkflow));
                }
                else
                {
                    this.ExecuteWorklow(this.EntityToken, typeof(UninstallRemotePackageWorkflow));
                }
            }
            else
            {
                this.ShowMessage(
                    DialogType.Message,
                    "${Composite.StandardPlugins.PackageElementProvider, ViewInstalledInformation.ShowError.MessageTitle}",
                    "${Composite.StandardPlugins.PackageElementProvider, ViewInstalledInformation.ShowError.MessageMessage}");
            }   
        }
    }
}
