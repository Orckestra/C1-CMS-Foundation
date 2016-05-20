using System;
using System.Globalization;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing.Pages;
using Composite.Data;

namespace Composite.VersionPublishing
{
    class VersionHttpModule : IHttpModule
    {
        private const string HttpContextItemsKey = nameof(VersionHttpModule) + ":DataScope";

        private void SetVersioningServiceFromUrlPath(DataScope dataScope, string pathInfo)
        {
            if (VersionNameUrlHelper.CheckIfAdminUrl(pathInfo))
            {
                dataScope.AddService(VersioningServiceSettings.NoFiltering());
                return;
            }

            var versionName = VersionNameUrlHelper.ResolveVersionName(pathInfo);
            if (!versionName.IsNullOrEmpty())
            {
                C1PageRoute.RegisterPathInfoUsage();
                dataScope.AddService(VersioningServiceSettings.ByName(versionName));
            }
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
            context.EndRequest += context_EndRequest;
        }

        private void context_EndRequest(object sender, EventArgs e)
        {
            var httpContext = ((HttpApplication)sender).Context;

            var dataScope = httpContext.Items[HttpContextItemsKey] as DataScope;
            dataScope?.Dispose();
        }

        private void context_BeginRequest(object sender, EventArgs e)
        {
            var httpContext = ((HttpApplication)sender).Context;

            var dataScope = new DataScope(null as CultureInfo);
            httpContext.Items[HttpContextItemsKey] = dataScope;

            SetVersioningServiceFromUrlPath(dataScope, httpContext.Request.Path);
        }

        public void Dispose()
        {
        }
    }
}
