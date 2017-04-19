using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.Xml;


namespace Composite.Core.PackageSystem
{
    internal sealed class PackageServerFacadeLocalMock : IPackageServerFacade
    {
        private sealed class ExtraInfo
        {
            public bool CanBeUninstalled { get; set; }
            public SystemLockingType SystemLockingType { get; set; }
            public bool FlushOnCompletion { get; set; }
            public bool ReloadConsoleOnCompletion { get; set; }
        }


        private string _configFilePath;
        private Dictionary<string, List<KeyValuePair<PackageDescription, ExtraInfo>>> _packageDescriptions = null;
        private Dictionary<string, Dictionary<Guid, string>> _eulaTexts = null;


        internal PackageServerFacadeLocalMock(string configFilePath)
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
            _configFilePath = configFilePath;
        }



        public ServerUrlValidationResult ValidateServerUrl(string packageServerUrl)
        {
            if (packageServerUrl.ToLowerInvariant().EndsWith("dk")) return ServerUrlValidationResult.Http;
            if (packageServerUrl.ToLowerInvariant().EndsWith("net")) return ServerUrlValidationResult.Https;
            if (packageServerUrl.ToLowerInvariant().EndsWith("xxx")) return ServerUrlValidationResult.Invalid;

            return ServerUrlValidationResult.Http;
        }



