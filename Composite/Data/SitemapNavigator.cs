using System;
using System.Collections.ObjectModel;
using System.Xml.Linq;
using Composite.Data;


namespace Composite.Data
{
    public class SitemapNavigator
    {
        public SitemapNavigator(DataConnection connection) { }

        public PageNode GetPageNodeById(Guid id) { throw new NotImplementedException(); }

        public ReadOnlyCollection<PageNode> HomePageNodes { get; private set; }
        public ReadOnlyCollection<Guid> HomePageIds { get; private set; }

        public PageNode CurrentPageNode { get; private set; }
        public PageNode CurrentHomePageNode { get; private set; }

        public static Guid CurrentPageId { get; private set; }
        public static Guid CurrentHomePageId { get; private set; }

        public ReadOnlyCollection<XElement> SitemapXml { get; private set; }
    }
}
