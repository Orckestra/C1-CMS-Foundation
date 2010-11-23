using System.Globalization;
using Composite.Data;
using System.IO;
using System.Text;
using System.Threading;


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
                localeToUse = Thread.CurrentThread.CurrentCulture;
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
        


        public virtual C1FileStreamImplementation CreateC1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            return new C1FileStreamImplementation(path, mode, access, share, bufferSize, options);
        }



        public virtual C1FileSystemWatcherImplementation CreateC1FileSystemWatcher(string path, string filter)
        {
            return new C1FileSystemWatcherImplementation(path, filter);
        }



        public virtual C1StreamReaderImplementation CreateC1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new C1StreamReaderImplementation(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        public virtual C1StreamReaderImplementation CreateC1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            return new C1StreamReaderImplementation(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }


        public virtual C1StreamWriterImplementation CreateC1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            return new C1StreamWriterImplementation(path, append, encoding, bufferSize);
        }



        public virtual C1StreamWriterImplementation CreateC1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            return new C1StreamWriterImplementation(stream, encoding, bufferSize);
        }



        public virtual C1ConfigurationImplementation CreateC1Configuration(string path)
        {
            return new C1ConfigurationImplementation(path);
        }

        #endregion
    }
}
