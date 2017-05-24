using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Implementation;


namespace Composite.Data
{
    /// <summary>
    /// Represents a connection to the C1 CMS data system.
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
    public class DataConnection : ImplementationContainer<DataConnectionImplementation>, IDisposable
    {
        //private ImplementationContainer<PageDataConnection> _pageDataConnection;
        private readonly ImplementationContainer<SitemapNavigator> _sitemapNavigator;

        private bool _disposed;

        
        /// <summary>
        /// Resolve service of a specific type that is attached to connection's data scope
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public object GetService(Type t)
        {
            return ImplementationFactory.CurrentFactory.ResolveService(t);
        }

        /// <summary>
        /// attach service to data connection
        /// </summary>
        /// <param name="service"></param>
        public void AddService(object service)
        {
            Implementation.DataScope.AddService(service);
        }

        /// <summary>
        /// disable all services in the data connection
        /// </summary>
        public void DisableServices()
        {
            Implementation.DataScope.DisableServices();
        }

        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance inheriting the <see cref="Composite.Data.PublicationScope"/>
        /// and locale set on the call stack. When outside an existing scope this default to PublicationScope,Published and the
        /// default language on the website. You should use this constructure unless you need to force data to come from an alternative 
        /// scope. <see cref="DataConnection"/> can be used to access the C1 CMS storage.
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
            CreateImplementation();

