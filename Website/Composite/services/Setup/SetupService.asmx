<%@ WebService Language="C#" Class="Composite.WebClient.Setup.SetupService" %>

using System;
using System.IO;
using System.Linq;
using System.Xml;
using System.Runtime.InteropServices;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.IO;


namespace Composite.WebClient.Setup
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class SetupService : System.Web.Services.WebService
    {                        
        [WebMethod]
        public CheckResult[] CheckRequirements(bool dummy)
        {
            return new[]
            {
                new CheckResult {
                	Key = "permissions",
                    Title = "Web directory permissions",
                    Success = HasWritePermission()
                },
                new CheckResult {
                	Key = "pathlength",
                    Title = "Base path length",
                    Success = BasePathNotToLong()
                },
                new CheckResult {
                	Key = "connection",
                    Title = "Outbound server connection",
                    Success = HasConnectionToPackageServer()
                },
                new CheckResult {
                	Key = "browser",
                    Title = "Browser type and version",
                    Success = BrowserCheck()
                },
                new CheckResult {
                	Key = "diskspace",
                    Title = "Disk space requirements",
                    Success = DiskSpaceCheck()
                }
            };
        }

        
        
        [WebMethod]
        public XmlDocument GetSetupDescription(bool dummy)
        {
            XElement setupDescription = SetupServiceFacade.GetSetupDescription();
            
            // Remove urls 
            foreach (XElement element in setupDescription.Descendants(SetupServiceFacade.PackageElementName))
            {
                XAttribute urlAttribute = element.Attribute(SetupServiceFacade.UrlAttributeName);
                if (urlAttribute != null)
                {
                    urlAttribute.Remove();
                }
            }
            
            XmlDocument doc = new XmlDocument();

            doc.LoadXml(setupDescription.ToString());
            
            return doc;
        }



        [WebMethod]
        public XmlDocument GetLicenseHtml(bool dummy)
        {
            return SetupServiceFacade.GetGetLicense();
        }
        
        
        
        [WebMethod]
        public LanguageDef[] GetLanguages(bool dummy)
        {
            XElement languagesXml = SetupServiceFacade.GetLanguages();

            
            string clientPreferredCultureName = (this.Context.Request.UserLanguages.FirstOrDefault() ?? "").ToLower();

            List<LanguageDef> languages = new List<LanguageDef>();
            foreach (XElement element in languagesXml.Elements("Language"))
            {
                
                bool selected = false;

                if (string.IsNullOrEmpty(clientPreferredCultureName)==true)
                {
                    XAttribute selectedAttribute = element.Attribute("Selected");
                    selected = (selectedAttribute != null && (bool)selectedAttribute);
                }
                else
                {
                    selected = (element.Attribute("Key").Value.ToLower() == clientPreferredCultureName);
                }
                
                LanguageDef languageDef = new LanguageDef
                {
                    Title = element.Attribute("Title").Value,
                    Key = element.Attribute("Key").Value,
                    Selected = selected
                };

                languages.Add(languageDef);
            }

            return languages.ToArray();
        }
        
        

        [WebMethod]
        public bool SetUp(string setupDescriptionXML, string username, string password, string language, string consolelanguage)
        {                        
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == true) return true;

            SystemSetupFacade.IsSystemFirstTimeInitialized = true;         

            SetupServiceFacade.SetUp(setupDescriptionXML, username, password, language);

            return true;
        }



        private bool HasWritePermission()
        {
            try
            {
                string filePath = Context.Server.MapPath("/Composite/Setup/NtfsSecurityTest.xml");

                if (File.Exists(filePath) == true)
                {
                    FileEx.Delete(filePath);
                }

                string directory = Path.Combine(Path.GetDirectoryName(filePath), "NtfsSecurityTest");
                if (Directory.Exists(directory) == false)
                {
                    Directory.CreateDirectory(directory);
                }

                File.WriteAllLines(filePath, new[] { "That file is created for testing purpuses" });

                File.SetCreationTime(filePath, DateTime.Now.Subtract(TimeSpan.FromSeconds(45)));

                FileEx.Delete(filePath);
                Directory.Delete(directory);

                return true;
            }
            catch (UnauthorizedAccessException)
            {
                return false;
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild == true) throw;
                
                return false;
            }            
        }



        private bool BasePathNotToLong()
        {
            return Context.Server.MapPath("\\").Length <= 70; 
        }



        private bool HasConnectionToPackageServer()
        {
            try
            {
                return SetupServiceFacade.PingServer();
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild == true) throw;
            }

            return false;
        }



        private bool BrowserCheck()
        {
            return true; // Fake! This check is made by the client before this service is even invoked.
        }



        private bool DiskSpaceCheck()
        {
            try
            {
                string siteRoot = Context.Server.MapPath("\\");
                string diskRoot = Directory.GetDirectoryRoot(siteRoot);

                ulong lpFreeBytesAvailable, lpTotalNumberOfBytes, lpTotalNumberOfFreeBytes;

                GetDiskFreeSpaceEx(diskRoot, out lpFreeBytesAvailable, out lpTotalNumberOfBytes, out lpTotalNumberOfFreeBytes);

                return lpFreeBytesAvailable > 20 * 1024 * 1024;
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild == true) throw;
                
                return false;
            }
        }




        public class CheckResult
        {
            public string Key { get; set; }
            public string Title { get; set; }
            public bool Success { get; set; }
        }



        public class LanguageDef
        {
            public String Title { get; set; }
            public String Key { get; set; }
            public bool Selected { get; set; }
        }
        


        [DllImport("kernel32", CharSet = CharSet.Auto)]
        static extern int GetDiskFreeSpaceEx(string lpDirectoryName, out ulong lpFreeBytesAvailable, out ulong lpTotalNumberOfBytes, out ulong lpTotalNumberOfFreeBytes);
    }
}
