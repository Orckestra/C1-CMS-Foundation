using System;
using System.Globalization;
using System.Linq;
using Composite.Core.Implementation;


namespace Composite.Data
{
    public class PageDataConnection : ImplementationContainer<PageDataConnectionImplementation>, IDisposable
    {
        ImplementationContainer<DataConnection> _dataConnection;
        ImplementationContainer<SitemapNavigator> _sitemapNavigator;



        public PageDataConnection()
            : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(null, null))
        {
            _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection());
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
        }



        public PageDataConnection(PublicationScope scope)
            : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(scope, null))
        {
            _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(scope));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
        }



        public PageDataConnection(CultureInfo locale)
            : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(null, locale))
        {
            _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(locale));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
        }



        public PageDataConnection(PublicationScope scope, CultureInfo locale)
            : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(scope, locale))
        {
            _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(scope, locale));
            _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
        }



        public T GetPageMetaData<T>(string fieldName)
            where T : IPageMetaData
        {
            return this.Implementation.GetPageMetaData<T>(fieldName);
        }



        public T GetPageMetaData<T>(string fieldName, Guid pageId)
            where T : IPageMetaData
        {
            return this.Implementation.GetPageMetaData<T>(fieldName, pageId);
        }



        public IQueryable<T> GetPageMetaData<T>(string fieldName, SitemapScope scope)
            where T : IPageMetaData
        {
            return this.Implementation.GetPageMetaData<T>(fieldName, scope);
        }



        public IQueryable<T> GetPageMetaData<T>(string fieldName, SitemapScope scope, Guid pageId)
            where T : IPageMetaData
        {
            return this.Implementation.GetPageMetaData<T>(fieldName, scope, pageId);
        }



        public IQueryable<T> GetPageData<T>()
            where T : IPageData
        {
            return this.Implementation.GetPageData<T>();
        }



        public IQueryable<T> GetPageData<T>(SitemapScope scope)
            where T : IPageData
        {
            return this.Implementation.GetPageData<T>(scope);
        }



        public IQueryable<T> GetPageData<T>(SitemapScope scope, Guid sourcePageId)
            where T : IPageData
        {
            return this.Implementation.GetPageData<T>(scope, sourcePageId);
        }



        public SitemapNavigator SitemapNavigator
        {
            get
            {
                return _sitemapNavigator.Implementation;
            }
        }



        public DataConnection DataConnection
        {
            get
            {
                return _dataConnection.Implementation;
            }
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~PageDataConnection()
        {
            Dispose(false);
        }



        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_dataConnection != null)
                {
                    _dataConnection.DisposeImplementation();
                    _sitemapNavigator.DisposeImplementation();
                }
            }
        }
    }
}
