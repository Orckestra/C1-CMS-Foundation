using Composite.Data;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Providers internal urls for data references.
    /// </summary>
    public interface IInternalUrlProvider
    {
        /// <summary>
        /// Builds an internal urls for the specified data reference.
        /// </summary>
        /// <param name="reference">The data reference.</param>
        /// <returns></returns>
        string BuildInternalUrl(IDataReference reference);
    }
}
