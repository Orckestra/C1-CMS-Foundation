using System.Globalization;
using Composite.Data;


namespace Composite.Core.Implementation.Pages
{
    public class PageManagerDefaultImplementation : PageManagerBase
    {
        public override IPageManager Create()
        {
            return new DefaultPageManager(PublicationScope.Public, GetCurrentCulture());
        }



        public override IPageManager Create(PublicationScope publicationScope)
        {
            return new DefaultPageManager(publicationScope, GetCurrentCulture());
        }



        public override IPageManager Create(PublicationScope publicationScope, CultureInfo locale)
        {
            return new DefaultPageManager(publicationScope, locale);
        }



        public override IPageManager Create(CultureInfo locale)
        {
            return new DefaultPageManager(PublicationScope.Public, locale);
        }

        private static CultureInfo GetCurrentCulture()
        {
            var currentCulture = LocalizationScopeManager.CurrentLocalizationScope;
            if (currentCulture == CultureInfo.InvariantCulture && LocalizationScopeManager.IsEmpty)
            {
                return DataLocalizationFacade.DefaultLocalizationCulture;
            }

            return currentCulture;
        }
    }
}


