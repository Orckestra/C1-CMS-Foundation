using System;
using System.Linq;
using System.Web;
using Composite.Core.Configuration;

namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class CookieHandler
    {
        /// <summary>
        /// Gets a cookie value specific for the current application instance (port and virtual path). 
        /// The actual cookie name will be appended port and path info to ensure a unique cookie across multiple
        /// C1 sites running on the same host name. 
        /// To have explicit control over cookie naming, use the ASP.NET Cookies class.
        /// </summary>
        /// <param name="cookieName">The name used to set this cookie</param>
        /// <returns>Value of the cookie, or null if the cookie was not found</returns>
        public static string Get(string cookieName)
        {
            var context = HttpContext.Current;
            Verify.That(context != null, "HttpContext is not available.");

            cookieName = GetApplicationSpecificCookieName(cookieName);

            var responseCookie = GetCookie(context.Response.Cookies, cookieName);
            if (responseCookie != null)
            {
                return responseCookie.Value;
            }

            var requestCookie = GetCookie(context.Request.Cookies, cookieName);
            if (requestCookie != null)
            {
                return requestCookie.Value;
            }

            return null;
        }


        /// <summary>
        /// Sets a cookie specific for the current application instance (port and virtual path). In order to read this cookie you should use the Get() methos on this class. 
        /// To have explicit control over cookie naming, use the ASP.NET Cookies class.
        /// </summary>
        public static void Set(string cookieName, string value)
        {
            SetCookieInternal(cookieName, value);
        }


        /// <summary>
        /// Sets a cookie specific for the current application instance (port and virtual path). In order to read this cookie you should use the Get() methos on this class. 
        /// To have explicit control over cookie naming, use the ASP.NET Cookies class.
        /// </summary>
        public static void Set(string cookieName, string value, DateTime expires)
        {
            var cookie = SetCookieInternal(cookieName, value);
            cookie.Expires = expires;
        }

        internal static HttpCookie SetCookieInternal(string cookieName, string value)
        {
            cookieName = GetApplicationSpecificCookieName(cookieName);
            var cookie = HttpContext.Current.Response.Cookies[cookieName];
            cookie.Value = value;

            return cookie;
        }

        internal static string GetApplicationSpecificCookieName(string cookieName)
        {
            int siteUniqueHash = InstallationInformationFacade.InstallationId.GetHashCode();
            return string.Format("{0}_{1}_{2}", cookieName, siteUniqueHash, UrlUtils.PublicRootPath.GetHashCode());
        }

        private static HttpCookie GetCookie(HttpCookieCollection cookies, string key)
        {
            if(!cookies.AllKeys.Any(cookieKey => cookieKey == key))
            {
                return null;
            }

            return cookies[key];
        }
    }
}
