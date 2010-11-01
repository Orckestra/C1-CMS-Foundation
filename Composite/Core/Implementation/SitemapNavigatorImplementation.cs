using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Core.WebClient.Renderings.Page;
using System.Collections.Generic;
using Composite.Data.Types;


namespace Composite.Core.Implementation
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap", Justification = "We have decided to use Sitemap, not SiteMap")]
    public class SitemapNavigatorImplementation
    {
        private List<XElement> _sitemap;
        private DataConnection _connection;



        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called
        /// Used when CurrentPageId and CurrentHomePageId are called
        /// </summary>
        public SitemapNavigatorImplementation()
        {
        }



        public SitemapNavigatorImplementation(DataConnection connection)
        {
            using (DataConnection dataConnection = new DataConnection(connection.CurrentPublicationScope, connection.CurrentLocale))
            {
                _sitemap = PageStructureInfo.GetSiteMap().ToList();
            }
            _connection = connection;
        }



        public virtual PageNode GetPageNodeById(Guid id)
        {
            Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

            XElement pageXElement = GetElementByPageId(id);

            if (pageXElement == null)
            {
                return null;
            }

            return new PageNode(pageXElement);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual IEnumerable<PageNode> HomePageNodes
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                foreach (XElement homepageElement in _sitemap.Elements())
                {
                    yield return new PageNode(homepageElement);
                }
            }
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual IEnumerable<Guid> HomePageIds
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                foreach (XElement homepageElement in _sitemap.Elements())
                {
                    yield return Guid.Parse(homepageElement.Attribute("Id").Value);
                }
            }
        }



        public virtual PageNode CurrentPageNode
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return this.GetPageNodeById(PageRenderer.CurrentPageId);
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Hostname")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "hostname")]
        public virtual PageNode GetPageNodeByHostname(string hostname)
        {
            XElement homepageElement = null;
            Guid pageId = Guid.Empty;
            hostname = hostname.ToLower();

            IEnumerable<IPageHostNameBinding> hostNameMatches =
                from binding in _connection.Get<IPageHostNameBinding>()
                where binding.HostName != null
                        && binding.HostName != string.Empty
                orderby binding.HostName.Length descending
                select binding;

            foreach (var binding in hostNameMatches)
            {
                if (hostname.EndsWith(binding.HostName.ToLower()))
                {
                    pageId = binding.PageId;
                    break;
                }
            }

            if (pageId == Guid.Empty)
            {
                homepageElement = _sitemap.FirstOrDefault();
            }
            else
            {
                homepageElement = this.GetElementByPageId(pageId);
            }

            if (homepageElement == null)
            {
                return null;
            }
            else
            {
                return new PageNode( homepageElement );
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]    
        public virtual PageNode CurrentHomePageNode
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                if (PageRenderer.CurrentPageId == Guid.Empty)
                {
                    return null;
                }

                XElement pageXElement = GetElementByPageId(PageRenderer.CurrentPageId);

                while ((pageXElement.Parent != null) && (pageXElement.Parent.Name.LocalName == "Page"))
                {
                    pageXElement = pageXElement.Parent;
                }

                return new PageNode(pageXElement);
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemaps")]
        public virtual ReadOnlyCollection<XElement> AllSitemapsXml
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return _sitemap.AsReadOnly();
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public virtual XElement SitemapXml
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");
                Verify.That(this.CurrentPageId != Guid.Empty, "No current page Id could be located");

                XElement pageElement = this.GetElementByPageId(this.CurrentPageId);

                while (pageElement.Parent!=null)
                {
                    pageElement = pageElement.Parent;
                }

                return pageElement;
            }
        }



        // This is a static on the actual class, but non-static here to allow mocking
        public virtual Guid CurrentPageId
        {
            get
            {
                return PageRenderer.CurrentPageId;
            }
        }



        // This is a static on the actual class, but non-static here to allow mocking
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual Guid CurrentHomePageId
        {
            get
            {
                Guid pageId = this.CurrentPageId;

                while (pageId != Guid.Empty && PageManager.GetParentId(pageId) != Guid.Empty)
                {
                    pageId = PageManager.GetParentId(pageId);
                }

                return pageId;
            }
        }


        private XElement GetElementByPageId(Guid id)
        {
            string idString = id.ToString();

            XAttribute matchAttribute = _sitemap.DescendantsAndSelf("Page").Attributes("Id").Where(f => f.Value == idString).FirstOrDefault();

            if (matchAttribute == null)
            {
                return null;
            }

            return matchAttribute.Parent;
        }
    }
}
