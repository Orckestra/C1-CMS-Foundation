using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Composite.Data.Types;

namespace Composite.Implementation
{
    public class PageManagerDefaultImplementation : PageManagerBase
    {
        public override IPage GetPageById(Guid id)
        {
            return PageManager.GetPageById(id);
        }

        public override Guid GetParentId(Guid pageId)
        {
            return PageManager.GetParentId(pageId);
        }

        public override int GetLocalOrdering(Guid pageId)
        {
            return PageManager.GetLocalOrdering(pageId);
        }

        public override ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId)
        {
            return PageManager.GetChildrenIDs(pageId);
        }

        public override IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return PageManager.GetPlaceholderContent(pageId);
        }
    }
}


