using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.AspNet
{
    /// <exclude />
    public class CmsPagesSiteMapPlugin : ISiteMapPlugin
    {
        /// <exclude />
        public List<SiteMapNode> GetChildNodes(SiteMapNode node)
        {
            var pageSiteMapNode = node as CmsPageSiteMapNode;
            if (pageSiteMapNode != null)
            {
                using (new DataScope(pageSiteMapNode.Culture))
                {
                    var pageChildNodes = PageManager.GetChildrenIDs(pageSiteMapNode.Page.Id)
                        .Select(PageManager.GetPageById)
                        .Where(p => p != null)
                        .Select(p => new CmsPageSiteMapNode(node.Provider, p))
                        .OfType<SiteMapNode>()
                        .ToList();

                    return pageChildNodes;
                }
            }

            return null;
        }

        /// <exclude />
        public SiteMapNode GetParentNode(SiteMapNode node)
        {
            var pageSiteMapNode = node as CmsPageSiteMapNode;
            if (pageSiteMapNode != null)
            {
                IPage parentPage = null;

                using (new DataScope(pageSiteMapNode.Culture))
                {
                    var parentPageId = PageManager.GetParentId(pageSiteMapNode.Page.Id);
                    if (parentPageId != Guid.Empty)
                    {
                        parentPage = PageManager.GetPageById(parentPageId);
                    }
                }

                if (parentPage != null)
                {
                    return new CmsPageSiteMapNode(node.Provider, parentPage);
                }

                return node.Provider.ParentProvider?.GetParentNode(node);
            }

            return null;
        }

        /// <exclude />
        public SiteMapNode FindSiteMapNode(SiteMapProvider provider, HttpContextBase context)
        {
            var key = PageRenderer.CurrentPageId.ToString();

            return FindSiteMapNodeFromKey(provider, key);
        }

        /// <exclude />
        public SiteMapNode FindSiteMapNode(SiteMapProvider provider, string rawUrl)
        {
            var pageUrl = PageUrls.ParseUrl(rawUrl);
            if (pageUrl == null || !String.IsNullOrEmpty(pageUrl.PathInfo))
            {
                return null;
            }

            var page = pageUrl.GetPage();
            if (page == null)
            {
                return null;
            }

            return new CmsPageSiteMapNode(provider, page);
        }

        /// <exclude />
        public SiteMapNode FindSiteMapNodeFromKey(SiteMapProvider provider, string key)
        {
            if (Guid.TryParse(key, out var pageId))
            {
                var page = PageManager.GetPageById(pageId);
                if (page != null)
                {
                    return new CmsPageSiteMapNode(provider, page);
                }
            }

            return null;
        }

        /// <exclude />
        public bool IsAccessibleToUser(HttpContextBase context, SiteMapNode node)
        {
            return true;
        }
    }
}