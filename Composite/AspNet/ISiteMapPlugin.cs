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
        /// Retrieves the child nodes of a specific <see cref="SiteMapNode"/>.
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        List<SiteMapNode> GetChildNodes(SiteMapNode node);

        /// <summary>
        /// Retrieves the parent node of a specific <see cref="SiteMapNode"/> object.
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        SiteMapNode GetParentNode(SiteMapNode node);

        /// <summary>
        /// Retrieves a <see cref="SiteMapNode"/> object that represents a page.
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="rawUrl"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNode(SiteMapProvider provider, string rawUrl);

        /// <summary>
        /// Retrieves a <see cref="SiteMapNode"/> object based on <see cref="HttpContextBase"/>.
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNode(SiteMapProvider provider, HttpContextBase context);

        /// <summary>
        /// Retrieves a <see cref="SiteMapNode"/> object based on a specified key.
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        SiteMapNode FindSiteMapNodeFromKey(SiteMapProvider provider, string key);

        /// <summary>
        /// Retrieves a Boolean value indicating whether the specified <see cref="SiteMapNode"/> object can be viewed by the user in the specified context.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="node"></param>
        /// <returns></returns>
        bool IsAccessibleToUser(HttpContextBase context, SiteMapNode node);
    }
}
