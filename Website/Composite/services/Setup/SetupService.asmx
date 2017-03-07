<%@ WebService Language="C#" Class="Composite.Core.WebClient.Setup.SetupService" %>

using System;
using System.IO;
using System.Linq;
using System.Xml;
using System.Runtime.InteropServices;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;


namespace Composite.Core.WebClient.Setup
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class SetupService : System.Web.Services.WebService
    {
        private static readonly string LogTitle = typeof (SetupService).FullName;

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
                    Title = "Outbound HTTPS/SOAP connection",
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
                },
                new CheckResult {
                    Key = "iisversion",
                    Title = "IIS (Web Server) version",
                    Success = WebServerVersionCheck()
                },
                new CheckResult {
                    Key = "websockets",
                    Title = "IIS WebSocket support installed",
                    Success = WebsocketCheck()
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


            string clientPreferredCultureName = ((this.Context.Request.UserLanguages ?? new string[0]).FirstOrDefault() ?? "").ToLowerInvariant();

            List<LanguageDef> languages = new List<LanguageDef>();
            bool selectionDone = false;
            foreach (XElement element in languagesXml.Elements("Language"))
            {

                bool selected = false;

                if (string.IsNullOrEmpty(clientPreferredCultureName))
                {
                    XAttribute selectedAttribute = element.Attribute("Selected");
                    selected = (selectedAttribute != null && (bool)selectedAttribute);
                }
                else
                {
                    if (selectionDone==false)
                    {
                        selected = (element.Attribute("Key").Value.ToLowerInvariant().StartsWith(clientPreferredCultureName));
                        selectionDone = selected;
                    }
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
        public bool SetUp(string setupDescriptionXML, string username, string email, string password, string language, string consolelanguage, bool newsletter)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized) return true;

            SystemSetupFacade.SetupIsRunning = true;
            SystemSetupFacade.IsSystemFirstTimeInitialized = true;

            try
            {
                return SetupServiceFacade.SetUp(setupDescriptionXML, username, password, email, language, consolelanguage, newsletter);
            }
            catch(Exception ex)
            {
                Log.LogError(LogTitle, ex);
                throw;
            }
        }



        private bool HasWritePermission()
        {
            try
            {
                TestNtfsAccessToFolder(Server.MapPath("~/"));
                TestNtfsAccessToFolder(Server.MapPath("~/App_Data"));
                TestNtfsAccessToFolder(Server.MapPath("~/Frontend"));
                TestNtfsAccessToFolder(Server.MapPath("~/Composite/Setup"));

                CheckAccessToFile(Server.MapPath("~/default.aspx"));
                CheckAccessToFile(Server.MapPath("~/Frontend/Config/VisualEditor/Common.xml"));

                if (FileIsReadOnly(Server.MapPath("~/web.config"))
                    || FileIsReadOnly(Server.MapPath("~/App_Data/Composite/Composite.config"))
                    || !PathUtil.WritePermissionGranted(Server.MapPath("~/web.config"))
                    || !PathUtil.WritePermissionGranted(Server.MapPath("~/App_Data/Composite/Composite.config")))
                {
                    return false;
                }

                return true;
            }
            catch (UnauthorizedAccessException)
            {
                return false;
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild) throw;

                return false;
            }
        }

        private static void CheckAccessToFile(string file)
        {
            FileAttributes fa = C1File.GetAttributes(file);
            bool isReadOnly = (fa & FileAttributes.ReadOnly) > 0;

            if(isReadOnly)
            {
                C1File.SetAttributes(file, fa ^ FileAttributes.ReadOnly);
            }

            DateTime creationTime = C1File.GetCreationTimeUtc(file);

            C1File.SetCreationTimeUtc(file, creationTime.AddDays(-1));
            C1File.SetCreationTimeUtc(file, creationTime);

            if(isReadOnly)
            {
                C1File.SetAttributes(file, fa);
            }
        }

        private static bool FileIsReadOnly(string file)
        {
            bool @readonly = (File.GetAttributes(file) & FileAttributes.ReadOnly) > 0;

            if(@readonly)
            {
                Log.LogError(LogTitle, "File '{0}' is read only".FormatWith(Path.GetFileName(file)));
            }

            return @readonly;
        }

        private static void TestNtfsAccessToFolder(string testDir)
        {
            string filePath = Path.Combine(testDir, "NtfsSecurityTest.xml");

            if (C1File.Exists(filePath))
            {
                FileUtils.Delete(filePath);
            }

            string tempDirectory = Path.Combine(testDir, "NtfsSecurityTest");
            if (C1Directory.Exists(tempDirectory) == false)
            {
                C1Directory.CreateDirectory(tempDirectory);
            }

            C1File.WriteAllLines(filePath, new[] { "That file is created for testing purpuses" });

            C1File.SetCreationTime(filePath, DateTime.Now.Subtract(TimeSpan.FromSeconds(45)));

            FileUtils.Delete(filePath);
            C1Directory.Delete(tempDirectory);
        }


        private bool BasePathNotToLong()
        {
            return Context.Server.MapPath("~\\").Length <= GlobalSettingsFacade.MaximumRootPathLength;
        }



        private bool HasConnectionToPackageServer()
        {
            try
            {
                return SetupServiceFacade.PingServer();
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild) throw;
            }

            return false;
        }



        private bool BrowserCheck()
        {
            return true; // Fake! This check is made by the client before this service is even invoked.
        }

        private bool WebServerVersionCheck()
        {
            string iisVersion = Context.Request.ServerVariables["SERVER_SOFTWARE"];

            return (iisVersion != "Microsoft-IIS/5.0") && (iisVersion != "Microsoft-IIS/5.1") && (iisVersion != "Microsoft-IIS/6.0") && (iisVersion != "Microsoft-IIS/7.0") && (iisVersion != "Microsoft-IIS/7.5");
        }

        private bool WebsocketCheck()
        {
            try
            {
                Context.AcceptWebSocketRequest( f=> null );
            }
            catch (Exception ex)
            {
                return ex.HResult != -2146233031;
            }

            return false;
        }

        private bool DiskSpaceCheck()
        {
            try
            {
                string siteRoot = Context.Server.MapPath("~\\");
                string diskRoot = C1Directory.GetDirectoryRoot(siteRoot);

                ulong lpFreeBytesAvailable, lpTotalNumberOfBytes, lpTotalNumberOfFreeBytes;

                GetDiskFreeSpaceEx(diskRoot, out lpFreeBytesAvailable, out lpTotalNumberOfBytes, out lpTotalNumberOfFreeBytes);

                // lpFreeBytesAvailable can be zero in certain hosting situations - the 0 check is a temp work around
                return (lpFreeBytesAvailable == 0) || (lpFreeBytesAvailable > 40 * 1024 * 1024);
            }
            catch (Exception)
            {
                if (RuntimeInformation.IsDebugBuild) throw;

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
