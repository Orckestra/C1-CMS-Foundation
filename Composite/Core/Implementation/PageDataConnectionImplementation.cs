using System;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class PageDataConnectionImplementation : DataConnectionBase, IDisposable
    {
        public PageDataConnectionImplementation()
        {
            InitializeScope();
        }



        public PageDataConnectionImplementation(PublicationScope scope, CultureInfo locale)
        {
            InitializeScope(scope, locale);
        }



        public T GetPageMetaData<T>(string fieldName)
            where T : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public T GetPageMetaData<T>(string fieldName, Guid pageId)
            where T : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<T> GetPageMetaData<T>(string fieldName, SitemapScope scope)
            where T : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<T> GetPageMetaData<T>(string fieldName, SitemapScope scope, Guid pageId)
            where T : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<T> GetPageData<T>()
            where T : IPageData
        {
            throw new NotImplementedException();
        }



        public IQueryable<T> GetPageData<T>(SitemapScope scope)
            where T : IPageData
        {
            throw new NotImplementedException();
        }



        public IQueryable<T> GetPageData<T>(SitemapScope scope, Guid sourcePageId)
            where T : IPageData
        {
            throw new NotImplementedException();
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~PageDataConnectionImplementation()
        {
            Dispose(false);
        }



        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // Dispose stuff
            }
        }
    }
}
