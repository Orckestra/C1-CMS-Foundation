using System;
using System.Collections.Generic;
using Composite.Data.Types;

namespace Composite.Implementation
{
    public class PageManagerBase : ImplementationBase
    {
        public virtual IPage GetPageByID(Guid id)
        {
            return null;
        }

        public virtual Guid GetParentID(Guid pageId)
        {
            return Guid.Empty;
        }

        public virtual int GetLocalOrdering(Guid pageId)
        {
            return 0;
        }

        public virtual IEnumerable<Guid> GetChildrenIDs(Guid pageId)
        {
            return new Guid[0];
        }

        public virtual IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return new IPagePlaceholderContent[0];
        }
    }
}
