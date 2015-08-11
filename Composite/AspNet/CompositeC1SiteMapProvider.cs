using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.AspNet
{
    /// <summary>
    /// CompositeC1 implementation of <see cref="SiteMapProvider"/>
    /// </summary>
    public partial class CompositeC1SiteMapProvider : SiteMapProvider
    {

        private static readonly object _lock = new object();
        private static readonly SiteMapContainer _emptySiteMap = new SiteMapContainer();

        /// <exclude />
        public bool ExtranetEnabled { get; private set; }

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
        public override SiteMapNode RootNode
        {
            get { return ReturnNodeIfAccessible(GetRootNodeCore()); }
        }



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
                if (ParentProvider != null)
                {
                    return ParentProvider.RootProvider;
                }

                return this;
            }
        }

        /// <exclude />
        public override SiteMapNode FindSiteMapNode(HttpContext context)
        {
            string key = GetCurrentNodeKey();

            return FindSiteMapNodeFromKey(key);
        }


        /// <exclude />
        public SiteMapNode FindSiteMapNode(string rawUrl, CultureInfo culture)
        {
            SiteMapNode node = null;
            var container = GetContainer(culture);
            if (container != null)
            {
                container.RawUrlToNodesMap.TryGetValue(rawUrl, out node);
            }

            return node;
        }

        /// <exclude />
        public override SiteMapNode FindSiteMapNodeFromKey(string key)
        {
            return FindSiteMapNodeFromKey(key, false);
        }

        /// <exclude />
        public SiteMapNode FindSiteMapNodeFromKey(string key, bool allLanguages)
        {
            if (!allLanguages)
            {
                return FindSiteMapNodeFromKey(key, CultureInfo.CurrentCulture);
            }

            var siteMap = LoadSiteMap();
            if (siteMap == null) return null;

            SiteMapNode node;
            if (siteMap.KeyToNodesMap.TryGetValue(key, out node))
            {
                return node;
            }

            return null;
        }

        /// <exclude />
        public SiteMapNode FindSiteMapNodeFromKey(string key, CultureInfo culture)
        {
            SiteMapNode node;
            var container = GetContainer(culture);

            container.KeyToNodesMap.TryGetValue(key, out node);

            return node;
        }

        /// <exclude />
        public override SiteMapNodeCollection GetChildNodes(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, "node");

            SiteMapNodeCollection childNodes;
            var culture = ((CompositeC1SiteMapNode)node).Culture;
            var container = GetContainer(culture);

            container.ChildCollectionsMap.TryGetValue(node.Key, out childNodes);

            if (childNodes == null)
            {
                return SiteMapNodeCollection.ReadOnly(new SiteMapNodeCollection());
            }

            if (!SecurityTrimmingEnabled)
            {
                return SiteMapNodeCollection.ReadOnly(childNodes);
            }

            var context = HttpContext.Current;
            var returnList = new SiteMapNodeCollection(childNodes.Count);

            foreach (SiteMapNode child in childNodes)
            {
                if (child.IsAccessibleToUser(context))
                {
                    returnList.Add(child);
                }
            }

            return SiteMapNodeCollection.ReadOnly(returnList);
        }

        /// <exclude />
        public override SiteMapNode GetParentNode(SiteMapNode node)
        {
            Verify.ArgumentNotNull(node, "node");

            SiteMapNode parentNode;
            var culture = node is CompositeC1SiteMapNode 
                ? ((CompositeC1SiteMapNode)node).Culture 
                : LocalizationScopeManager.CurrentLocalizationScope;

            var container = GetContainer(culture);

            container.ParentNodesMap.TryGetValue(node.Key, out parentNode);

            if (parentNode == null && ParentProvider != null)
            {
                parentNode = ParentProvider.GetParentNode(node);
            }

            if (parentNode == null) return null;
            if (!parentNode.IsAccessibleToUser(HttpContext.Current)) return null;

            return parentNode;
        }

        /// <exclude />
        protected override SiteMapNode GetRootNodeCore()
        {
            var context = SiteMapContext.Current;

            var culture = (context != null) ? context.RootPage.DataSourceId.LocaleScope : CultureInfo.CurrentCulture;

            var container = GetContainer(culture);

            return container.Root;
        }

        /// <exclude />
        public IEnumerable<CompositeC1SiteMapNode> GetRootNodes()
        {
            var list = new List<SiteMapNode>();
            foreach (Guid rootPageId in PageManager.GetChildrenIDs(Guid.Empty))
            {
                foreach (var culture in DataLocalizationFacade.ActiveLocalizationCultures)
                {
                    var siteMap = LoadSiteMap(culture, rootPageId);

                    SiteMapNode rootNode;
                    if (siteMap != null && (rootNode = siteMap.Root) != null)
                    {
                        list.Add(rootNode);
                    }
                }
            }

            return list.Cast<CompositeC1SiteMapNode>();
        }

        private SiteMapContainer GetContainer(CultureInfo cultureInfo)
        {
            using (new DataScope(cultureInfo))
            {
                return LoadSiteMap();
            }
        }

        private SiteMapContainer LoadSiteMap()
        {
            var siteMapContext = SiteMapContext.Current;

            if (siteMapContext != null)
            {
                var rootPage = siteMapContext.RootPage;

                return LoadSiteMap(rootPage.DataSourceId.LocaleScope, rootPage.Id);
            }

            var currentCulture = LocalizationScopeManager.CurrentLocalizationScope;
            if (currentCulture.Name == CultureInfo.InvariantCulture.Name)
            {
                currentCulture = CultureInfo.CurrentCulture;
            }

            Guid currentHomePage = SitemapNavigator.CurrentHomePageId;
            if (currentHomePage != Guid.Empty)
            {
                return LoadSiteMap(currentCulture, currentHomePage);
            }

            var context = HttpContext.Current;

            using (var conn = new DataConnection(currentCulture))
            {
                PageNode pageNode = new SitemapNavigator(conn).GetPageNodeByHostname(context.Request.Url.Host);
                if (pageNode != null)
                {
                    return LoadSiteMap(currentCulture, pageNode.Id);
                }
            }

            return null;
        }

        private SiteMapContainer LoadSiteMap(CultureInfo culture, Guid rootPageId)
        {
            var uri = ProcessUrl(HttpContext.Current.Request.Url);
            var host = uri.Host;

            SiteMapContainer siteMap = SiteMapContainer.GetFromCache(host, culture, rootPageId);
            if (siteMap == null)
            {
                lock (_lock)
                {
                    siteMap = SiteMapContainer.GetFromCache(host, culture, rootPageId);

                    if (siteMap == null)
                    {
                        var publicationScope = DataScopeManager.CurrentDataScope.ToPublicationScope();

                        siteMap = SiteMapContainer.LoadSiteMap(this, culture, publicationScope, rootPageId);
                        if (siteMap != null)
                        {
                            AddRolesInternal(siteMap);
                        }
                        else
                        {
                            siteMap = _emptySiteMap;
                        }

                        SiteMapContainer.AddToCache(siteMap, host, culture, rootPageId);
                    }
                }
            }

            return object.ReferenceEquals(siteMap, _emptySiteMap) ? null : siteMap;
        }


        /// <exclude />
        protected string GetCurrentNodeKey()
        {
            return SitemapNavigator.CurrentPageId.ToString();
        }

        /// <exclude />
        public override SiteMapNode FindSiteMapNode(string rawUrl)
        {
            var culture = DataLocalizationFacade.DefaultLocalizationCulture;

            foreach (var activeCulture in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                string cultureUrlMapping = DataLocalizationFacade.GetUrlMappingName(activeCulture);
                if (cultureUrlMapping.IsNullOrEmpty()) continue;

                string mappingPrefix = UrlUtils.PublicRootPath + "/" + cultureUrlMapping;

                if (rawUrl.Equals(mappingPrefix, StringComparison.OrdinalIgnoreCase)
                    || rawUrl.StartsWith(mappingPrefix + "/", StringComparison.OrdinalIgnoreCase))
                {
                    culture = activeCulture;
                    break;
                }
            }

            var node = FindSiteMapNode(rawUrl, culture) as CompositeC1SiteMapNode;
            if (node == null)
            {
                if (IsDefaultDocumentUrl(rawUrl))
                {
                    node = RootNode as CompositeC1SiteMapNode;
                }
            }

            return node;
        }

        internal static bool IsDefaultDocumentUrl(string url)
        {
            return url == "/"
            || url.Equals(UrlUtils.PublicRootPath, StringComparison.OrdinalIgnoreCase)
            || url.Equals(UrlUtils.PublicRootPath + "/", StringComparison.OrdinalIgnoreCase)
            || url.StartsWith(UrlUtils.PublicRootPath + "/?", StringComparison.OrdinalIgnoreCase)
            || url.StartsWith(UrlUtils.PublicRootPath + "/default.aspx", StringComparison.OrdinalIgnoreCase);
        }

        /// <exclude />
        public override bool IsAccessibleToUser(HttpContext ctx, SiteMapNode node)
        {
            if (DataScopeManager.CurrentDataScope == DataScopeIdentifier.Administrated)
            {
                return true;
            }

            if (ExtranetEnabled)
            {
                throw new NotImplementedException("Extranet is not implemented in the current C1 sitemap provider");
            }

            return true;
        }

        /// <exclude />
        public override void Initialize(string name, NameValueCollection attributes)
        {
            StoreEventHandler handler = (sender, e) => SiteMapContainer.ClearCache();

            DataEventSystemFacade.SubscribeToStoreChanged<IPage>(handler, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IPageStructure>(handler, true);
            DataEventSystemFacade.SubscribeToStoreChanged<ISystemActiveLocale>(handler, true);

            if (attributes != null)
            {
                bool extranetEnabled;
                if (bool.TryParse(attributes["extranetEnabled"], out extranetEnabled))
                {
                    ExtranetEnabled = extranetEnabled;
                }
                attributes.Remove("extranetEnabled");
            }

            base.Initialize(name, attributes);
        }


        /// <summary>
        ///  Fixes up the hostname when using the preview-tab in the Console, since the requested page can belong to 
        /// a different domain than the console was opened in
        /// </summary>
        /// <param name="uri">The URI.</param>
        /// <returns></returns>
        protected Uri ProcessUrl(Uri uri)
        {
            PageUrlData urlData;

            var context = HttpContext.Current;

            var overriddenContext = SiteMapContext.Current;
            if (overriddenContext != null)
            {
                urlData = new PageUrlData(overriddenContext.RootPage);
            }
            else
            {
                string currentUrl = context.Request.Url.ToString();

                string _previewKey = context.Request.QueryString["previewKey"];
                if (!String.IsNullOrEmpty(_previewKey))
                {
                    var page = (IPage)context.Cache.Get(_previewKey + "_SelectedPage");
                    urlData = new PageUrlData(page);
                }
                else
                {
                    urlData = PageUrls.ParseUrl(currentUrl);
                }
            }

            if (urlData != null)
            {
                var publicUrl = PageUrls.BuildUrl(urlData, UrlKind.Public, new UrlSpace { Hostname = uri.Host, ForceRelativeUrls = false });
                if (Uri.IsWellFormedUriString(publicUrl, UriKind.Absolute))
                {
                    var newHost = new Uri(publicUrl).Host;

                    uri = new Uri(ReplaceFirstOccurrence(uri.ToString(), uri.Host, newHost));
                }
            }

            return uri;
        }

        private static string ReplaceFirstOccurrence(string @string, string oldValue, string newValue)
        {
            int offset = @string.IndexOf(oldValue, StringComparison.Ordinal);
            if (offset >= 0)
            {
                return @string.Substring(0, offset) + newValue + @string.Substring(offset + oldValue.Length);
            }
            return @string;
        }

        /// <exclude />
        protected virtual void AddRolesInternal(SiteMapContainer siteMapContainer) { }
    }
}
