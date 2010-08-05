using System.Globalization;
using Composite.Application;
using Composite.Localization;
using Composite.Security;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Web;
using System.Net;
using System.IO;
using System;
using Composite.PackageSystem;
using Composite.Logging;


namespace Composite.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SetupServiceFacade
    {
        public static void SetUp(string setupDescriptionXml, string username, string password, CultureInfo locale)
        {
            // Go to offline mode
            ApplicationOnlineHandlerFacade.TurnApplicationOffline(false);
                                                          
            // Validate
                // Check that input values exists

            // Locate packages related to the setupDescription 
            
            // If all is well
            
            // Initialize ?
            GlobalAsaxHelper.ApplicationStartInitialize();
                
            // Write inst now?
            
            // Create user
            AdministratorAutoCreator.AutoCreatedAdministrator(username, password, false);
            UserValidationFacade.FormValidateUser(username, password);
            
            // Create language
            LocalizationFacade.AddLocale(locale, "", true, false);
            LocalizationFacade.SetDefaultLocale(locale);

            // Setup packages
            XElement setupDescription = XElement.Parse(setupDescriptionXml);

            // Find
            foreach (string packageUrl in GetPackageUrls(setupDescription))
            {
                InstallPackage(packageUrl);
            }
            
            // Go to online mode;
            ApplicationOnlineHandlerFacade.TurnApplicationOnline();            
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

        


        private static IEnumerable<string> GetPackageUrls(XElement setupDescription)
        {
            yield return "http://docs.composite.net/Downloads/Composite2.0.TemplateSites.Base01.zip";
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
