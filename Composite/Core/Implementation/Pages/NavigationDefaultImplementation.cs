using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Core.WebClient.Renderings.Page;

namespace Composite.Core.Implementation.Pages
{
    public class NavigationDefaultImplementation : NavigationBase
    {
        private class MapRecord
        {
            public IEnumerable<XElement> LegasySiteMap;
            public XSiteMap SiteMap;
            public Hashtable<Guid, XPage> IdToPage;
        }

        private static readonly IEnumerable<XPage> EmptyPagesList = new XPage[0];
        private Hashtable<string, MapRecord> _maps = new Hashtable<string, MapRecord>();

        public override XSiteMap GetSiteMap()
        {
            var record = GetRecord();

            return record == null ? null : record.SiteMap;
        }

        private MapRecord GetRecord()
        {
            CultureInfo cultureInfo = LocalizationScopeManager.CurrentLocalizationScope;

            if (cultureInfo == CultureInfo.InvariantCulture)
            {
                return null;
            }

            string siteMapKey = DataScopeManager.CurrentDataScope.Name + cultureInfo;

            MapRecord record = _maps[siteMapKey];

            IEnumerable<XElement> legasySiteMap = PageStructureInfo.GetSiteMap();

            if (record != null && record.LegasySiteMap == legasySiteMap)
            {
                return record;
            }

            MapRecord newRecord = BuildMap(legasySiteMap);

            lock (_maps)
            {
                // Updating the record if it is old
                if (!_maps.ContainsKey(siteMapKey)
                    || record != null && _maps[siteMapKey].LegasySiteMap == record.LegasySiteMap)
                {
                    _maps[siteMapKey] = newRecord;
                }
            }

            return newRecord;
        }

        private static MapRecord BuildMap(IEnumerable<XElement> legasySiteMap)
        {
            MapRecord record = new MapRecord();
            record.LegasySiteMap = legasySiteMap;
            record.IdToPage = new Hashtable<Guid, XPage>();

            XSiteMap root = new XSiteMap(DataScopeManager.CurrentDataScope, LocalizationScopeManager.CurrentLocalizationScope);
            BuildMapRec(root, legasySiteMap, record.IdToPage);

            record.SiteMap = root;

            return record;
        }

        private static void BuildMapRec(XElement node, IEnumerable<XElement> children, Hashtable<Guid, XPage> id2page)
        {
            foreach (var xElement in children)
            {
                XPage page = new XPage();

                // Copying all the attributes except for "Depth"
                page.Add(xElement.Attributes().Where(attr => attr.Name != "Depth" && attr.Name != "URL").Select(attr => new XAttribute(attr)));

                page.Add(new XAttribute("Level", xElement.Attribute("Depth").Value));
                page.Add(new XAttribute("Url", xElement.Attribute("URL").Value));

                node.Add(page);

                id2page.Add(page.Id, page);

                BuildMapRec(page, xElement.Elements(), id2page);
            }
        }

        public override XPage GetCurrentPage()
        {
            Guid pageId = PageRenderer.CurrentPageId;
            if (pageId == Guid.Empty) return null;

            var record = GetRecord();
            return record == null ? null : record.IdToPage[pageId];
        }

        public override IEnumerable<XPage> SelectPages(XPage page, PageSelection selectionType)
        {
            Verify.ArgumentNotNull(page, "page");

            XSiteMap siteMap = page.SiteMap;
            Verify.ArgumentCondition(siteMap != null, "page", "Page is detached from site map.");

            switch(selectionType)
            {
                case PageSelection.Current:
                    return Wrap(page);

                case PageSelection.Children:
                    return page.ChildPages;

                case PageSelection.Descendants:
                    return page.Descendants();
                
                case PageSelection.DescendantsAndCurrent:
                    return page.DescendantsAndSelf();

                case PageSelection.Parent:
                    return Wrap(page.ParentPage);

                case PageSelection.Siblings:
                    return page.Parent.Elements().Where(el => el != page).Select(el => el as XPage);

                case PageSelection.SiblingsAndSelf:
                    return page.Parent.Elements().Select(el => el as XPage);

                case PageSelection.All:
                    return siteMap.Descendants();
                
                case PageSelection.Ancestors:
                    return page.Ancestors().Where(a => a is XPage).Select(a => a as XPage);

                case PageSelection.AncestorsAndCurrent:
                    return page.AncestorsAndSelf().Where(a => a is XPage).Select(a => a as XPage);

                case PageSelection.Level1:
                case PageSelection.Level2:
                case PageSelection.Level3:
                case PageSelection.Level4:
                    {
                        List<XPage> levels = GetLevels(page);
                        int level = GetLevel(selectionType);

                        return levels.Count < level ? EmptyPagesList : Wrap(levels[level - 1]);
                    }
                case PageSelection.Level1AndDescendants:
                case PageSelection.Level2AndDescendants:
                case PageSelection.Level3AndDescendants:
                case PageSelection.Level4AndDescendants:
                    {
                        List<XPage> levels = GetLevels(page);
                        int level = GetLevel(selectionType);

                        if (levels.Count < level) return EmptyPagesList;

                        return levels[level - 1].DescendantsAndSelf();
                    }

                case PageSelection.Level1AndSiblings:
                    return page.SiteMap.RootPages;

                case PageSelection.Level2AndSiblings:
                case PageSelection.Level3AndSiblings:
                case PageSelection.Level4AndSiblings:
                    {
                        List<XPage> levels = GetLevels(page);
                        int level = GetLevel(selectionType);

                        if (levels.Count < level - 1) return EmptyPagesList;

                        return levels[level - 2].ChildPages;
                    }
            }

            throw new NotImplementedException("Support for selection type  '" + typeof(PageSelection).FullName + "." + selectionType + "' is not implemented yet.");
        }

        private static int GetLevel(PageSelection selectionType)
        {
            switch (selectionType)
            {
                case PageSelection.Level1:
                case PageSelection.Level1AndSiblings:
                case PageSelection.Level1AndDescendants:
                    return 1;
                case PageSelection.Level2:
                case PageSelection.Level2AndSiblings:
                case PageSelection.Level2AndDescendants:
                    return 2;
                case PageSelection.Level3:
                case PageSelection.Level3AndSiblings:
                case PageSelection.Level3AndDescendants:
                    return 3;
                case PageSelection.Level4:
                case PageSelection.Level4AndSiblings:
                case PageSelection.Level4AndDescendants:
                    return 4;
            }

            throw new InvalidOperationException("Incorrect selection type: " + selectionType);
        }

        private static List<XPage> GetLevels(XPage currentPage)
        {
            var result = new List<XPage>();

            int count = 0;

            XPage currentElement = currentPage;
            while(currentElement != null)
            {
                result[count] = currentElement;
                currentElement = currentElement.ParentPage;
                count++;
            }

            result.Reverse();

            return result;
        }

        private static IEnumerable<XPage> Wrap(XPage page)
        {
            return page != null ? new[] {page} : EmptyPagesList;
        }
    }
}
