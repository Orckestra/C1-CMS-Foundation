using System.Collections.Generic;
using Composite.Pages;

namespace Composite.Implementation
{
    public class NavigationBase : ImplementationBase
    {
        public virtual XSiteMap GetSiteMap()
        {
            return null;
        }

        public virtual XPage GetCurrentPage()
        {
            return null;
        }

        public virtual IEnumerable<XPage> SelectPages(XPage page, PageSelection selectionType)
        {
            return null;
        }
    }
}