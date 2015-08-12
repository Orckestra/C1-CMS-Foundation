using Composite.Core.Routing;

namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    public interface IMediaDataProvider : IDataProvider
    {
        /// <summary>
        /// Indicates whether the current data provider supports the store id
        /// </summary>
        bool IsSupportedStoreId(string storeId);

        /// <summary>
        /// Returns an instance of <see cref="IMediaUrlProvider"/>
        /// </summary>
        IMediaUrlProvider MediaUrlProvider { get; }
    }
}
