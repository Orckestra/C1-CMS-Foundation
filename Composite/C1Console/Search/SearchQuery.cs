using System.Collections.Generic;
using System.Globalization;

namespace Composite.C1Console.Search
{
    /// <summary>
    /// Defines how multiple selected values should be resolved (should all or them much the document or any)
    /// </summary>
    public enum SearchQuerySelectionOperation
    {
        /// <summary>
        /// 
        /// </summary>
        Or = 0,
        /// <summary>
        /// 
        /// </summary>
        And = 1
    }

    public class SearchQuerySelection
    {
        public string FieldName { get; set; }
        public string[] Values { get; set; }
        public SearchQuerySelectionOperation Operation { get; set; }
    }

    public class SearchQuerySortOption
    {
        public SearchQuerySortOption(string fieldName, bool reverseOrder)
        {
            FieldName = fieldName;
            ReverseOrder = reverseOrder;
        }

        /// <summary>
        /// A field name to sort results by
        /// </summary>
        public string FieldName { get; }

        /// <summary>
        /// Indicates whether the results should appear in an order reverse to the way it is kept in the index.
        /// </summary>
        public bool ReverseOrder { get; }
    }

    /// <summary>
    /// A search query.
    /// </summary>
    public sealed class SearchQuery
    {
        /// <summary>
        /// Constructs a search query.
        /// </summary>
        public SearchQuery(string query, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNullOrEmpty(query, nameof(query));
            Verify.ArgumentNotNull(cultureInfo, nameof(cultureInfo));

            Query = query;
            CultureInfo = cultureInfo;
            MaxDocumentsNumber = 100;
        }

        /// <summary>
        /// The query text
        /// </summary>
        public string Query { get; }

        /// <summary>
        /// The culture in which the search is performed
        /// </summary>
        public CultureInfo CultureInfo { get; }

        /// <summary>
        /// To be used for pagination - number for the first page from the result set to be returned.
        /// </summary>
        public int SearchResultOffest { get; set; }

        /// <summary>
        /// Maximum amount of documents returned.
        /// </summary>
        public int MaxDocumentsNumber;

        /// <summary>
        /// Facets to be returned.
        /// </summary>
        public IEnumerable<KeyValuePair<string, DocumentFieldFacet>> Facets { get; set; }

        /// <summary>
        /// To be used to filter results by facet field values.
        /// </summary>
        public IEnumerable<SearchQuerySelection> Selection { get; set; }

        /// <summary>
        /// Indicates whether the results should be sorted by weight/relevance.
        /// </summary>
        public bool SortByRelevance { get; set; }

        /// <summary>
        /// Sort options.
        /// </summary>
        public IEnumerable<SearchQuerySortOption> SortOptions { get; set; }
    }
}
