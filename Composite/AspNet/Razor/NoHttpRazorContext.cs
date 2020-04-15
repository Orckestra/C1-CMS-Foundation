using System;
using System.Collections;
using System.Web;
using System.Web.Instrumentation;
using System.Web.WebPages.Scope;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorContext : HttpContextBase
    {
        private readonly IDictionary _items = new Hashtable();
        private readonly HttpRequestBase _request = new NoHttpRazorRequest();
        private readonly HttpResponseBase _response = new NoHttpRazorResponse();
        private readonly PageInstrumentationService _pageInstrumentation = new PageInstrumentationService();

        public override IDictionary Items => _items;
		public override HttpRequestBase Request => _request;
        public override HttpResponseBase Response => _response;
        public override PageInstrumentationService PageInstrumentation => _pageInstrumentation;

        public override HttpServerUtilityBase Server => throw new NotSupportedException("Usage of 'Server' isn't supported without HttpContext. Use System.Web.HttpUtility for [html|url] [encoding|decoding]");

        public override object GetService(Type serviceType)
        {
            return null;
        }

        public NoHttpRazorContext()
		{
			ScopeStorage.CurrentProvider = new StaticScopeStorageProvider();
		}
    }
}