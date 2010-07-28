using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Logging;
using Composite.Types;
using Composite.StringExtensions;


namespace Composite.Renderings.Page
{
    public static class PageStructureInfo
    {
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
        }

        private static readonly Hashtable<Pair<string, CultureInfo>, Map> _generatedMaps = new Hashtable<Pair<string, CultureInfo>, Map>();
        private static readonly Hashtable<Pair<string, CultureInfo>, Version> _versions = new Hashtable<Pair<string, CultureInfo>, Version>(); 
        private static readonly object _updatingLock = new object();
        private static readonly object[] _buildingLock = new[] { new object(), new object() }; // Separated objects for 'Public' and 'Administrated' scopes

        public const string SitemapNamespaceString = "http://www.composite.net/ns/data/sitemap/1.0";
        private static XNamespace SitemapNamespace = XNamespace.Get(SitemapNamespaceString);
        private static XName PageElementName = SitemapNamespace + "Page";

        private static readonly string LogTitle = "PageStructureInfo";

        static PageStructureInfo()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IPage>(OnPagesChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IPage>(OnPagesChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IPage>(OnPagesChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IPageStructure>(OnPageStructureChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterAdd<ISystemActiveLocale>(OnLocaleChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<ISystemActiveLocale>(OnLocaleChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<ISystemActiveLocale>(OnLocaleChanged, true);
        }


        /// <summary>
        /// Builds a list of [Page Id, Page label] pairs.
        /// The items in the list is returned in document order and the labels are indented with one space for each depth level
        /// of the page.
        /// </summary>
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
                string id = pageElement.Attribute("Id").Value;
                yield return new KeyValuePair<Guid, string>(new Guid(id), label);

                foreach (KeyValuePair<Guid, string> childOption in PageListInDocumentOrder(pageElement.Elements(), indentLevel + 1))
                {
                    yield return childOption;
                }
            }
        }

        private static string GetLabelForPageElement(string indentString, XElement pageElement)
        {
            string labelText = (pageElement.Attribute("MenuTitle") ?? pageElement.Attribute("Title")).Value;

            return string.Format("{0}{1}", indentString, labelText);
        }




        public static IEnumerable<XElement> GetSiteMap()
        {
            return GetMap().RootPagesLookup;
        }



        public static IEnumerable<XElement> GetSiteMapWithActivePageAnnotations()
        {
            Guid pageId = PageRenderer.CurrentPageId;

            return GetSiteMapWithActivePageAnnotations(pageId);
        }



        public static IEnumerable<XElement> GetSiteMapWithActivePageAnnotations(Guid pageId)
        {
            return GetSitemapByScope(PageAssociationScope.AllPages, pageId);
        }



        /// <summary>
        /// Returns portions of the sitemap in acordance with the specified scope. Sitemap elements are hierarchically
        /// ordered and are marked with 'isopen' and 'iscurrent' attributes when open/selected relative to the supplied pageId.
        /// </summary>
        /// <param name="associationScope">The scope of pages to return. This is relative to the specified pageId.</param>
        /// <param name="pageId">The C1 Page ID to use when defining the scope. This must be a valid page id.</param>
        /// <returns></returns>
        public static IEnumerable<XElement> GetSitemapByScope(PageAssociationScope associationScope, Guid pageId)
        {
            List<XElement> pageElements = GetSitemapByScopeUnannotated(associationScope, pageId).ToList();
            AnnotatePagesWithOpenAndCurrent(pageId, pageElements);

            foreach (XElement pageElement in pageElements)
            {
                yield return pageElement;
            }
        }



        public static IEnumerable<Guid> GetAssociatedPageIds(Guid pageId, PageAssociationScope associationScope)
        {
            switch (associationScope)
            {
                case PageAssociationScope.CurrentPage:
                    yield return pageId;
                    break;
                case PageAssociationScope.AllPages:
                    foreach (Guid id in GetIdToUrlLookup().Keys)
                    {
                        yield return id;
                    }
                    break;
                case PageAssociationScope.CurrentAndDescendantPages:
                case PageAssociationScope.ChildPages:
                case PageAssociationScope.SiblingPages:
                case PageAssociationScope.AncestorPages:
                case PageAssociationScope.AncestorAndCurrentPages:
                case PageAssociationScope.ParentPage:
                case PageAssociationScope.Level1Page:
                case PageAssociationScope.Level2Page:
                case PageAssociationScope.Level3Page:
                case PageAssociationScope.Level4Page:
                case PageAssociationScope.Level1AndDescendantPages:
                case PageAssociationScope.Level2AndDescendantPages:
                case PageAssociationScope.Level3AndDescendantPages:
                case PageAssociationScope.Level4AndDescendantPages:
                case PageAssociationScope.Level1AndSiblingPages:
                case PageAssociationScope.Level2AndSiblingPages:
                case PageAssociationScope.Level3AndSiblingPages:
                case PageAssociationScope.Level4AndSiblingPages:
                    string pageIdString = pageId.ToString();
                    XAttribute idMatchAttrib = PageStructureInfo.GetSiteMap().DescendantsAndSelf().Attributes("Id").Where(id => id.Value == pageIdString).FirstOrDefault();
                    if (idMatchAttrib != null)
                    {
                        XElement currentPageElement = idMatchAttrib.Parent;
                        IEnumerable<XElement> scopeElements = GetPageElementsByScope(associationScope, currentPageElement);

                        foreach (XElement pageElement in scopeElements)
                        {
                            yield return new Guid(pageElement.Attribute("Id").Value);
                        }
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled PageAssociationScope type: " + associationScope.ToString());
            }
        }


        private static Map GetMap()
        {
            if(System.Transactions.Transaction.Current != null)
            {
                var exceptionToLog = new Exception("It is not safe to use PageStructureInfo/SiteMap functionality in transactional context. Method Composite.Data.Types.PageManager can be used instead.");
                LoggingService.LogWarning(typeof(PageStructureInfo).Name, exceptionToLog);
            }

            var scopeKey = new Pair<string, CultureInfo>(DataScopeManager.CurrentDataScope.Name, LocalizationScopeManager.CurrentLocalizationScope);
            Map map = _generatedMaps[scopeKey];

            if (map != null)
            {
                return map;
            }
        
            // Using different sync roots for different datascopes
            object buildingLock = _buildingLock[scopeKey.First == DataScopeIdentifier.Public.Name ? 0 : 1];

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

                map = BuildMap();

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

        public static bool TryGetPageUrl(Guid guid, out string pageUrl)
        {
            return GetMap().IdToUrlLookup.TryGetValue(guid, out pageUrl);
        }

        [Obsolete("Use Composite.WebClient.UrlPageHelper class")]
        public static bool TryGetPageUrlByFriendlyUrl(string friendlyUrl, out string pageUrl)
        {
            string lowerFriendlyUrl = friendlyUrl.ToLower();

            string matchingUrl = GetSiteMap().DescendantsAndSelf().Attributes("FriendlyUrl").Where(f => f.Value.ToLower() == lowerFriendlyUrl).Select(f => f.Parent.Attribute("URL").Value).FirstOrDefault();

            pageUrl = matchingUrl;

            return matchingUrl != null;
        }



        public static Dictionary<string, Guid> GetUrlToIdLookup()
        {
            return GetMap().UrlToIdLookup;
        }

        public static Dictionary<string, Guid> GetLowerCaseUrlToIdLookup()
        {
           return GetMap().LowerCaseUrlToIdLookup;
        }


        public static Dictionary<Guid, string> GetIdToUrlLookup()
        {
            return GetIdToUrlLookup(DataScopeManager.CurrentDataScope.Name, LocalizationScopeManager.CurrentLocalizationScope);
        }

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

            if (match != null && match.Attribute("Depth").Value==siteDepth.ToString())
            {
                yield return match;
            }
        }

        private static IEnumerable<XElement> GetPageElementsByScope(PageAssociationScope associationScope, XElement currentPageElement)
        {
            IEnumerable<XElement> scopeElements = null;
            XElement matchPage;

            switch (associationScope)
            {
                case PageAssociationScope.ParentPage:
                    if (currentPageElement.Parent != null && currentPageElement.Parent.Name == PageElementName)
                    {
                        yield return currentPageElement.Parent;
                    }
                    break;
                case PageAssociationScope.CurrentAndDescendantPages:
                    scopeElements = currentPageElement.DescendantsAndSelf(PageElementName);
                    break;
                case PageAssociationScope.ChildPages:
                    scopeElements = currentPageElement.Elements(PageElementName);
                    break;
                case PageAssociationScope.SiblingPages:
                    scopeElements = currentPageElement.Parent.Elements(PageElementName);
                    break;
                case PageAssociationScope.AncestorPages:
                    scopeElements = currentPageElement.Ancestors(PageElementName);
                    break;
                case PageAssociationScope.AncestorAndCurrentPages:
                    scopeElements = currentPageElement.AncestorsAndSelf(PageElementName);
                    break;
                case PageAssociationScope.Level1Page:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 1);
                    break;
                case PageAssociationScope.Level2Page:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 2);
                    break;
                case PageAssociationScope.Level3Page:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 3);
                    break;
                case PageAssociationScope.Level4Page:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 4);
                    break;
                case PageAssociationScope.Level1AndDescendantPages:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 1).DescendantsAndSelf();
                    break;
                case PageAssociationScope.Level2AndDescendantPages:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 2).DescendantsAndSelf();
                    break;
                case PageAssociationScope.Level3AndDescendantPages:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 3).DescendantsAndSelf();
                    break;
                case PageAssociationScope.Level4AndDescendantPages:
                    scopeElements = GetPageElementBySiteDepth(currentPageElement, 4).DescendantsAndSelf();
                    break;
                case PageAssociationScope.Level1AndSiblingPages:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 1).FirstOrDefault();
                    if (matchPage != null && matchPage.Parent != null)
                    {
                        scopeElements = matchPage.Parent.Elements(PageElementName);
                    }
                    break;
                case PageAssociationScope.Level2AndSiblingPages:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 1).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                case PageAssociationScope.Level3AndSiblingPages:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 2).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                case PageAssociationScope.Level4AndSiblingPages:
                    matchPage = GetPageElementBySiteDepth(currentPageElement, 3).FirstOrDefault();
                    if (matchPage != null)
                    {
                        scopeElements = matchPage.Elements(PageElementName);
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled PageAssociationScope type: " + associationScope);
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
            public SitemapBuildingData()
            {
                Pages = DataFacade.GetData<IPage>().ToList();
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

        private static Map BuildMap()
        {
            using (DebugLoggingScope.MethodInfoScope)
            {
                LoggingService.LogVerbose("PageStructureInfo", string.Format("Building page structure in the data scope '{0}' with the localization scope '{1}'", DataScopeManager.CurrentDataScope, LocalizationScopeManager.CurrentLocalizationScope));

                Dictionary<string, Guid> urlToIdLookup = new Dictionary<string, Guid>();
                Dictionary<Guid, string> idToUrlLookup = new Dictionary<Guid, string>();

                var pagesData = new SitemapBuildingData();

                var pageToToChildElementsTable = new Hashtable<Guid, List<PageTreeInfo>>();
                foreach (IPage page in pagesData.Pages)
                {
                    IPageStructure pageStructure = pagesData.StructureById[page.Id];

                    if (pageStructure == null)
                    {
                        LoggingService.LogWarning(LogTitle, "Failed to find PageStructure data. Page ID is '{0}'".FormatWith(page.Id));
                        continue;
                    }

                    int localOrdering = pageStructure.LocalOrdering;

                    XElement pageElement = XElement.Parse(string.Format("<sitemap:Page xmlns:sitemap='{0}' />", SitemapNamespace));
                    pageElement.Add(
                         new XAttribute("Id", page.Id),
                         new XAttribute("Title", page.Title),
                         (string.IsNullOrEmpty(page.MenuTitle) ? null : new XAttribute("MenuTitle", page.MenuTitle)),
                         new XAttribute("UrlTitle", page.UrlTitle),
                         (string.IsNullOrEmpty(page.FriendlyUrl) ? null : new XAttribute("FriendlyUrl", MakeRelativeUrl(page.FriendlyUrl))),
                         new XAttribute("Abstract", page.Abstract),
                         new XAttribute("ChangedDate", page.ChangeDate),
                         new XAttribute("ChangedBy", page.ChangedBy ?? string.Empty));

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

                XElement root = new XElement("root");

                BuildXmlStructure(root, Guid.Empty, pageToToChildElementsTable, 100);

                BuildFolderPaths(pagesData, root.Elements(), urlToIdLookup);

                foreach (var urlLookupEntry in urlToIdLookup)
                {
                    idToUrlLookup.Add(urlLookupEntry.Value, urlLookupEntry.Key);
                }

                Dictionary<string, Guid> lowerCaseUrlToIdLookup = new Dictionary<string, Guid>();

                foreach (KeyValuePair<string, Guid> keyValuePair in urlToIdLookup)
                {
                    lowerCaseUrlToIdLookup.Add(keyValuePair.Key.ToLower(), keyValuePair.Value);
                }

                return new Map
                           {
                               IdToUrlLookup = idToUrlLookup,
                               UrlToIdLookup = urlToIdLookup,
                               LowerCaseUrlToIdLookup = lowerCaseUrlToIdLookup,
                               RootPagesLookup = root.Elements(),
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

            foreach(PageTreeInfo pageInfo in children.OrderBy(pageInfo => pageInfo.LocalOrdering))
            {
                root.Add(pageInfo.Element);

                BuildXmlStructure(pageInfo.Element, pageInfo.ID, pageToChildElementsTable, depth - 1);
            }
        }

        private static string MakeRelativeUrl(string url)
        {
            return url.StartsWith("/") ? url : "/" + url;
        }

        private static void BuildFolderPaths(SitemapBuildingData pagesData, IEnumerable<XElement> roots, IDictionary<string, Guid> urlToIdLookup)
        {
            BuildFolderPaths(pagesData, roots, urlToIdLookup, new PageUrlBuilder());
        }

        private static void BuildFolderPaths(SitemapBuildingData pagesData, IEnumerable<XElement> elements, IDictionary<string, Guid> urlToIdLookup, PageUrlBuilder builder)
        {
            foreach (XElement element in elements)
            {
                Guid pageId = new Guid(element.Attribute("Id").Value);

                IPage page = pagesData.PageById[pageId];
                IPageStructure pageStructure = pagesData.StructureById[pageId];
                if (pageStructure == null)
                {
                    continue;
                }

                Guid parentId = pageStructure.ParentId;

                string pageUrl, lookupUrl;
                builder.BuildUrlInternal(page,
                    DataScopeManager.CurrentDataScope,
                    LocalizationScopeManager.CurrentLocalizationScope,
                    parentId,
                    out pageUrl, out lookupUrl);

                element.Add(new XAttribute("URL", pageUrl));

                // TODO: This attribute is to be removed
                element.Add(new XAttribute("FolderPath", builder.FolderPaths[pageId]));

                element.Add(new XAttribute("Depth", 1+ element.Ancestors(PageElementName).Count()));

                if (urlToIdLookup.ContainsKey(lookupUrl) == false)
                {
                    urlToIdLookup.Add(lookupUrl, pageId);

                    BuildFolderPaths(pagesData, element.Elements(), urlToIdLookup, builder);
                }
                else
                {
                    LoggingService.LogError("PageStructureInfo", string.Format("Multiple pages share the same path '{0}'. Duplicates are ignored.", pageUrl));
                }
            }
        }



        private static void OnPagesChanged(DataEventArgs args)
        {
            IncrementVersion(args.Data.DataSourceId.DataScopeIdentifier);
        }

        private static void OnPageStructureChanged(DataEventArgs args)
        {
            IncrementVersion(DataScopeIdentifier.Public);
            IncrementVersion(DataScopeIdentifier.Administrated);
        }

        private static void IncrementVersion(DataScopeIdentifier dataScopeIdentifier)
        {
            string dataScopeName = dataScopeIdentifier.Name;

            lock(_updatingLock)
            {
                var keysToUpdate = _versions.GetKeys().Where(key => key.First == dataScopeName).ToList();

                // Updating versions
                foreach (var key in keysToUpdate)
                {
                    Interlocked.Increment(ref _versions[key].VersionNumber);
                }

                // Clearing cached data
                foreach (var key in keysToUpdate)
                {
                    _generatedMaps.Remove(key);
                }
            }
        }

        private static void OnLocaleChanged(DataEventArgs args)
        {
            var localeInfo = args.Data as ISystemActiveLocale;

            if (localeInfo == null)
            {
                return;
            }

            CultureInfo cultureInfo = new CultureInfo(localeInfo.CultureName);

            lock (_updatingLock)
            {
                var keysToUpdate = _versions.GetKeys().Where(key => key.Second.Name == cultureInfo.Name).ToList();

                // Updating versions
                foreach (var key in keysToUpdate)
                {
                    Interlocked.Increment(ref _versions[key].VersionNumber);
                }

                // Clearing cached data
                foreach (var key in keysToUpdate)
                {
                    _generatedMaps.Remove(key);
                }
            }
        }

        private static void AnnotatePagesWithOpenAndCurrent(Guid pageId, List<XElement> pageElements)
        {
            string pageIdAsString = pageId.ToString();
            XAttribute matchingPageIdAttrib = PageStructureInfo.GetSiteMap().DescendantsAndSelf().Attributes("Id").FirstOrDefault(f => f.Value == pageIdAsString);

            if (matchingPageIdAttrib != null)
            {
                List<string> openPageIdList = matchingPageIdAttrib.Parent.AncestorsAndSelf(PageElementName).Attributes("Id").Select(f => f.Value).ToList();

                foreach (XElement openPage in pageElements.DescendantsAndSelf(PageElementName).Where(f => openPageIdList.Contains(f.Attribute("Id").Value)))
                {
                    openPage.Add(new XAttribute("isopen", "true"));
                    if (openPage.Attribute("Id").Value == pageIdAsString)
                    {
                        openPage.Add(new XAttribute("iscurrent", "true"));
                    }
                }
            }
        }



        private static IEnumerable<XElement> GetSitemapByScopeUnannotated(PageAssociationScope associationScope, Guid pageId)
        {
            if (associationScope == PageAssociationScope.AllPages)
            {
                foreach (XElement homepage in PageStructureInfo.GetSiteMap())
                {
                    yield return new XElement(homepage);
                }

                yield break;
            }

            XElement currentPageElement = PageStructureInfo.GetSiteMap().DescendantsAndSelf().FirstOrDefault(f => f.Attribute("Id").Value == pageId.ToString());

            // finde dybden - hvis scope dybden == nuværende dybde + 1, så skift nuværende til first child

            if (currentPageElement == null) throw new ArgumentException("No page with the given ID could be located in the current data scope.", "pageId");

            XElement pageCopy = null;

            switch (associationScope)
            {
                case PageAssociationScope.CurrentPage:
                    yield return new XElement(currentPageElement.Name, currentPageElement.Attributes());
                    break;
                case PageAssociationScope.ParentPage:
                    if (currentPageElement.Parent != null && currentPageElement.Parent.Name == PageElementName)
                    {
                        yield return new XElement(currentPageElement.Parent.Name, currentPageElement.Parent.Attributes());
                    }
                    break;
                case PageAssociationScope.CurrentAndDescendantPages:
                    yield return new XElement(currentPageElement);
                    break;
                case PageAssociationScope.ChildPages:
                    foreach (XElement page in currentPageElement.Elements(PageElementName))
                    {
                        yield return new XElement(page.Name, page.Attributes());
                    }
                    break;
                case PageAssociationScope.SiblingPages:
                    foreach (XElement page in currentPageElement.Parent.Elements(PageElementName))
                    {
                        yield return new XElement(page.Name, page.Attributes());
                    }
                    break;
                case PageAssociationScope.AncestorPages:
                    foreach (XElement page in currentPageElement.Ancestors(PageElementName))
                    {
                        pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
                    }
                    yield return pageCopy;
                    break;
                case PageAssociationScope.AncestorAndCurrentPages:
                    foreach (XElement page in currentPageElement.AncestorsAndSelf(PageElementName))
                    {
                        pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
                    }
                    yield return pageCopy;
                    break;
                case PageAssociationScope.Level1Page:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level2Page:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level3Page:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level4Page:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, true);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level1AndSiblingPages:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 1))
                    {
                        yield return page;
                    }
                    break;
                case PageAssociationScope.Level2AndSiblingPages:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 2))
                    {
                        yield return page;
                    }
                    break;
                case PageAssociationScope.Level3AndSiblingPages:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 3))
                    {
                        yield return page;
                    }
                    break;
                case PageAssociationScope.Level4AndSiblingPages:
                    foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 4))
                    {
                        yield return page;
                    }
                    break;
                case PageAssociationScope.Level1AndDescendantPages:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level2AndDescendantPages:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level3AndDescendantPages:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                case PageAssociationScope.Level4AndDescendantPages:
                    pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, false);
                    if (pageCopy != null)
                    {
                        yield return pageCopy;
                    }
                    break;
                default:
                    throw new NotImplementedException("Unhandled PageAssociationScope type: " + associationScope.ToString());
            }
        }



        private static XElement GetPageCopyBySiteDepth(XElement associatedPageElement, int siteDepth, bool shallow)
        {
            XElement match = associatedPageElement.AncestorsAndSelf(PageElementName).SingleOrDefault(f => f.Attribute("Depth").Value == siteDepth.ToString());

            if (match != null)
            {
                if (shallow == true)
                {
                    return new XElement(match.Name, match.Attributes());
                }
                else
                {
                    return new XElement(match);
                }
            }
            else
            {
                return null;
            }
        }



        private static IEnumerable<XElement> GetSiblingsCopyBySiteDepth(XElement associatedPageElement, int siteDepth)
        {
            int currentPageDepth = Int32.Parse(associatedPageElement.Attribute("Depth").Value);

            IEnumerable<XElement> elementsToCopy = null;

            if (currentPageDepth >= siteDepth)
            {
                elementsToCopy = associatedPageElement.AncestorsAndSelf(PageElementName).Where(f => f.Attribute("Depth").Value == (siteDepth-1).ToString()).Elements(PageElementName);
            }
            else
            {
                if (currentPageDepth == siteDepth - 1)
                {
                    elementsToCopy = associatedPageElement.Elements(PageElementName);
                }
            }

            if (elementsToCopy!=null)
            {
                foreach (XElement pageElement in elementsToCopy)
                {
                    yield return new XElement(pageElement.Name, pageElement.Attributes());
                }
            }
        }

    }
}
