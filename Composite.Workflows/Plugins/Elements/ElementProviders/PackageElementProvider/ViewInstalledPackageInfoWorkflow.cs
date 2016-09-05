using System;
using System.Collections.Generic;
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
        const string CustomToolbarDefinitionPath = @"\Administrative\PackageElementProviderViewInstalledPackageInformationToolbar.xml";

        public ViewInstalledPackageInfoWorkflow()
        {
            InitializeComponent();
        }

        private static class BindingNames
        {
            public const string DocumentTitle = nameof(DocumentTitle);
            public const string InstalledPackageInformation = nameof(InstalledPackageInformation);
            public const string InstallDate = nameof(InstallDate);
            public const string IsTrial = nameof(IsTrial);
            public const string TrialPurchaseUrl = nameof(TrialPurchaseUrl);
            public const string ReadMoreUrl = nameof(ReadMoreUrl);

            public const string IsSubscription = nameof(IsSubscription);
            public const string SubscriptionName = nameof(SubscriptionName);
            public const string LicenseExpirationDate = nameof(LicenseExpirationDate);

            public const string ShowPurchaseThisButton = nameof(ShowPurchaseThisButton);
        }

        private class LicenseInformation
        {
            public bool IsSubscription { get; set; }
            public bool IsTrial { get; set; }
            public bool HasExpired { get; set; }
            public string Name { get; set; }
            public string PurchaseUrl { get; set; }
            public DateTime ExpirationDate { get; set; }
        }

        private void viewStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            var castedToken = (PackageElementProviderInstalledPackageItemEntityToken)this.EntityToken;
            Guid packageId = castedToken.PackageId;

            if (castedToken.CanBeUninstalled)
            {
                this.SetCustomToolbarDefinition(new FormDefinitionFileMarkupProvider(CustomToolbarDefinitionPath));
            }

            if (this.BindingExist(BindingNames.InstalledPackageInformation))
            {
                return;
            }

            InstalledPackageInformation installedAddOnInformation =
                PackageManager.GetInstalledPackages().Single(info => info.Id == packageId);

            string name = installedAddOnInformation.Name;
            string documentTitle = GetDocumentTitle(name);
            DateTime installationDate = installedAddOnInformation.InstallDate.ToLocalTime();

            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.DocumentTitle, documentTitle},
                {BindingNames.InstalledPackageInformation, installedAddOnInformation},
                {BindingNames.InstallDate, installationDate.ToString()}
            };

            PackageDescription packageDescription = null;
            try
            {
                var allPackages = PackageServerFacade.GetAllPackageDescriptions(InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

                packageDescription = allPackages.FirstOrDefault(p => p.Id == packageId);
            }
            catch
            {
            }

            if (!string.IsNullOrEmpty(packageDescription?.ReadMoreUrl))
            {
                this.Bindings[BindingNames.ReadMoreUrl] = packageDescription.ReadMoreUrl;
            }

            var licenses = GetRelatedLicenses(packageId, packageDescription);
            var actualLicense = licenses.OrderBy(l => l.HasExpired).ThenByDescending(l => l.IsSubscription).FirstOrDefault();

            if (actualLicense != null)
            {
                Bindings[BindingNames.LicenseExpirationDate] = actualLicense.ExpirationDate.ToLocalTime().ToString();
            }

            bool isTrial = actualLicense != null && actualLicense.IsTrial;
            this.Bindings[BindingNames.IsTrial] = isTrial;


            bool showPurchaseButton = false;

            if (isTrial && !string.IsNullOrWhiteSpace(actualLicense.PurchaseUrl))
            {
                string url = actualLicense.PurchaseUrl;
                this.Bindings[BindingNames.TrialPurchaseUrl] = url;

                showPurchaseButton = true;
            }
            this.Bindings[BindingNames.ShowPurchaseThisButton] = showPurchaseButton;

            bool isSubscription = actualLicense != null && actualLicense.IsSubscription;
            this.Bindings[BindingNames.IsSubscription] = isSubscription;
            if (isSubscription)
            {
                Bindings[BindingNames.SubscriptionName] = actualLicense.Name;
            }
        }

        private LicenseInformation[] GetRelatedLicenses(Guid packageId, PackageDescription packageDescription)
        {
            var result = new List<LicenseInformation>();

            var licenseInfo = PackageLicenseHelper.GetLicenseDefinition(packageId);
            if (licenseInfo != null)
            {
                result.Add(new LicenseInformation
                {
                    Name = licenseInfo.ProductName,
                    IsSubscription = false,
                    ExpirationDate = licenseInfo.Expires,
                    HasExpired = !licenseInfo.Permanent && licenseInfo.Expires < DateTime.Now,
                    IsTrial = !licenseInfo.Permanent,
                    PurchaseUrl = licenseInfo.PurchaseUrl
                });
            }

            if (packageDescription != null)
            {
                foreach (var subscription in packageDescription.AvailableInSubscriptions)
                {
                    var subscriptionLicense = PackageLicenseHelper.GetLicenseDefinition(subscription.Id);
                    if (subscriptionLicense == null) continue;
                    
                    result.Add(new LicenseInformation
                    {
                        Name = subscription.Name,
                        IsSubscription = true,
                        ExpirationDate = subscriptionLicense.Expires,
                        HasExpired = !subscriptionLicense.Permanent && subscriptionLicense.Expires < DateTime.Now,
                        IsTrial = false,
                        PurchaseUrl = subscription.DetailsUrl,
                    });
                }
            }

            return result.ToArray();
        }

        private string GetDocumentTitle(string name)
        {
            if (!name.Contains('.') || name.EndsWith("."))
            {
                return name;
            }

            int nameOffset = name.LastIndexOf('.');
            return $"{name.Substring(nameOffset + 1)} ({name.Substring(0, nameOffset)})";
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
                this.ExecuteWorklow(this.EntityToken,
                    installedAddOnInformation.IsLocalInstalled
                        ? typeof (UninstallLocalPackageWorkflow)
                        : typeof (UninstallRemotePackageWorkflow));
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
