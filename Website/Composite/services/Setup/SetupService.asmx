<%@ WebService Language="C#"  Class="Composite.WebClient.Setup.SetupService" %>

using System;
using System.IO;
using System.Linq;
using System.Xml;
using System.Runtime.InteropServices;
using System.Threading;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.Data;
using Composite.Data.Types;
using Composite.PackageSystem;


namespace Composite.WebClient.Setup
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class SetupService : System.Web.Services.WebService
    {
        private int _started = 0;
        
        [DllImport("kernel32", CharSet = CharSet.Auto)]
        static extern int GetDiskFreeSpaceEx(
         string lpDirectoryName,
         out ulong lpFreeBytesAvailable,
         out ulong lpTotalNumberOfBytes,
         out ulong lpTotalNumberOfFreeBytes);

        public class CheckResult
        {
        	public string Key { get; set; }
            public string Title { get; set; }
            public bool Success { get; set; }
            //public string ReadMore { get; set; }
        }
        
        public enum InstallationStatus
        {
            NotStarted,
            Started,
            Completed
        }
        
        public class StarterSite
        {
            public String ID { get; set; }
            public string Title { get; set; }
            public string ShortDescription { get; set; }            
            public string Description { get; set; }
            public string ScreenshotUrl { get; set; }                        
        }

        public class LanguageDef
        {
            public String Title { get; set; }
            public String Key { get; set; }
            public bool Selected { get; set; }
        }

        [WebMethod]
        public XmlDocument GetLicenseHtml(bool dummy)
        {
            XmlDocument doc = new System.Xml.XmlDocument();
            doc.Load(Server.MapPath("licensedummy.xml"));
            return doc;
        }
        
        [WebMethod]
        public CheckResult[] CheckRequirements( bool dummy )
        {
            return new []
            {
                new CheckResult {
                	Key = "permissions",
                    Title = "Web directory permissions",
                    Success = true //HasWritePermission()
                },
                new CheckResult {
                	Key = "pathlength",
                    Title = "Base path length",
                    Success = true //BasePathNotToLong()
                },
                new CheckResult {
                	Key = "connection",
                    Title = "Outbound server connection",
                    Success = true //HasConnectionToPackageServer()
                },
                new CheckResult {
                	Key = "browser",
                    Title = "Browser type and version",
                    Success = true //BrowserCheck()
                },
                new CheckResult {
                	Key = "diskspace",
                    Title = "Disk space requirements",
                    Success = true //DiskSpaceCheck()
                }
            };
        }

        [WebMethod]
        public XmlDocument GetSetupDescription(bool dummy)
        {
            XmlDocument doc = new System.Xml.XmlDocument();
            doc.Load(Server.MapPath("dummy.xml"));
            return doc;
        }

        [WebMethod]
        public LanguageDef[] GetLanguages(bool dummy)
        {
            return new[]
            {
                new LanguageDef {
                    Title = "Hebrew",
                    Key = "no-GO",
                    Selected = false
                },
                new LanguageDef {
                    Title = "Latin",
                    Key = "da-DK",
                    Selected = true
                },
                new LanguageDef {
                    Title = "Klingon",
                    Key = "en-US",
                    Selected = false
                },
                new LanguageDef {
                    Title = "Navi",
                    Key = "na-VI",
                    Selected = false
                }
            };
        }

        [WebMethod]
        public bool SetUp( string setupDescriptionXML, string username, string password, string language )
        {
            // When did we "initlialize"? Have we done it yet?
            
            // Go to offline mode
            
            // Validate
                // Check that input values exists

            // Locate packages related to the setupDescription 
            
            // If all is well
            
                // Initialize ?
                // Write inst now?
                // Create user
                // Create language
                // Setup packages
            
            // Go to online mode;
            return true;
        }
        
                
        
        
        
        private bool HasWritePermission()
        {
            string filePath = Context.Server.MapPath("/Composite/Setup/NtfsSecurityTest.xml");
            try
            {
                if(File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

                File.WriteAllLines(filePath, new [] { "That file is created for testing purpuses" });

                File.SetCreationTime(filePath, DateTime.Now.Subtract(TimeSpan.FromSeconds(45)));

                File.Delete(filePath);

                return true;
            }
            catch(UnauthorizedAccessException)
            {
                return false;
            }
        }

        private bool BasePathNotToLong()
        {
            return Context.Server.MapPath("\\").Length <= 150; // Magic number!!!
        }

        private bool HasConnectionToPackageServer()
        {
            IPackageServerSource packageServerSources;
            
            using(new DataScope(DataScopeIdentifier.Public))
            {
                packageServerSources = DataFacade.GetData<IPackageServerSource>().FirstOrDefault();
            }

            if(packageServerSources == null)
            {
                return false;
            }

            string schemaPrefix = "https://";
            
            string url = packageServerSources.Url;
            if (url == null || !url.StartsWith(schemaPrefix))
            {
                return false;
            }

            url = url.Substring(schemaPrefix.Length);
            
            try
            {
                return PackageServerFacade.ValidateServerUrl(url) == ServerUrlValidationResult.Https;
            }
            catch(Exception )
            {
                return false;
            }
        }

        private bool BrowserCheck()
        {
           	/*
           	 * Fake! This check is made by the client 
           	 * before this service is even invoked.
           	 */
            return true;
        }

        private bool DiskSpaceCheck()
        {
            string siteRoot = Context.Server.MapPath("\\");
            string diskRoot = Directory.GetDirectoryRoot(siteRoot);

            ulong lpFreeBytesAvailable, lpTotalNumberOfBytes, lpTotalNumberOfFreeBytes;

            GetDiskFreeSpaceEx(diskRoot, out lpFreeBytesAvailable, out lpTotalNumberOfBytes, out lpTotalNumberOfFreeBytes);

            return lpFreeBytesAvailable > 5 * 1024 * 1024 /* 5 MB */; 
        }

        private static void AssertServiceAvailable()
        {
            // NOTE: to be implemented
        }
    }
}
