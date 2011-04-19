using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.Routing.Plugins.UrlFormatters
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [CustomFactory(typeof(UrlFormatterCustomFactory))]
    public interface IUrlFormatter
    {
        /// <exclude />
        string FormatUrl(string url);
    }
}
