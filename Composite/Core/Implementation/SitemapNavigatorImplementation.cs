using System;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class SitemapNavigatorImplementation 
    {
        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called
        /// Used when CurrentPageId and CurrentHomePageId are called
        /// </summary>
        public SitemapNavigatorImplementation()
        {
        }



        public SitemapNavigatorImplementation(DataConnection connection) 
        {            
        }



        public virtual PageNode GetPageNodeById(Guid id) 
        { 
            throw new NotImplementedException(); 
        }



        public virtual ReadOnlyCollection<PageNode> HomePageNodes 
        { 
            get; 
            private set; 
        }



        public virtual ReadOnlyCollection<Guid> HomePageIds 
        { 
            get; 
            private set; 
        }



        public virtual PageNode CurrentPageNode 
        { 
            get; 
            private set; 
        }



        public virtual PageNode CurrentHomePageNode 
        { 
            get; 
            private set; 
        }



        public virtual ReadOnlyCollection<XElement> SitemapXml 
        { 
            get; 
            private set; 
        }



        // This is a static on the actual class, but non-static here to allow mocking
        public virtual Guid CurrentPageId 
        { 
            get; 
            private set; 
        }



        // This is a static on the actual class, but non-static here to allow mocking
        public virtual Guid CurrentHomePageId 
        { 
            get; 
            private set; 
        }
    }
}
