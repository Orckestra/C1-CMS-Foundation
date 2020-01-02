using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.DataServices;
using Composite.Core.Configuration;
using Composite.Core.PackageSystem;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PackageElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ViewAvailablePackageInfoWorkflowWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        const string CustomToolbarFormPath = @"\Administrative\PackageElementProviderViewAvailablePackageInformationToolbar.xml";

        static class BindingNames
        {
            public const string PackageDescription = nameof(PackageDescription);
            public const string DocumentTitle = nameof(DocumentTitle);
            public const string AddOnServerSource = nameof(AddOnServerSource);
            public const string HasOwnPrice = nameof(HasOwnPrice);
            public const string PriceText = nameof(PriceText);
            public const string IsInPurchasableSubscriptions = nameof(IsInPurchasableSubscriptions);
            public const string PurchasableSubscriptions = nameof(PurchasableSubscriptions);
            public const string ShowTrialInfo = nameof(ShowTrialInfo);
            public const string ShowSubscriptionLicense = nameof(ShowSubscriptionLicense);
            public const string SubscriptionName = nameof(SubscriptionName);
            public const string LicenseExpirationDate = nameof(LicenseExpirationDate);
        }

        class SubscriptionLicense
        {
            public string Name { get; set; }
            public DateTime ExpirationDate { get; set; }
            public bool Expired { get; set; }
        }


        public ViewAvailablePackageInfoWorkflowWorkflow()
        {
            InitializeComponent();
        }



        private void AddOnDescriptionExists(object sender, ConditionalEventArgs e)
        {
            this.TryGetBinding(BindingNames.PackageDescription, out PackageDescription packageDescription);
            e.Result = packageDescription != null;
        }



        private void viewStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.SetCustomToolbarDefinition(new FormDefinitionFileMarkupProvider(CustomToolbarFormPath));


            if (this.BindingExist(BindingNames.PackageDescription))
            {
                return;
            }

            var castedToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

            PackageDescription packageDescription =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                    where description.Id.ToString() == castedToken.Id
                    select description).SingleOrDefault();

            if (packageDescription == null)
            {
                return;
            }

            string packageSourceName = PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id,
                InstallationInformationFacade.InstallationId, UserSettings.CultureInfo);

            var purchasableSubscriptions = packageDescription.AvailableInSubscriptions.Where(f => f.Purchasable).ToList();

            var licenses = GetSubscriptionLicenses(packageDescription.AvailableInSubscriptions);

            var validLicense = licenses.Where(l => !l.Expired)
                                       .OrderByDescending(l => l.ExpirationDate)
                                       .FirstOrDefault();

            this.Bindings = new Dictionary<string, object>
            {
                {BindingNames.PackageDescription, packageDescription},
                {BindingNames.DocumentTitle, GetDocumentTitle(packageDescription)},
                {BindingNames.AddOnServerSource, packageSourceName},
                {BindingNames.HasOwnPrice, packageDescription.PriceAmmount > 0},
                {BindingNames.PriceText, $"{packageDescription.PriceAmmount} {packageDescription.PriceCurrency}"},
                {BindingNames.IsInPurchasableSubscriptions, purchasableSubscriptions.Any()},
                {BindingNames.PurchasableSubscriptions, 
                    string.Join(", \n", purchasableSubscriptions.Select(f => f.Name))},
                {BindingNames.ShowTrialInfo, packageDescription.IsTrial && validLicense == null},
                {BindingNames.ShowSubscriptionLicense, validLicense != null},
                {BindingNames.SubscriptionName, validLicense?.Name},
                {BindingNames.LicenseExpirationDate, validLicense?.ExpirationDate.ToLocalTime().ToString()}
            };
        }

        private SubscriptionLicense[] GetSubscriptionLicenses(IEnumerable<Subscription> availableInSubscriptions)
        {
            return (from subscription in availableInSubscriptions
                let license = PackageLicenseHelper.GetLicenseDefinition(subscription.Id)
                where license != null
                select new SubscriptionLicense
                {
                    Name = subscription.Name,
                    ExpirationDate = license.Expires,
                    Expired = !license.Permanent && license.Expires < DateTime.Now
                }).ToArray();
        }

        private string GetDocumentTitle(PackageDescription packageDescription)
        {
            // Valid package names:
            //  "Composite.Community.Versioning"
            //  "C1 CMS 3.0"
            string name = packageDescription.Name.Trim();

            string documentTitle = name;

            if (name.Contains(".") && !name.EndsWith("."))
            {
                string packageName = name.Substring(name.LastIndexOf('.') + 1);
                string packageNamespace = name.Substring(0, name.LastIndexOf('.'));

                int temp;
                if (!int.TryParse(packageName, out temp))
                {
                    documentTitle = $"{packageName} ({packageNamespace})";
                }
            }

            return documentTitle;
        }


        private void installAddOnCodeActivity_Execute_ExecuteCode(object sender, EventArgs e)
        {
            var castedToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

            PackageDescription packageDescription =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                 where description.Id.ToString() == castedToken.Id
                 select description).FirstOrDefault();

            if (packageDescription != null)
            {
#pragma warning disable 436
                this.ExecuteWorklow(this.EntityToken, typeof(InstallRemotePackageWorkflow));
#pragma warning restore 436
            }
            else
            {
                this.ShowMessage(DialogType.Message,
                    Texts.ViewAvailableInformation_ShowError_MessageTitle,
                    Texts.ViewAvailableInformation_ShowError_MessageMessage);
            }
        }


        private void viewCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(DialogType.Error,
                Texts.ViewAvailableInformation_ShowServerError_MessageTitle,
                Texts.ViewAvailableInformation_ShowServerError_MessageMessage);
        }
    }
}
