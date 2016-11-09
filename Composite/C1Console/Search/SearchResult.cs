using System.Collections.Generic;
using System.Linq;

namespace Composite.C1Console.Search
{
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

        // TODO: add facets/paging information

        /// <exclude />
        public static SearchResult Empty => new SearchResult { Documents = Enumerable.Empty<SearchDocument>() };
    }
}
