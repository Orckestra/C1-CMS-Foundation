using System;
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

        public override string ApplicationPath
        {
            get { return HostingEnvironment.ApplicationVirtualPath; }
        }

        public override string PhysicalApplicationPath
        {
            get { return HostingEnvironment.ApplicationPhysicalPath; }
        }

        public override HttpCookieCollection Cookies
        {
            get { return _cookies ?? (_cookies = new HttpCookieCollection()); }
        }

        public override bool IsLocal
		{
			get { return false; }
		}

        public override NameValueCollection Form
        {
            get { return _form ?? (_form = new NameValueCollection()); }
        }

        public override NameValueCollection Headers
        {
            get { return _headers ?? (_headers = new NameValueCollection());}
        }

        public override string HttpMethod
        {
            get { return "GET"; }
        }

        public override bool IsAuthenticated
        {
            get { return false; }
        }

        public override bool IsSecureConnection
        {
            get { return false; }
        }

        public override string this[string key]
        {
            get { return null; }
        }

        public override NameValueCollection Params
        {
            get { return _params ?? (_params = new NameValueCollection()); }
        }

        public override string PathInfo
        {
            get { return null; }
        }

        public override NameValueCollection QueryString
        {
            get { return _queryString ?? (_queryString = new NameValueCollection()); }
        }

        public override string RequestType 
        {
            get { return HttpMethod; }
            set { throw new NotSupportedException();} 
        }

        public override NameValueCollection ServerVariables
        {
            get { return _serverVariables ?? (_serverVariables = new NameValueCollection()); }
        }

        public override string UserAgent
        {
            get { return ""; }
        }
    }
}
