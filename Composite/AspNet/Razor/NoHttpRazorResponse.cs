using System.Collections.Specialized;
using System.Web;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorResponse : HttpResponseBase
    {
        private NameValueCollection _headers;
        private HttpCookieCollection _cookies;

        public override HttpCookieCollection Cookies => _cookies ?? (_cookies = new HttpCookieCollection());
        public override NameValueCollection Headers => _headers ?? (_headers = new NameValueCollection());
    }
}
