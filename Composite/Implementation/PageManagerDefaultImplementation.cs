using System;
using System.Collections.Generic;
using Composite.Data.Types;

namespace Composite.Implementation
{
    public class PageManagerDefaultImplementation : PageManagerBase
    {
        public override IPage GetPageByID(Guid id)
        {
            return PageManager.GetPageById(id);
        }

        public override Guid GetParentID(Guid pageId)
        {
            return PageManager.GetParentID(pageId);
        }

        public override int GetLocalOrdering(Guid pageId)
        {
            return PageManager.GetLocalOrdering(pageId);
        }

        public override IEnumerable<Guid> GetChildrenIDs(Guid pageId)
        {
            return PageManager.GetChildrenIDs(pageId);
        }

        public override IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return PageManager.GetPlaceholderContent(pageId);
        }
    }
}


