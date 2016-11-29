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
        /// The result documents should have at least one of the given values.
        /// </summary>
        Or = 0,
        /// <summary>
        /// The result documents should have all of the given values.
        /// </summary>
        And = 1
    }

    /// <summary>
    /// Allows filtering search results by defining the needed facet values.
    /// </summary>
    public class SearchQuerySelection
    {
        /// <summary>
        /// The name of the field.
        /// </summary>
        public string FieldName { get; set; }

        /// <summary>
        /// The array of values.
        /// </summary>
        public string[] Values { get; set; }

        /// <summary>
        /// Defines how multiple selected values should be resolved.
        /// </summary>
        public SearchQuerySelectionOperation Operation { get; set; }
    }


    /// <summary>
    /// Represents a sort option for the a search query.
    /// </summary>
    public class SearchQuerySortOption
    {
        /// <summary>
        /// Constructs a new instance of <see cref="SearchQuerySortOption"/>.
        /// </summary>
        /// <param name="fieldName"></param>
        /// <param name="reverseOrder"></param>
        /// <param name="sortTermsAs"></param>
        public SearchQuerySortOption(string fieldName, bool reverseOrder, SortTermsAs sortTermsAs = SortTermsAs.String)
        {
            FieldName = fieldName;
            ReverseOrder = reverseOrder;
            SortTermsAs = sortTermsAs;
        }

        /// <summary>
        /// A field name to sort results by
        /// </summary>
        public string FieldName { get; }

        /// <summary>
        /// Indicates whether the results should appear in an order reverse to the way it is kept in the index.
        /// </summary>
        public bool ReverseOrder { get; }

        /// <summary>
        /// Defines how the field values are interpreted during sorting of the search results.
        /// </summary>
        public SortTermsAs SortTermsAs { get; set; }
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
