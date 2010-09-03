using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Core.WebClient.Renderings.Page;


namespace Composite.Data
{
    /// <summary>
    /// Represents a page in the Composite C1 sitemap hierarchy.
    /// </summary>
    public class PageNode
    {
        private XElement _pageElement;

        /// <summary>
        /// Create a new PageNode based on a XElement from the sitemap
        /// </summary>
        internal PageNode(XElement sitemapElement) 
        {
            Verify.That(sitemapElement.Name == "Page", "Expected element named 'Page', got '{0}'", sitemapElement.Name);
            _pageElement = sitemapElement;
        }


        /// <summary>
        /// The Id of the page
        /// </summary>
        public Guid Id
        {
            get
            {
                return Guid.Parse(_pageElement.Attribute("Id").Value);
            }
        }


        /// <summary>
        /// The Title of the page
        /// </summary>
        public string Title
        {
            get
            {
                return _pageElement.Attribute("Title").Value;
            }
        }


        /// <summary>
        /// The Menu Title of the page
        /// </summary>
        public string MenuTitle
        {
            get
            {
                if (_pageElement.Attribute("MenuTitle") != null)
                {
                    return _pageElement.Attribute("MenuTitle").Value;
                }

                return null;
            }
        }


        /// <summary>
        /// The Description of the page
        /// </summary>
        public string Description
        {
            get
            {
                return _pageElement.Attribute("Description").Value;
            }
        }


        /// <summary>
        /// Url to this page. The Url is relative.
        /// </summary>
        public string Url
        {
            get
            {
                return _pageElement.Attribute("URL").Value;
            }
        }


        /// <summary>
        /// The level this page is placed at in the sitemap. Level 1 is a homepage, level 2 are children of the homepage and so on.
        /// </summary>
        public int Level
        {
            get
            {
                return Int32.Parse(_pageElement.Attribute("Depth").Value);
            }
        }


        /// <summary>
        /// Returns the parent <see cref="PageNode"/>.
        /// </summary>
        public PageNode ParentPage
        {
            get
            {
                if (_pageElement.Parent == null || _pageElement.Parent.Name != "Page")
                {
                    return null;
                }

                return new PageNode(_pageElement.Parent);
            }
        }


        /// <summary>
        /// Returns <see cref="PageNode"/> elements that represent the immediate children of this page.
        /// </summary>
        public IEnumerable<PageNode> ChildPages
        {
            get
            {
                foreach (XElement childElement in _pageElement.Elements("Page"))
                {
                    yield return new PageNode(childElement);
                }
            }
        }


        /// <summary>
        /// Returns <see cref="PageNode"/> elements that is with the <see cref="SitemapScope"/> of this page-
        /// </summary>
        public IEnumerable<PageNode> GetPageNodes(SitemapScope scope) 
        {
            if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

            foreach (XElement pageElement in PageStructureInfo.GetPageElementsByScope(scope,_pageElement))
	        {
                yield return new PageNode(pageElement);
	        }
        }


        /// <summary>
        /// Return the Page Id's that is with the <see cref="SitemapScope"/> of this page-
        /// </summary>
        public IEnumerable<Guid> GetPageIds(SitemapScope scope) 
        {
            if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

            XElement sitemapRoot = _pageElement;
            while (sitemapRoot.Parent!=null)
            {
                sitemapRoot = sitemapRoot.Parent;
            }
            return PageStructureInfo.GetAssociatedPageIds(this.Id, scope, sitemapRoot.Elements());
        }


        /// <summary>
        /// XML representing the page and it's decendants. Do NOT modify this structure. To do modifications, clone this first.
        /// </summary>
        public XElement SitemapXml
        {
            get
            {
                return _pageElement;
            }
        }


        /// <summary>
        /// Serialize the page specific state to a string for reading.
        /// </summary>
        public override string ToString()
        {
            return string.Format("PageNode(Id:'{0}', Title:'{1}', Description:'{2}', MenuTitle:'{3}', Url:'{4}', Level:'{5}')",
                this.Id,
                this.Title,
                this.Description,
                this.MenuTitle,
                this.Url,
                this.Level);
        }
    }
}
