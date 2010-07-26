using System;
using System.Collections.Generic;
using Composite.Collections.Generic;
using Composite.Data.Types;
using Composite.Implementation;

namespace Composite.Pages
{
    public static class PageManager
    {
        static PageManager()
        {
            ImplementationContainer.SetImplementation<PageManagerBase>(new PageManagerDefaultImplementation());
        }

        public static IPage GetPageByID(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetPageByID(pageId);
        }


        public static Guid GetParentID(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetParentID(pageId);
        }

        public static int GetLocalOrdering(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetLocalOrdering(pageId);
        }

        public static IEnumerable<Guid> GetChildrenIDs(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetChildrenIDs(pageId);
        }

        public static IEnumerable<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().GetPlaceholdersContent(pageId);
        }
    }
}
