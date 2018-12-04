using System;
using System.Web;

namespace Composite.AspNet
{
    /// <summary>
    /// Provides infomation that is used as an addition to <see cref="SiteMapNode"/> when generating sitemap xml file.
    /// See https://www.sitemaps.org for details
    /// </summary>
    public interface ISchemaOrgSiteMapNode
    {
        /// <summary>
        /// Gets the last modification time.
        /// </summary>
        /// <value>
        /// The last modification time.
        /// </value>
        DateTime LastModified { get; }

        /// <summary>
        /// Gets the change frequency.
        /// </summary>
        /// <value>
        /// The change frequency.
        /// </value>
        SiteMapNodeChangeFrequency? ChangeFrequency { get; }

        /// <summary>
        /// Gets the priority.
        /// </summary>
        /// <value>
        /// The priority.
        /// </value>
        int? Priority { get; }
    }
}
