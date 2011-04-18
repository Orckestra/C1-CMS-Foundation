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
        bool IsInternalUrl(string url);

        /// <exclude />
        UrlData<T> ParseInternalUrl(string url);

        /// <exclude />
        UrlData<T> ParseUrl(string url, UrlSpace urlSpace);

        /// <exclude />
        string BuildUrl(UrlData<T> urlData, UrlKind urlKind, UrlSpace urlSpace);
    }
}
