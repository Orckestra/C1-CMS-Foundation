using System;
using Composite.Implementation;
using Composite.Implementation.Pages;

namespace Composite.Pages
{
    public static class Navigation
    {
        static Navigation()
        {
            ImplementationContainer.SetImplementation<NavigationBase>(new NavigationDefaultImplementation());
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
