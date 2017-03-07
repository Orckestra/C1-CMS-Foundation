using System.Collections.Generic;

namespace Composite.Search
{
    /// <summary>
    /// Provides an enumeration of <see cref="ISearchDocumentSource"/>.
    /// </summary>
    public interface ISearchDocumentSourceProvider
    {
        /// <summary>
        /// Provides an enumeration of <see cref="ISearchDocumentSource"/>.
        /// </summary>
        IEnumerable<ISearchDocumentSource> GetDocumentSources();
    }
}
