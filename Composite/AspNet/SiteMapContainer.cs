using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using Composite.Core.Routing;
using Composite.Data;

namespace Composite.AspNet
{
    public partial class CompositeC1SiteMapProvider
    {
        /// <summary>
        /// Wrapper for a sitemap created by <see cref="SitemapNavigator"/>
        /// </summary>
        protected class SiteMapContainer
        {
            private const string _cachePrefix = "sitemap";

            /// <exclude />
            public SiteMapNode Root { get; set; }
            /// <exclude />
            public IDictionary<string, SiteMapNode> KeyToNodesMap { get; private set; }
            /// <exclude />
            public IDictionary<string, SiteMapNode> RawUrlToNodesMap { get; private set; }
            /// <exclude />
            public IDictionary<string, SiteMapNode> ParentNodesMap { get; private set; }
            /// <exclude />
            public IDictionary<string, SiteMapNodeCollection> ChildCollectionsMap { get; private set; }

            /// <exclude />
            public SiteMapContainer()
            {
                KeyToNodesMap = new Dictionary<string, SiteMapNode>();
                RawUrlToNodesMap = new Dictionary<string, SiteMapNode>();
                ParentNodesMap = new Dictionary<string, SiteMapNode>();
                ChildCollectionsMap = new Dictionary<string, SiteMapNodeCollection>();
            }

            /// <exclude />
            public static SiteMapContainer LoadSiteMap(CompositeC1SiteMapProvider provider, CultureInfo culture, PublicationScope publicationScope, Guid rootPageId)
            {
                using (var data = new DataConnection(publicationScope, culture))
                {
                    var rootPage = data.SitemapNavigator.GetPageNodeById(rootPageId);

                    if (rootPage == null)
                    {
                        return null;
                    }

                    var container = new SiteMapContainer
                    {
                        Root = new CompositeC1SiteMapNode(provider, rootPage, data, 1)
                    };

                    LoadNodes(provider, rootPage, null, container, data, 1);

                    return container;
                }
            }

            private static void LoadNodes(CompositeC1SiteMapProvider provider, PageNode pageNode, SiteMapNode parent, SiteMapContainer container, DataConnection data, int level)
            {
                if (pageNode.Url == null)
                {
                    return;
                }

                var node = new CompositeC1SiteMapNode(provider, pageNode, data, level);
                AddNode(node, parent, container);

                var childs = pageNode.ChildPages;
                foreach (var child in childs)
                {
                    LoadNodes(provider, child, node, container, data, level + 1);
                }
            }

            private static void AddNode(SiteMapNode node, SiteMapNode parentNode, SiteMapContainer container)
            {
                Verify.ArgumentNotNull(node, "node");
                Verify.ArgumentNotNull(container, "container");

                container.KeyToNodesMap.Add(node.Key, node);
                container.ParentNodesMap.Add(node.Key, parentNode);

                if (!container.RawUrlToNodesMap.ContainsKey(node.Url))
                {
                    container.RawUrlToNodesMap.Add(node.Url, node);
                }

                if (parentNode != null)
                {
                    if (!container.ChildCollectionsMap.ContainsKey(parentNode.Key))
                    {
                        container.ChildCollectionsMap[parentNode.Key] = new SiteMapNodeCollection();
                    }

                    container.ChildCollectionsMap[parentNode.Key].Add(node);
                }
            }

            /// <summary>
            /// Gets sitemap from cache.
            /// </summary>
            /// <param name="host">The host.</param>
            /// <param name="culture">The culture.</param>
            /// <param name="rootPageId">The root page id.</param>
            /// <returns></returns>
            public static SiteMapContainer GetFromCache(string host, CultureInfo culture, Guid rootPageId)
            {
                var key = GetCacheKey(host, culture, rootPageId);

                var context = HttpContext.Current;
                var container = context.Items[key] as SiteMapContainer;

                if (container == null)
                {
                    if (!CanCache) return null;

                    container = MemoryCache.Default.Get(key) as SiteMapContainer;
                    if (container != null)
                    {
                        context.Items.Add(key, container);
                    }
                }

                return container;
            }


            /// <summary>
            /// Adds sitemap to cache.
            /// </summary>
            /// <param name="siteMap">The site map.</param>
            /// <param name="host">The host.</param>
            /// <param name="culture">The culture.</param>
            /// <param name="rootPageId">The root page id.</param>
            public static void AddToCache(SiteMapContainer siteMap, string host, CultureInfo culture, Guid rootPageId)
            {
                var key = GetCacheKey(host, culture, rootPageId);

                var context = HttpContext.Current;
                context.Items[key] = siteMap;

                if (CanCache)
                {
                    MemoryCache.Default.Add(key, siteMap, ObjectCache.InfiniteAbsoluteExpiration);
                }
            }

            private static string GetCacheKey(string host, CultureInfo culture, Guid rootPageId)
            {
                string hostnameKey;

                var urlSpace = new UrlSpace();
                if (urlSpace.ForceRelativeUrls)
                {
                    hostnameKey = string.Empty;
                }
                else
                {
                    hostnameKey = host;
                }

                return _cachePrefix + hostnameKey + rootPageId + culture.Name + PublicationScope;
            }

            private static PublicationScope PublicationScope
            {
                get
                {
                    return DataScopeManager.CurrentDataScope.ToPublicationScope();
                }
            }

            /// <exclude />
            protected static bool CanCache
            {
                get
                {
                    return true;
                }
            }

            internal static void ClearCache()
            {
                var keys = MemoryCache.Default.Where(o => o.Key.StartsWith(_cachePrefix)).Select(o => o.Key);
                foreach (var key in keys)
                {
                    MemoryCache.Default.Remove(key);
                };
            }
        }
    }
}
