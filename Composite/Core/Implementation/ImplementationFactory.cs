using System.Globalization;
using Composite.Data;
using System.IO;
using System.Text;
using System;
namespace Composite.Core.Implementation
{
    /// <summary>
    /// Documentation pending
    /// </summary>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual LogImplementation StatelessLog
        {
            get
            {
                return new LogImplementation();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual DataConnectionImplementation StatelessDataConnection
        {
            get
            {
                return new DataConnectionImplementation();
            }
        }

        internal object ResolveService(Type t)
        {
            return DataServiceScopeManager.GetService(t);
        }

        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="scope"></param>
        /// <param name="locale"></param>
        /// <returns></returns>
        public virtual DataConnectionImplementation CreateDataConnection(PublicationScope? scope, CultureInfo locale)
        {
            PublicationScope scopeToUse = ResolvePublicationScope(scope);
            CultureInfo localeToUse = ResolveLocale(locale);

            return new DataConnectionImplementation(scopeToUse, localeToUse);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public virtual SitemapNavigatorImplementation StatelessSitemapNavigator
        {
            get
            {
                return new SitemapNavigatorImplementation();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="connection"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public virtual SitemapNavigatorImplementation CreateSitemapNavigator(DataConnection connection)
        {
            return new SitemapNavigatorImplementation(connection);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="scope"></param>
        /// <returns></returns>
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



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="locale"></param>
        /// <returns></returns>
        public virtual CultureInfo ResolveLocale(CultureInfo locale)
        {

            CultureInfo localeToUse = locale ?? LocalizationScopeManager.CurrentLocalizationScope;

            if (localeToUse == null || localeToUse.Equals(CultureInfo.InvariantCulture))
            {
                localeToUse = DataLocalizationFacade.DefaultLocalizationCulture;
            }

            return localeToUse;
        }


        #region IO

        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual C1DirectoryImplementation StatelessC1Directory
        {
            get
            {
                return new C1DirectoryImplementation();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual C1FileImplementation StatelessC1File
        {
            get
            {
                return new C1FileImplementation();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1FileInfoImplementation CreateC1FileInfo(string path)
        {
            return new C1FileInfoImplementation(path);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1DirectoryInfoImplementation CreateC1DirectoryInfo(string path)
        {
            return new C1DirectoryInfoImplementation(path);
        }
        


        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        /// <returns></returns>
        public virtual C1FileStreamImplementation CreateC1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            return new C1FileStreamImplementation(path, mode, access, share, bufferSize, options);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        public virtual C1FileSystemWatcherImplementation CreateC1FileSystemWatcher(string path, string filter)
        {
            return new C1FileSystemWatcherImplementation(path, filter);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public virtual C1StreamReaderImplementation CreateC1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new C1StreamReaderImplementation(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public virtual C1StreamReaderImplementation CreateC1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new C1StreamReaderImplementation(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="append"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public virtual C1StreamWriterImplementation CreateC1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            return new C1StreamWriterImplementation(path, append, encoding, bufferSize);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        /// <returns></returns>
        public virtual C1StreamWriterImplementation CreateC1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            return new C1StreamWriterImplementation(stream, encoding, bufferSize);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public virtual C1ConfigurationImplementation CreateC1Configuration(string path)
        {
            return new C1ConfigurationImplementation(path);
        }

        #endregion



        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual PackageLicenseHelperImplementation StatelessPackageLicenseHelper
        {
            get
            {
                return new PackageLicenseHelperImplementation();
            }
        }




        /// <summary>
        /// Documentation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Utils")]
        public virtual PackageUtilsImplementation StatelessPackageUtils
        {
            get
            {
                return new PackageUtilsImplementation();
            }
        }
    }
}
