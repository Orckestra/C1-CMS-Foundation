using System.Collections.Generic;
using System.Linq;

namespace Composite.Search
{
    /// <summary>
    /// Information about a search facet.
    /// </summary>
    public class Facet
    {
        /// <summary>
        /// The field value.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Amount of document found for the given value.
        /// </summary>
        public int HitCount { get; set; }
    }

    /// <summary>
    /// Search result.
    /// </summary>
    public sealed class SearchResult
    {
        /// <summary>
        /// Found documents.
        /// </summary>
        public IEnumerable<SearchDocument> Documents { get; set; }

        /// <summary>
        /// Total documents found.
        /// </summary>
        public int TotalHits { get; set; }

        /// <summary>
        /// Found facet values.
        /// </summary>
        public IDictionary<string, Facet[]> Facets { get; set; }

        /// <exclude />
        public static SearchResult Empty => new SearchResult { Documents = Enumerable.Empty<SearchDocument>() };
    }
}
