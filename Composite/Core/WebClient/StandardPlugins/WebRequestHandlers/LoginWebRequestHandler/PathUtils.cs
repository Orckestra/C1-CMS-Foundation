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
