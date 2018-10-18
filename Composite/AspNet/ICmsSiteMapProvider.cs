using System.Collections.Generic;

namespace Composite.AspNet
{
    /// <summary>
    /// An inteface for getting site map data required for rendering /Sitemap.xml file.
    /// </summary>
    public interface ICmsSiteMapProvider
    {
        /// <summary>
        /// Gets the root nodes.
        /// </summary>
        ICollection<CmsPageSiteMapNode> GetRootNodes();
    }
}
