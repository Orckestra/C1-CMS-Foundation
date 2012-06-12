using System.Web;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorRequest : HttpRequestBase
	{
		public override bool IsLocal
		{
			get { return false; }
		}
	}
}
