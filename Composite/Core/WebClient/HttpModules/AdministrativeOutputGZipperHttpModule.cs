using System;
using System.IO;
using System.Reflection;
using System.Web;


namespace Composite.Core.WebClient.HttpModules
{
    [Obsolete("This feature is build-in on IIS7", true)]
    internal class AdministrativeOutputGZipperHttpModule : IHttpModule
    {
        private static PropertyInfo _headersWrittenPropertyInfo;
        
        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += context_AuthenticateRequest;
            context.EndRequest += context_EndRequest;
        }

        public void context_EndRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication) sender;
            HttpContext context = application.Context;
            bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

            if (!adminRootRequest) return;


            string requestPathExtension = Path.GetExtension(context.Request.Path).ToLowerInvariant();

            if (requestPathExtension == ".aspx" || requestPathExtension == ".asmx" || requestPathExtension == ".cshtml")
            {
                SetResponseHeaders();
            }
        }


        void context_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            bool adminRootRequest = UrlUtils.IsAdminConsoleRequest(context);

            if (adminRootRequest)
            {
                string requestPathExtension = Path.GetExtension(context.Request.Path).ToLowerInvariant();

                if (requestPathExtension == ".aspx" || requestPathExtension == ".asmx")
                {
                    GZipEncodePage();
                }
            }
        }


        public void Dispose()
        {
        }


        /// <summary>
        /// Determines if GZip is supported
        /// </summary>
        /// <returns></returns>
        public static bool IsGZipSupported()
        {
            string AcceptEncoding = HttpContext.Current.Request.Headers["Accept-Encoding"];
            if (!string.IsNullOrEmpty(AcceptEncoding) &&
                 (AcceptEncoding.Contains("gzip") || AcceptEncoding.Contains("deflate")))
                return true;
            return false;
        }


        /// <summary>
        /// Sets up the current page or handler to use GZip through a Response.Filter
        /// IMPORTANT:  
        /// You have to call this method before any output is generated!
        /// </summary>
        public static void GZipEncodePage()
        {
            if (IsGZipSupported())
            {
                HttpResponse Response = HttpContext.Current.Response;

                string AcceptEncoding = HttpContext.Current.Request.Headers["Accept-Encoding"];
                if (AcceptEncoding.Contains("gzip"))
                {
                    Response.Filter = new System.IO.Compression.GZipStream(Response.Filter,
                                              System.IO.Compression.CompressionMode.Compress);
                }
                else
                {
                    Response.Filter = new System.IO.Compression.DeflateStream(Response.Filter,
                                              System.IO.Compression.CompressionMode.Compress);
                }
            }
        }


        public static void SetResponseHeaders()
        {
            if (!IsGZipSupported())
            {
                return;
            }

            var httpContext = HttpContext.Current;

            if (HeadersWritten(httpContext.Response))
            {
                return;
            }

            string AcceptEncoding = httpContext.Request.Headers["Accept-Encoding"];

            string encoding = AcceptEncoding.Contains("gzip") ? "gzip" : "deflate";

            httpContext.Response.AppendHeader("Content-Encoding", encoding);
        }


        private static bool HeadersWritten(HttpResponse response)
        {
            return (bool)HeadersWrittenPropertyInfo.GetValue(response, new object[0]);
        }

        private static PropertyInfo HeadersWrittenPropertyInfo
        {
            get
            {
                if(_headersWrittenPropertyInfo == null)
                {
                    _headersWrittenPropertyInfo = typeof (HttpResponse).GetProperty("HeadersWritten", BindingFlags.Instance |BindingFlags.NonPublic);
                }
                return _headersWrittenPropertyInfo;
            }
        }

    }
}
