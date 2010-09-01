using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class DataConnectionImplementation : DataConnectionBase, IDisposable
    {
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
        }



        public virtual IQueryable<T> Get<T>()
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.GetData<T>();
            }
        }



        public virtual T Add<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(item);
            }
        }



        public virtual IList<T> Add<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(items);
            }
        }



        public virtual void Update<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(item);
            }
        }



        public virtual void Update<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(items);
            }
        }



        public virtual void Delete<T>(T item)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(item);
            }
        }



        public virtual void Delete<T>(IEnumerable<T> items)
            where T : class, IData
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(items);
            }
        }



        // This is a static on the actual class, but non-static here to allow mocking
        public virtual T New<T>()
            where T : class, IData
        {
            return DataFacade.BuildNew<T>();
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
                // Do disposing stuff
            }
        }
    }
}
