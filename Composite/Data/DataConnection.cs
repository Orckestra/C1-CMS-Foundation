using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Implementation;


namespace Composite.Data
{
    public class DataConnection : ImplementationContainer<DataConnectionImplementation>, IDisposable
    {
        private ImplementationContainer<PageDataConnection> _pageDataConnection;



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with default <see cref="Composite.Data.PublicationScope"/>
        /// and default locale. It can be used to access the C1 storage.
        /// </summary>
        /// <example>
        /// Here is an example of how to use it
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        public DataConnection()
            : base(() => ImplementationFactory.CurrentFactory.CreateDataConnection(null, null))
        {            
            _pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection());
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with the given <paramref name="scope"/>
        /// and default locale. It can be used to access the C1 storage.
        /// </summary>
        /// <param name="scope"><see cref="Composite.Data.PublicationScope"/></param>
        /// <example>
        /// Here is an example of how to use it
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        public DataConnection(PublicationScope scope)
            : base(() => ImplementationFactory.CurrentFactory.CreateDataConnection(scope, null))
        {
            _pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(scope));

            if ((scope < PublicationScope.Unpublished) || (scope > PublicationScope.Published)) throw new ArgumentOutOfRangeException("scope");
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with default <see cref="Composite.Data.PublicationScope"/>
        /// and the given <paramref name="locale"/>. It can be used to access the C1 storage.
        /// </summary>
        /// <param name="locale">The desired locale. This should be one of the locale found in <see cref="Composite.Data.DataConnection.AllLocales"/></param>
        /// <example>
        /// Here is an example of how to use it
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        public DataConnection(CultureInfo locale)
            : base(() => ImplementationFactory.CurrentFactory.CreateDataConnection(null, locale))
        {
            _pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(locale));
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with the given <paramref name="scope"/>
        /// and default locale. It can be used to access the C1 storage.
        /// </summary>
        /// <param name="scope"><see cref="Composite.Data.PublicationScope"/></param>
        /// <example>
        /// Here is an example of how to use it
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    var q = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        public DataConnection(PublicationScope scope, CultureInfo locale)
            : base(() => ImplementationFactory.CurrentFactory.CreateDataConnection(scope, locale))
        {
            if ((scope < PublicationScope.Unpublished) || (scope > PublicationScope.Published)) throw new ArgumentOutOfRangeException("scope");

            _pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(scope, locale));
        }



        public IQueryable<T> Get<T>()
             where T : class, IData
        {
            return this.Implementation.Get<T>();
        }



        public T Add<T>(T item)
            where T : class, IData
        {
            return this.Implementation.Add<T>(item);
        }



        public IList<T> Add<T>(IEnumerable<T> items)
            where T : class, IData
        {
            return this.Implementation.Add<T>(items);
        }



        public void Update<T>(T item)
            where T : class, IData
        {
            this.Implementation.Update<T>(item);
        }



        public void Update<T>(IEnumerable<T> items)
            where T : class, IData
        {
            this.Implementation.Update<T>(items);
        }



        public void Delete<T>(T item)
            where T : class, IData
        {
            this.Implementation.Delete<T>(item);
        }



        public void Delete<T>(IEnumerable<T> items)
            where T : class, IData
        {
            this.Implementation.Delete<T>(items);
        }



        public static T New<T>()
            where T : class, IData
        {
            return ImplementationFactory.CurrentFactory.StatelessDataConnection.New<T>();
        }



        public PublicationScope CurrentPublicationScope
        {
            get
            {
                return this.Implementation.CurrentPublicationScope;
            }
        }



        public CultureInfo CurrentLocale
        {
            get
            {
                return this.Implementation.CurrentLocale;
            }
        }



        public static IEnumerable<CultureInfo> AllLocales
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessDataConnection.AllLocales;
            }
        }



        public PageDataConnection PageDataConnection
        {
            get
            {
                return _pageDataConnection.Implementation;
            }
        }



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
                this.DisposeImplementation();
                _pageDataConnection.Implementation.DisposeImplementation();
            }
        }
    }
}
