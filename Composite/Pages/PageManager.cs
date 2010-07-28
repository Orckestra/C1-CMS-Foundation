using System;
using System.Globalization;
using Composite.Implementation;
using Composite.Implementation.Pages;

namespace Composite.Pages
{
    /// <summary>
    /// Provides read-only access to pages, page structure and placeholders content 
    /// </summary>
    public static class PageManager
    {
        static PageManager()
        {
            ImplementationContainer.SetImplementation<PageManagerBase>(new PageManagerDefaultImplementation());
        }

        public static IPageManager Create()
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().Create();
        }

        public static IPageManager Create(PublicationScope publicationScope)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().Create(publicationScope);
        }

        public static IPageManager Create(PublicationScope publicationScope, CultureInfo locale)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().Create(publicationScope, locale);
        }

        public static IPageManager Create(CultureInfo locale)
        {
            return ImplementationContainer.GetImplementation<PageManagerBase>().Create(locale);
        }
    }
}
