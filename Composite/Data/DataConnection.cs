using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;


namespace Composite.Data
{
    public class DataConnectionImplementation
    {
        public DataConnectionImplementation(PublicationScope scope, CultureInfo locale)
        {            
        }

        // API members goes here
    }



    /*public class DefaultConnectionImplementation : DataConnectionImplementation
    {
    }*/



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


        public DataConnectionImplementation CreateDataConnection(PublicationScope? scope, CultureInfo locale)
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
            }

            CultureInfo localeToUse = locale;
            if ((locale == null) || (locale == CultureInfo.InvariantCulture))
            {
                // Use current locale
                // localeToUse = current;
            }

            return new DataConnectionImplementation(scopeToUse, localeToUse);
        }
    }


    public class DataConnection : IDisposable
    {
        private DataConnectionImplementation implemenation;

       

        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance that can be used to access data stored in Composite C1.
        /// </summary>
        /// <example>
        /// Here is an example of how to use <see cref="DataConnection" />
        /// <code>
        /// using (C1DataConnection connection = new C1DataConnection())
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        public DataConnection()
            : this(PublicationScope.Published, null)
        {
#warning WE SHOULD NOT SWITCH TO PUBLIC - WE SHOULD CONTINUE WITH WHAT IS - OR DEFAULT TO PUBLIC
        }

        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance that can be used to access data stored in Composite C1.
        /// </summary>
        /// <example>
        /// Here is an example of how to use <see cref="DataConnection" />
        /// In this example the data items returned by the <see cref="DataConnection"/> is from the
        /// internal scope - data that has not yet been published.
        /// <code>
        /// using (C1DataConnection connection = new C1DataConnection(PublicationScope.Unpublished))
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="publicationScope">The desired <see cref="PublicationScope"/></param>
        public DataConnection(PublicationScope scope)
            : this(scope, null)
        {
        }


        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance that can be used to access data stored in Composite C1.
        /// </summary>        
        /// <example>
        /// Here is an example of how to use <see cref="DataConnection" />
        /// In this example the data items returned by the <see cref="DataConnection"/> is from the
        /// Danish locale - data for the Danish website.
        /// <code>
        /// using (C1DataConnection connection = new C1DataConnection(new CultureInfo("da-DK")))
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="locale">The desired locale</param>
        public DataConnection(CultureInfo locale)
            : this(PublicationScope.Published, locale)
        {
#warning WE SHOULD NOT SWITCH TO PUBLIC - WE SHOULD CONTINUE WITH WHAT IS - OR DEFAULT TO PUBLIC
        }


        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance that can be used to access data stored in Composite C1.
        /// </summary>        
        /// <example>
        /// Here is an example of how to use <see cref="DataConnection" />
        /// In this example the data items returned by the <see cref="DataConnection"/> is from the
        /// internal scope and the Danish locale - unpublished data for the Danish website.
        /// <code>
        /// using (C1DataConnection connection = new C1DataConnection(PublicationScope.Unpublished, new CultureInfo("da-DK")))
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <param name="publicationScope">The desired <see cref="PublicationScope"/></param>
        /// <param name="locale">The desired locale</param>
        public DataConnection(PublicationScope scope, CultureInfo locale)
        {
            this.PublicationScope = scope;

            this.DataScopeIdentifier = DataScopeIdentifier.Administrated;
            if (this.PublicationScope == PublicationScope.Published)
            {
                this.DataScopeIdentifier = DataScopeIdentifier.Public;
            }

            if (locale == null)
            {
                CultureInfo currentCulture = LocalizationScopeManager.CurrentLocalizationScope;

                if (currentCulture == CultureInfo.InvariantCulture && LocalizationScopeManager.IsEmpty)
                {
                    locale = DataLocalizationFacade.DefaultLocalizationCulture;
                }
            }

            this.Locale = locale;
        }

        

        public IQueryable<T> Get<T>()
             where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.GetData<T>();
            }
        }



        public T Add<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(item);
            }
        }



        public IList<T> Add<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(items);
            }
        }



        public void Update<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(item);
            }
        }



        public void Update<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(items);
            }
        }



        public void Delete<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(item);
            }
        }



        public void Delete<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(items);
            }
        }



        public T New<T>()
            where T : class, IData
        {
            return DataFacade.BuildNew<T>();
        }



        public PublicationScope PublicationScope { get; private set; }


        public CultureInfo Locale { get; private set; }



        public static IEnumerable<CultureInfo> AllLocales
        {
            get
            {
                return DataLocalizationFacade.ActiveLocalizationCultures;
            }
        }



        // Only for mocking
        private DataScopeIdentifier DataScopeIdentifier { get; set; }



        public void Dispose()
        {            
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~DataConnection()
        {
            Dispose(false);
        }


        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
        }
    }
}
