using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Web;
using System.Web.Hosting;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorRequest : HttpRequestBase
    {
        private NameValueCollection _form;
        private NameValueCollection _queryString;
        private NameValueCollection _headers;
        private NameValueCollection _params;
        private NameValueCollection _serverVariables;
        private HttpCookieCollection _cookies;
        private HttpBrowserCapabilitiesBase _browser;

        public override string ApplicationPath => HostingEnvironment.ApplicationVirtualPath;
        public override string PhysicalApplicationPath => HostingEnvironment.ApplicationPhysicalPath;

        public override HttpBrowserCapabilitiesBase Browser => _browser ?? (_browser = new HttpBrowserCapabilitiesWrapper(new HttpBrowserCapabilities
        {
            Capabilities = new Dictionary<string, string>()
        }));

        public override HttpCookieCollection Cookies => _cookies ?? (_cookies = new HttpCookieCollection());
        public override bool IsLocal => false;
        public override NameValueCollection Form => _form ?? (_form = new NameValueCollection());
        public override NameValueCollection Headers => _headers ?? (_headers = new NameValueCollection());
        public override string HttpMethod => "GET";
        public override bool IsAuthenticated => false;
        public override bool IsSecureConnection => false;
        public override string this[string key] => null;
        public override NameValueCollection Params => _params ?? (_params = new NameValueCollection());
        public override string PathInfo => null;
        public override NameValueCollection QueryString => _queryString ?? (_queryString = new NameValueCollection());

        public override string RequestType
        {
            get => HttpMethod;
            set => throw new NotSupportedException();
        }

        public override NameValueCollection ServerVariables => _serverVariables ?? (_serverVariables = new NameValueCollection());
        public override string UserAgent => "";
    }
}
