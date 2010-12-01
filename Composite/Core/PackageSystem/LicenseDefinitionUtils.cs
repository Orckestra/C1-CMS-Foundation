using System;
using System.Xml.Linq;
using System.Text;
using System.Security.Cryptography;



namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class LicenseDefinitionUtils
    {
        /// <summary>
        /// This method returns a RSACryptoServiceProvider that can be used to verify a license for a pacakge.
        /// </summary>
        /// <example>
        /// Here is an example of how a pacakge could validat if there is a valid license installed for the pacakge.
        /// This code should be compiled into the pacakge itself to prevent spoofing.
        /// <code>                
        /// Guid productId = ...; // A package should have this compiled into its assembly.
        /// string publicKeyXml = ...; // A package should have this compiled into its assembly.
        /// 
        /// LicenseDefinition licenseDefinition = LicenseDefinitionManager.GetLicenseDefinition(productId);
        /// Guid installationId = licenseDefinition.InstallationId; 
        /// bool isPermanent = licenseDefinition.Permanent;
        /// DateTime expiresTime = licenseDefinition.Expires;
        /// 
        /// byte[] signedSignature = licenseDefinition.LicenseKeyBytes;
        /// byte[] signature = LicenseDefinitionUtils.CreateSignature(installationId, productId, isPermanent, expiresTime);        
        /// 
        /// // Its important NOT to use var here! This should be 'strong' typed so no spoofing is possible.
        /// System.Security.Cryptography.RSACryptoServiceProvider provider = LicenseDefinitionUtils.CreateSignatureVerifier(publicKeyXml, installationId, productId, isPermanent, expiresTime);
        /// 
        /// bool isValidKey = provider.VerifyData(signature, SHA256.Create(), signedSignature);
        /// 
        /// bool isExpired = expiresTime &lt; DateTime.Now;
        /// 
        /// bool isLicenseValid = isValidKey &amp; !isExpired;
        /// </code>
        /// </example>
        /// <param name="publicKeyXml">This is the public key to the private key used by the pacakge server to generate the license key.</param>
        /// <param name="installationId">The current C1 installation id</param>
        /// <param name="productId">The id of the package</param>
        /// <param name="isPermanent">True if the license is permanent, e.i not trail</param>
        /// <param name="expiresTime">This is the time when the license expires</param>
        /// <returns></returns>
        public static RSACryptoServiceProvider CreateSignatureVerifier(string publicKeyXml, Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            string value = CreateSignatureString(installationId, productId, isPermanent, expiresTime);

            UTF8Encoding encoding = new UTF8Encoding();
            byte[] data = encoding.GetBytes(value);

            RSACryptoServiceProvider provider = new RSACryptoServiceProvider();
            provider.FromXmlString(publicKeyXml);            

            return provider;
        }



        public static object CreateSignatureHashAlgorithm(string publicKeyXml)
        {
            return SHA256.Create();
        }



        public static byte[] GetLicenseKeyBytes(string licenseKey)
        {
            return Convert.FromBase64String(licenseKey);
        }



        public static byte[] CreateSignature(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            string signatureString = CreateSignatureString(installationId, productId, isPermanent, expiresTime);

            UTF8Encoding encoding = new UTF8Encoding();
            byte[] signature = encoding.GetBytes(signatureString);

            return signature;
        }



        public static string CreateSignatureString(Guid installationId, Guid productId, bool isPermanent, DateTime expiresTime)
        {
            if (isPermanent)
            {
                return string.Format("{0}#{1}#{2}", installationId, productId, isPermanent);
            }
            else
            {
                return string.Format("{0}#{1}#{2}#{3}", installationId, productId, isPermanent, new XAttribute("date", expiresTime).Value);
            }
        }
    }
}
