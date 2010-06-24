using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using Composite.Data.Types;
using Composite.Data;
using Composite.Renderings.Page;
using System.Collections.Generic;
//using Composite.Data;

namespace Composite.Spikes.MAW
{
    public partial class GetPageDataXml : System.Web.UI.Page
    {
        public const string SitemapNamespaceString = "http://www.composite.net/ns/data/sitemap/1.0";
        private static XNamespace SitemapNamespace = XNamespace.Get(SitemapNamespaceString);

        protected void Page_Load(object sender, EventArgs e)
        {
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                Guid pageId = DataFacade.GetData<IPage>(f => f.Title == "BB Level 2 parent").Select(f => f.Id).First();
                //                Response.Write(HttpUtility.HtmlEncode(pageId.ToString()));
                //                Response.End();

                DataReference<IPage> pageReference = new DataReference<IPage>(pageId);

                // SCOPE:
                PageAssociationScope pageScope = PageAssociationScope.Level1AndSiblingPages;

                

                IEnumerable<string> pageMetaTypeNames = new List<string>();
                IEnumerable<string> pageFolderTypeNames = new List<string>();

                var result = PageStructureInfo.GetSitemapByScope(pageScope, pageId); //, pageMetaTypeNames, pageFolderTypeNames);
                XElement root = new XElement("root", result);

                foreach (Guid relevantPageId in PageStructureInfo.GetAssociatedPageIds(pageId, pageScope))
                {
                    root.Add(new XElement("pageId", relevantPageId));
                } 

                Response.Write(root.ToString());
            }

        }


        ///// <summary>
        ///// Returns portions of the sitemap in acordance with the specified scope. Sitemap elements are hierarchically
        ///// ordered and are marked with 'isopen' and 'iscurrent' attributes when open/selected relative to the supplied pageId.
        ///// </summary>
        ///// <param name="associationScope">The scope of pages to return. This is relative to the specified pageId.</param>
        ///// <param name="pageId">The C1 Page ID to use when defining the scope. This must be a valid page id.</param>
        ///// <returns></returns>
        //public static IEnumerable<XElement> GetSitemapByScope(PageAssociationScope associationScope, Guid pageId)
        //{
        //    List<XElement> pageElements = GetSitemapByScopeUnannotated(associationScope, pageId).ToList();
        //    AnnotatePagesWithOpenAndCurrent(pageId, pageElements);

        //    foreach (XElement pageElement in pageElements)
        //    {
        //        yield return pageElement;
        //    }
        //}




        //private static void AnnotatePagesWithOpenAndCurrent(Guid pageId, List<XElement> pageElements)
        //{
        //    string pageIdAsString = pageId.ToString();
        //    XAttribute matchingPageIdAttrib = PageStructureInfo.GetSiteMap().DescendantsAndSelf().Attributes("Id").FirstOrDefault(f => f.Value == pageIdAsString);

        //    if (matchingPageIdAttrib != null)
        //    {
        //        List<string> openPageIdList = matchingPageIdAttrib.Parent.AncestorsAndSelf(SitemapNamespace + "Page").Attributes("Id").Select(f => f.Value).ToList();

        //        foreach (XElement openPage in pageElements.DescendantsAndSelf(SitemapNamespace + "Page").Where(f => openPageIdList.Contains(f.Attribute("Id").Value)))
        //        {
        //            openPage.Add(new XAttribute("isopen", "true"));
        //            if (openPage.Attribute("Id").Value == pageIdAsString)
        //            {
        //                openPage.Add(new XAttribute("iscurrent", "true"));
        //            }
        //        }
        //    }
        //}



        //private static IEnumerable<XElement> GetSitemapByScopeUnannotated(PageAssociationScope associationScope, Guid pageId)
        //{
        //    if (associationScope == PageAssociationScope.AllPages)
        //    {
        //        foreach (XElement homepage in PageStructureInfo.GetSiteMap())
        //        {
        //            yield return new XElement(homepage);
        //        }

        //        yield break;
        //    }

        //    XElement currentPageElement = PageStructureInfo.GetSiteMap().DescendantsAndSelf().FirstOrDefault(f => f.Attribute("Id").Value == pageId.ToString());

