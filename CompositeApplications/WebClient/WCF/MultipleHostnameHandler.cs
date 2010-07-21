using System;
using System.IO;
using System.Web;
using Composite.Collections.Generic;
using Composite.Extensions;

namespace Composite.WebClient.WCF
{
    public class MultipleHostnameHandler : IHttpModule
    {
        private readonly string _serviceFolderPath;
        private readonly string _serviceFileName;
        private readonly string _serviceFilePath;
        private readonly string _mappedServiceFolderPath;

        private static readonly object _syncRoot = new object();

        private static readonly Type WcfHttpHandler = typeof(System.ServiceModel.Activation.ServiceHostFactory)
            .Assembly.GetType("System.ServiceModel.Activation.ServiceHttpHandlerFactory+ServiceHttpHandler");

        private IHttpHandler _httpHandler; // Shouldn't be static since the instance isn't thread safe

        private static readonly Hashtable<string, Hashtable<string, string>> _urlResolvingTable = new Hashtable<string, Hashtable<string, string>>();

        public MultipleHostnameHandler(string serviceFolderPath, string serviceFileName, string mappedServiceFolderPath)
        {
            _serviceFolderPath = serviceFolderPath;
            _serviceFileName = serviceFileName;
            _serviceFilePath = serviceFolderPath + "/" + serviceFileName;
            _mappedServiceFolderPath = mappedServiceFolderPath;
        }

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

            int serviceExtensionOffset = rawRequestUrl.IndexOf(".svc");
            if (serviceExtensionOffset < 0)
            {
                return;
            }

            string servicePath = rawRequestUrl.Substring(0, serviceExtensionOffset + 4);
            if (!servicePath.EndsWith(_serviceFilePath, StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            string mappedServiceUrl = GetMappedServicePath(httpContext, servicePath);

            string infoPath = (serviceExtensionOffset + 4 == rawRequestUrl.Length) ? string.Empty : rawRequestUrl.Substring(serviceExtensionOffset + 4);

            // TODO: fix the QueryString part
            httpContext.RewritePath(mappedServiceUrl, infoPath, string.Empty);

            // Executing the request here in order to avoid execution of other http modules
            if (_httpHandler == null)
            {
                _httpHandler = (IHttpHandler)WcfHttpHandler.GetConstructor(new Type[0]).Invoke(null);
            }
            _httpHandler.ProcessRequest(httpContext);

            httpContext.ApplicationInstance.CompleteRequest();
        }

        private string GetMappedServicePath(HttpContext httpContext, string servicePath)
        {
            Uri uri = httpContext.Request.Url;

            string hostKey = uri.Host + "$" + uri.Port;

            Hashtable<string, string> urlResolving = _urlResolvingTable.EnsureValue(hostKey, () => new Hashtable<string, string>());

            string mappedUrl = urlResolving[servicePath];

            if (mappedUrl != null)
            {
                return mappedUrl;
            }

            lock (_syncRoot)
            {
                mappedUrl = urlResolving[servicePath];

                if (mappedUrl != null)
                {
                    return mappedUrl;
                }

                string basePath = httpContext.Server.MapPath(_serviceFolderPath);

                string newRelativeFolderUrl = _mappedServiceFolderPath.FormatWith(uri.Host, uri.Port);

                string mappedDirectory = httpContext.Server.MapPath(newRelativeFolderUrl);

                if (!Directory.Exists(mappedDirectory))
                {
                    Directory.CreateDirectory(mappedDirectory);
                }

                // Copying service file
                string sourcePhysicalFile = basePath + "\\" + _serviceFileName;
                string mappedPhysicalFile = mappedDirectory + "\\" + _serviceFileName;

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

                mappedUrl = servicePath.Substring(0, servicePath.Length - _serviceFilePath.Length) + newRelativeFolderUrl + "/" +
                            _serviceFileName;

                urlResolving.Add(servicePath, mappedUrl);
            }

            return mappedUrl;
        }
    }
}
