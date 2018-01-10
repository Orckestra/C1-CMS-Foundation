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
        /// Returns search documents along with continuation tokens, so the indexing can be 
        /// can be continued after website restart.
        /// </summary>
        /// <param name="culture">The culture for which the documents should be build.</param>
        /// <param name="continuationToken">Continuation token - contains pointer to the last 
        /// already indexed search documents, so the method will return all the following ones.</param>
        /// <returns></returns>
        IEnumerable<DocumentWithContinuationToken> GetSearchDocuments(
            CultureInfo culture,
            string continuationToken = null);

        /// <summary>
        /// Gets the custom fields.
        /// </summary>
        IReadOnlyCollection<DocumentField> CustomFields { get; }

        /// <summary>
        /// Subscribes the given search document sourceListener to the source.
        /// </summary>
        /// <param name="sourceListener"></param>
        void Subscribe(IDocumentSourceListener sourceListener);
    }

    /// <summary>
    /// Represents a tuple of a document and a continuation token
    /// </summary>
    public sealed class DocumentWithContinuationToken
    {
        /// <summary>
        /// The current document.
        /// </summary>
        public SearchDocument Document { get; set; }
        
        /// <summary>
        /// The continuation token for the document source.
        /// </summary>
        public string ContinuationToken { get; set; }
    }
}