        //    if (currentPageElement == null) throw new ArgumentException("No page with the given ID could be located in the current data scope.", "pageId");

        //    XElement pageReference = null;
        //    XElement pageCopy = null;

        //    switch (associationScope)
        //    {
        //        case PageAssociationScope.CurrentPage:
        //            yield return new XElement(currentPageElement.Name, currentPageElement.Attributes());
        //            break;
        //        case PageAssociationScope.ParentPage:
        //            if (currentPageElement.Parent != null && currentPageElement.Parent.Name == SitemapNamespace + "Page")
        //            {
        //                yield return new XElement(currentPageElement.Parent.Name, currentPageElement.Parent.Attributes());
        //            }
        //            break;
        //        case PageAssociationScope.CurrentAndDescendantPages:
        //            yield return new XElement(currentPageElement);
        //            break;
        //        case PageAssociationScope.ChildPages:
        //            foreach (XElement page in currentPageElement.Elements(SitemapNamespace + "Page"))
        //            {
        //                yield return new XElement(page.Name, page.Attributes());
        //            }
        //            break;
        //        case PageAssociationScope.AncestorPages:
        //            foreach (XElement page in currentPageElement.Ancestors(SitemapNamespace + "Page"))
        //            {
        //                pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
        //            }
        //            yield return pageCopy;
        //            break;
        //        case PageAssociationScope.AncestorAndCurrentPages:
        //            foreach (XElement page in currentPageElement.AncestorsAndSelf(SitemapNamespace + "Page"))
        //            {
        //                pageCopy = new XElement(page.Name, page.Attributes(), pageCopy);
        //            }
        //            yield return pageCopy;
        //            break;
        //        case PageAssociationScope.Level1Page:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, true);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level2Page:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, true);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level3Page:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, true);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level4Page:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, true);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level1AndSiblingPages:
        //            foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 1))
        //            {
        //                yield return page;
        //            }
        //            break;
        //        case PageAssociationScope.Level2AndSiblingPages:
        //            foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 2))
        //            {
        //                yield return page;
        //            }
        //            break;
        //        case PageAssociationScope.Level3AndSiblingPages:
        //            foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 3))
        //            {
        //                yield return page;
        //            }
        //            break;
        //        case PageAssociationScope.Level4AndSiblingPages:
        //            foreach (XElement page in GetSiblingsCopyBySiteDepth(currentPageElement, 4))
        //            {
        //                yield return page;
        //            }
        //            break;
        //        case PageAssociationScope.Level1AndDescendantPages:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 1, false);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level2AndDescendantPages:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 2, false);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level3AndDescendantPages:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 3, false);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        case PageAssociationScope.Level4AndDescendantPages:
        //            pageCopy = GetPageCopyBySiteDepth(currentPageElement, 4, false);
        //            if (pageCopy != null)
        //            {
        //                yield return pageCopy;
        //            }
        //            break;
        //        default:
        //            throw new NotImplementedException("Unhandled PageAssociationScope type: " + associationScope.ToString());
        //    }
        //}



        //private static XElement GetPageCopyBySiteDepth(XElement associatedPageElement, int siteDepth, bool shallow)
        //{
        //    XElement match = associatedPageElement.AncestorsAndSelf(SitemapNamespace + "Page").SingleOrDefault(f=>f.Attribute("Depth").Value==siteDepth.ToString());

        //    if (match != null)
        //    {
        //        if (shallow == true)
        //        {
        //            return new XElement(match.Name, match.Attributes());
        //        }
        //        else
        //        {
        //            return new XElement(match);
        //        }
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}



        //private static IEnumerable<XElement> GetSiblingsCopyBySiteDepth(XElement associatedPageElement, int siteDepth)
        //{
        //    XElement match = associatedPageElement.AncestorsAndSelf(SitemapNamespace + "Page").SingleOrDefault(f => f.Attribute("Depth").Value == siteDepth.ToString());

        //    if (match != null)
        //    {
        //        foreach (XElement pageElement in match.Parent.Elements(SitemapNamespace + "Page"))
        //        {
        //            yield return new XElement(pageElement.Name, pageElement.Attributes());
        //        }
        //    }
        //    else
        //    {
        //        yield break;
        //    }
        //}

    }
}
