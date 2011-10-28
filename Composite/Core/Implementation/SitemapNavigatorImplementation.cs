using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Core.WebClient.Renderings.Page;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Documentation pending
    /// </summary>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="connection"></param>
        public SitemapNavigatorImplementation(DataConnection connection)
        {
            using (new DataScope(connection.CurrentPublicationScope, connection.CurrentLocale))
            {
                _sitemap = PageStructureInfo.GetSiteMap().ToList();
            }
            _connection = connection;
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual IEnumerable<PageNode> HomePageNodes
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return _sitemap.Select(homepageElement => new PageNode(homepageElement));
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual IEnumerable<Guid> HomePageIds
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return _sitemap.Select(homepageElement => Guid.Parse(homepageElement.Attribute("Id").Value));
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual PageNode CurrentPageNode
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return this.GetPageNodeById(PageRenderer.CurrentPageId);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="hostname"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Hostname")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "hostname")]
        public virtual PageNode GetPageNodeByHostname(string hostname)
        {
            XElement homepageElement = null;
            Guid pageId = Guid.Empty;
            hostname = hostname.ToLower();

            // Getting the longest not-empty hostname that matches the right part of the current hostname
            List<IHostnameBinding> hostNameMatches =
                (from binding in _connection.Get<IHostnameBinding>() as IEnumerable<IHostnameBinding>
                 where !binding.Hostname.IsNullOrEmpty()
                       && hostname.EndsWith(binding.Hostname.ToLower())
                 orderby binding.Hostname.Length descending
                 select binding).Take(1).ToList();

            if (hostNameMatches.Count > 0)
            {
                pageId = hostNameMatches[0].HomePageId;
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
            
            return new PageNode( homepageElement );
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemaps")]
        public virtual ReadOnlyCollection<XElement> AllSitemapsXml
        {
            get
            {
                Verify.IsNotNull(_sitemap, "Missing sitemap. This class may have invalid state due to wrong construction.");

                return _sitemap.AsReadOnly();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual Guid CurrentPageId
        {
            get
            {
                return PageRenderer.CurrentPageId;
            }
        }


        
        /// <summary>        
        /// Documentation pending
        /// </summary>
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
