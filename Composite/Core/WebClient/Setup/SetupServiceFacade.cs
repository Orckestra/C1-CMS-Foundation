using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceModel;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Localization;
using Composite.Core.Logging;
using Composite.Core.PackageSystem;
using Composite.Core.WebClient.Setup.WebServiceClient;
using Composite.Core.Xml;
using Composite.C1Console.Users;


namespace Composite.Core.WebClient.Setup
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class SetupServiceFacade
    {
        /// <exclude />
        public static XNamespace XmlNamespace = (XNamespace)"urn:Composte.C1.Setup";

        /// <exclude />
        public static XName PackageElementName = XmlNamespace + "package";

        /// <exclude />
        public static string UrlAttributeName = "url";

        /// <exclude />
        public static string IdAttributeName = "id";

        /// <exclude />
        public static string KeyAttributeName = "key";

        /// <exclude />
        public static string PackageServicePingUrlFormat = "{0}/C1.asmx";

        private static string SetupServiceUrl = "{0}/Setup/Setup.asmx";
        private static string PackageUrlFormat = "{0}{1}";


        private static string _packageServerUrl = null;
        /// <exclude />
        public static string PackageServerUrl
        {
            get
            {
                if (_packageServerUrl == null)
                {
                    string filepath = PathUtil.Resolve(@"~/App_Data/Composite/Composite.config");

                    XDocument doc = XDocumentUtils.Load(filepath);
                    XElement element = doc.Root.Descendants("Composite.SetupConfiguration").Single();

                    _packageServerUrl = element.Attribute("PackageServerUrl").Value;
                }

                return _packageServerUrl;
            }
        }



        /// <exclude />
        public static void SetUp(string setupDescriptionXml, string username, string password, string language, string consoleLanguage)
        {
            ApplicationOnlineHandlerFacade.TurnApplicationOffline(false);

            try
            {
                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Setting up the system for the first time");

                CultureInfo locale = new CultureInfo(language);
                CultureInfo userCulture = new CultureInfo(consoleLanguage);

                ApplicationLevelEventHandlers.ApplicationStartInitialize();

                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Creating first user: " + username);
                AdministratorAutoCreator.AutoCreatedAdministrator(username, password, false);
                UserValidationFacade.FormValidateUser(username, password);

                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Creating first locale: " + language);
                LocalizationFacade.AddLocale(locale, "", true, false);
                LocalizationFacade.SetDefaultLocale(locale);

                UserSettings.SetUserCultureInfo(username, userCulture);                

                XElement setupDescription = XElement.Parse(setupDescriptionXml);

                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Packages to install:");
                foreach (string packageUrl in GetPackageUrls(setupDescription))
                {
                    Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Package: " + packageUrl);
                }

                foreach (string packageUrl in GetPackageUrls(setupDescription))
                {
                    Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Installing package: " + packageUrl);
                    InstallPackage(packageUrl);
                }

                InstallLanguagePackage(userCulture);
                
                RegisterSetup(setupDescriptionXml, "");

                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Done settingup the system for the first time! Enjoy!");
            }
            catch (Exception ex)
            {
                RegisterSetup(setupDescriptionXml, ex.ToString());

                if (RuntimeInformation.IsDebugBuild == true)
                {
                    ApplicationOnlineHandlerFacade.TurnApplicationOnline();
                    throw;
                }

            }

            ApplicationOnlineHandlerFacade.TurnApplicationOnline();
        }



        /// <exclude />
        public static bool PingServer()
        {
            SetupSoapClient client = CreateClient();

            return client.Ping();
        }



        /// <exclude />
        public static XElement GetSetupDescription()
        {
            SetupSoapClient client = CreateClient();

            XElement xml = client.GetSetupDescription(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return xml;
        }



        /// <exclude />
        public static XElement GetLanguages()
        {
            SetupSoapClient client = CreateClient();

            XElement xml = client.GetLanguages(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return xml;
        }



        /// <exclude />
        public static XElement GetLanguagePackages()
        {
            SetupSoapClient client = CreateClient();

            XElement xml = client.GetLanguagePackages(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return xml;
        }


        /// <exclude />
        public static XmlDocument GetGetLicense()
        {
            SetupSoapClient client = CreateClient();

            XElement xml = client.GetGetLicense(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            XmlDocument doc = new XmlDocument();
            using (XmlReader reader = xml.CreateReader())
            {
                doc.Load(reader);
            }

            return doc;
        }



        private static void RegisterSetup(string setupDescriptionXml, string exception)
        {
            SetupSoapClient client = CreateClient();

            client.RegisterSetup(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString(), setupDescriptionXml, exception);
        }



        private static void InstallLanguagePackage(CultureInfo userCulture)
        {
            string userCultureString = userCulture.Name;

            XElement languagePackagesXml = GetLanguagePackages();

            string url = languagePackagesXml.
                Descendants("Language").
                Where(f => f.Attribute("key") != null && f.Attribute("key").Value == userCultureString).
                Select(f => f.Attribute("url").Value).
                FirstOrDefault();


            if (url != null)
            {
                string packageUrl = string.Format(PackageUrlFormat, PackageServerUrl, url);

                Log.LogVerbose("RGB(255, 55, 85)SetupServiceFacade", "Installing package: " + packageUrl);
                InstallPackage(packageUrl);
            }
        }



        private static bool InstallPackage(string packageUrl)
        {
            bool result = false;
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(packageUrl);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();

                byte[] buffer = new byte[32768];
                using (Stream inputStream = response.GetResponseStream())
                {
                    using (MemoryStream outputStream = new MemoryStream())
                    {
                        int read;
                        while ((read = inputStream.Read(buffer, 0, 32768)) > 0)
                        {
                            outputStream.Write(buffer, 0, read);
                        }

                        outputStream.Seek(0, SeekOrigin.Begin);

                        PackageManagerInstallProcess packageManagerInstallProcess = PackageManager.Install(outputStream, true);
                        if (packageManagerInstallProcess.PreInstallValidationResult.Count > 0)
                        {
                            LogValidationResults(packageManagerInstallProcess.PreInstallValidationResult);
                        }
                        else
                        {
                            List<PackageFragmentValidationResult> validationResult = packageManagerInstallProcess.Validate();

                            if (validationResult.Count > 0)
                            {
                                LogValidationResults(validationResult);
                            }
                            else
                            {
                                List<PackageFragmentValidationResult> installResult = packageManagerInstallProcess.Install();
                                if (installResult.Count > 0)
                                {
                                    LogValidationResults(installResult);
                                }
                                else
                                {
                                    result = true;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("SetupServiceFacade", "Error installing package: " + packageUrl);
                LoggingService.LogCritical("SetupServiceFacade", ex);

                throw;
            }

            return result;
        }
        



        private static SetupSoapClient CreateClient()
        {
            BasicHttpBinding basicHttpBinding = new BasicHttpBinding();
            if (RuntimeInformation.IsDebugBuild == true)
            {
                basicHttpBinding.CloseTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.OpenTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.ReceiveTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.SendTimeout = TimeSpan.FromMinutes(2);
            }
            else
            {
                basicHttpBinding.CloseTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.OpenTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.ReceiveTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.SendTimeout = TimeSpan.FromMinutes(1);
            }

            basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;

            string url = PackageServerUrl;
            if (PackageServerUrl.StartsWith("https://") == true)
            {
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;

                url = url.Remove(0, 8);
            }           

            SetupSoapClient client = new SetupSoapClient(basicHttpBinding, new EndpointAddress(string.Format(SetupServiceUrl, PackageServerUrl)));

            return client;
        }



        private static IEnumerable<string> GetPackageUrls(XElement setupDescription)
        {
            int maxkey = setupDescription.Descendants().Attributes(KeyAttributeName).Select(f => (int)f).Max();

            SetupSoapClient client = CreateClient();
            
            XElement originalSetupDescription = client.GetSetupDescription(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            var element =
                (from elm in originalSetupDescription.Descendants()
                 where elm.Attribute(KeyAttributeName) != null && (int)elm.Attribute(KeyAttributeName) == maxkey
                 select elm).Single();

            foreach (XElement packageElement in setupDescription.Descendants(PackageElementName))
            {
                XAttribute idAttribute = packageElement.Attribute(IdAttributeName);
                if (idAttribute == null) throw new InvalidOperationException("Setup XML malformed");

                string url =
                    (from elm in element.Descendants(PackageElementName)
                     where elm.Attribute(IdAttributeName).Value == idAttribute.Value
                     select elm.Attribute(UrlAttributeName).Value).SingleOrDefault();

                yield return string.Format(PackageUrlFormat, PackageServerUrl, url);
            }
        }



        private static void LogValidationResults(IEnumerable<PackageFragmentValidationResult> packageFragmentValidationResults)
        {
            foreach (PackageFragmentValidationResult packageFragmentValidationResult in packageFragmentValidationResults)
            {
                throw new InvalidOperationException(packageFragmentValidationResult.Message);
                //LoggingService.LogCritical("SetupServiceFacade", packageFragmentValidationResult.Message);
            }
        }
    }
}
