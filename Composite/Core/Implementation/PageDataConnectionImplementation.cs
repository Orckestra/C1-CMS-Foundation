using System;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Core.Implementation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PageDataConnectionImplementation : DataConnectionBase, IDisposable
    {
        /// <exclude />
        public PageDataConnectionImplementation()
        {
            InitializeScope();
        }



        /// <exclude />
        public PageDataConnectionImplementation(PublicationScope scope, CultureInfo locale)
        {
            InitializeScope(scope, locale);
        }



     /*   public TData GetPageMetaData<TData>(string fieldName)
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
        }*/



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
        ~PageDataConnectionImplementation()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif


        /// <exclude />
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // Dispose stuff
            }
        }
    }
}
