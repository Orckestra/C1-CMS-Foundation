using System;
using System.Collections.Generic;
using Composite.Implementation;

namespace Composite.Pages
{
    public static class Navigation
    {
        static Navigation()
        {
            ImplementationContainer.SetImplementation<NavigationBase>(new NavigationDefaultImplementation());
        }

        public static IEnumerable<XPage> SelectPages(PageSelection pageSelection)
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().SelectPages(CurrentPage, pageSelection);
        }

        public static IEnumerable<XPage> SelectPages(XPage currentPage, PageSelection pageSelection)
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().SelectPages(currentPage, pageSelection);
        }

        public static XSiteMap GetSiteMap()
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().GetSiteMap();
        }

        public static XPage CurrentPage
        {
            get
            {
                return ImplementationContainer.GetImplementation<NavigationBase>().GetCurrentPage();
            }
        }
    }
}
