using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Threading;
using Composite.Data;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Documentation pending
    /// </summary>
    public class DataConnectionImplementation : DataConnectionBase, IDisposable
    {
        private IDisposable _threadDataManager;
        private readonly IDisposable _serviceScope;
        private readonly DataScope _dataScope;

        internal DataScope DataScope => _dataScope;


        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="scope"></param>
        /// <param name="locale"></param>
        public DataConnectionImplementation(PublicationScope scope, CultureInfo locale)
        {
            InitializeThreadData();
            InitializeScope(scope, locale);

            _dataScope = new DataScope(this.DataScopeIdentifier, locale);

            _serviceScope = ServiceLocator.EnsureThreadDataServiceScope();
        }

        private void InitializeThreadData()
        {
            _threadDataManager = ThreadDataManager.EnsureInitialize();
    }

    /// <summary>
    /// Documentation pending
    /// </summary>
    /// <typeparam name="TData"></typeparam>
    /// <returns></returns>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "Get", Justification = "This is what we want")]
        public virtual IQueryable<TData> Get<TData>()
            where TData : class, IData
        {
        //    using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.GetData<TData>();
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public virtual TData Add<TData>(TData item)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<TData>(item);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="items"></param>
        /// <returns></returns>
        public virtual IList<TData> Add<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<TData>(items);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="item"></param>
        public virtual void Update<TData>(TData item)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(item);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="items"></param>
        public virtual void Update<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(items);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="item"></param>
        public virtual void Delete<TData>(TData item)
            where TData : class, IData
        {
          //  using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<TData>(item);
            }
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <typeparam name="TData"></typeparam>
        /// <param name="items"></param>
        public virtual void Delete<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
          //  using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<TData>(items);
            }
        }


        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual PublicationScope CurrentPublicationScope => this.PublicationScope;


        /// <summary>
        /// Documentation pending
        /// </summary>
        public virtual CultureInfo CurrentLocale => this.Locale;




        /// <summary>
        /// Documentation pending
        /// </summary>
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
        ~DataConnectionImplementation()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif


        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _serviceScope?.Dispose();

                _dataScope.Dispose();

                _threadDataManager.Dispose();
            }
        }
    }
}