        public IEnumerable<PackageDescription> GetPackageDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture)
        {
            Initialize();

            packageServerUrl = packageServerUrl.ToLowerInvariant();

            if (_packageDescriptions.ContainsKey(packageServerUrl))
            {
                return _packageDescriptions[packageServerUrl].Select(f => f.Key);
            }
            else
            {
                return new List<PackageDescription>();
            }
        }



        public string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture)
        {
            Initialize();

            packageServerUrl = packageServerUrl.ToLowerInvariant();

            if ((_eulaTexts.ContainsKey(packageServerUrl)) &&
                (_eulaTexts[packageServerUrl].ContainsKey(eulaId)))
            {
                return _eulaTexts[packageServerUrl][eulaId];
            }
            else
            {
                return "SERVER NOT FOUND";
            }
        }



        public Stream GetInstallFileStream(string packageFileDownloadUrl)
        {
            Initialize();

            PackageDescription packageDescription = null;
            ExtraInfo extraInfo = null;
            foreach (List<KeyValuePair<PackageDescription, ExtraInfo>> packageDescriptions in _packageDescriptions.Values)
            {
                KeyValuePair<PackageDescription, ExtraInfo>? q =
                    (from desc in packageDescriptions
                     where desc.Key.PackageFileDownloadUrl == packageFileDownloadUrl
                     select desc).FirstOrDefault();

                if (q != null)
                {
                    packageDescription = q.Value.Key;
                    extraInfo = q.Value.Value;
                    break;
                }
            }

            XElement rootElement =
                new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageInstallerElementName),
                    new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageRequirementsElementName),
                        new XAttribute(PackageSystemSettings.MinimumCompositeVersionAttributeName, packageDescription.MinCompositeVersionSupported),
                        new XAttribute(PackageSystemSettings.MaximumCompositeVersionAttributeName, packageDescription.MaxCompositeVersionSupported)
                    ),
                    new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageInformationElementName),
                        new XAttribute(PackageSystemSettings.IdAttributeName, packageDescription.Id),
                        new XAttribute(PackageSystemSettings.NameAttributeName, packageDescription.Name),
                        new XAttribute(PackageSystemSettings.GroupNameAttributeName, packageDescription.GroupName),
                        new XAttribute(PackageSystemSettings.AuthorAttributeName, packageDescription.Vendor),
                        new XAttribute(PackageSystemSettings.WebsiteAttributeName, packageDescription.ReadMoreUrl),
                        new XAttribute(PackageSystemSettings.VersionAttributeName, packageDescription.PackageVersion),
                        new XAttribute(PackageSystemSettings.CanBeUninstalledAttributeName, extraInfo.CanBeUninstalled),
                        new XAttribute(PackageSystemSettings.SystemLockingAttributeName, extraInfo.SystemLockingType.Serialize()),
                        new XAttribute(PackageSystemSettings.FlushOnCompletionAttributeName, extraInfo.FlushOnCompletion),
                        new XAttribute(PackageSystemSettings.ReloadConsoleOnCompletionAttributeName, extraInfo.ReloadConsoleOnCompletion),
                        packageDescription.Description
                    ),
                    new XElement(XmlUtils.GetXName(PackageSystemSettings.XmlNamespace, PackageSystemSettings.PackageFragmentInstallersElementName))
                );

            XDocument doc = new XDocument(rootElement);
            string content = doc.GetDocumentAsString();

            UTF8Encoding encoding = new UTF8Encoding();
            byte[] buffer = encoding.GetBytes(content);

            var outputStream = new MemoryStream();

            var zipArchive = new ZipArchive(outputStream);

            var zipEntry = zipArchive.CreateEntry("install.xml");
            using (var stream = zipEntry.Open())
            {
                stream.Write(buffer, 0, buffer.Length);
            }

            zipEntry.LastWriteTime = DateTimeOffset.Now;

            outputStream.Seek(0, SeekOrigin.Begin);

            return outputStream;
        }



        public void RegisterPackageInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            LoggingService.LogVerbose("PackageServerFacadeLocalMock", string.Format("RegisterPackageInstallationCompletion: installationId = {0}, packageId = {1}, localUserName = {2}, localUserIp = {3}", installationId, packageId, localUserName, localUserIp));
        }



        public void RegisterPackageInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString)
        {
            LoggingService.LogVerbose("PackageServerFacadeLocalMock", string.Format("RegisterPackageInstallationFailure: installationId = {0}, packageId = {1}, localUserName = {2}, localUserIp = {3}, error = {4}", installationId, packageId, localUserName, localUserIp, exceptionString));
        }



        public void RegisterPackageUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            LoggingService.LogVerbose("PackageServerFacadeLocalMock", string.Format("RegisterPackageUninstall: installationId = {0}, packageId = {1}, localUserName = {2}, localUserIp = {3}", installationId, packageId, localUserName, localUserIp));
        }



        public void ClearCache()
        {
            throw new NotImplementedException();
        }



        private void Initialize()
        {
            if (_packageDescriptions == null)
            {
                LoadXml();
            }
        }



        private void LoadXml()
        {
            _packageDescriptions = new Dictionary<string, List<KeyValuePair<PackageDescription, ExtraInfo>>>();
            _eulaTexts = new Dictionary<string, Dictionary<Guid, string>>();

            XDocument doc = XDocumentUtils.Load(_configFilePath);

            foreach (XElement element in doc.Root.Elements("Source"))
            {
                XAttribute urlAttribute = element.Attribute("url");

                List<KeyValuePair<PackageDescription, ExtraInfo>> packageDescriptions = new List<KeyValuePair<PackageDescription, ExtraInfo>>();
                foreach (XElement packageElement in element.Elements("PackageDescription"))
                {
                    PackageDescription packageDescription = new PackageDescription();

                    packageDescription.PackageVersion = packageElement.Attribute("packageVersion").Value;
                    packageDescription.PackageFileDownloadUrl = packageElement.Attribute("packageFileDownloadUrl").Value;
                    packageDescription.Description = packageElement.Attribute("description").Value;
                    packageDescription.EulaId = (Guid)packageElement.Attribute("eulaId");
                    packageDescription.GroupName = packageElement.Attribute("groupName").Value;
                    packageDescription.Id = (Guid)packageElement.Attribute("id");
                    packageDescription.InstallationRequireLicenseFileUpdate = (bool)packageElement.Attribute("installationRequireLicenseFileUpdate");
                    packageDescription.IsFree = (bool)packageElement.Attribute("isFree");
                    packageDescription.IsTrial = (bool)packageElement.Attribute("isTrial");
                    packageDescription.LicenseRuleId = (Guid)packageElement.Attribute("licenseRuleId");
                    packageDescription.MaxCompositeVersionSupported = packageElement.Attribute("maxCompositeVersionSupported").Value;
                    packageDescription.MinCompositeVersionSupported = packageElement.Attribute("minCompositeVersionSupported").Value;
                    packageDescription.Name = packageElement.Attribute("name").Value;
                    packageDescription.PriceAmmount = (decimal)packageElement.Attribute("priceAmmount");
                    packageDescription.PriceCurrency = packageElement.Attribute("priceCurrency").Value;
                    packageDescription.ReadMoreUrl = packageElement.Attribute("readMoreUrl").Value;
                    packageDescription.TechicalDetails = packageElement.Attribute("techicalDetails").Value;
                    packageDescription.TrialPeriodDays = (int)packageElement.Attribute("trialPeriodDays");
                    packageDescription.UpgradeAgreementMandatory = (bool)packageElement.Attribute("upgradeAgreementMandatory");
                    packageDescription.Vendor = packageElement.Attribute("vendor").Value;
                    ExtraInfo extraInfo = new ExtraInfo();

                    if (packageElement.Attribute("canBeUninstalled") != null) extraInfo.CanBeUninstalled = (bool)packageElement.Attribute("canBeUninstalled");
                    if (packageElement.Attribute("flushOnCompletion") != null) extraInfo.FlushOnCompletion = (bool)packageElement.Attribute("flushOnCompletion");
                    if (packageElement.Attribute("reloadConsoleOnCompletion") != null) extraInfo.ReloadConsoleOnCompletion = (bool)packageElement.Attribute("reloadConsoleOnCompletion");

                    if (packageElement.Attribute("systemLocking") != null)
                    {
                        SystemLockingType systemLockingType;
                        packageElement.Attribute("systemLocking").TryDeserialize(out systemLockingType);
                        extraInfo.SystemLockingType = systemLockingType;
                    }

                    packageDescriptions.Add(new KeyValuePair<PackageDescription, ExtraInfo>(packageDescription, extraInfo));
                }

                _packageDescriptions.Add(element.Attribute("url").Value.ToLowerInvariant(), packageDescriptions);


                Dictionary<Guid, string> eulaTexts = new Dictionary<Guid, string>();
                foreach (XElement eulaTextElement in element.Elements("EulaText"))
                {
                    eulaTexts.Add(
                        (Guid)eulaTextElement.Attribute("id"),
                        eulaTextElement.Value
                        );
                }
                _eulaTexts.Add(element.Attribute("url").Value.ToLowerInvariant(), eulaTexts);
            }
        }



        private void OnFlush(FlushEventArgs args)
        {
            _packageDescriptions = null;
        }
    }
}