using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Composite.Data.Types;

namespace Composite.Implementation
{
    public class PageManagerBase : ImplementationBase
    {
        public virtual IPage GetPageById(Guid id)
        {
            return null;
        }

        public virtual Guid GetParentId(Guid pageId)
        {
            return Guid.Empty;
        }

        public virtual int GetLocalOrdering(Guid pageId)
        {
            return 0;
        }

        public virtual ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId)
        {
            return new ReadOnlyCollection<Guid>(new Guid[0]);
        }

        public virtual IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return new IPagePlaceholderContent[0];
        }
    }
}
