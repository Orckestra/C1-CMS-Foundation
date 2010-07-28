using System;
using System.Globalization;
using Composite.Pages;


namespace Composite.Implementation.Pages
{
    public class PageManagerDefaultImplementation : PageManagerBase
    {
        public override IPageManager Create()
        {
            return new DefaultPageManager(PublicationScope.Public, null);
        }



        public override IPageManager Create(PublicationScope publicationScope)
        {
            return new DefaultPageManager(publicationScope, null);
        }



        public override IPageManager Create(PublicationScope publicationScope, CultureInfo locale)
        {
            return new DefaultPageManager(publicationScope, locale);
        }



        public override IPageManager Create(CultureInfo locale)
        {
            return new DefaultPageManager(PublicationScope.Public, locale);
        }
    }
}


