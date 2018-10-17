using System.Collections.Generic;
using System.Web;

namespace Composite.AspNet
{
    /// <summary>
    /// Defines the contract for a plugin to interact with <see cref="CmsPageSiteMapProvider" /> to provide <see cref="SiteMapNode"/> and handle security trimming
    /// </summary>
    public interface ISiteMapPlugin
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        List<SiteMapNode> GetChildNodes(SiteMapNode node);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        SiteMapNode GetParentNode(SiteMapNode node);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="rawUrl"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNode(SiteMapProvider provider, string rawUrl);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNode(SiteMapProvider provider, HttpContextBase context);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNodeFromKey(SiteMapProvider provider, string key);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="node"></param>
        /// <returns></returns>
        bool IsAccessibleToUser(HttpContextBase context, SiteMapNode node);
    }
}
