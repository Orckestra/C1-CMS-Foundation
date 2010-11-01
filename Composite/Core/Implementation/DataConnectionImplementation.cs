using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class DataConnectionImplementation : DataConnectionBase, IDisposable
    {
        private DataScope _dataScope;


        /// <summary>
        /// Stateless constructor. This is used when implementations of static methods needs to be called
        /// Used when New and AllLocales are called
        /// </summary>
        public DataConnectionImplementation()
        {
            InitializeScope();
        }


        public DataConnectionImplementation(PublicationScope scope, CultureInfo locale)
        {
            InitializeScope(scope, locale);

            _dataScope = new DataScope(this.DataScopeIdentifier, locale);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "Get", Justification = "This is what we want")]
        public virtual IQueryable<TData> Get<TData>()
            where TData : class, IData
        {
        //    using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.GetData<TData>();
            }
        }



        public virtual TData Add<TData>(TData item)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<TData>(item);
            }
        }



        public virtual IList<TData> Add<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<TData>(items);
            }
        }



        public virtual void Update<TData>(TData item)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(item);
            }
        }



        public virtual void Update<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
         //   using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(items);
            }
        }



        public virtual void Delete<TData>(TData item)
            where TData : class, IData
        {
          //  using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<TData>(item);
            }
        }



        public virtual void Delete<TData>(IEnumerable<TData> items)
            where TData : class, IData
        {
          //  using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<TData>(items);
            }
        }



        // This is a static on the actual class, but non-static here to allow mocking
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "New", Justification = "This is what we want")]
        public virtual TData New<TData>()
            where TData : class, IData
        {
            return DataFacade.BuildNew<TData>();
        }



        public virtual PublicationScope CurrentPublicationScope
        {
            get
            {
                return this.PublicationScope;
            }
        }



        public virtual CultureInfo CurrentLocale
        {
            get
            {
                return this.Locale;
            }
        }


        // This is a static on the actual class, but non-static here to allow mocking
        public virtual IEnumerable<CultureInfo> AllLocales
        {
            get
            {
                return DataLocalizationFacade.ActiveLocalizationCultures;
            }
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~DataConnectionImplementation()
        {
            Dispose(false);
        }



        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dataScope.Dispose();                
            }
        }
    }
}
