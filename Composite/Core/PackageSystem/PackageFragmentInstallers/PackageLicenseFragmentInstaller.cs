using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.PackageSystem.WebServiceClient;
using Composite.Core.ResourceSystem;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PackageLicenseFragmentInstaller : BasePackageFragmentInstaller
    {
        private string publicKey;


        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            XElement publicKeyElement = this.Configuration.Where(f => f.Name == "RSAKeyValue").SingleOrDefault();
            if (publicKeyElement == null)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "PackageLicenseFragmentInstaller.MissingPublicKeyElement")));
                return validationResult;
            }

            publicKey = publicKeyElement.ToString();
            publicKey = "";

            string validated = LicenseServerFacade.ValidateTrialLicenseDefinitionRequest(InstallationInformationFacade.InstallationId, this.InstallerContex.PackageInformation.Id, publicKey);

            if (validated != "OK")
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, validated));
            }

            return validationResult;
        }



        public override IEnumerable<XElement> Install()
        {
            LicenseDefinitionDescriptor descriptor = LicenseServerFacade.GetTrialLicenseDefinition(InstallationInformationFacade.InstallationId, this.InstallerContex.PackageInformation.Id, publicKey);

            PackageLicenseDefinition definition = new PackageLicenseDefinition
            {
                ProductName = this.InstallerContex.PackageInformation.Name,
                InstallationId = descriptor.InstallationId,
                ProductId = descriptor.ProductId,                
                LicenseFileName = "",
                Permanent = descriptor.Permanent,                                
                Expires = descriptor.Expires,
                LicenseKey = descriptor.LicenseKey
            };

            LicenseDefinitionManager.StoreLicenseDefinition(definition);

            return new XElement[] { };
        }
    }
}
