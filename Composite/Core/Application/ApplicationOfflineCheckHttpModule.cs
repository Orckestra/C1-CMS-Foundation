using System;
using System.IO;
using System.Web;
using Composite.Core.Extensions;


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
            if(!IsOffline) 
                return;

            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            context.Response.Clear();
            context.Response.Write(_responceHtml);
            context.Response.StatusCode = 404;
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
                    _responceHtml = File.ReadAllText(filePath);
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
