using System;
using System.IO;
using System.Web;
using Composite.Collections.Generic;
using Composite.StringExtensions;
using Composite.WebClient;

namespace Composite.Logging.WCF
{
	internal class LoggerHostnameHandler: IHttpModule
	{
	    private static readonly string ServiceFolderPath = "/services/LogService";
        private static readonly string ServiceFileName = "LogService.svc";
        private static readonly string ServiceFilePath = ServiceFolderPath + "/" + ServiceFileName;
        private static readonly string MappedServiceFolderPath = "/services/LogService/{0}_{1}";

	    private static readonly object _syncRoot = new object();

        private static readonly Type WcfHttpHandler = typeof(System.ServiceModel.Activation.ServiceHostFactory)
            .Assembly.GetType("System.ServiceModel.Activation.ServiceHttpHandlerFactory+ServiceHttpHandler");

	    private IHttpHandler _httpHandler; // Shouldn't be static since the instance isn't thread safe

        private static readonly Hashtable<string, Hashtable<string, string>> _urlResolvingTable = new Hashtable<string, Hashtable<string, string>>();

        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += OnBeginRequest;
        }

        private void OnBeginRequest(object sender, EventArgs e)
        {
            var httpContext = HttpContext.Current;

            string rawRequestUrl = httpContext.Request.RawUrl;
            if (rawRequestUrl[rawRequestUrl.Length - 1] != 'c'
                || !httpContext.Request.RawUrl.EndsWith(ServiceFilePath, true))
            {
                return;
            }

            string host = httpContext.Request.Url.Host;
            int port = httpContext.Request.Url.Port;
            string hostKey = host + "_" + port;

            Hashtable<string, string> urlResolving = 
                _urlResolvingTable.EnsureValue(hostKey, () => new Hashtable<string, string>());


            string mappedUrl = urlResolving[httpContext.Request.RawUrl];

            if (mappedUrl == null)
            {
                lock (_syncRoot)
                {
                    mappedUrl = urlResolving[httpContext.Request.RawUrl];

                    if (mappedUrl == null)
                    {
                        string basePath = httpContext.Server.MapPath(UrlUtils.AdminRootPath + ServiceFolderPath);

                        string newRelativeFolderUrl = MappedServiceFolderPath.FormatWith(host, port);

                        string mappedDirectory =
                            httpContext.Server.MapPath(UrlUtils.AdminRootPath + newRelativeFolderUrl);

                        if (!Directory.Exists(mappedDirectory))
                        {
                            Directory.CreateDirectory(mappedDirectory);
                        }

                        // Copying service file
                        string sourcePhysicalFile = basePath + "\\" + ServiceFileName;
                        string mappedPhysicalFile = mappedDirectory + "\\" + ServiceFileName;

                        if ((RuntimeInformation.IsDebugBuild == false) || (File.Exists(mappedPhysicalFile) == false))
                        {
                            try
                            {
                                File.Copy(sourcePhysicalFile, mappedPhysicalFile, true);
                            }
                            catch (UnauthorizedAccessException)
                            {
                                // Do nothing, if the file is held by another process...
                            }
                        }

                        string url = httpContext.Request.RawUrl;
                        mappedUrl = url.Substring(0, url.Length - ServiceFilePath.Length) + newRelativeFolderUrl + "/" +
                                    ServiceFileName;

                        urlResolving.Add(rawRequestUrl, mappedUrl);
                    }
                }
            }
            httpContext.RewritePath(mappedUrl);

            // Executing the request here in order to avoid execution of other http modules
            if(_httpHandler == null)
            {
                _httpHandler = (IHttpHandler)WcfHttpHandler.GetConstructor(new Type[0]).Invoke(null);
            }
            _httpHandler.ProcessRequest(httpContext);

            httpContext.ApplicationInstance.CompleteRequest();
        }
	}
}
