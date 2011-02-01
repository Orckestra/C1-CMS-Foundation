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
        /// <param name="installationId"></param>
        /// <param name="productId"></param>
        /// <param name="isPermanent"></param>
        /// <param name="expiresTime"></param>
        /// <returns></returns>
        public virtual RSACryptoServiceProvider CreateSignatureVerifier(string publicKeyXml, Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return LicenseDefinitionUtils.CreateSignatureVerifier(publicKeyXml, installationId, productId, isPermanent, expiresTime);
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
        /// <param name="installationId"></param>
        /// <param name="productId"></param>
        /// <param name="isPermanent"></param>
        /// <param name="expiresTime"></param>
        /// <returns></returns>
        public virtual byte[] CreateSignature(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return LicenseDefinitionUtils.CreateSignature(installationId, productId, isPermanent, expiresTime);
        }



        /// <summary>
        /// <see cref="Composite.Core.PackageSystem.PackageLicenseHelper"/>
        /// </summary>
        /// <param name="installationId"></param>
        /// <param name="productId"></param>
        /// <param name="isPermanent"></param>
        /// <param name="expiresTime"></param>
        /// <returns></returns>
        public virtual string CreateSignatureString(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return LicenseDefinitionUtils.CreateSignatureString(installationId, productId, isPermanent, expiresTime);
        }
    }
}
