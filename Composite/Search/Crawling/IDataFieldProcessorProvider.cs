using System.Reflection;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// Allows augmenting crawling data types for search related information.
    /// </summary>
    public interface IDataFieldProcessorProvider
    {
        /// <summary>
        /// Provides <see cref="IDataFieldProcessor" /> for a given property info
        /// </summary>
        IDataFieldProcessor GetDataFieldProcessor(PropertyInfo dataTypeProperty);
    }
}
