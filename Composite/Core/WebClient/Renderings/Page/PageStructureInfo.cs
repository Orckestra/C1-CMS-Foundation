using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Routing;
using Composite.Core.Routing.Plugins.PageUrlsProviders;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Logging;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using MapKey = System.Tuple<Composite.Data.PublicationScope, string, string>;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageStructureInfo
    {
        /// <exclude />
        [Obsolete("Now sitemap generates xml that belongs to empty namespace, so this constant shouldn't be used", true)]
        public const string SitemapNamespaceString = "";

        internal static class AttributeNames
        {
            public static XName Id = "Id";
            public static XName Title = "Title";
            public static XName MenuTitle = "MenuTitle";
            public static XName UrlTitle = "UrlTitle";
            public static XName Description = "Description";
            public static XName ChangedDate = "ChangedDate";
            public static XName ChangedBy = "ChangedBy";
            public static XName URL = "URL";
            public static XName FriendlyUrl = "FriendlyUrl";
            public static XName Depth = "Depth";
        }

        internal static class ElementNames
        {
            public static XName Page = "Page"; 
        }

        private class Version
        {
            public int VersionNumber;
        }

        /// <summary>
        /// An immutable instanse of a pages map
        /// </summary>
        private class Map
        {
            public IEnumerable<XElement> RootPagesLookup;
            public Dictionary<string, Guid> UrlToIdLookup;
            public Dictionary<string, Guid> LowerCaseUrlToIdLookup;
            public Dictionary<Guid, string> IdToUrlLookup;
#pragma warning disable 612
            public IPageUrlBuilder PageUrlBuilder;
#pragma warning restore 612
        }

        private static readonly Hashtable<MapKey, Map> _generatedMaps = new Hashtable<MapKey, Map>();
        private static readonly Hashtable<MapKey, Version> _versions = new Hashtable<MapKey, Version>();
        private static readonly object _updatingLock = new object();
        //private static readonly object[] _buildingLock = new[] { new object(), new object() }; // Separated objects for 'Public' and 'Administrated' scopes

        private static readonly HashSet<string> _knownNotUniqueUrls = new HashSet<string>();

        private static readonly XName PageElementName = "Page";

        private static readonly string LogTitle = "PageStructureInfo";

        static PageStructureInfo()
        {
            DataEventSystemFacade.SubscribeToStoreChanged<IPage>(OnPagesChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<ISystemActiveLocale>((a, b) => ClearCachedData(), true);
            DataEventSystemFacade.SubscribeToStoreChanged<IHostnameBinding>((a, b) => ClearCachedData(), true);
            DataEventSystemFacade.SubscribeToStoreChanged<IUrlConfiguration>((a, b) => ClearCachedData(), true);
        }


        /// <summary>
        /// Builds a list of [Page Id, Page label] pairs.
        /// The items in the list is returned in document order and the labels are indented with one space for each depth level
        /// of the page.
        /// </summary>
        [Obsolete]
        public static IEnumerable<KeyValuePair<Guid, string>> PageListInDocumentOrder()
        {
            return PageListInDocumentOrder(GetSiteMap(), 0);
        }


        private static IEnumerable<KeyValuePair<Guid, string>> PageListInDocumentOrder(IEnumerable<XElement> pageElements, int indentLevel)
        {
            var indentString = new string(' ', indentLevel);


            foreach (XElement pageElement in pageElements)
            {
                string label = GetLabelForPageElement(indentString, pageElement);
                string id = pageElement.Attribute(AttributeNames.Id).Value;
                yield return new KeyValuePair<Guid, string>(new Guid(id), label);

                foreach (KeyValuePair<Guid, string> childOption in PageListInDocumentOrder(pageElement.Elements(), indentLevel + 1))
                {
                    yield return childOption;
                }
            }
        }

        private static string GetLabelForPageElement(string indentString, XElement pageElement)
        {
            string labelText = (pageElement.Attribute(AttributeNames.MenuTitle) ?? pageElement.Attribute(AttributeNames.Title)).Value;

            return string.Format("{0}{1}", indentString, labelText);
        }




        /// <exclude />
        public static IEnumerable<XElement> GetSiteMap()
        {
            return GetMap().RootPagesLookup;
        }



        /// <exclude />
        public static IEnumerable<XElement> GetSiteMapWithActivePageAnnotations()
        {
            Guid pageId = PageRenderer.CurrentPageId;

            return GetSiteMapWithActivePageAnnotations(pageId);
        }



        /// <exclude />
        public static IEnumerable<XElement> GetSiteMapWithActivePageAnnotations(Guid pageId)
        {
            return GetSitemapByScope(SitemapScope.All, pageId);
        }



        /// <summary>
        /// Returns portions of the sitemap in acordance with the specified scope. Sitemap elements are hierarchically
        /// ordered and are marked with 'isopen' and 'iscurrent' attributes when open/selected relative to the supplied pageId.
        /// </summary>
        /// <param name="associationScope">The scope of pages to return. This is relative to the specified pageId.</param>
        /// <param name="pageId">The C1 Page ID to use when defining the scope. This must be a valid page id.</param>
        /// <returns></returns>
        public static IEnumerable<XElement> GetSitemapByScope(SitemapScope associationScope, Guid pageId)
        {
            List<XElement> pageElements = GetSitemapByScopeUnannotated(associationScope, pageId).ToList();
            AnnotatePagesWithOpenAndCurrent(pageId, pageElements);

            return pageElements;
        }

        private static IEnumerable<Guid> GetDescendants(Guid pageId)
        {
            foreach (var childId in PageManager.GetChildrenIDs(pageId))
            {
                foreach (var descendantOrSelf in GetDescendantsAndSelf(childId))
                {
                    yield return descendantOrSelf;
                }
            }
        }

        private static IEnumerable<Guid> GetDescendantsAndSelf(Guid pageId)
        {
            yield return pageId;

            foreach (var childId in PageManager.GetChildrenIDs(pageId))
            {
                foreach (var descendantOrSelf in GetDescendantsAndSelf(childId))
                {
                    yield return descendantOrSelf;
                }
            }
        }

        private static List<Guid> GetAncestors(Guid pageId, bool andSelf)
        {
            var result = new List<Guid>();

            if (andSelf)
            {
                result.Add(pageId);
            }

            pageId = PageManager.GetParentId(pageId);

            while (pageId != Guid.Empty)
            {
                result.Add(pageId);

                pageId = PageManager.GetParentId(pageId);
            }

            return result;
        }

        /// <exclude />
        public static IEnumerable<Guid> GetAssociatedPageIds(Guid pageId, SitemapScope associationScope)
        {
            switch (associationScope)
            {
                case SitemapScope.Current:
                    return new[] {pageId};
                case SitemapScope.All:
                    return DataFacade.GetData<IPage>().Select(p => p.Id).ToList();
                case SitemapScope.Descendants:
                    return GetDescendants(pageId);
                case SitemapScope.DescendantsAndCurrent:
                    return GetDescendantsAndSelf(pageId);
                case SitemapScope.Children:
                    return PageManager.GetChildrenIDs(pageId);
                case SitemapScope.Siblings:
                    Guid parentId = PageManager.GetParentId(pageId);
                    return PageManager.GetChildrenIDs(parentId).Where(i => i != pageId);
                case SitemapScope.SiblingsAndSelf:
                    parentId = PageManager.GetParentId(pageId);
                    return PageManager.GetChildrenIDs(parentId);
                case SitemapScope.Ancestors:
                    return GetAncestors(pageId, false);
                case SitemapScope.AncestorsAndCurrent:
                    return GetAncestors(pageId, true);
                case SitemapScope.Parent:
                    parentId = PageManager.GetParentId(pageId);
                    return parentId != Guid.Empty ? new[] {parentId} : new Guid[0];
                case SitemapScope.Level1:
                case SitemapScope.Level2:
                case SitemapScope.Level3:
                case SitemapScope.Level4:
                case SitemapScope.Level1AndDescendants:
                case SitemapScope.Level2AndDescendants:
                case SitemapScope.Level3AndDescendants:
                case SitemapScope.Level4AndDescendants:
                case SitemapScope.Level1AndSiblings:
                case SitemapScope.Level2AndSiblings:
                case SitemapScope.Level3AndSiblings:
                case SitemapScope.Level4AndSiblings:
                    int level = int.Parse(associationScope.ToString().Substring(5, 1));

                    var ancestors = GetAncestors(pageId, true);

                    ancestors.Reverse();

                    bool andSiblings = associationScope.ToString().EndsWith("AndSiblings");
                    if (andSiblings)
                    {
                        if (ancestors.Count < level - 1)
                        {
                            return new Guid[0];
                        }

                        Guid parentPageId = level == 1 ? Guid.Empty : ancestors[level - 2];
                        return GetAssociatedPageIds(parentPageId, SitemapScope.Children);
                    }

                    if (ancestors.Count < level)
                    {
                        return new Guid[0];
                    }

                    Guid levelPageId = ancestors[level - 1];

                    bool andDescendants = associationScope.ToString().EndsWith("AndDescendants");
                    if (andDescendants)
                    {
                        return GetDescendantsAndSelf(levelPageId);
                    }

                    

                    return new[] {levelPageId};
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + associationScope);
            }
        }
        

        /// <exclude />
        public static IEnumerable<Guid> GetAssociatedPageIds(Guid pageId, SitemapScope associationScope, IEnumerable<XElement> sitemaps)
        {
            switch (associationScope)
            {
                case SitemapScope.Current:
                    yield return pageId;
                    break;
                case SitemapScope.All:
#pragma warning disable 618
                    foreach (Guid id in GetIdToUrlLookup().Keys)
#pragma warning restore 618
                    {
                        yield return id;
                    }
                    break;
                case SitemapScope.Descendants:
                case SitemapScope.DescendantsAndCurrent:
                case SitemapScope.Children:
                case SitemapScope.Siblings:
                case SitemapScope.Ancestors:
                case SitemapScope.AncestorsAndCurrent:
                case SitemapScope.Parent:
                case SitemapScope.Level1:
                case SitemapScope.Level2:
                case SitemapScope.Level3:
                case SitemapScope.Level4:
                case SitemapScope.Level1AndDescendants:
                case SitemapScope.Level2AndDescendants:
                case SitemapScope.Level3AndDescendants:
                case SitemapScope.Level4AndDescendants:
                case SitemapScope.Level1AndSiblings:
                case SitemapScope.Level2AndSiblings:
                case SitemapScope.Level3AndSiblings:
                case SitemapScope.Level4AndSiblings:
                    string pageIdString = pageId.ToString();
                    XAttribute idMatchAttrib = sitemaps.DescendantsAndSelf().Attributes(AttributeNames.Id).FirstOrDefault(id => id.Value == pageIdString);
                    if (idMatchAttrib != null)
                    {
                        XElement currentPageElement = idMatchAttrib.Parent;
                        IEnumerable<XElement> scopeElements = GetPageElementsByScope(associationScope, currentPageElement);

                        foreach (XElement pageElement in scopeElements)
                        {
                            yield return new Guid(pageElement.Attribute(AttributeNames.Id).Value);
                        }
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + associationScope);
            }
        }

        private static Map GetMap()
        {
            return GetMap(DataScopeManager.CurrentDataScope.ToPublicationScope(), LocalizationScopeManager.CurrentLocalizationScope);
        }

        private static Map GetMap(PublicationScope publicationScope, CultureInfo localizationScope)
        {
            return GetMap(publicationScope, localizationScope, new UrlSpace());
        }

        private static Map GetMap(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            Verify.ArgumentNotNull(localizationScope, "localizationScope");
            Verify.ArgumentNotNull(urlSpace, "urlSpace");

            if (System.Transactions.Transaction.Current != null)
            {
                var exceptionToLog = new Exception("It is not safe to use PageStructureInfo/SiteMap functionality in transactional context. Method Composite.Data.PageManager can be used instead.");
                Log.LogWarning(typeof(PageStructureInfo).Name, exceptionToLog);
            }

            var scopeKey = GetScopeKey(publicationScope, localizationScope, urlSpace);
            Map map = _generatedMaps[scopeKey];

            if (map != null)
            {
                return map;
            }

            // Using different sync roots for different datascopes
            //object buildingLock = _buildingLock[scopeKey.First == DataScopeIdentifier.Public.Name ? 0 : 1];

            // NOTE: Do not using a lock because it could because GetAssociatedPageIds is used inside transactions on some sites and it causes deadlocks 

            // lock (buildingLock)
            {
                map = _generatedMaps[scopeKey];
                if (map != null)
                {
                    return map;
                }


                Version version = _versions[scopeKey];
                if (version == null)
                {
                    lock (_updatingLock)
                    {
                        version = _versions[scopeKey];
                        if (version == null)
                        {
                            _versions.Add(scopeKey, version = new Version());
                        }
                    }
                }

                Thread.MemoryBarrier();
                int currentVersion = version.VersionNumber;
                Thread.MemoryBarrier();

                using(new DataScope(publicationScope, localizationScope))
                {
                    map = BuildMap(urlSpace);
                }

                lock (_updatingLock)
                {
                    if (_versions[scopeKey].VersionNumber == currentVersion)
                    {
                        _generatedMaps.Remove(scopeKey);
                        _generatedMaps.Add(scopeKey, map);
                    }
                }

                return map;
            }
        }

        private static Tuple<PublicationScope, string, string> GetScopeKey(PublicationScope publicationScope, CultureInfo cultureInfo, UrlSpace urlSpace)
        {
            string hostnameScopeKey = urlSpace.ForceRelativeUrls ? "relative urls" : urlSpace.Hostname;

            return new Tuple<PublicationScope, string, string>(publicationScope, cultureInfo.Name, hostnameScopeKey);
        }

        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static bool TryGetPageUrl(Guid guid, out string pageUrl)
        {
            return GetMap().IdToUrlLookup.TryGetValue(guid, out pageUrl);
        }



        /// <exclude />
        [Obsolete("Use Composite.Core.WebClient.UrlPageHelper class")]
        public static bool TryGetPageUrlByFriendlyUrl(string friendlyUrl, out string pageUrl)
        {
            string lowerFriendlyUrl = friendlyUrl.ToLowerInvariant();

            string matchingUrl = GetSiteMap().DescendantsAndSelf().Attributes("FriendlyUrl").Where(f => f.Value.ToLowerInvariant() == lowerFriendlyUrl).Select(f => f.Parent.Attribute("URL").Value).FirstOrDefault();

            pageUrl = matchingUrl;

            return matchingUrl != null;
        }



        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static Dictionary<string, Guid> GetUrlToIdLookup()
        {
            return GetMap().UrlToIdLookup;
        }



        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static Dictionary<string, Guid> GetLowerCaseUrlToIdLookup()
        {
            return GetMap().LowerCaseUrlToIdLookup;
        }

        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static IPageUrlBuilder GetPageUrlBuilder(PublicationScope publicationScope, CultureInfo localizationScope, UrlSpace urlSpace)
        {
            return GetMap(publicationScope, localizationScope, urlSpace).PageUrlBuilder;
        }


        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static Dictionary<Guid, string> GetIdToUrlLookup()
        {
            return GetIdToUrlLookup(DataScopeManager.CurrentDataScope.Name, LocalizationScopeManager.CurrentLocalizationScope);
        }



        /// <exclude />
        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        public static Dictionary<Guid, string> GetIdToUrlLookup(string dataScopeIdentifier, CultureInfo culture)
        {
            using (new DataScope(DataScopeIdentifier.Deserialize(dataScopeIdentifier), culture))
            {
                return GetMap().IdToUrlLookup;
            }
        }


        private static IEnumerable<XElement> GetPageElementBySiteDepth(XElement associatedPageElement, int siteDepth)
        {
            XElement match = associatedPageElement.AncestorsAndSelf(PageElementName).Reverse().Take(siteDepth).LastOrDefault();

            if (match != null && match.Attribute("Depth").Value == siteDepth.ToString())
            {
                yield return match;
            }
        }

        internal static IEnumerable<XElement> GetPageElementsByScope(SitemapScope associationScope, XElement currentPageElement)
        {
            IEnumerable<XElement> scopeElements = null;
            XElement matchPage;

            switch (associationScope)
            {
                case SitemapScope.Parent:
                    if (currentPageElement.Parent != null && currentPageElement.Parent.Name == PageElementName)
                    {
                        yield return currentPageElement.Parent;
                    }
                    break;
                case SitemapScope.Descendants:
                    scopeElements = currentPageElement.Descendants(PageElementName);
                    break;
                case SitemapScope.DescendantsAndCurrent:
                    scopeElements = currentPageElement.DescendantsAndSelf(PageElementName);
                    break;
                case SitemapScope.Children:
                    scopeElements = currentPageElement.Elements(PageElementName);
                    break;
                case SitemapScope.Siblings:
                    scopeElements = currentPageElement.Parent.Elements(PageElementName);
                    break;
                case SitemapScope.Ancestors:
                    scopeElements = currentPageElement.Ancestors(PageElementName);
                    break;
                case SitemapScope.AncestorsAndCurrent:
                    scopeElements = currentPageElement.AncestorsAndSelf(PageElementName);
                    break;
                case SitemapScope.Level1:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 1);
                    break;
                case SitemapScope.Level2:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 2);
                    break;
                case SitemapScope.Level3:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 3);
                    break;
                case SitemapScope.Level4:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 4);
                    break;
                case SitemapScope.Level1AndDescendants:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 1).DescendantsAndSelf();
                    break;
                case SitemapScope.Level2AndDescendants:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 2).DescendantsAndSelf();
                    break;
                case SitemapScope.Level3AndDescendants:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 3).DescendantsAndSelf();
                    break;
                case SitemapScope.Level4AndDescendants:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 4).DescendantsAndSelf();
                    break;
                case SitemapScope.Level1AndSiblings:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 1).FirstOrDefault();
                    if (matchPage != null && matchPage.Parent != null)
                    {
                        scopeElements = matchPage.Parent.Elements(PageElementName);
                    }
                    break;
                case SitemapScope.Level2AndSiblings:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 1).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                case SitemapScope.Level3AndSiblings:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 2).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                case SitemapScope.Level4AndSiblings:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 3).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + associationScope);
            }

            if (scopeElements != null)
            {
                foreach (XElement scopeElement in scopeElements)
                {
                    yield return scopeElement;
                }
            }
        }

        private class PageTreeInfo
        {
            public Guid ID;
            public int LocalOrdering;
            public XElement Element;
        }


        private class SitemapBuildingData
        {
            private class PageIdComparer : IEqualityComparer<IPage>
            {
                public bool Equals(IPage x, IPage y) => x.Id == y.Id;

                public int GetHashCode(IPage obj) => obj.Id.GetHashCode();
            }

            public SitemapBuildingData()
            {
                Pages = DataFacade.GetData<IPage>().Evaluate().Distinct(new PageIdComparer()).ToList();
                Structures = DataFacade.GetData<IPageStructure>().ToList();

                PageById = new Hashtable<Guid, IPage>();
                foreach (IPage page in Pages)
                {
                    PageById.Add(page.Id, page);
                }

                StructureById = new Hashtable<Guid, IPageStructure>();
                foreach (IPageStructure structure in Structures)
                {
                    StructureById.Add(structure.Id, structure);
                }
            }

            public List<IPage> Pages { get; private set; }
            public List<IPageStructure> Structures { get; private set; }

            public Hashtable<Guid, IPage> PageById { get; private set; }
            public Hashtable<Guid, IPageStructure> StructureById { get; private set; }
        }

        private static Map BuildMap(UrlSpace urlSpace)
        {
            using (DebugLoggingScope.MethodInfoScope)
            {
                var publicationScope = DataScopeManager.CurrentDataScope.ToPublicationScope();
                var localizationScope = LocalizationScopeManager.CurrentLocalizationScope;

                Log.LogVerbose(LogTitle, string.Format("Building page structure in the publication scope '{0}' with the localization scope '{1}'", publicationScope, localizationScope));

                var urlToIdLookup = new Dictionary<string, Guid>();
                var idToUrlLookup = new Dictionary<Guid, string>();

                var pagesData = new SitemapBuildingData();

                var pageToToChildElementsTable = new Hashtable<Guid, List<PageTreeInfo>>();
                foreach (IPage page in pagesData.Pages)
                {
                    IPageStructure pageStructure = pagesData.StructureById[page.Id];

                    if (pageStructure == null)
                    {
                        Log.LogWarning(LogTitle, "Failed to find PageStructure data. Page ID is '{0}'".FormatWith(page.Id));
                        continue;
                    }

                    int localOrdering = pageStructure.LocalOrdering;

                    var pageElement = new XElement(ElementNames.Page,
                         new XAttribute(AttributeNames.Id, page.Id),
                         new XAttribute(AttributeNames.Title, page.Title),
                         (string.IsNullOrEmpty(page.MenuTitle) ? null : new XAttribute(AttributeNames.MenuTitle, page.MenuTitle)),
                         new XAttribute(AttributeNames.UrlTitle, page.UrlTitle),
                         new XAttribute(AttributeNames.Description, page.Description ?? string.Empty),
                         new XAttribute(AttributeNames.ChangedDate, page.ChangeDate),
                         new XAttribute(AttributeNames.ChangedBy, page.ChangedBy ?? string.Empty));

                    var list = pageToToChildElementsTable[pageStructure.ParentId];

                    if (list == null)
                    {
                        list = new List<PageTreeInfo>();
                        pageToToChildElementsTable[pageStructure.ParentId] = list;
                    }

                    list.Add(new PageTreeInfo
                    {
                        ID = page.Id,
                        LocalOrdering = localOrdering,
                        Element = pageElement
                    });
                }

                var root = new XElement("root");

                BuildXmlStructure(root, Guid.Empty, pageToToChildElementsTable, 100);

#pragma warning disable 612
                var pageUrlBuilder = PageUrls.UrlProvider.CreateUrlBuilder(publicationScope, localizationScope, urlSpace);
                BuildFolderPaths(pagesData, root.Elements(), pageUrlBuilder, urlToIdLookup);
#pragma warning restore 612

                foreach (var urlLookupEntry in urlToIdLookup)
                {
                    idToUrlLookup.Add(urlLookupEntry.Value, urlLookupEntry.Key);
                }

                var lowerCaseUrlToIdLookup = new Dictionary<string, Guid>();

                foreach (KeyValuePair<string, Guid> keyValuePair in urlToIdLookup)
                {
                    string loweredUrl = keyValuePair.Key.ToLowerInvariant();

                    if (lowerCaseUrlToIdLookup.ContainsKey(loweredUrl))
                    {
                        if (!_knownNotUniqueUrls.Contains(loweredUrl))
                        {
                            lock (_knownNotUniqueUrls)
                            {
                                _knownNotUniqueUrls.Add(loweredUrl);
                            }
                            Log.LogError(LogTitle, "Multiple pages share the same path '{0}'. Page ID: '{1}'. Duplicates are ignored.".FormatWith(loweredUrl, keyValuePair.Value));
                        }
                        
                        continue;
                    }

                    lowerCaseUrlToIdLookup.Add(loweredUrl, keyValuePair.Value);
                }

                return new Map
                           {
                               IdToUrlLookup = idToUrlLookup,
                               UrlToIdLookup = urlToIdLookup,
                               LowerCaseUrlToIdLookup = lowerCaseUrlToIdLookup,
                               RootPagesLookup = root.Elements(),
                               PageUrlBuilder = pageUrlBuilder
                           };
            }
        }

        private static void BuildXmlStructure(XElement root, Guid currentPageId, Hashtable<Guid, List<PageTreeInfo>> pageToChildElementsTable, int depth)
        {
            if (depth == 0) return;

            List<PageTreeInfo> children = pageToChildElementsTable[currentPageId];
            if (children == null)
            {
                return;
            }

            foreach (PageTreeInfo pageInfo in children.OrderBy(pageInfo => pageInfo.LocalOrdering))
            {
                root.Add(pageInfo.Element);

                BuildXmlStructure(pageInfo.Element, pageInfo.ID, pageToChildElementsTable, depth - 1);
            }
        }

        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        private static void BuildFolderPaths(SitemapBuildingData pagesData, IEnumerable<XElement> roots, IPageUrlBuilder pageUrlBuilder, IDictionary<string, Guid> urlToIdLookup)
        {
            BuildFolderPaths(pagesData, roots, urlToIdLookup, pageUrlBuilder);
        }

        [Obsolete("Use Composite.Core.Routing namespace to work with URLs")]
        private static void BuildFolderPaths(SitemapBuildingData pagesData, IEnumerable<XElement> elements, IDictionary<string, Guid> urlToIdLookup, IPageUrlBuilder builder)
        {
            foreach (XElement element in elements)
            {
                Guid pageId = new Guid(element.Attribute(AttributeNames.Id).Value);

                IPage page = pagesData.PageById[pageId];
                IPageStructure pageStructure = pagesData.StructureById[pageId];
                if (pageStructure == null)
                {
                    continue;
                }

                Guid parentId = pageStructure.ParentId;

                PageUrlSet pageUrls = builder.BuildUrlSet(page, parentId);
                if(pageUrls == null)
                {
                    continue;
                }

                element.Add(new XAttribute(AttributeNames.URL, pageUrls.PublicUrl));

                string lookupUrl = pageUrls.PublicUrl;

                if(pageUrls.FriendlyUrl != null)
                {
                    element.Add(new XAttribute(AttributeNames.FriendlyUrl, pageUrls.FriendlyUrl));
                }

                //// FolderPath isn't used any more
                //element.Add(new XAttribute("FolderPath", builder.FolderPaths[pageId]));

                element.Add(new XAttribute(AttributeNames.Depth, 1 + element.Ancestors(PageElementName).Count()));

                // NOTE: urlToIdLookup is obsolete, but old API needs it
                if (urlToIdLookup.ContainsKey(lookupUrl))
                {
                    Log.LogError(LogTitle, "Multiple pages share the same path '{0}', page ID: '{1}'. Duplicates are ignored.".FormatWith(pageUrls.PublicUrl, pageId));
                    continue;
                }

                urlToIdLookup.Add(lookupUrl, pageId);

                BuildFolderPaths(pagesData, element.Elements(), urlToIdLookup, builder);
            }
        }



        private static void OnPagesChanged(object sender, StoreEventArgs args)
        {
            IncrementVersion(DataScopeIdentifier.FromPublicationScope(args.PublicationScope));
        }

        private static void OnPageStructureChanged(object sender, StoreEventArgs args)
        {
            IncrementVersion(DataScopeIdentifier.Public);
            IncrementVersion(DataScopeIdentifier.Administrated);
        }

        private static void IncrementVersion(DataScopeIdentifier dataScopeIdentifier)
        {
            var publicationScope = dataScopeIdentifier.ToPublicationScope();

            ClearCachedData(key => key.Item1 == publicationScope);
        }

         private static void ClearCachedData()
         {
             ClearCachedData(c => true);
         }

        private static void ClearCachedData(Func<MapKey, bool> condition)
        {
            lock (_updatingLock)
            {
                var keysToUpdate = _versions.GetKeys().Where(condition).ToList();

                foreach (var key in keysToUpdate)
                {
                    // Updating versions
                    Interlocked.Increment(ref _versions[key].VersionNumber);

                    // Clearing cached data
                    _generatedMaps.Remove(key);
                }
            }
        }

        private static void AnnotatePagesWithOpenAndCurrent(Guid pageId, List<XElement> pageElements)
        {
            string pageIdAsString = pageId.ToString();
            XAttribute matchingPageIdAttrib = GetSiteMap().DescendantsAndSelf().Attributes(AttributeNames.Id).FirstOrDefault(f => f.Value == pageIdAsString);

            if (matchingPageIdAttrib != null)
            {
                List<string> openPageIdList = matchingPageIdAttrib.Parent.AncestorsAndSelf(PageElementName).Attributes(AttributeNames.Id).Select(f => f.Value).ToList();

                foreach (XElement openPage in pageElements.DescendantsAndSelf(PageElementName).Where(f => openPageIdList.Contains(f.Attribute(AttributeNames.Id).Value)))
                {
                    openPage.Add(new XAttribute("isopen", "true"));
                    if (openPage.Attribute(AttributeNames.Id).Value == pageIdAsString)
                    {
                        openPage.Add(new XAttribute("iscurrent", "true"));
                    }
                }
            }
        }



        private static IEnumerable<XElement> GetSitemapByScopeUnannotated(SitemapScope associationScope, Guid pageId)
        {
            if (associationScope == SitemapScope.All)
            {
                foreach (XElement homepage in GetSiteMap())
                {
                    yield return new XElement(homepage);
                }

                yield break;
            }

            Verify.ArgumentCondition(pageId != Guid.Empty, "pageId", "The parameter is Guid.Empty");

            XElement currentPageElement = PageStructureInfo.GetSiteMap().DescendantsAndSelf().FirstOrDefault(f => f.Attribute("Id").Value == pageId.ToString());

            // finde dybden - hvis scope dybden == nuværende dybde + 1, så skift nuværende til first child

            if (currentPageElement == null) throw new ArgumentException("No page with the given ID could be located in the current data scope ('{0}').".FormatWith(pageId), "pageId");

            XElement pageCopy = null;

            switch (associationScope)
            {
                case SitemapScope.Current:
                    yield return new XElement(currentPageElement.Name, currentPageElement.Attributes());
                    break;
                case SitemapScope.Parent:
                    if (currentPageElement.Parent != null && currentPageElement.Parent.Name == PageElementName)
                    {
                        yield return new XElement(currentPageElement.Parent.Name, currentPageElement.Parent.Attributes());
                    }
                    break;
                case SitemapScope.Descendants:
                    foreach (XElement child in currentPageElement.Elements(PageElementName))
                    {
                        yield return new XElement(child);
                    }
                    break;
                case SitemapScope.DescendantsAndCurrent:
                    yield return new XElement(currentPageElement);
                    break;
                case SitemapScope.Children:
                    foreach (XElement page in currentPageElement.Elements(PageElementName))
                    {
                        yield return new XElement(page.Name, page.Attributes());
                    }
                    break;
                case SitemapScope.Siblings:
                    foreach (XElement page in currentPageElement.Parent.Elements(PageElementName))
                    {
                        yield return new XElement(page.Name, page.Attributes());
                    }
                    break;
                case SitemapScope.Ancestors:
                    foreach (XElement page in currentPageElement.Ancestors(PageElementName))
                    {
                        pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
                    }
                    yield return pageCopy;
                    break;
                case SitemapScope.AncestorsAndCurrent:
                    foreach (XElement page in currentPageElement.AncestorsAndSelf(PageElementName))
                    {
                        pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
                    }
                    yield return pageCopy;
                    break;
                case SitemapScope.Level1:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level2:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level3:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level4:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level1AndSiblings:
                    foreach (XElement page in PageStructureInfo.GetSiteMap())
                    {
                        yield return new XElement(page.Name, page.Attributes());
                    }
                    break;
                case SitemapScope.Level2AndSiblings:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 2))
                    {
                        yield return page;
                    }
                    break;
                case SitemapScope.Level3AndSiblings:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 3))
                    {
                        yield return page;
                    }
                    break;
                case SitemapScope.Level4AndSiblings:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 4))
                    {
                        yield return page;
                    }
                    break;
                case SitemapScope.Level1AndDescendants:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level2AndDescendants:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level3AndDescendants:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case SitemapScope.Level4AndDescendants:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + associationScope);
            }
        }



        private static XElement GetPageCopyBySiteDepth(XElement associatedPageElement, int siteDepth, bool shallow)
        {
            string siteDepthStr = siteDepth.ToString();
            XElement match = associatedPageElement.AncestorsAndSelf(PageElementName).SingleOrDefault(f => f.Attribute(AttributeNames.Depth).Value == siteDepthStr);

            if (match == null)
            {
                return null;
            }

            if (shallow)
            {
                return new XElement(match.Name, match.Attributes());
            }

            return new XElement(match);
        }


        private static IEnumerable<XElement> GetSiblingsCopyBySiteDepth(XElement associatedPageElement, int siteDepth)
        {
            int currentPageDepth = Int32.Parse(associatedPageElement.Attribute(AttributeNames.Depth).Value);

            IEnumerable<XElement> elementsToCopy = null;

            if (siteDepth == 1)
            {
                elementsToCopy = associatedPageElement.AncestorsAndSelf(PageElementName).Where(f => f.Attribute(AttributeNames.Depth).Value == "1");
            }
            else if (currentPageDepth >= siteDepth)
            {
                elementsToCopy = associatedPageElement.AncestorsAndSelf(PageElementName).Where(f => f.Attribute(AttributeNames.Depth).Value == (siteDepth - 1).ToString()).Elements(PageElementName);
            }
            else
            {
                if (currentPageDepth == siteDepth - 1)
                {
                    elementsToCopy = associatedPageElement.Elements(PageElementName);
                }
            }

            if (elementsToCopy != null)
            {
                foreach (XElement pageElement in elementsToCopy)
                {
                    yield return new XElement(pageElement.Name, pageElement.Attributes());
                }
            }
        }
    }
}
