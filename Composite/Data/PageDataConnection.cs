using System;
using System.Globalization;
using System.Linq;
using Composite.Core.Implementation;


namespace Composite.Data
{
    ///// <summary>    
    ///// </summary>
    ///// <exclude />
    //[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    //public class PageDataConnection : ImplementationContainer<PageDataConnectionImplementation>, IDisposable
    //{
    //    ImplementationContainer<DataConnection> _dataConnection;
    //    ImplementationContainer<SitemapNavigator> _sitemapNavigator;



    //    public PageDataConnection()
    //        : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(null, null))
    //    {
    //        _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection());
    //        _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
    //    }



    //    public PageDataConnection(PublicationScope scope)
    //        : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(scope, null))
    //    {
    //        if ((scope < PublicationScope.Unpublished) || (scope > PublicationScope.Published)) throw new ArgumentOutOfRangeException("scope");

    //        _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(scope));
    //        _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
    //    }



    //    public PageDataConnection(CultureInfo locale)
    //        : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(null, locale))
    //    {
    //        _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(locale));
    //        _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
    //    }



    //    public PageDataConnection(PublicationScope scope, CultureInfo locale)
    //        : base(() => ImplementationFactory.CurrentFactory.CreatePageDataConnection(scope, locale))
    //    {
    //        if ((scope < PublicationScope.Unpublished) || (scope > PublicationScope.Published)) throw new ArgumentOutOfRangeException("scope");

    //        _dataConnection = new ImplementationContainer<DataConnection>(() => new DataConnection(scope, locale));
    //        _sitemapNavigator = new ImplementationContainer<SitemapNavigator>(() => new SitemapNavigator(this.DataConnection));
    //    }



    //    public TData GetPageMetaData<TData>(string fieldName)
    //        where TData : IPageMetaData
    //    {
    //        if (string.IsNullOrWhiteSpace(fieldName)) throw new ArgumentNullException("fieldName");

    //        return this.Implementation.GetPageMetaData<TData>(fieldName);
    //    }



    //    public TData GetPageMetaData<TData>(string fieldName, Guid pageId)
    //        where TData : IPageMetaData
    //    {
    //        if (string.IsNullOrWhiteSpace(fieldName)) throw new ArgumentNullException("fieldName");

    //        return this.Implementation.GetPageMetaData<TData>(fieldName, pageId);
    //    }



    //    public IQueryable<TData> GetPageMetaData<TData>(string fieldName, SitemapScope scope)
    //        where TData : IPageMetaData
    //    {
    //        if (string.IsNullOrWhiteSpace(fieldName)) throw new ArgumentNullException("fieldName");
    //        if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

    //        return this.Implementation.GetPageMetaData<TData>(fieldName, scope);
    //    }



    //    public IQueryable<TData> GetPageMetaData<TData>(string fieldName, SitemapScope scope, Guid pageId)
    //        where TData : IPageMetaData
    //    {
    //        if (string.IsNullOrWhiteSpace(fieldName)) throw new ArgumentNullException("fieldName");
    //        if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

    //        return this.Implementation.GetPageMetaData<TData>(fieldName, scope, pageId);
    //    }



    //    public IQueryable<TData> GetPageData<TData>()
    //        where TData : IPageData
    //    {
    //        return this.Implementation.GetPageData<TData>();
    //    }



    //    public IQueryable<TData> GetPageData<TData>(SitemapScope scope)
    //        where TData : IPageData
    //    {
    //        if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

    //        return this.Implementation.GetPageData<TData>(scope);
    //    }



    //    public IQueryable<TData> GetPageData<TData>(SitemapScope scope, Guid sourcePageId)
    //        where TData : IPageData
    //    {
    //        if ((scope < SitemapScope.Current) || (scope > SitemapScope.SiblingsAndSelf)) throw new ArgumentOutOfRangeException("scope");

    //        return this.Implementation.GetPageData<TData>(scope, sourcePageId);
    //    }



    //    public SitemapNavigator SitemapNavigator
    //    {
    //        get
    //        {
    //            return _sitemapNavigator.Implementation;
    //        }
    //    }



    //    public DataConnection DataConnection
    //    {
    //        get
    //        {
    //            return _dataConnection.Implementation;
    //        }
    //    }



    //    public void Dispose()
    //    {
    //        Dispose(true);
    //        GC.SuppressFinalize(this);
    //    }



    //    ~PageDataConnection()
    //    {
    //        Dispose(false);
    //    }



    //    protected virtual void Dispose(bool disposing)
    //    {
    //        if (disposing)
    //        {
    //            if (_dataConnection != null)
    //            {
    //                _dataConnection.DisposeImplementation();
    //                _sitemapNavigator.DisposeImplementation();
    //            }
    //        }
    //    }
    //}
}
