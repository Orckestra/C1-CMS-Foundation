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
    /// <summary>
    /// Implementation of <see cref="SiteMapProvider"/> that returns cms pages
    /// </summary>
    public class CmsPageSiteMapProvider : SiteMapProvider
    {
        private static readonly SiteMapNodeCollection EmptyCollection =
            SiteMapNodeCollection.ReadOnly(new SiteMapNodeCollection());

        /// <exclude />
        public override SiteMapProvider ParentProvider { get; set; }

        /// <exclude />
        public override SiteMapNode CurrentNode
        {
            get
            {
                var context = HttpContext.Current;

                var node = ResolveSiteMapNode(context) ?? FindSiteMapNode(context);

                return ReturnNodeIfAccessible(node);
            }
        }

        /// <exclude />
        public override SiteMapNode RootNode => ReturnNodeIfAccessible(GetRootNodeCore());


        private SiteMapNode ReturnNodeIfAccessible(SiteMapNode node)
        {
            if (node != null && node.IsAccessibleToUser(HttpContext.Current))
            {
                return node;
            }
            return null;
        }

 


        /// <exclude />
        public override SiteMapProvider RootProvider
        {
            get
            {
                return ParentProvider?.RootProvider ?? this;
            }
        }

        /// <exclude />
        public override SiteMapNode FindSiteMapNode(HttpContext context)
        {
            string key = PageRenderer.CurrentPageId.ToString();

            return FindSiteMapNodeFromKey(key);
        }


        /// <exclude />
        public override SiteMapNode FindSiteMapNodeFromKey(string key)
        {
            Guid pageId = new Guid(key);
            var page = PageManager.GetPageById(pageId);

            return page != null ? new CmsPageSiteMapNode(this, page) : null;
        }

        /// <exclude />
        public override SiteMapNodeCollection GetChildNodes(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, "node");

            var pageSiteMapNode = (CmsPageSiteMapNode)node;

            var context = HttpContext.Current;

            List<SiteMapNode> childNodes;
            using (new DataScope(pageSiteMapNode.Culture))
            {
                childNodes = PageManager.GetChildrenIDs(pageSiteMapNode.Page.Id)
                    .Select(PageManager.GetPageById)
                    .Where(p => p != null)
                    .Select(p => new CmsPageSiteMapNode(this, p))
                    .OfType<SiteMapNode>()
                    .ToList();
            }

            if (!childNodes.Any())
            {
                return EmptyCollection;
            }

            if (SecurityTrimmingEnabled)
            {
                childNodes = childNodes.Where(child => child.IsAccessibleToUser(context)).ToList();
            }

            return new SiteMapNodeCollection(childNodes.ToArray());
        }

        /// <exclude />
        public override SiteMapNode GetParentNode(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, "node");

            var pageSiteMapNode = (CmsPageSiteMapNode)node;

            IPage parentPage = null;
            using (new DataScope(pageSiteMapNode.Culture))
            {
                Guid parentPageId = PageManager.GetParentId(pageSiteMapNode.Page.Id);
                if (parentPageId != Guid.Empty)
                {
                    parentPage = PageManager.GetPageById(parentPageId);
                }
            }

            SiteMapNode parentNode;
            if (parentPage != null)
            {
                parentNode = new CmsPageSiteMapNode(this, parentPage);
            }
            else
            {
                parentNode = ParentProvider?.GetParentNode(node);
            }

            return parentNode != null && parentNode.IsAccessibleToUser(HttpContext.Current) ? parentNode : null;
        }

        /// <exclude />
        protected override SiteMapNode GetRootNodeCore()
        {
            var context = SiteMapContext.Current;

            var rootPage = context?.RootPage;

            if (rootPage == null)
            {
                Guid homePageId = SitemapNavigator.CurrentHomePageId;
                if (homePageId == Guid.Empty)
                {
                    homePageId = PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault();
                }

                if (homePageId != Guid.Empty)
                {
                    rootPage = PageManager.GetPageById(homePageId);
                }
            }

            if (rootPage == null)
            {
                return null;
            }

            var node = new CmsPageSiteMapNode(this, rootPage);

            return node.IsAccessibleToUser(HttpContext.Current) ? node : null;
        }

        /// <exclude />
        public ICollection<CmsPageSiteMapNode> GetRootNodes()
        {
            var list = new List<CmsPageSiteMapNode>();
            foreach (Guid rootPageId in PageManager.GetChildrenIDs(Guid.Empty))
            {
                foreach (var culture in DataLocalizationFacade.ActiveLocalizationCultures)
                using (new DataScope(culture))
                {
                    var page = PageManager.GetPageById(rootPageId);
                    if (page != null)
                    {
                        list.Add(new CmsPageSiteMapNode(this, page));
                    }
                }
            }

            return list;
        }


        /// <exclude />
        public override SiteMapNode FindSiteMapNode(string rawUrl)
        {
            var pageUrl = PageUrls.ParseUrl(rawUrl);
            if (pageUrl == null || !string.IsNullOrEmpty(pageUrl.PathInfo))
            {
                return null;
            }

            var page = pageUrl.GetPage();
            if (page == null)
            {
                return null;
            }

            return new CmsPageSiteMapNode(this, page);
        }

        /// <exclude />
        public override bool IsAccessibleToUser(HttpContext ctx, SiteMapNode node)
        {
            return true;
        }
    }
}
