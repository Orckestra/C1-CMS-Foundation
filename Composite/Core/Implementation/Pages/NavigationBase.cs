using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Composite.Data;

namespace Composite.Core.Implementation.Pages
{
    public class NavigationBase : ImplementationBase
    {
        [SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
        public virtual XSiteMap GetSiteMap()
        {
            return null;
        }

        [SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
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