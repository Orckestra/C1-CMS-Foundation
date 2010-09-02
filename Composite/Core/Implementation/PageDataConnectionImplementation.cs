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



        public TData GetPageMetaData<TData>(string fieldName)
            where TData : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public TData GetPageMetaData<TData>(string fieldName, Guid pageId)
            where TData : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<TData> GetPageMetaData<TData>(string fieldName, SitemapScope scope)
            where TData : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<TData> GetPageMetaData<TData>(string fieldName, SitemapScope scope, Guid pageId)
            where TData : IPageMetaData
        {
            throw new NotImplementedException();
        }



        public IQueryable<TData> GetPageData<TData>()
            where TData : IPageData
        {
            throw new NotImplementedException();
        }



        public IQueryable<TData> GetPageData<TData>(SitemapScope scope)
            where TData : IPageData
        {
            throw new NotImplementedException();
        }



        public IQueryable<TData> GetPageData<TData>(SitemapScope scope, Guid sourcePageId)
            where TData : IPageData
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
