using System;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Core.Implementation;


namespace Composite.Data
{
    public class SitemapNavigator : ImplementationContainer<SitemapNavigatorImplementation>
    {
        public SitemapNavigator(DataConnection connection) 
            : base(() => ImplementationFactory.CurrentFactory.CreateSitemapNavigator(connection))
        {
            if (connection == null) throw new ArgumentNullException("connection");
        }



        public PageNode GetPageNodeById(Guid id) 
        {
            return this.Implementation.GetPageNodeById(id);
        }



        public ReadOnlyCollection<PageNode> HomePageNodes 
        {
            get
            {
                return this.Implementation.HomePageNodes;
            }
        }



        public ReadOnlyCollection<Guid> HomePageIds
        {
            get
            {
                return this.Implementation.HomePageIds;
            }
        }



        public PageNode CurrentPageNode 
        {
            get
            {
                return this.Implementation.CurrentPageNode;
            }
        }



        public PageNode CurrentHomePageNode
        {
            get
            {
                return this.Implementation.CurrentHomePageNode;
            }
        }


        
        public ReadOnlyCollection<XElement> SitemapXml
        {
            get
            {
                return this.Implementation.SitemapXml;
            }
        }


        public static Guid CurrentPageId
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessSitemapNavigator.CurrentPageId;
            }
        }



        public static Guid CurrentHomePageId
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessSitemapNavigator.CurrentHomePageId;
            }
        }
    }
}
