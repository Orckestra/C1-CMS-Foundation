using System.Globalization;
using Composite.Data;
using System.IO;


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



        public virtual DataConnectionImplementation CreateDataConnection(PublicationScope? scope, CultureInfo locale)
        {
            PublicationScope scopeToUse = ResolvePublicationScope(scope);
            CultureInfo localeToUse = ResolveLocale(locale);

            return new DataConnectionImplementation(scopeToUse, localeToUse);
        }



        public virtual DataEventsImplementation<T> CreateStatelessDataEvents<T>()
            where T : class, IData
        {
            return new DataEventsImplementation<T>();
        }



        //public virtual PageDataConnectionImplementation StatelessPageDataConnection
        //{
        //    get
        //    {
        //        return new PageDataConnectionImplementation();
        //    }
        //}



        //public virtual PageDataConnectionImplementation CreatePageDataConnection(PublicationScope? scope, CultureInfo locale)
        //{
        //    PublicationScope scopeToUse = ResolvePublicationScope(scope);
        //    CultureInfo localeToUse = ResolveLocale(locale);

        //    return new PageDataConnectionImplementation(scopeToUse, localeToUse);
        //}



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public virtual SitemapNavigatorImplementation StatelessSitemapNavigator
        {
            get
            {
                return new SitemapNavigatorImplementation();
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public virtual SitemapNavigatorImplementation CreateSitemapNavigator(DataConnection connection)
        {
            return new SitemapNavigatorImplementation(connection);
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
                if (DataScopeManager.CurrentDataScope.Equals(DataScopeIdentifier.Administrated))
                {
                    scopeToUse = PublicationScope.Unpublished;
                }
                else if (DataScopeManager.CurrentDataScope.Equals(DataScopeIdentifier.Public))
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


        #region IO

        public virtual C1DirectoryImplementation StatelessC1Directory
        {
            get
            {
                return new C1DirectoryImplementation();
            }
        }



        public virtual C1FileImplementation StatelessC1File
        {
            get
            {
                return new C1FileImplementation();
            }
        }

        

        public virtual C1FileStreamImplementation CreateC1FileStream(string path, FileMode mode )
        {
            return new C1FileStreamImplementation(path, mode, (mode == System.IO.FileMode.Append) ? System.IO.FileAccess.Write : System.IO.FileAccess.ReadWrite, FileShare.Read);
        }



        public virtual C1FileStreamImplementation CreateC1FileStream(string path, FileMode mode, FileAccess access)
        {
            return new C1FileStreamImplementation(path, mode, access, FileShare.Read);
        }



        public virtual C1FileStreamImplementation CreateC1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
        {
            return new C1FileStreamImplementation(path, mode, access, share);
        }

        #endregion
    }
}
