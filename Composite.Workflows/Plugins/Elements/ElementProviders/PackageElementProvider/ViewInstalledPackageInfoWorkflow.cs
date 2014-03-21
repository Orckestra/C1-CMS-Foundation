using System;
using System.Linq;
using Composite.C1Console.Users;
using Composite.Core.Configuration;
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
            var castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;

            if (!this.BindingExist("InstalledPackageInformation"))
            {                
                InstalledPackageInformation installedAddOnInformation =
                    (from info in PackageManager.GetInstalledPackages()
                     where info.Id == castedToken.PackageId
                     select info).Single();

                string name = installedAddOnInformation.Name;
                string documentTitle = (name.Contains('.') && !name.EndsWith(".") ?
                    string.Format("{0} ({1})", name.Substring(name.LastIndexOf('.') + 1), name.Substring(0,name.LastIndexOf('.'))) : 
                    name);

                this.Bindings.Add("DocumentTitle", documentTitle);
                this.Bindings.Add("InstalledPackageInformation", installedAddOnInformation);
                this.Bindings.Add("InstallDate", installedAddOnInformation.InstallDate.ToLocalTime().ToString());

                PackageLicenseDefinition licenseInfo = PackageLicenseHelper.GetLicenseDefinition(installedAddOnInformation.Id);
                bool isTrial = (licenseInfo != null && !licenseInfo.Permanent);
                this.Bindings.Add("IsTrial", isTrial);

                this.Bindings.Add("ShowPurchaseThisButton", isTrial && !string.IsNullOrWhiteSpace(licenseInfo.PurchaseUrl));

                PackageDescription packageDescription = null;
                try
                {
                    Guid packageId = new Guid(castedToken.Id);

                    var allPackages = PackageServerFacade.GetAllPackageDescriptions(InstallationInformationFacade.InstallationId,
                            UserSettings.CultureInfo);

                    packageDescription = allPackages.FirstOrDefault(p => p.Id == packageId);
                }
                catch
                {
                }

                if (packageDescription != null && !string.IsNullOrEmpty(packageDescription.ReadMoreUrl))
                {
                    this.Bindings.Add("ReadMoreUrl", packageDescription.ReadMoreUrl);
                }

                if (isTrial)
                {
                    this.Bindings.Add("TrialExpire", licenseInfo.Expires.ToLocalTime().ToString());
                    if (!string.IsNullOrWhiteSpace(licenseInfo.PurchaseUrl))
                    {
                        //string url = string.Format("{0}{1}installationId={2}", licenseInfo.PurchaseUrl, (licenseInfo.PurchaseUrl.Contains('?') ? "&" : "?"), Composite.Core.Configuration.InstallationInformationFacade.InstallationId);
                        string url = licenseInfo.PurchaseUrl;
                        this.Bindings.Add("TrialPurchaseUrl", url);
                    }

                }
            }

            if (castedToken.CanBeUninstalled)
            {
                this.SetCustomToolbarDefinition(new FormDefinitionFileMarkupProvider(@"\Administrative\PackageElementProviderViewInstalledPackageInformationToolbar.xml"));
            }
        }



        private void uninstallCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;

            InstalledPackageInformation installedAddOnInformation =
                (from info in PackageManager.GetInstalledPackages()
                 where info.Id == castedToken.PackageId
                 select info).FirstOrDefault();

            if (installedAddOnInformation != null)
            {
                if (installedAddOnInformation.IsLocalInstalled)
                {
                    this.ExecuteWorklow(this.EntityToken, typeof(UninstallLocalPackageWorkflow));
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
