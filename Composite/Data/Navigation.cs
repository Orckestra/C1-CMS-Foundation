using System;
using Composite.Core.Implementation;
using Composite.Core.Implementation.Pages;

namespace Composite.Data
{
#warning MRJ: Delete this file
    /*
    /// <summary>
    /// Provides access to the site map
    /// </summary>
    public static class Navigation
    {
        static Navigation()
        {
            ImplementationContainer.SetImplementation<NavigationBase>(new NavigationDefaultImplementation());
        }

        /// <summary>
        /// Gets the site map.
        /// </summary>
        /// <returns>The site map XElement.</returns>
        /// <example>
        /// <code>
        /// public XElement GetTopMenuXml()
        /// {
        ///     return new XElement("TopLevelPages",
        ///                         from page in Navigation.SiteMap.RootPages 
        ///                         select new XElement("Page",
        ///                                             new XAttribute("MenuTitle", page.MenuTitle),
        ///                                             new XAttribute("Url", page.Url)));
        /// }
        /// </code>
        /// </example>
        public static XSiteMap SiteMap
        {
            get
            {
                return ImplementationContainer.GetImplementation<NavigationBase>().GetSiteMap();
            }
        }

        /// <summary>
        /// Gets the reference to the XElement that represents the current page in site map XML.
        /// </summary>
        /// <value>The current page.</value>
        public static XPage CurrentPage
        {
            get
            {
                return ImplementationContainer.GetImplementation<NavigationBase>().GetCurrentPage();
            }
        }
    }*/
}
