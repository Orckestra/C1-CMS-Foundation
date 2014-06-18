using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceModel;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Localization;
using Composite.Core.PackageSystem;
using Composite.Core.WebClient.Setup.WebServiceClient;
using Composite.Core.Xml;
using Composite.C1Console.Users;
using Composite.Core.ResourceSystem;
using Composite.Data;


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

        private static readonly string SetupServiceUrl = "{0}/Setup/Setup.asmx";


        private static string _packageServerUrl;
        private static readonly string LogTitle = typeof(SetupServiceFacade).Name;
        private static readonly string VerboseLogTitle = "RGB(255, 55, 85)" + LogTitle;

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
        public static bool SetUp(string setupDescriptionXml, string username, string password, string email, string language, string consoleLanguage, bool newsletter)
        {
            ApplicationOnlineHandlerFacade.TurnApplicationOffline(false);

            username = username.Trim().ToLowerInvariant();

            XElement setupDescription = XElement.Parse(setupDescriptionXml);

            XElement setupRegisrtatoinDescription = new XElement("registration",
                new XElement("user_email", email),
                new XElement("user_newsletter", newsletter),
                new XElement("user_consolelanguage", consoleLanguage),
                new XElement("user_websitelanguage", language),
                setupDescription);

            bool success = false;

            try
            {
                Log.LogInformation(VerboseLogTitle, "Downloading packages");

                string[] packageUrls = GetPackageUrls(setupDescription).ToArray();
                MemoryStream[] packages = new MemoryStream[packageUrls.Length];

                Parallel.For(0, packageUrls.Length, i =>
                {
                    packages[i] = DownloadPackage(packageUrls[i]);
                });

                Log.LogInformation(VerboseLogTitle, "Setting up the system for the first time");

                CultureInfo locale = new CultureInfo(language);
                CultureInfo userCulture = new CultureInfo(consoleLanguage);

                ApplicationLevelEventHandlers.ApplicationStartInitialize();

                Log.LogInformation(VerboseLogTitle, "Creating first locale: " + language);
                LocalizationFacade.AddLocale(locale, "", true, false);
                LocalizationFacade.SetDefaultLocale(locale);


                Log.LogInformation(VerboseLogTitle, "Creating first user: " + username);
                AdministratorAutoCreator.AutoCreatedAdministrator(username, password, email, false);
                UserValidationFacade.FormValidateUser(username, password);

                UserSettings.SetUserCultureInfo(username, userCulture);

                using (new DataScope(locale))
                {
                    for (int i = 0; i < packageUrls.Length; i++)
                    {
                        Log.LogVerbose(VerboseLogTitle, "Installing package from url " + packageUrls[i]);
                        bool packageValidationSucceded = InstallPackage(packageUrls[i], packages[i]);

                        // Releasing a reference to reduce memory usage
                        packages[i].Dispose();
                        packages[i] = null;
                    }
                }

                CultureInfo installedLanguagePackageCulture = InstallLanguagePackage(userCulture);

                UserSettings.SetUserC1ConsoleUiLanguage(username, installedLanguagePackageCulture ?? StringResourceSystemFacade.GetDefaultStringCulture());

                RegisterSetup(setupRegisrtatoinDescription.ToString(), "");

                Log.LogInformation(VerboseLogTitle, "Done setting up the system for the first time! Enjoy!");

                success = true;
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, ex);
                Log.LogWarning(LogTitle, "First time setup failed - could not download, install package or otherwise complete the setup.");
                RegisterSetup(setupRegisrtatoinDescription.ToString(), ex.ToString());

                if (RuntimeInformation.IsDebugBuild)
                {
                    ApplicationOnlineHandlerFacade.TurnApplicationOnline();
                    throw;
                }
            }

            ApplicationOnlineHandlerFacade.TurnApplicationOnline();
            return success;
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
        public static Dictionary<CultureInfo, string> GetLanguagePackages()
        {
            SetupSoapClient client = CreateClient();

            XElement xml = client.GetLanguagePackages(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return xml.Descendants("Language").ToDictionary(f => new CultureInfo(f.Attribute("key").Value), f =>f.Attribute("url").Value);
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



        private static CultureInfo InstallLanguagePackage(CultureInfo userCulture)
        {
            Dictionary<CultureInfo, string> languagePackages = GetLanguagePackages();

            CultureInfo installLanguagePackageCulture = 
                languagePackages.ContainsKey(userCulture) ? 
                userCulture : 
                languagePackages.Keys.FirstOrDefault(f => f.TwoLetterISOLanguageName == userCulture.TwoLetterISOLanguageName);

            if (installLanguagePackageCulture != null)
            {
                string url = languagePackages[installLanguagePackageCulture];

                string packageUrl = ResolvePackageUrl(url);

                Log.LogInformation(VerboseLogTitle, "Installing package: " + packageUrl);

                var packageStream = DownloadPackage(packageUrl);
                InstallPackage(packageUrl, packageStream);
            }

            return installLanguagePackageCulture;
        }


        private static MemoryStream DownloadPackage(string packageUrl)
        {
            var packageStream = new MemoryStream();

            try
            {
                HttpWebRequest request = (HttpWebRequest) WebRequest.Create(packageUrl);
                HttpWebResponse response = (HttpWebResponse) request.GetResponse();

                byte[] buffer = new byte[32768];

                using (Stream inputStream = response.GetResponseStream())
                {
                    int read;
                    while ((read = inputStream.Read(buffer, 0, 32768)) > 0)
                    {
                        packageStream.Write(buffer, 0, read);
                    }

                    inputStream.Close();
                }
            }
            catch(ThreadAbortException) {}
            catch(Exception ex)
            {
                throw new InvalidOperationException("Failed to download package '{0}'".FormatWith(packageUrl), ex);
            }

            packageStream.Seek(0, SeekOrigin.Begin);
            return packageStream;
        }


        private static bool InstallPackage(string packageUrl, Stream packageStream)
        {
            try
            {
                PackageManagerInstallProcess packageManagerInstallProcess = PackageManager.Install(packageStream, true);
                if (packageManagerInstallProcess.PreInstallValidationResult.Count > 0)
                {
                    LogValidationResults(packageManagerInstallProcess.PreInstallValidationResult);
                    return false;
                }
                
                List<PackageFragmentValidationResult> validationResult = packageManagerInstallProcess.Validate();

                if (validationResult.Count > 0)
                {
                    LogValidationResults(validationResult);
                    return false;
                }
                
                List<PackageFragmentValidationResult> installResult = packageManagerInstallProcess.Install();
                if (installResult.Count > 0)
                {
                    LogValidationResults(installResult);
                    return false;
                }
                
                return true;
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, "Error installing package: " + packageUrl);
                Log.LogCritical(LogTitle, ex);

                throw;
            }
        }
        



        private static SetupSoapClient CreateClient()
        {
            var basicHttpBinding = new BasicHttpBinding();
            var timeout = TimeSpan.FromMinutes(RuntimeInformation.IsDebugBuild ? 2 : 1);

            basicHttpBinding.CloseTimeout = timeout;
            basicHttpBinding.OpenTimeout = timeout;
            basicHttpBinding.ReceiveTimeout = timeout;
            basicHttpBinding.SendTimeout = timeout;

            basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;

            if (PackageServerUrl.StartsWith("https://"))
            {
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;
            }

            return new SetupSoapClient(basicHttpBinding, new EndpointAddress(string.Format(SetupServiceUrl, PackageServerUrl)));
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

                yield return ResolvePackageUrl(url);
            }
        }

        private static string ResolvePackageUrl(string url)
        {
            if (url.StartsWith("http://") || url.StartsWith("https://"))
            {
                return url;
            }

            return PackageServerUrl + url;
        }


        private static void LogValidationResults(IEnumerable<PackageFragmentValidationResult> packageFragmentValidationResults)
        {
            foreach (PackageFragmentValidationResult packageFragmentValidationResult in packageFragmentValidationResults)
            {
                throw new InvalidOperationException(packageFragmentValidationResult.Message);
            }
        }
    }
}
