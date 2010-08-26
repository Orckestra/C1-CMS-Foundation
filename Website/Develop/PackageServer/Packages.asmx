<%@ WebService Language="C#" Class="PackageServerServiceMock.Packages" %>

using System;
using System.IO;
using System.Linq;
using System.Web.Services;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Core.Logging;


namespace PackageServerServiceMock
{
    public class PackageReference
    {  
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
    
    

    public class PackageDescriptor
    {
        public Guid Id { get; set; }
        public string GroupName { get; set; }
        public string Name { get; set; }
        public string PackageVersion { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string TechicalDetails { get; set; }
        public string ReadMoreUrl { get; set; }
        public bool IsTrial { get; set; }
        public int TrialPeriodDays { get; set; }
        public bool IsFree { get; set; }
        public bool InstallationRequireLicenseFileUpdate { get; set; }
        public decimal PriceAmmount { get; set; }
        public string PriceCurrency { get; set; }
        public bool UpgradeAgreementMandatory { get; set; }
        public string MinCompositeVersionSupported { get; set; }
        public string MaxCompositeVersionSupported { get; set; }        
        public List<PackageReference> RequiredPackages { get; set; }
        public Guid EulaId { get; set; }
        public string PackageFileDownloadUrl { get; set; }
        public Guid LicenseId { get; set; }
        public string Culture { get; set; }
    }




    [WebService(Namespace = "http://package.composite.net/package.asmx")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class Packages : System.Web.Services.WebService
    {
        [WebMethod]
        public bool IsOperational()
        {
            return true;
        }



        [WebMethod]
        public List<PackageDescriptor> GetPackageList(Guid installationId, string userCulture)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("GetPackageList: installationId = {0}, userCulture = {1}", installationId, userCulture));

            return GetDescriptors().ToList();
        }



        [WebMethod]
        public string GetEulaText(Guid eulaId, string userCulture)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("GetEulaText: eulaId = {0}, userCulture", eulaId, userCulture));

            string text =
                (from e in GetEulaTexts()
                 where e.Id == eulaId &&
                       e.Culture == userCulture
                 select e.Text).SingleOrDefault();

            if (text == null)
            {
                LoggingService.LogWarning("PackageTestWebService", string.Format("No eula text found for id = {0}, userCulture = {1}", eulaId, userCulture));

                text =
                    (from e in GetEulaTexts()
                     where e.Id == eulaId
                     select e.Text).SingleOrDefault();
            }

            return text ?? "NO EULA FOUND!";
        }



        [WebMethod]
        public bool RequestLicenseUpdate(Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("RequestLicenseUpdate: installationId = {0}, addOnId = {1}, localUserName = {2}, localUserIp = {3}", installationId, packageId, localUserName, localUserIp));

          /*  bool result =
                (from ad in GetDescriptors()
                 where ad.Id == packageId
                 select ad.InstallationRequireLicenseFileUpdate).Single();*/

            return false;
        }



        [WebMethod]
        public void RegisterPackageInstallationCompletion(Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("RegisterAddonInstallationCompletion: installationId = {0}, addOnId = {1}, localUserName = {2}, localUserIp = {3}", installationId, packageId, localUserName, localUserIp));
        }



        [WebMethod]
        public void RegisterPackageInstallationFailure(Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("RegisterAddonInstallationFailure: installationId = {0}, addOnId = {1}, localUserName = {2}, localUserIp = {3}, error = {4}", installationId, packageId, localUserName, localUserIp, exceptionString));
        }



        [WebMethod]
        public void RegisterPackageUninstall(Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            LoggingService.LogVerbose("PackageTestWebService", string.Format("RegisterPackageUninstall: installationId = {0}, addOnId = {1}, localUserName = {2}, localUserIp = {3}", installationId, packageId, localUserName, localUserIp));
        }



        private IEnumerable<PackageDescriptor> GetDescriptors()
        {
            string serviceDirectoryPath = Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), "Develop/PackageServer");
            string configFilePath = Path.Combine(serviceDirectoryPath, "PackageServerConfig.xml");

            XDocument doc = XDocument.Load(configFilePath);

            XElement addOnDescriptionsElement = doc.Root.Elements("ZipfileDescriptions").Single();


            foreach (XElement addOnElement in addOnDescriptionsElement.Elements("ZipfileDescription"))
            {
                string zipFilePath = Path.Combine(serviceDirectoryPath, addOnElement.Attribute("zipFilename").Value);

                PackageDescriptor packageDescriptor = null;
                try
                {
                    PackageInformation addOnInformation = PackageSystemServices.GetPackageInformationFromZipfile(zipFilePath);

                    packageDescriptor = new PackageDescriptor();
                    packageDescriptor.PackageVersion = addOnInformation.Version;
                    packageDescriptor.PackageFileDownloadUrl = zipFilePath;
                    packageDescriptor.Description = addOnInformation.Description;
                    packageDescriptor.GroupName = addOnInformation.GroupName;
                    packageDescriptor.Id = addOnInformation.Id;
                    packageDescriptor.MaxCompositeVersionSupported = addOnInformation.MaxCompositeVersionSupported.ToString();
                    packageDescriptor.MinCompositeVersionSupported = addOnInformation.MinCompositeVersionSupported.ToString();
                    packageDescriptor.Name = addOnInformation.Name;
                    packageDescriptor.Author = addOnInformation.Author;

                    packageDescriptor.EulaId = (Guid)addOnElement.Attribute("eulaId");
                    packageDescriptor.InstallationRequireLicenseFileUpdate = (bool)addOnElement.Attribute("installationRequireLicenseFileUpdate");
                    packageDescriptor.IsFree = (bool)addOnElement.Attribute("isFree");
                    packageDescriptor.IsTrial = (bool)addOnElement.Attribute("isTrial");
                    packageDescriptor.LicenseId = (Guid)addOnElement.Attribute("licenseId");
                    packageDescriptor.PriceAmmount = (decimal)addOnElement.Attribute("priceAmmount");
                    packageDescriptor.PriceCurrency = addOnElement.Attribute("priceCurrency").Value;
                    packageDescriptor.ReadMoreUrl = addOnElement.Attribute("readMoreUrl").Value;
                    packageDescriptor.RequiredPackages = new List<PackageReference>();
                    packageDescriptor.Culture = "da-DK";
                    packageDescriptor.TechicalDetails = addOnElement.Attribute("techicalDetails").Value;
                    packageDescriptor.TrialPeriodDays = (int)addOnElement.Attribute("trialPeriodDays");
                    packageDescriptor.UpgradeAgreementMandatory = (bool)addOnElement.Attribute("upgradeAgreementMandatory");
                }
                catch (Exception ex)
                {
                    LoggingService.LogWarning("PackageTestWebService", ex);
                }

                if (packageDescriptor != null)
                {
                    yield return packageDescriptor;
                }
            }
        }



        private IEnumerable<Eula> GetEulaTexts()
        {
            string filePath = Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), "Develop/PackageServer/PackageServerConfig.xml");
            XDocument doc = XDocument.Load(filePath);

            XElement eulaTextsElement = doc.Root.Elements("EulaTexts").Single();
            foreach (XElement addOnElement in eulaTextsElement.Elements("EulaText"))
            {
                Eula eula = new Eula();
                eula.Id = (Guid)addOnElement.Attribute("id");
                eula.Culture = addOnElement.Attribute("culture").Value;
                eula.Text = addOnElement.Value;

                yield return eula;
            }
        }


        private sealed class Eula
        {
            public Guid Id { get; set; }
            public string Culture { get; set; }
            public string Text { get; set; }
        }
    }
}

