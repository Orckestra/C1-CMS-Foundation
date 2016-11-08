using System;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Core.Implementation;
using System.Collections.Generic;


namespace Composite.Data
{
    /// <summary>
    /// Provide access to the Orckestra CMS sitemap structure and primary page attributes.
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
    public class SitemapNavigator : ImplementationContainer<SitemapNavigatorImplementation>
    {
        /// <summary>
        /// Initialize a new instance of the <see cref="SitemapNavigator"/> class using sitemap data from the provided <see cref="DataConnection"/>.
        /// </summary>
        /// <example>
        /// using (DataConnection dataConnection = new DataConnection())
        /// {
        ///     SitemapNavigator sitemapNavigator = new SitemapNavigator(dataConnection);
        ///     string thisPageTitle = sitemapNavigator.CurrentPageNode.Title;
        /// }
        /// </example>
        /// <param name="connection">The <see cref="DataConnection"/> to read sitemap data from</param>
        public SitemapNavigator(DataConnection connection)
            : base(() => ImplementationFactory.CurrentFactory.CreateSitemapNavigator(connection))
        {
            if (connection == null) throw new ArgumentNullException("connection");
        }



        /// <summary>
        /// Gets a <see cref="PageNode"/> for a specific page id.
        /// </summary>
        /// <param name="id">Id of page to find.</param>
        /// <returns><see cref="PageNode"/> for the page or null if no page was found with the given id.</returns>
        public PageNode GetPageNodeById(Guid id)
        {
            return this.Implementation.GetPageNodeById(id);
        }


        /// <summary>
        /// Gets <see cref="PageNode"/>'s for all homepages.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public IEnumerable<PageNode> HomePageNodes
        {
            get
            {
                return this.Implementation.HomePageNodes;
            }
        }


        /// <summary>
        /// Gets the Id's for all homepages.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public IEnumerable<Guid> HomePageIds
        {
            get
            {
                return this.Implementation.HomePageIds;
            }
        }


        /// <summary>
        /// Gets the <see cref="PageNode"/> for the current page.
        /// </summary>
        public PageNode CurrentPageNode
        {
            get
            {
                return this.Implementation.CurrentPageNode;
            }
        }



        /// <summary>
        /// Gets the <see cref="PageNode"/> for the current homepage.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public PageNode CurrentHomePageNode
        {
            get
            {
                return this.Implementation.CurrentHomePageNode;
            }
        }



        /// <summary>
        /// Gets the <see cref="PageNode"/> relating to the hostname.
        /// </summary>
        /// <param name="hostname">Hostname string to resolve to a <see cref="PageNode"/>.</param>
        /// <returns>The homepage <see cref="PageNode"/> element matching the specified hostname or the default homepage.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Hostname")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "hostname")]
        public PageNode GetPageNodeByHostname(string hostname)
        {
            return this.Implementation.GetPageNodeByHostname(hostname);
        }



        /// <summary>
        /// Gets the sitemaps for all sites. Do not modify this structure. To do modifications new up XElements taking sitemap root elements as parameter. 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemaps")]
        public ReadOnlyCollection<XElement> AllSitemapsXml
        {
            get
            {
                return this.Implementation.AllSitemapsXml;
            }
        }


        /// <summary>
        /// Gets the sitemap for the current site. Do not modify this structure. To do modifications new up XElements taking sitemap root elements as parameter. 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public XElement SitemapXml
        {
            get
            {
                return this.Implementation.SitemapXml;
            }
        }


        /// <summary>
        /// Gets the Id of the page currently being rendered
        /// </summary>
        public static Guid CurrentPageId
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessSitemapNavigator.CurrentPageId;
            }
        }


        /// <summary>
        /// Gets the Id of the top level page (homepage) for the page currently being rendered
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "HomePage")]
        public static Guid CurrentHomePageId
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessSitemapNavigator.CurrentHomePageId;
            }
        }

    }
}
