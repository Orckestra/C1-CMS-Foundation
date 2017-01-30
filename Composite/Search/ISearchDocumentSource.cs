using System.Collections.Generic;
using System.Globalization;

namespace Composite.Search
{
    /// <summary>
    /// Represents a search document source (f.e. cms pages, media, etc.)
    /// </summary>
    public interface ISearchDocumentSource
    {
        /// <summary>
        /// The name of the document source.
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Gets all the search documents for the current source.
        /// </summary>
        /// <param name="culture"></param>
        /// <returns></returns>
        IEnumerable<SearchDocument> GetAllSearchDocuments(CultureInfo culture);

        /// <summary>
        /// Gets the custom fields.
        /// </summary>
        ICollection<DocumentField> CustomFields { get; }

        /// <summary>
        /// Subscribes the given search document sourceListener to the source.
        /// </summary>
        /// <param name="sourceListener"></param>
        void Subscribe(IDocumentSourceListener sourceListener);
    }
}
