using System;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Xml;


namespace Composite.Core.PackageSystem
{

    internal static class LicenseDefinitionManager
    {
        static LicenseDefinitionManager()
        {
            string path = PathUtil.Resolve(GlobalSettingsFacade.PackageLicenseDirectory);

            if (C1Directory.Exists(path) == false)
            {
                C1Directory.CreateDirectory(path);
            }
        }


        
        public static PackageLicenseDefinition GetLicenseDefinition(Guid productId)
        {
            string filename = GetLicenseFilename(productId);

            if (C1File.Exists(filename) == false) return null;

            XDocument doc = XDocumentUtils.Load(filename);

            PackageLicenseDefinition licenseDefinition = new PackageLicenseDefinition
            {
                ProductName = doc.Descendants("Name").Single().Value,
                InstallationId = (Guid)doc.Descendants("InstallationId").Single(),
                ProductId = (Guid)doc.Descendants("ProductId").Single(),
                Permanent = (bool)doc.Descendants("Permanent").Single(),
                Expires = (DateTime)doc.Descendants("Expires").Single(),
                LicenseKey = doc.Descendants("LicenseKey").Single().Value,
            };

            if (licenseDefinition.InstallationId != InstallationInformationFacade.InstallationId)
            {
                Log.LogError("LicenseDefinitionManager", string.Format("The license for the product '{0}' ({1}) does not match the current installation", licenseDefinition.ProductId, licenseDefinition.ProductName));
                return null;
            }

            if (licenseDefinition.ProductId != productId)
            {
                Log.LogError("LicenseDefinitionManager", string.Format("The license for the product '{0}' does not match the product in the license file '{1}'", productId, licenseDefinition.ProductId));
                return null;
            }

            return licenseDefinition;
        }


        
        public static void StoreLicenseDefinition(PackageLicenseDefinition licenseDefinition)
        {
            XDocument doc = new XDocument(
                new XElement("License",
                    new XElement("Name", licenseDefinition.ProductName),
                    new XElement("InstallationId", licenseDefinition.InstallationId),
                    new XElement("ProductId", licenseDefinition.ProductId),
                    new XElement("Permanent", licenseDefinition.Permanent),                                        
                    new XElement("Expires", licenseDefinition.Expires),
                    new XElement("LicenseKey", licenseDefinition.LicenseKey)
                )
            );

            string filename = GetLicenseFilename(licenseDefinition.ProductId);

            licenseDefinition.LicenseFileName = filename;

            doc.SaveToFile(filename);
        }



        public static void RemoveLicenseDefintion(Guid productId)
        {
            string filename = GetLicenseFilename(productId);

            FileUtils.Delete(filename);
        }



        private static string GetLicenseFilename(Guid productId)
        {
            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.PackageLicenseDirectory), string.Format("{0}.xml", productId));
        }
    }
}
