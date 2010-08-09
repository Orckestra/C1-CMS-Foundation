using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceModel;
using System.Xml.Linq;
using Composite.Application;
using Composite.GlobalSettings;
using Composite.Localization;
using Composite.Logging;
using Composite.PackageSystem;
using Composite.Security;
using Composite.WebClient.Setup.WebServiceClient;


namespace Composite.WebClient.Setup
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SetupServiceFacade
    {        
        public static string PackageServerUrl = "package.composite.net";
        public static XNamespace XmlNamespace = (XNamespace)"urn:Composte.C1.Setup";
        public static XName PackageElementName = XmlNamespace + "package";
        public static string UrlAttributeName = "url";
        public static string IdAttributeName = "id";
        public static string KeyAttributeName = "key";

        public static string PackageServicePingUrlFormat = "https://{0}/C1.asmx";
        private static string SetupServiceUrl = "https://{0}/Setup/Setup.asmx"; 
        private static string PackageUrlFormat = "https://{0}{1}";
     


        public static void SetUp(string setupDescriptionXml, string username, string password, string language)
        {            
            ApplicationOnlineHandlerFacade.TurnApplicationOffline(false);

            try
            {
                CultureInfo locale = new CultureInfo(language);

                GlobalAsaxHelper.ApplicationStartInitialize();
                
                AdministratorAutoCreator.AutoCreatedAdministrator(username, password, false);
                UserValidationFacade.FormValidateUser(username, password);
                
                LocalizationFacade.AddLocale(locale, "", true, false);
                LocalizationFacade.SetDefaultLocale(locale);
                
                XElement setupDescription = XElement.Parse(setupDescriptionXml);
                
                foreach (string packageUrl in GetPackageUrls(setupDescription))
                {
                    InstallPackage(packageUrl);
                }

                RegisterSetup(setupDescriptionXml, "");
            }
            catch (Exception ex)
            {
                RegisterSetup(setupDescriptionXml, ex.ToString());

                if (RuntimeInformation.IsDebugBuild == true) throw;                
            }
                        
            ApplicationOnlineHandlerFacade.TurnApplicationOnline();            
        }



        public static XDocument GetSetupDescription()
        {
            SetupSoapClient client = CreateClient();

            string xml = client.GetSetupDescription(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());            

            return XDocument.Parse(xml);
        }



        public static XDocument GetLanguages()
        {
            SetupSoapClient client = CreateClient();

            string xml = client.GetLanguages(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return XDocument.Parse(xml);
        }



        public static XDocument GetGetLicense()
        {
            SetupSoapClient client = CreateClient();

            string xml = client.GetGetLicense(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString());

            return XDocument.Parse(xml);
        }



        private static void RegisterSetup(string setupDescriptionXml, string exception)
        {
            SetupSoapClient client = CreateClient();

            client.RegisterSetup(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString(), setupDescriptionXml, exception);
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
                LoggingService.LogCritical("SetupServiceFacade", ex);
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

            basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;

            SetupSoapClient client = new SetupSoapClient(basicHttpBinding, new EndpointAddress(string.Format(SetupServiceUrl, PackageServerUrl)));

            //SetupSoapClient client = new SetupSoapClient(basicHttpBinding, new EndpointAddress("http://localhost:25000/WebSite1/Setup/Setup.asmx"));

            return client;
        }



        private static IEnumerable<string> GetPackageUrls(XElement setupDescription)
        {
            int maxkey = setupDescription.Descendants().Attributes(KeyAttributeName).Select(f => (int)f).Max();

            SetupSoapClient client = CreateClient();

            XDocument originalSetupDescription = XDocument.Parse(client.GetSetupDescription(RuntimeInformation.ProductVersion.ToString(), InstallationInformationFacade.InstallationId.ToString()));

            var element =
                (from elm in originalSetupDescription.Root.Descendants()
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
                LoggingService.LogCritical("SetupServiceFacade", packageFragmentValidationResult.Message);
            }
        }
    }
}
