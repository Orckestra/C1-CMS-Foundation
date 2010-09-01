using System.Globalization;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class ImplementationFactory
    {
        static ImplementationFactory()
        {
            CurrentFactory = new ImplementationFactory();
        }


        /// <summary>
        /// Use this to change the current factory;
        /// </summary>
        public static ImplementationFactory CurrentFactory { get; set; }


        public virtual DataConnectionImplementation CreateDataConnection(PublicationScope? scope, CultureInfo locale)
        {
            PublicationScope scopeToUse = ResolvePublicationScope(scope);
            CultureInfo localeToUse = ResolveLocale(locale);

            return new DataConnectionImplementation(scopeToUse, localeToUse);
        }

        public virtual DataConnectionImplementation StatelessDataConnection
        {
            get
            {
                return new DataConnectionImplementation();
            }
        }




        public virtual PageDataConnectionImplementation CreatePageDataConnection(PublicationScope? scope, CultureInfo locale)
        {
            PublicationScope scopeToUse = ResolvePublicationScope(scope);
            CultureInfo localeToUse = ResolveLocale(locale);

            return new PageDataConnectionImplementation(scopeToUse, localeToUse);
        }


        public virtual PageDataConnectionImplementation StatelessPageDataConnection
        {
            get
            {
                return new PageDataConnectionImplementation();
            }
        }



        public virtual PublicationScope ResolvePublicationScope(PublicationScope? scope)
        {
            PublicationScope scopeToUse = PublicationScope.Published;
            if (scope.HasValue)
            {
                scopeToUse = scope.Value;

            }
            else
            {
                // Use current scope
                // scopeToUse = current;
#warning MRJ: FIX THIS!!!!!!
            }

            return scopeToUse;
        }



        public virtual CultureInfo ResolveLocale(CultureInfo locale)
        {
            CultureInfo localeToUse = locale;
            if ((locale == null) || (locale == CultureInfo.InvariantCulture))
            {
                // Use current locale
                // localeToUse = current;
#warning MRJ: FIX THIS!!!!!!
                localeToUse = DataLocalizationFacade.DefaultLocalizationCulture; // MAW FIX - Check it MRJ :)
            }

            return localeToUse;
        }
    }
}
