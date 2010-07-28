using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Composite.Data.Types;
using Composite.Implementation;

namespace Composite.Pages
{
    /// <summary>
    /// Provides read-only access to pages, placeholders content, structure, page folder's data and meta-data.
    /// </summary>
    public static class PageManager
    {
        static PageManager()
        {
            ImplementationContainer.SetImplementation<PageManagerBase>(new PageManagerDefaultImplementation());
        }

        public static IPage GetPageById(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetPageById(pageId);
        }


        public static Guid GetParentId(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetParentId(pageId);
        }

        public static int GetLocalOrdering(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetLocalOrdering(pageId);
        }

        public static ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetChildrenIds(pageId);
        }

        public static IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetPlaceholdersContent(pageId);
        }
    }
}
