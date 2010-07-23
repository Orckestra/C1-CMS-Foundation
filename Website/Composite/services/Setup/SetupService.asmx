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
		/*
        [WebMethod]
        public string GetLicenseText( bool dummy )
        {
            // TODO: To be implemented...
            return "Property of Composite A/S";
        }
        */
        
        [WebMethod]
        public CheckResult[] CheckRequirements( bool dummy )
        {
            return new []
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

        #region Checking if setup meets requirements

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

        #endregion Checking if installation meets necessary requirements

        [WebMethod]
        public XmlDocument GetSetupDescription ( bool dummy )
        {
            XmlDocument doc = new System.Xml.XmlDocument();
            doc.Load ( Server.MapPath ( "dummy.xml" ));
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
        
		/*
        [WebMethod]
        public void SetUp(
            string adminPassword, 
            string language,
            string starterSiteId)
        {
            AssertServiceAvailable();

            int started = Interlocked.Increment(ref _started);
            if(started != 1)
            {
                throw new InvalidOperationException("Already started");
            }

            Thread.Sleep(5 * 1000);
            
            //var installThread = new Thread(() => Process(adminPassword, language, starterSiteId));
            //installThread.Start();
        }

        //private static void Process(string adminPassword,
        //    string language,
        //    string starterSiteId)
        //{
        //    using(new ShutdownGuard())
        //    {
        //        Thread.Sleep(10 * 1000);
        //    }
        //}
        
        [WebMethod]
        public StarterSite[] GetStarterSites( bool dummy )
        {
            AssertServiceAvailable();

            // NOTE: to be implemented

            return new[]
                       {
                           new StarterSite
                               {
                                   ID = Guid.Empty.ToString (),
                                   Title = "None",
                                   ShortDescription = "",
                                   Description = "",
                                   ScreenshotUrl = null
                               },
                           new StarterSite
                               {
                                   ID = new Guid("c6cf5137-afbb-462e-a357-9aa55327e675").ToString (),
                                   Title = "Basic Site",
                                   ShortDescription = "Cum sociis natoque penatibus et magnis dis parturient montes",
                                   Description = "Quisque ut malesuada turpis. Sed ac est justo, id lobortis orci. Maecenas ac tempor turpis. In hac habitasse platea dictumst.",
                                   ScreenshotUrl = null
                               },    
                           new StarterSite
                               {
                                   ID = new Guid("5f35ce50-6174-42e2-bcdf-9e259ab15350").ToString (),
                                   Title = "Basic Site + Design",
                                   ShortDescription = "Praesent mattis lectus a justo fringilla in aliquet",
                                   Description = "Donec non lorem ac tellus lobortis tristique eu vel magna. Donec vel magna enim. Sed lobortis malesuada lobortis.",
                                   ScreenshotUrl = null
                               }                               
                       };
        }

        //[WebMethod]
        //public bool Ping()
        //{
        //    return true;
        //}
        */
        
        private static void AssertServiceAvailable()
        {
            // NOTE: to be implemented
        }
    }
}
