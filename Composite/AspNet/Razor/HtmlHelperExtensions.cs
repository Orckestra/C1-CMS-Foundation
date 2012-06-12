using System.Web.WebPages.Html;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Add C1 specific extension methods for Razor functions
    /// </summary>
	public static class HtmlHelperExtensions
	{
        /// <summary>
        /// Exposes C1 specific functionality
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
		public static C1HtmlHelper C1(this HtmlHelper helper)
		{
			return new C1HtmlHelper(helper);
		}
	}
}
