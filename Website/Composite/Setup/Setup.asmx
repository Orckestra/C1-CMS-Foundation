<%@ WebService Language="C#"  Class="Composite.WebClient.Setup.Setup" %>

using System;
using System.IO;
using System.Linq;
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
    public class Setup : System.Web.Services.WebService
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
            public string Title { get; set; }
            public bool Success { get; set; }
            public string ReadMore { get; set; }
        }
        
        public enum InstallationStatus
        {
            NotStarted,
            Started,
            Completed
        }
        
        public class StarterSite
        {
            public Guid ID { get; set; }
            public string Title { get; set; }
            public string ShortDescription { get; set; }            
            public string Description { get; set; }
            public string ScreenshotUrl { get; set; }                        
        }

        [WebMethod]
        public string GetLicenseText()
        {
            // TODO: To be implemented...
            return "Property of Composite A/S";
        }
        
        [WebMethod]
        public CheckResult[] CheckRequirements()
        {
            return new []
            {
                new CheckResult {
                    Title = "Write permissions to the web directory",
                    ReadMore = "http://docs.composite.net/WritePermissionsToWebFolder",
                    Success = HasWritePermission()
                },
                new CheckResult {
                    Title = "Base path not to long",
                    ReadMore = "http://docs.composite.net/BasePathToLong",
                    Success = BasePathNotToLong()
                },
                new CheckResult {
                    Title = "Connection to package server",
                    ReadMore = "http://docs.composite.net/NoConnectionToPackageServer",
                    Success = HasConnectionToPackageServer()
                },
                new CheckResult {
                    Title = "The web browser currently used  is the correct type and version",
                    ReadMore = "http://docs.composite.net/BrowserCheck",
                    Success = BrowserCheck()
                },
                new CheckResult {
                    Title = "There's enough disk space",
                    ReadMore = "http://docs.composite.net/BrowserCheck",
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
            // TODO: To be implemented...
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
        public StarterSite[] GetStarterSites()
        {
            AssertServiceAvailable();

            // NOTE: to be implemented

            return new[]
                       {
                           new StarterSite
                               {
                                   ID = Guid.Empty,
                                   Title = "None",
                                   ShortDescription = "",
                                   Description = "",
                                   ScreenshotUrl = null
                               },
                           new StarterSite
                               {
                                   ID = new Guid("c6cf5137-afbb-462e-a357-9aa55327e675"),
                                   Title = "Basic Site",
                                   ShortDescription = "Cum sociis natoque penatibus et magnis dis parturient montes",
                                   Description = "Quisque ut malesuada turpis. Sed ac est justo, id lobortis orci. Maecenas ac tempor turpis. In hac habitasse platea dictumst.",
                                   ScreenshotUrl = null
                               },    
                           new StarterSite
                               {
                                   ID = new Guid("5f35ce50-6174-42e2-bcdf-9e259ab15350"),
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
        
        private static void AssertServiceAvailable()
        {
            // NOTE: to be implemented
        }
    }
}
