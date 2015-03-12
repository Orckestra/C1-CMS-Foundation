using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.PackageSystem.WebServiceClient;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>
    /// Used for commercial packages distributed by Composite. 
    /// Checks if a valid license file is present, if not, requests a trial license from Composite server.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PackageLicenseFragmentInstaller : BasePackageFragmentInstaller
    {
        private string _publicKeyXml;
        private bool _licenseFileExists;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            Guid packageId = this.InstallerContext.PackageInformation.Id;
            if(LicenseDefinitionManager.GetLicenseDefinition(packageId) != null)
            {
                _licenseFileExists = true;
                return validationResult;
            }

            XElement publicKeyElement = this.Configuration.SingleOrDefault(f => f.Name == "RSAKeyValue");
            if (publicKeyElement == null)
            {
                validationResult.AddFatal(GetResourceString("PackageLicenseFragmentInstaller.MissingPublicKeyElement"));
                return validationResult;
            }

            _publicKeyXml = publicKeyElement.ToString();

            string validated = LicenseServerFacade.ValidateTrialLicenseDefinitionRequest(InstallationInformationFacade.InstallationId, packageId, _publicKeyXml);

            if (validated != "OK")
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, validated));
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            if(_licenseFileExists)
            {
                return new XElement[0];
            }

            LicenseDefinitionDescriptor descriptor = LicenseServerFacade.GetTrialLicenseDefinition(InstallationInformationFacade.InstallationId, this.InstallerContext.PackageInformation.Id, _publicKeyXml);

            var definition = new PackageLicenseDefinition
            {
                ProductName = this.InstallerContext.PackageInformation.Name,
                InstallationId = descriptor.InstallationId,
                ProductId = descriptor.ProductId,                
                LicenseFileName = "",
                Permanent = descriptor.Permanent,                                
                Expires = descriptor.Expires,
                LicenseKey = descriptor.LicenseKey,
                PurchaseUrl = descriptor.PurchaseUrl
            };

            LicenseDefinitionManager.StoreLicenseDefinition(definition);

            return new XElement[] { };
        }
    }
}
