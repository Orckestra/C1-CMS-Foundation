using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Xml.Linq;


namespace Composite.Data
{
    public class PageNode
    {
        /// <summary>
        /// pseudo constructor - but definetly internal
        /// </summary>
        internal PageNode() { }
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string MenuTitle { get; private set; }
        public string Description { get; private set; }
        public string Url { get; private set; }
        public int Level { get; private set; }

        public PageNode ParentPage { get; private set; }
        public ReadOnlyCollection<PageNode> ChildPages { get; private set; }

        public IEnumerable<PageNode> GetPageNodes(SitemapScope scope) { throw new NotImplementedException(); }
        public IEnumerable<Guid> GetPageIds(SitemapScope scope) { throw new NotImplementedException(); }

        public SitemapNavigator SitemapNavigator { get; private set; }

        public XElement SitemapXml { get; private set; }
    }
}
