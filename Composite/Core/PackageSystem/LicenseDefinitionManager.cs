using System;
using System.Collections.Generic;
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
        private const string LicenseFileExtension = ".license";
        private static readonly string LogTitle = typeof (LicenseDefinitionManager).Name;

        private static readonly string _packageLicenseDirectory;
        private static readonly int _maximumProductNameLength;

        static LicenseDefinitionManager()
        {
            _packageLicenseDirectory = PathUtil.Resolve(GlobalSettingsFacade.PackageLicenseDirectory);

            if (!C1Directory.Exists(_packageLicenseDirectory))
            {
                C1Directory.CreateDirectory(_packageLicenseDirectory);
            }

            _maximumProductNameLength = 255 - (GlobalSettingsFacade.MaximumRootPathLength + (GlobalSettingsFacade.PackageLicenseDirectory.Length - 1) + LicenseFileExtension.Length);
        }


        
        public static PackageLicenseDefinition GetLicenseDefinition(Guid productId)
        {
            return GetLicenseDefinitions(productId).OrderByDescending(l => l.Expires).FirstOrDefault();
        }


        public static PackageLicenseDefinition[] GetLicenseDefinitions(Guid productId)
        {
            var result = new List<PackageLicenseDefinition>();

            foreach (var file in C1Directory.GetFiles(_packageLicenseDirectory, "*" + LicenseFileExtension, SearchOption.TopDirectoryOnly))
            {
                var license = TryLoadLicenseFile(file);

                if (license != null && license.ProductId == productId)
                {
                    result.Add(license);
                }
            }

            string obsoloteFilename = GetObsoleteLicenseFilename(productId);
            if (C1File.Exists(obsoloteFilename))
            {
                var license = TryLoadLicenseFile(obsoloteFilename);

                if (license != null)
                {
                    if (license.ProductId == productId)
                    {
                        result.Add(license);
                    }
                    else
                    {
                        Log.LogError(LogTitle, "The license for the product '{0}' does not match the product in the license file '{1}'", productId, license.ProductId);
                    }
                }
            }

            return result.ToArray();
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
                    new XElement("LicenseKey", licenseDefinition.LicenseKey),
                    new XElement("PurchaseUrl", licenseDefinition.PurchaseUrl)
                )
            );

            string filename = GetLicenseFilename(licenseDefinition);

            licenseDefinition.LicenseFileName = filename;

            doc.SaveToFile(filename);
        }


        private static PackageLicenseDefinition TryLoadLicenseFile(string filePath)
        {
            XDocument doc = XDocumentUtils.Load(filePath);

            var licenseDefinition = new PackageLicenseDefinition
            {
                ProductName = doc.Descendants("Name").Single().Value,
                InstallationId = (Guid)doc.Descendants("InstallationId").Single(),
                ProductId = (Guid)doc.Descendants("ProductId").Single(),
                Permanent = (bool)doc.Descendants("Permanent").Single(),
                Expires = (DateTime?)doc.Descendants("Expires").SingleOrDefault() ?? DateTime.MaxValue,
                LicenseKey = doc.Descendants("LicenseKey").Single().Value,
                PurchaseUrl = doc.Descendants("PurchaseUrl").SingleOrDefault()?.Value ?? "",
                LicenseFileName = filePath
            };

            if (licenseDefinition.InstallationId != InstallationInformationFacade.InstallationId)
            {
                Log.LogError(LogTitle, $"The license for the product '{licenseDefinition.ProductId}' ({licenseDefinition.ProductName}) does not match the current installation");
                return null;
            }

            return licenseDefinition;
        }

        public static void RemoveLicenseDefintion(Guid productId)
        {
            foreach (var license in GetLicenseDefinitions(productId))
            {
                FileUtils.Delete(license.LicenseFileName);
            }
        }


        private static string GetLicenseFilename(PackageLicenseDefinition packageLicenseDefinition)
        {
            string productName = packageLicenseDefinition.ProductName;

            if (productName.Length > _maximumProductNameLength)
            {
                productName = productName.Substring(productName.Length - _maximumProductNameLength);
            }

            return Path.Combine(_packageLicenseDirectory, productName + LicenseFileExtension);
        }


        private static string GetObsoleteLicenseFilename(Guid productId)
        {
            return Path.Combine(_packageLicenseDirectory, $"{productId}.xml");
        }
    }
}
