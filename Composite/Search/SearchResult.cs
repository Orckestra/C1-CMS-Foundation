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
    /// Represents a search result item, which consists of the document as well as highlighted matched terms.
    /// </summary>
    public sealed class SearchResultItem
    {
        /// <summary>
        /// Gets the underlying search document.
        /// </summary>
        public SearchDocument Document { get; set; }

        /// <summary>
        /// Returns the label of the documents with highlighted matched terms.
        /// </summary>
        public string LabelHtmlHighlight { get; set; }

        /// <summary>
        /// Returns text fragments of the full text field with highlighted matched terms.
        /// </summary>
        public string[] FullTextHtmlHighlights { get; set; }
    }

    /// <summary>
    /// Search result.
    /// </summary>
    public sealed class SearchResult
    {
        /// <summary>
        /// Found documents.
        /// </summary>
        public IEnumerable<SearchResultItem> Items { get; set; }

        /// <summary>
        /// Total documents found.
        /// </summary>
        public int TotalHits { get; set; }

        /// <summary>
        /// Found facet values.
        /// </summary>
        public IDictionary<string, Facet[]> Facets { get; set; }

        /// <exclude />
        public static SearchResult Empty => new SearchResult { Items = Enumerable.Empty<SearchResultItem>() };
    }
}
