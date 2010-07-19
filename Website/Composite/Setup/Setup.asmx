<%@ WebService Language="C#"  Class="Composite.WebClient.Setup.Setup" %>

using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
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

        [WebMethod]
        public void StartInstallation(
            string adminPassword, 
            string language,
            string packageList)
        {
        }
        
        [WebMethod]
        public string GetInstallationStatus()
        {
            return "finished";
        }
    }
}
