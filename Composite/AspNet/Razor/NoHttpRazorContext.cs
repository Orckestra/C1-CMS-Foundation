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
		public override IDictionary Items
		{
			get { return _items; }
		}

		private readonly HttpRequestBase _request = new NoHttpRazorRequest();
		public override HttpRequestBase Request
		{
			get { return _request; }
		}

        private readonly PageInstrumentationService _pageInstrumentation = new PageInstrumentationService();
        public override PageInstrumentationService PageInstrumentation
        {
            get { return _pageInstrumentation; }
        }

        public override HttpServerUtilityBase Server
        {
            get { throw new NotSupportedException("Usage of 'Server' isn't supported without HttpContext. Use System.Web.HttpUtility for [html|url] [encoding|decoding]"); }
        }

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