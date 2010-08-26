using System;
using System.Linq;
using Composite.Core.PackageSystem;
using Composite.Core.PackageSystem.Workflow;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Workflow;
using Composite.C1Console.Events;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ViewInstalledPackageInfoWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                    "${Composite.Plugins.PackageElementProvider, ViewInstalledInformation.ShowError.MessageTitle}",
                    "${Composite.Plugins.PackageElementProvider, ViewInstalledInformation.ShowError.MessageMessage}");
            }   
        }
    }
}
