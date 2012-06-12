using System.Web.WebPages.Html;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Add C1 specific extension methods for Razor functions
    /// </summary>
	public static class HtmlHelperExtensions
	{
		public static C1HtmlHelper C1(this HtmlHelper helper)
		{
			return new C1HtmlHelper(helper);
		}
	}
}