            //_pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection());
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this));
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with the given <paramref name="scope"/>
        /// and current (or default) locale. <see cref="DataConnection"/> can be used to access the C1 CMS storage.
        /// </summary>
        /// <param name="scope">The <see cref="Composite.Data.PublicationScope"/> data should be read from.</param>
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
            if ((scope < PublicationScope.Unpublished) || (scope > PublicationScope.Published)) throw new ArgumentOutOfRangeException("scope");

            CreateImplementation();

            //_pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(scope));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this));
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with current or default <see cref="Composite.Data.PublicationScope"/>
        /// and the given <paramref name="locale"/>. <see cref="DataConnection"/> can be used to access the C1 CMS storage.
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
            CreateImplementation();

            //_pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(locale));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this));
        }



        /// <summary>
        /// Creates a new <see cref="DataConnection"/> instance with the given <paramref name="scope"/>
        /// and the given <paramref name="locale"/>. <see cref="DataConnection"/> can be used to access the C1 CMS storage.
        /// </summary>
        /// <param name="scope">The <see cref="Composite.Data.PublicationScope"/> data should be read from.</param>
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

            CreateImplementation();

            //_pageDataConnection = new ImplementationContainer<PageDataConnection>(() => new PageDataConnection(scope, locale));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this));
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



        /// <summary>
        /// Adds the <typeparamref name="TData"/> instance to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for the item <paramref name="item"/>. 
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



        /// <summary>
        /// Adds the <typeparamref name="TData"/> instances to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    List&lt;IMyDataType&gt; items = new List&lt;IMyDataType&gt;();
        ///    
        ///    for (int i = 0; i &lt; 10; i++)
        ///    {
        ///       IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "John Doe";
        ///       myDataType.Number = i;
        ///       items.Add(myDataType);
        ///    }   
        ///    
        ///    connection.Add&lt;IMyDataType&gt;(items);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="items">The data items to add</param>
        /// <returns>The newly added data items. Note: These could differ from the items in <paramref name="items"/></returns>
        public IList<TData> Add<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            return this.Implementation.Add<TData>(items);
        }



        /// <summary>
        /// Updates the given <typeparamref name="TData"/> instance in the C1 storage. 
        /// If any property values has been changed, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataType = 
        ///       (from d in connection.Get&lt;IMyDataType&gt;()
        ///        where d.Name == "Foo"
        ///        select d).First();
        ///    
        ///    myDataType.Name = "Bar";
        ///    
        ///    connection.Update&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="item">The item to update in the C1 storage</param>
        public void Update<TData>(TData item)
            where TData : class, IData
        {
            this.Implementation.Update<TData>(item);
        }



        /// <summary>
        /// Updates the geven <typeparamref name="TData"/> instances in the C1 storage.
        /// If any property values in any of the <typeparamref name="TData"/> instances, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IEnumerable&lt;IMyDataType&gt; myDataTypes = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Value > 10
        ///       select d;
        ///    
        ///    foreach (IMyDataType in myDataTypes)
        ///    {
        ///       myDataType.Value += 10;
        ///    }   
        ///    
        ///    connection.Update&lt;IMyDataType&gt;(myDataTypes);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="items">The items to update in the C1 storage</param>
        public void Update<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            this.Implementation.Update<TData>(items);
        }



        /// <summary>
        /// Deletes the given <typeparamref name="TData"/> instance permently from the C1 storage.        
        /// This method triggers the event OnDeleted for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataType = 
        ///       (from d in connection.Get&lt;IMyDataType&gt;()
        ///        where d.Name == "Foo"
        ///        select d).First();
        ///    
        ///    
        ///    connection.Delete&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="item">The item to delete</param>
        public void Delete<TData>(TData item)
            where TData : class, IData
        {
            this.Implementation.Delete<TData>(item);
        }



        /// <summary>
        /// Deletes the given <typeparamref name="TData"/> instances permently from the C1 storage.
        /// This method triggers the event OnDeleted for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataTypes = 
        ///       from d in connection.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        ///    
        ///    
        ///    connection.Delete&lt;IMyDataType&gt;(myDataTypes);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <param name="items">The items to delete</param>
        public void Delete<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
            this.Implementation.Delete<TData>(items);
        }



        /// <summary>
        /// Create a new <typeparamref name="TData"/> that can be added using <see cref="Composite.Data.DataConnection.Add&lt;TData&gt;(TData)"/>.
        /// This method triggers the event OnNew for the return value of the method.
        /// </summary>
        /// <example>
        /// Here is an example of how to create a new IData instance and add it to the C1 storage.
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
        ///    myDataType.Name = "John Doe";
        ///    connection.Add&lt;IMyDataType&gt;(myDataType);        
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <returns>Returns a new instance of the <typeparamref name="TData"/></returns>
        public static TData New<TData>()
            where TData : class, IData
        {
            return ImplementationFactory.CurrentFactory.StatelessDataConnection.New<TData>();
        }



        /// <summary>
        /// Create a new <typeparamref name="TData"/> that can be added using <see cref="Composite.Data.DataConnection.Add&lt;TData&gt;(TData)"/>.
        /// This method triggers the event OnNew for the return value of the method.
        /// </summary>
        /// Here is an example of how to create a new IData instance and add it to the C1 storage.
        /// <example>
        /// <code>
        /// using (DataConnection connection = new DataConnection())
        /// {
        ///    IMyDataType myDataType = connection.CreateNew&lt;IMyDataType&gt;();
        ///    myDataType.Name = "John Doe";
        ///    connection.Add&lt;IMyDataType&gt;(myDataType);        
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <returns>Returns a new instance of the <typeparamref name="TData"/></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic", Justification = "This is want we want")]
        public TData CreateNew<TData>()
            where TData : class, IData
        {
            return ImplementationFactory.CurrentFactory.StatelessDataConnection.New<TData>();
        }



        /// <summary>
        /// The current publication scope.
        /// </summary>
        public PublicationScope CurrentPublicationScope
        {
            get
            {
                return this.Implementation.CurrentPublicationScope;
            }
        }



        /// <summary>
        /// The current locale.
        /// </summary>
        public CultureInfo CurrentLocale
        {
            get
            {
                return this.Implementation.CurrentLocale;
            }
        }



        /// <summary>
        /// All locales added to C1.
        /// </summary>
        /// <example>
        /// Here is an example of how to enumerate all locales added to C1.
        /// <code>
        /// foreach (CultureInfo locale in DataConnection.Locales)
        /// {
        ///    // Use the locale
        /// }
        /// </code>
        /// </example>
        public static IEnumerable<CultureInfo> AllLocales
        {
            get
            {
                return ImplementationFactory.CurrentFactory.StatelessDataConnection.AllLocales;
            }
        }



        ///// <summary>
        ///// A PageDataConnection instanse. See <see cref="Composite.Data.PageDataConnection"/>
        ///// </summary>
        //public PageDataConnection PageDataConnection
        //{
        //    get
        //    {
        //        return _pageDataConnection.Implementation;
        //    }
        //}



        /// <summary>
        /// A SitemapNavigator instance. See <see cref="Composite.Data.SitemapNavigator"/>
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1702:CompoundWordsShouldBeCasedCorrectly", MessageId = "Sitemap")]
        public SitemapNavigator SitemapNavigator
        {
            get
            {
                return _sitemapNavigator.Implementation;
            }
        }



        /// <exclude />
        public void Dispose()
        {
            Dispose(true);
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }



#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~DataConnection()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif


        /// <exclude />
        protected virtual void Dispose(bool disposing)
        {
            if (!disposing) return;

            if (_disposed)
            {
                throw new ObjectDisposedException(nameof(DataConnection));
            }

            this.DisposeImplementation();
            
            _sitemapNavigator.Implementation.DisposeImplementation();

            _disposed = true;
        }
    }
}
