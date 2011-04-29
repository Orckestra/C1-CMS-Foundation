using Composite.Data;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IUrlProvider<T> where T : IData
    {
        /// <exclude />
        bool IsInternalUrl(string relativeUrl);

        /// <exclude />
        UrlData<T> ParseInternalUrl(string relativeUrl);

        /// <exclude />
        UrlData<T> ParseUrl(string relativeUrl, UrlSpace urlSpace);

        /// <exclude />
        string BuildUrl(UrlData<T> urlData, UrlKind urlKind, UrlSpace urlSpace);
    }
}
