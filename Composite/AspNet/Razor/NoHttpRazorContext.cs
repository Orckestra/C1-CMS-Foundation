using System.Collections;
using System.Web;
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

		public NoHttpRazorContext()
		{
			ScopeStorage.CurrentProvider = new StaticScopeStorageProvider();
		}
	}
}
