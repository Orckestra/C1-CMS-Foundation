using System.Collections.Generic;
using System.Net;
using System.Web;
using WampSharp.V2.Authentication;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class AspNetCookieProvider : CookieCollectionCookieProvider
    {
        public AspNetCookieProvider(HttpContext httpContext) :
            base(GetCookieCollection(httpContext))
        {
        }

        private static CookieCollection GetCookieCollection(HttpContext httpContext)
        {
            CookieCollection result = new CookieCollection();

            foreach (KeyValuePair<string, string> cookie in httpContext.Request.Cookies)
            {
                result.Add(new Cookie(cookie.Key, cookie.Value));
            }

            return result;
        }
    }
}