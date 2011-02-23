using System;
using System.Security.Cryptography;
using Composite.Core.Implementation;


namespace Composite.Core.PackageSystem
{
    /// <summary>
    /// This class contains methods for handling package licenses
    /// <example>
    /// Here is an example of how a pacakge could validat if there is a valid license installed for the pacakge.
    /// This code should be compiled into the pacakge itself to prevent spoofing.
    /// <code>                
    /// Guid productId = ...; // A package should have this compiled into its assembly.
    /// string publicKeyXml = ...; // A package should have this compiled into its assembly.
    /// 
    /// PackageLicenseDefinition licenseDefinition = PackageLicenseHelper.GetLicenseDefinition(productId);
    /// Guid installationId = licenseDefinition.InstallationId; 
    /// bool isPermanent = licenseDefinition.Permanent;
    /// DateTime expiresTime = licenseDefinition.Expires;
    /// 
    /// byte[] signedSignature = licenseDefinition.LicenseKeyBytes;
    /// 
    /// // Create the signature string
    /// string signatureString;
    /// if (isPermanent)
    /// {
    ///     signatureString = string.Format("{0}#{1}#{2}", installationId, productId, isPermanent);
    /// }
    /// else
    /// {
    ///     signatureString = string.Format("{0}#{1}#{2}#{3}", installationId, productId, isPermanent, new XAttribute("date", expiresTime).Value);
    /// }
    /// byte[] signature = PackageLicenseHelper.CreateSignatureBytes(signatureString);
    /// 
    /// // Create the provider to verify the signature string
    /// RSACryptoServiceProvider provider = new RSACryptoServiceProvider();
    /// provider.FromXmlString(publicKeyXml);
    /// 
    /// object hashAlgorithm = PackageLicenseHelper.CreateSignatureHashAlgorithm(publicKeyXml);
    /// 
    /// // isValidKey tells if the package license xml file has been tampered with
    /// bool isValidKey = provider.VerifyData(signature, hashAlgorithm, signedSignature);
    /// 
    /// // isExpried tells if a trail license is expired, false if its a permanent license
    /// bool isExpired = !isPermanent &lt; expiresTime &lt; DateTime.Now;
    /// 
    /// // isLicenseValid is a combination of isValidKey and isExpired and is only true if the package license xml file has not been tampered with and the license is not expired
    /// bool isLicenseValid = isValidKey &amp; !isExpired;
    /// </code>
    /// </example>
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
            ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.RemoveLicenseDefinition(productId);
        }



        /// <summary>
        /// This method returns a hash algorithm that can be used when validateting a package license definition. 
        /// </summary>
        /// <param name="publicKeyXml">This is the public key to the private key used by the pacakge server to generate the license key</param>
        /// <returns>A hash algorithm object</returns>
        public static object CreateSignatureHashAlgorithm(string publicKeyXml)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignatureHashAlgorithm(publicKeyXml);
        }



        /// <summary>
        /// This method returns a byte representation of the <paramref name="signatureString"/>.
        /// Here is an example of how to create an signature string:
        /// <example>
        /// <code>
        /// string signatureString;
        /// if (isPermanent)
        /// {
        ///     signatureString = string.Format("{0}#{1}#{2}", installationId, productId, isPermanent);
        /// }
        /// else
        /// {
        ///     signatureString = string.Format("{0}#{1}#{2}#{3}", installationId, productId, isPermanent, new XAttribute("date", expiresTime).Value);
        /// }
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="signatureString">A signature string</param>
        /// <returns></returns>
        public static byte[] CreateSignatureBytes(string signatureString)
        {
            return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.CreateSignatureBytes(signatureString);
        }
    }
}
