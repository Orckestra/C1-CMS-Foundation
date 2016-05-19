using System;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing.Pages;
using Composite.Data;

namespace Composite.VersionPublishing
{
    class VersionHttpModule : IHttpModule
    {
        private DataConnection _dataConnection;

        private void SetVersioningServiceFromUrlPath(string pathInfo)
        {
            if (VersionNameUrlHelper.CheckIfAdminUrl(pathInfo))
            {
                _dataConnection.AddService(VersioningServiceSettings.NoFiltering());
                return;
            }
            var versionName = VersionNameUrlHelper.ResolveVersionName(pathInfo);
            if (!versionName.IsNullOrEmpty())
            {
                C1PageRoute.RegisterPathInfoUsage();
                _dataConnection.AddService(VersioningServiceSettings.ByName(versionName));
            }
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
            context.EndRequest += context_EndRequest;
        }

        private void context_EndRequest(object sender, EventArgs e)
        {
            _dataConnection.Dispose();
        }

        private void context_BeginRequest(object sender, EventArgs e)
        {
            var httpApplication = sender as HttpApplication;
            if (httpApplication == null) return;

            _dataConnection = new DataConnection();
            var httpContext = httpApplication.Context;
            SetVersioningServiceFromUrlPath(httpContext.Request.Path);
        }

        public void Dispose()
        {
        }
    }
}
