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
        private readonly Lazy<List<XElement>> _sitemap;
        private readonly DataConnection _connection;



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
            _sitemap = new Lazy<List<XElement>>(() =>
            {
                using (new DataScope(connection.CurrentPublicationScope, connection.CurrentLocale))
                {
                    return PageStructureInfo.GetSiteMap().ToList();
                }
            });
            
            _connection = connection;
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual PageNode GetPageNodeById(Guid id)
        {
            var page = PageManager.GetPageById(id);

            if (page == null)
            {
                return null;
            }

            return new PageNode(page, this);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public virtual IEnumerable<PageNode> HomePageNodes
        {
            get
            {
                return HomePageIds.Select(GetPageNodeById).Where(p => p != null);
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
                return PageManager.GetChildrenIDs(Guid.Empty);
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
            Guid pageId = Guid.Empty;
            hostname = hostname.ToUpperInvariant();

            // Getting the longest not-empty hostname that matches the right part of the current hostname
            List<IHostnameBinding> hostNameMatches =
                (from binding in _connection.Get<IHostnameBinding>() as IEnumerable<IHostnameBinding>
                 where !binding.Hostname.IsNullOrEmpty()
                       && hostname.EndsWith(binding.Hostname.ToUpperInvariant(), StringComparison.Ordinal)
                 orderby binding.Hostname.Length descending
                 select binding).Take(1).ToList();

            if (hostNameMatches.Count > 0)
            {
                pageId = hostNameMatches[0].HomePageId;
            }

            if (pageId == Guid.Empty)
            {
                pageId = HomePageIds.FirstOrDefault();
            }

            return GetPageNodeById(pageId);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]    
        public virtual PageNode CurrentHomePageNode
        {
            get
            {
                var homePageId = CurrentHomePageId;
                if (homePageId == Guid.Empty)
                {
                    return null;
                }

                return GetPageNodeById(homePageId);
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
                return _sitemap.Value.AsReadOnly();
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

                while (true)
                {
                    Guid parentId = PageManager.GetParentId(pageId);
                    if (parentId == Guid.Empty)
                    {
                        return pageId;
                    }
                    pageId = parentId;
                }
            }
        }


        internal XElement GetElementByPageId(Guid id)
        {
            string idString = id.ToString();

            XAttribute matchAttribute = _sitemap.Value.DescendantsAndSelf("Page").Attributes("Id").FirstOrDefault(f => f.Value == idString);

            if (matchAttribute == null)
            {
                return null;
            }

            return matchAttribute.Parent;
        }
    }
}
