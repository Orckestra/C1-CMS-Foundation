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
        /// using (DataConnection connection = new DataConnection(PublicationScope.Published))
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
        /// using (DataConnection connection = new DataConnection(new CultureInfo("da-DK")))
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
        /// and the given <paramref name="locale"/>. It can be used to access the C1 storage.
        /// </summary>
        /// <param name="scope"><see cref="Composite.Data.PublicationScope"/></param>
        /// <param name="locale">The desired locale. This should be one of the locale found in <see cref="Composite.Data.DataConnection.AllLocales"/></param>
        /// <example>
        /// Here is an example of how to use it
        /// <code>
        /// using (DataConnection connection = new DataConnection(PublicationScope.Published, new CultureInfo("da-DK")))
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



        /// <summary>
        /// Returns an IQueryable of the given IData interface. 
        /// If no storage supports the given IData interface, an exception is thrown.
        /// </summary>
        /// <example>
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
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <returns>Returns an IQueryable of the given IData interface for further querying</returns>
        public IQueryable<TData> Get<TData>()
             where TData : class, IData
        {
            return this.Implementation.Get<TData>();
        }


#warning MRJ: Event documentation
        /// <summary>
        /// Adds the <typeparamref name="TData"/> instance to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
        ///    myDataType.Name = "John Doe";
        ///    myDataType = connection.Add&lt;IMyDataType&gt;(myDataType); 
        /// 
        ///    // Note that the reassigned of myDataType is important here
        ///    // if its used for an later update.
        /// 
        ///    myDataType.Name = "Jane Doe";
        ///    connection.Update&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="item">The data item to add</param>
        /// <returns>The newly added data item. Note: This could differ from the <paramref name="item"/></returns>
        public TData Add<TData>(TData item)
            where TData : class, IData
        {
            return this.Implementation.Add<TData>(item);
        }



        public IList<TData> Add<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            return this.Implementation.Add<TData>(items);
        }



        public void Update<TData>(TData item)
            where TData : class, IData
        {
            this.Implementation.Update<TData>(item);
        }



        public void Update<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            this.Implementation.Update<TData>(items);
        }



        public void Delete<TData>(TData item)
            where TData : class, IData
        {
            this.Implementation.Delete<TData>(item);
        }



        public void Delete<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            this.Implementation.Delete<TData>(items);
        }



        public static TData New<TData>()
            where TData : class, IData
        {
            return ImplementationFactory.CurrentFactory.StatelessDataConnection.New<TData>();
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
