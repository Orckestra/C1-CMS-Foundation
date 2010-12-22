using System;
using Composite.Core.Implementation;


namespace Composite.Core.PackageSystem
{
    /// <summary>
    /// A package license key definition
    /// </summary>
    public class PackageLicenseDefinition
    {
        /// <summary>
        /// The name of the package.
        /// </summary>
        public string ProductName { get; set; }


        /// <summary>
        /// The local path of the license file. A serialized version of this class.
        /// </summary>
        public string LicenseFileName { get; set; }


        /// <summary>
        /// False if the license is a trail license. True if its a permanent license.
        /// </summary>
        public bool Permanent { get; set; }


        /// <summary>
        /// The id of the C1 installation where the package was installed.
        /// </summary>
        public Guid InstallationId { get; set; }


        /// <summary>
        /// The id of the pacakge.
        /// </summary>
        public Guid ProductId { get; set; }


        /// <summary>
        /// A RSA signed license key. This is used to verify that the license file has not been tampered with.
        /// </summary>
        public string LicenseKey { get; set; }


        /// <summary>
        /// Url to where to buy a license for the pacakge.
        /// </summary>
        public string PurchaseUrl { get; set; }


        /// <summary>
        /// If its a trail license this property contains the date when the pacakge experies in UTC.
        /// </summary>
        public DateTime Expires { get; set; }


        /// <summary>
        /// The <see cref="LicenseKey"/> serizlied to byte array.
        /// </summary>
        public byte[] LicenseKeyBytes
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessPackageLicenseHelper.GetLicenseKeyBytes(this.LicenseKey);
            }
        }
    }
}
