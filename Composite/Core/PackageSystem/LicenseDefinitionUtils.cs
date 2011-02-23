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
        /// </summary>
        /// <param name="publicKeyXml"></param>
        /// <returns></returns>
        public static object CreateSignatureHashAlgorithm(string publicKeyXml)
        {
            return SHA256.Create();
        }



        /// <summary>
        /// </summary>
        /// <param name="licenseKey"></param>
        /// <returns></returns>
        public static byte[] GetLicenseKeyBytes(string licenseKey)
        {
            return Convert.FromBase64String(licenseKey);
        }



        /// <summary>
        /// </summary>
        /// <param name="signatureString"></param>
        /// <returns></returns>
        public static byte[] CreateSignatureBytes(string signatureString)
        {
            UTF8Encoding encoding = new UTF8Encoding();
            byte[] signature = encoding.GetBytes(signatureString);

            return signature;
        }
    }
}
