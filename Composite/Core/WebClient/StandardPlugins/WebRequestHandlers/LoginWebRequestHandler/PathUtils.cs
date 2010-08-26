using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Configuration;
using System.Web;
using Composite.Core.WebClient;

namespace Composite.Plugins.WebClient.WebRequestHandlers.LoginWebRequestHandler
{
    internal class PathUtils
    {
        public static string GetResourceUrl( string relativeResourcePath )
        {
            return UrlUtils.Combine(UrlUtils.ResolveAdminUrl("content/misc/gatekeeper"), relativeResourcePath);
        }
    }
}
