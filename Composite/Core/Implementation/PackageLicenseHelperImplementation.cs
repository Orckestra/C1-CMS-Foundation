using System;
using System.Security.Cryptography;
using Composite.Core.PackageSystem;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// This is the default implementation of PackageLicenseHelper <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
    /// </summary>
    public class PackageLicenseHelperImplementation
    {
        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public virtual PackageLicenseDefinition GetLicenseDefinition(Guid productId)
        {
            return LicenseDefinitionManager.GetLicenseDefinition(productId);
        }



        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="licenseDefinition"></param>
        public virtual void StoreLicenseDefinition(PackageLicenseDefinition licenseDefinition)
        {
            LicenseDefinitionManager.StoreLicenseDefinition(licenseDefinition);
        }



        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="productId"></param>
        public virtual void RemoveLicenseDefinition(Guid productId)
        {
            LicenseDefinitionManager.RemoveLicenseDefintion(productId);
        }




        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="publicKeyXml"></param>
        /// <returns></returns>
        public virtual object CreateSignatureHashAlgorithm(string publicKeyXml)
        {
            return LicenseDefinitionUtils.CreateSignatureHashAlgorithm(publicKeyXml);
        }



        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="licenseKey"></param>
        /// <returns></returns>
        public virtual byte[] GetLicenseKeyBytes(string licenseKey)
        {
            return LicenseDefinitionUtils.GetLicenseKeyBytes(licenseKey);
        }




        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="signatureString"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1720:IdentifiersShouldNotContainTypeNames", MessageId = "string", Justification = "We want to call it signatureString")]
        public virtual byte[] CreateSignatureBytes(string signatureString)
        {
            return LicenseDefinitionUtils.CreateSignatureBytes(signatureString);
        }
    }
}
