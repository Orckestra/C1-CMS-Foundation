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



        public virtual LogImplementation StatelessLog
        {
            get
            {
                return new LogImplementation();
            }
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
                if (DataScopeManager.CurrentDataScope == DataScopeIdentifier.Administrated)
                {
                    scopeToUse = PublicationScope.Unpublished;
                }
                else if (DataScopeManager.CurrentDataScope == DataScopeIdentifier.Public)
                {
                    scopeToUse = PublicationScope.Published;
                }
            }

            return scopeToUse;
        }



        public virtual CultureInfo ResolveLocale(CultureInfo locale)
        {
            CultureInfo localeToUse = locale;
            if ((locale == null) || (locale == CultureInfo.InvariantCulture))
            {                
                localeToUse = DataLocalizationFacade.DefaultLocalizationCulture;
            }

            return localeToUse;
        }
    }
}
