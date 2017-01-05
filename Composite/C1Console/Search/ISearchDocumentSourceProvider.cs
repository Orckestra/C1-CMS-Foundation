using System.Collections.Generic;

namespace Composite.C1Console.Search
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
