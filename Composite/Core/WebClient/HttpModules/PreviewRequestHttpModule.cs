using System;
using System.IO;
using System.Text;
using System.Web;
using Composite.Core.Routing.Pages;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.WebClient.HttpModules
{
    internal class PreviewRequestHttpModule : IHttpModule
    {
        private static readonly string PreviewUrlPrefix = UrlUtils.AdminRootPath + "/preview.ashx";
        private static readonly string PreviewUrlMarker = "shx";

        public void Init(HttpApplication context)
        {
            context.BeginRequest += HandlePreviewRequest;
        }

        private static void HandlePreviewRequest(object sender, EventArgs e)
        {
            var httpContext = HttpContext.Current;

            // For better performance, doing a quick check first
            if(!httpContext.Request.RawUrl.Contains(PreviewUrlMarker))
            {
                return;
            }

            string pathAndQuery = httpContext.Request.Url.PathAndQuery;

            if (!pathAndQuery.StartsWith(PreviewUrlPrefix) 
                || !UserValidationFacade.IsLoggedIn())
            {
                return;
            }

            string query = pathAndQuery.Substring(PreviewUrlPrefix.Length);

            // Trying to extract hostname
            if(query.Length > 3 && query[0] == '/')
            {
                int hostNameEnding = query.IndexOf('/', 1);
                if(hostNameEnding > 0)
                {
                    string hostname = query.Substring(1, hostNameEnding - 1);
                    
                    httpContext.Items[C1PageRoute.HttpContextItem_Hostname] = hostname;
                    query = query.Substring(hostNameEnding);
                }
            }

            httpContext.RewritePath(query);

            httpContext.Response.Filter = new PreviewUrlConversionStream(httpContext.Response.Filter);
        }

        public void Dispose()
        {
        }

        internal class PreviewUrlConversionStream : Utf8StringTransformationStream
        {
            public PreviewUrlConversionStream(Stream innerStream) : base(innerStream) { }

            public override string Process(string str)
            {
                string currentHostname = HttpContext.Current.Request.Url.Host;

                var sb = new StringBuilder(str);

                sb.Replace("href=\"/", "href=\"" + PreviewUrlPrefix + "/" + currentHostname + "/");
                sb.Replace("action=\"/", "action=\"" + PreviewUrlPrefix + "/" + currentHostname + "/");

                foreach(var binding in DataFacade.GetData<IHostnameBinding>(true))
                {
                    string hostname = binding.Hostname;

                    sb.Replace("href=\"http://" + hostname + "/", "href=\"" + PreviewUrlPrefix + "/" + hostname + "/");
                }

                return sb.ToString();
            }
        }
    }
}
