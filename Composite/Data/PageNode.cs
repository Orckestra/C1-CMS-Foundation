using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Core.WebClient.Renderings.Page;


namespace Composite.Data
{
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

        public Guid Id
        {
            get
            {
                return Guid.Parse(_pageElement.Attribute("Id").Value);
            }
        }

        public string Title
        {
            get
            {
                return _pageElement.Attribute("Title").Value;
            }
        }

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


        public string Description
        {
            get
            {
                return _pageElement.Attribute("Description").Value;
            }
        }
        
        public string Url
        {
            get
            {
                return _pageElement.Attribute("URL").Value;
            }
        }

        
        public int Level
        {
            get
            {
                return Int32.Parse(_pageElement.Attribute("Depth").Value);
            }
        }


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

        public IEnumerable<PageNode> GetPageNodes(SitemapScope scope) 
        {
            if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

            foreach (XElement pageElement in PageStructureInfo.GetPageElementsByScope(scope,_pageElement))
	        {
                yield return new PageNode(pageElement);
	        }
        }

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

        public XElement SitemapXml
        {
            get
            {
                return _pageElement;
            }
        }


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
