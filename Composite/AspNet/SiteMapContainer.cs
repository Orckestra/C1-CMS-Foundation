using System;
using System.Collections.Generic;
using System.Globalization;
using System.Web;
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
                        Root = new CompositeC1SiteMapNode(provider, rootPage, data)
                    };

                    LoadNodes(provider, rootPage, null, container, data);

                    return container;
                }
            }

            private static void LoadNodes(CompositeC1SiteMapProvider provider, PageNode pageNode, SiteMapNode parent, SiteMapContainer container, DataConnection data)
            {
                if (pageNode.Url == null)
                {
                    return;
                }

                var node = new CompositeC1SiteMapNode(provider, pageNode, data);
                AddNode(node, parent, container);

                var childs = pageNode.ChildPages;
                foreach (var child in childs)
                {
                    LoadNodes(provider, child, node, container, data);
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
        }
    }
}
