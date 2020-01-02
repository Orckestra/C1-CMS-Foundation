using System.Globalization;
using System.Web;

namespace Composite.AspNet
{
    /// <summary>
    /// Used as an extension to <see cref="SiteMapNode"/> when building a ASP.NET sitemap based on cms pages.
    /// </summary>
    public interface ICmsSiteMapNode
    {
        /// <summary>
        /// Gets the culture to which the site map node belongs.
        /// </summary>
        /// <value>
        /// The culture.
        /// </value>
        CultureInfo Culture { get; }
    }
}
