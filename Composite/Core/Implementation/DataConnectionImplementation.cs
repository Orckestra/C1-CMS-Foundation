//#define ConnectionLeakCheck

using System;
using System.Collections.Generic;
using System.Diagnostics;
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
#if ConnectionLeakCheck
        private string _allocationCallStack;
#endif
        
        private IDisposable _threadDataManager;
        private readonly DataScope _dataScope;

        internal DataScope DataScope => _dataScope;
        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called
        /// Used when New and AllLocales are called
        /// </summary>
        public DataConnectionImplementation()
        {
            InitializeThreadData();
            InitializeScope();
        }


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
        }

        private void InitializeThreadData()
        {
            _threadDataManager = ThreadDataManager.EnsureInitialize();

#if ConnectionLeakCheck
            _allocationCallStack = new StackTrace().ToString();
#endif
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
        /// <typeparam name="TData"></typeparam>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "New", Justification = "This is what we want")]
        public virtual TData New<TData>()
            where TData : class, IData
        {
            return DataFacade.BuildNew<TData>();
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
        public virtual IEnumerable<CultureInfo> AllLocales => DataLocalizationFacade.ActiveLocalizationCultures;


        /// <summary>
        /// Documentation pending
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        /// <exclude />
        ~DataConnectionImplementation()
        {
#if ConnectionLeakCheck
            Log.LogError(nameof(DataConnection), "Not disposed data connection allocated at: " + _allocationCallStack);
#endif

            Dispose(false);
        }



        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dataScope.Dispose();

                _threadDataManager.Dispose();
            }
        }
    }
}
