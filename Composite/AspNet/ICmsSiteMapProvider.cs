using System.Collections.Generic;

namespace Composite.AspNet
{
    /// <exclude />
    public interface ICmsSiteMapProvider
    {
        /// <exclude />
        ICollection<CmsPageSiteMapNode> GetRootNodes();
    }
}
