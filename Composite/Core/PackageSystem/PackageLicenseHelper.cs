using System;
using System.Security.Cryptography;
using Composite.Core.Implementation;


namespace Composite.Core.PackageSystem
{
    /// <summary>
    /// This class contains methods for handling package licenses
    /// </summary>
    public static class PackageLicenseHelper
    {
        /// <summary>
        /// This method returns a license defintion for the given pacakge id
        /// </summary>        
        /// <param name="productId">The package id to locate licende definition for.</param>
        /// <returns>The data for the license definition found. Null if no license is found.</returns>
        public static PackageLicenseDefinition GetLicenseDefinition(Guid productId)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.GetLicenseDefinition(productId);
        }



        /// <summary>
        /// Stores the given license defintion.
        /// </summary>
        /// <param name="licenseDefinition">The license definition to store</param>
        public static void StoreLicenseDefinition(PackageLicenseDefinition licenseDefinition)
        {
            ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.StoreLicenseDefinition(licenseDefinition);
        }



        /// <summary>
        /// Removes a license definition given the pacakge id
        /// </summary>
        /// <param name="productId">Package id to which the license definition is to be removed</param>
        public static void RemoveLicenseDefintion(Guid productId)
        {
            ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.RemoveLicenseDefintion(productId);
        }



        /// <summary>
        /// This method returns a RSACryptoServiceProvider that can be used to verify a license for a pacakge.
        /// <example>
        /// Here is an example of how a pacakge could validat if there is a valid license installed for the pacakge.
        /// This code should be compiled into the pacakge itself to prevent spoofing.
        /// <code>                
        /// Guid productId = ...; // A package should have this compiled into its assembly.
        /// string publicKeyXml = ...; // A package should have this compiled into its assembly.
        /// 
        /// LicenseDefinition licenseDefinition = PackageLicenseHelper.GetLicenseDefinition(productId);
        /// Guid installationId = licenseDefinition.InstallationId; 
        /// bool isPermanent = licenseDefinition.Permanent;
        /// DateTime expiresTime = licenseDefinition.Expires;
        /// 
        /// byte[] signedSignature = licenseDefinition.LicenseKeyBytes;
        /// byte[] signature = PackageLicenseHelper.CreateSignature(installationId, productId, isPermanent, expiresTime);        
        /// 
        /// // Its important NOT to use var here! This should be 'strong' typed so no spoofing is possible.
        /// System.Security.Cryptography.RSACryptoServiceProvider provider = PackageLicenseHelper.CreateSignatureVerifier(publicKeyXml, installationId, productId, isPermanent, expiresTime);
        /// 
        /// object hashAlgorithm = PackageLicenseHelper.CreateSignatureHashAlgorithm(publicKeyXml);
        /// 
        /// // isValidKey tells if the package license xml file has been tampered with
        /// bool isValidKey = provider.VerifyData(signature, hashAlgorithm, signedSignature);
        /// 
        /// // isExpried tells if a trail license is expired, true if its a permanent license
        /// bool isExpired = isPermanent || expiresTime &lt; DateTime.Now;
        /// 
        /// // isLicenseValid is a combination of isValidKey and isExpired and is only true if the package license xml file has not been tampered with and the license is not expired
        /// bool isLicenseValid = isValidKey &amp; !isExpired;
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="publicKeyXml">This is the public key to the private key used by the pacakge server to generate the license key</param>
        /// <param name="installationId">The current C1 installation id</param>
        /// <param name="productId">The id of the package</param>
        /// <param name="isPermanent">True if the license is permanent, e.i not trail</param>
        /// <param name="expiresTime">This is the time when the license expires</param>
        /// <returns>Returns a RSACryptoServiceProvider object that can be used to verify the package license file</returns>
        public static RSACryptoServiceProvider CreateSignatureVerifier(string publicKeyXml, Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignatureVerifier(publicKeyXml, installationId, productId, isPermanent, expiresTime);
        }



        /// <summary>
        /// This method returns a hash algorithm that can be used when validateting a package license definition. See <see cref="CreateSignatureVerifier"/>.
        /// </summary>
        /// <param name="publicKeyXml">This is the public key to the private key used by the pacakge server to generate the license key</param>
        /// <returns>A hash algorithm object</returns>
        public static object CreateSignatureHashAlgorithm(string publicKeyXml)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignatureHashAlgorithm(publicKeyXml);
        }



        /// <summary>
        /// This method returns a byte array version of a non signed license key string
        /// </summary>
        /// <param name="installationId">The current C1 installation id</param>
        /// <param name="productId">The id of the package</param>
        /// <param name="isPermanent">True if the license is permanent, e.i not trail</param>
        /// <param name="expiresTime">This is the time when the license expires</param>
        /// <returns>Returns a byte array version of a non signed license key</returns>
        public static byte[] CreateSignature(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignature(installationId, productId, isPermanent, expiresTime);
        }



        /// <summary>
        /// This method returns a non signed license key string
        /// </summary>
        /// <param name="installationId">The current C1 installation id</param>
        /// <param name="productId">The id of the package</param>
        /// <param name="isPermanent">True if the license is permanent, e.i not trail</param>
        /// <param name="expiresTime">This is the time when the license expires</param>
        /// <returns>Returns a non signed license key string</returns>
        public static string CreateSignatureString(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignatureString(installationId, productId, isPermanent, expiresTime);
        }
    }
}
