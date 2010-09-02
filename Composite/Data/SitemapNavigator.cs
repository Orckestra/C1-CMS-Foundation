using System;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Core.Implementation;
using System.Collections.Generic;


namespace Composite.Data
{
    public class SitemapNavigator : ImplementationContainer<SitemapNavigatorImplementation>
    {
        /// <summary>
        /// Initialize a new instance of the <see cref="SitemapNavigator"/> class using sitemap data from the connection given.
        /// </summary>
        public SitemapNavigator(DataConnection connection)
            : base(() => ImplementationFactory.CurrentFactory.CreateSitemapNavigator(connection))
        {
            if (connection == null) throw new ArgumentNullException("connection");
        }



        /// <summary>
        /// Gets a <see cref="PageNode"/> for a specific page id.
        /// </summary>
        public PageNode GetPageNodeById(Guid id)
        {
            return this.Implementation.GetPageNodeById(id);
        }


        /// <summary>
        /// Gets <see cref="PageNode"/>'s for all homepages.
        /// </summary>
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
        public PageNode GetPageNodeByHostname(string hostname)
        {
            return this.Implementation.GetPageNodeByHostname(hostname);
        }



        /// <summary>
        /// Gets the sitemaps for all sites. Do not modify this structure. To do modifications new up XElements taking sitemap root elements as parameter. 
        /// </summary>
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
        public static Guid CurrentHomePageId
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessSitemapNavigator.CurrentHomePageId;
            }
        }

    }
}
