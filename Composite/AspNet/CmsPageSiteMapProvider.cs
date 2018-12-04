using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Composite.Core;
using Composite.Data;

namespace Composite.AspNet
{
    /// <summary>
    /// Implementation of <see cref="SiteMapProvider"/> which returns nodes returned by registered <see cref="ISiteMapPlugin"/>.
    /// </summary>
    public class CmsPageSiteMapProvider : SiteMapProvider, ICmsSiteMapProvider
    {
        private static readonly SiteMapNodeCollection EmptyCollection = SiteMapNodeCollection.ReadOnly(new SiteMapNodeCollection());

        private readonly List<ISiteMapPlugin> _plugins;

        /// <inheritdoc />
        public override SiteMapNode CurrentNode
        {
            get
            {
                var context = HttpContext.Current;
                var node = ResolveSiteMapNode(context) ?? FindSiteMapNode(context);

                return SecurityTrimNode(node);
            }
        }

        /// <exclude />
        public override SiteMapProvider RootProvider => ParentProvider?.RootProvider ?? this;

        /// <exclude />
        public override SiteMapNode RootNode => SecurityTrimNode(GetRootNodeCore());

        /// <inheritdoc />
        public CmsPageSiteMapProvider()
        {
            _plugins = ServiceLocator.GetServices<ISiteMapPlugin>().ToList();
        }

        /// <inheritdoc />
        public override SiteMapNode FindSiteMapNode(HttpContext context)
        {
            var contextBase = new HttpContextWrapper(context);

            foreach (var plugin in _plugins)
            {
                var node = plugin.FindSiteMapNode(this, contextBase);
                if (node != null)
                {
                    return SecurityTrimNode(node);
                }
            }

            return null;
        }

        /// <inheritdoc />
        public override SiteMapNode FindSiteMapNodeFromKey(string key)
        {
            foreach (var plugin in _plugins)
            {
                var node = plugin.FindSiteMapNodeFromKey(this, key);
                if (node != null)
                {
                    return SecurityTrimNode(node);
                }
            }

            return null;
        }

        /// <inheritdoc />
        public override SiteMapNodeCollection GetChildNodes(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, nameof(node));

            var childNodes = _plugins.SelectMany(plugin => plugin.GetChildNodes(node)
                                                           ?? Enumerable.Empty<SiteMapNode>()).ToList();

            childNodes = SecurityTrimList(childNodes);

            if (!childNodes.Any())
            {
                return EmptyCollection;
            }

            return new SiteMapNodeCollection(childNodes.ToArray());
        }

        /// <inheritdoc />
        public override SiteMapNode GetParentNode(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, nameof(node));

            SiteMapNode parentNode = null;

            foreach (var plugin in _plugins)
            {
                parentNode = plugin.GetParentNode(node);
                if (parentNode != null)
                {
                    break;
                }
            }

            return SecurityTrimNode(parentNode);
        }

        /// <inheritdoc />
        protected override SiteMapNode GetRootNodeCore()
        {
            var siteMapContext = SiteMapContext.Current;

            var rootPage = siteMapContext?.RootPage;
            if (rootPage == null)
            {
                var homePageId = SitemapNavigator.CurrentHomePageId;
                if (homePageId == Guid.Empty)
                {
                    var context = HttpContext.Current;
                    if (context == null)
                    {
                        homePageId = PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault();
                    }
                    else
                    {
                        using (var data = new DataConnection())
                        {
                            var pageNode = data.SitemapNavigator.GetPageNodeByHostname(context.Request.Url.Host);

                            homePageId = pageNode?.Id ?? Guid.Empty;
                        }
                    }
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

            return SecurityTrimNode(node);
        }

        /// <exclude />
        public ICollection<CmsPageSiteMapNode> GetRootNodes()
        {
            var list = new List<CmsPageSiteMapNode>();

            foreach (var rootPageId in PageManager.GetChildrenIDs(Guid.Empty))
            {
                foreach (var culture in DataLocalizationFacade.ActiveLocalizationCultures)
                {
                    using (new DataScope(culture))
                    {
                        var page = PageManager.GetPageById(rootPageId);
                        if (page != null)
                        {
                            list.Add(new CmsPageSiteMapNode(this, page));
                        }
                    }
                }
            }

            return SecurityTrimList(list);
        }

        /// <inheritdoc />
        public override SiteMapNode FindSiteMapNode(string rawUrl)
        {
            foreach (var plugin in _plugins)
            {
                var node = plugin.FindSiteMapNode(this, rawUrl);
                if (node != null)
                {
                    return SecurityTrimNode(node);
                }
            }

            return null;
        }

        /// <inheritdoc />
        public override bool IsAccessibleToUser(HttpContext ctx, SiteMapNode node)
        {
            var ctxBase = new HttpContextWrapper(ctx);

            return _plugins.All(plugin => plugin.IsAccessibleToUser(ctxBase, node));
        }

        private T SecurityTrimNode<T>(T node) where T : SiteMapNode
        {
            if (node == null)
            {
                return null;
            }

            if (SecurityTrimmingEnabled)
            {
                var context = HttpContext.Current;
                if (!node.IsAccessibleToUser(context))
                {
                    return null;
                }
            }

            return node;
        }

        private List<T> SecurityTrimList<T>(List<T> list) where T : SiteMapNode
        {
            if (list == null)
            {
                return null;
            }

            if (SecurityTrimmingEnabled && list.Count > 0)
            {
                var context = HttpContext.Current;

                return list.Where(child => child.IsAccessibleToUser(context)).ToList();
            }

            return list;
        }
    }
}
