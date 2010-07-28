using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Composite.Data.Types;

namespace Composite.Pages
{
    public interface IPageManager
    {
        IPage GetPageById(Guid pageId);

        Guid GetParentId(Guid pageId);

        int GetLocalOrdering(Guid pageId);

        ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId);

        ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId);
    }
}
