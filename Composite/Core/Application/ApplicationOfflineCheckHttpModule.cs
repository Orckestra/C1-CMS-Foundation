using System;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.IO;


namespace Composite.Core.Application
{
	internal class ApplicationOfflineCheckHttpModule: IHttpModule
	{
	    private static bool _isOffline;
        private static string _responceHtml;

        public void Init(HttpApplication context)
        {
            context.BeginRequest += HttpApplication_BeginRequest;
        }

        protected virtual void HttpApplication_BeginRequest(object sender, EventArgs e)
        {
            var context = ((HttpApplication)sender).Context;

            if (!IsOffline ||
                context.Request.FilePath.EndsWith("/Composite/services/LogService/LogService.svc", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            context.Response.Clear();
            context.Response.Write(_responceHtml);
            context.Response.StatusCode = 480; /* Temporary unavailable*/
            context.Response.Flush();

            context.ApplicationInstance.CompleteRequest();
        }

	    public static bool IsOffline
	    {
	        get
	        {
	            return _isOffline;
	        }
            set
            {
                _isOffline = value;
                if(!_isOffline)
                {
                    return;
                }

                string filePath = FilePath;
                Verify.That(!filePath.IsNullOrEmpty(), "Path to 'app_offline.html' has not been set");
                try
                {
                    _responceHtml = C1File.ReadAllText(filePath);
                }
                catch(Exception e)
                {
                    _responceHtml = string.Empty;
                    Core.Logging.LoggingService.LogWarning("Failed to load file '{0}'".FormatWith(filePath), e);
                }
            }

	    }

        public static string FilePath { get; set; }

        public void Dispose()
        {
        }
    }
}
