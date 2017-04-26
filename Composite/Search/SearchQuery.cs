using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Search.Crawling;
using Composite.C1Console.Security;
using Composite.Core.Threading;
using Composite.Data;

namespace Composite.Search
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
        /// The array of values that are required to appear in the search documents.
        /// </summary>
        public string[] Values { get; set; }

        /// <summary>
        /// Defines how multiple selected values should be resolved.
        /// </summary>
        public SearchQuerySelectionOperation Operation { get; set; }

        /// <summary>
        /// The array of field values, documents containing which, should not appear in the results.
        /// </summary>
        public string[] NotValues { get; set; }
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
    /// Search query hightlight settings.
    /// </summary>
    public sealed class SearchQueryHighlightSettings
    {
        /// <summary>
        /// When set to <value>true</value>, highlihts will be included in the search results.
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// Maximum amount of highlight fragments.
        /// </summary>
        public int FragmentsCount { get; set; } = 1;

        /// <summary>
        /// Maximum fragment size. The default is 100 characters.
        /// </summary>
        public int FragmentSize { get; set; } = 100;

        /// <summary>
        /// Maximum amount of the full text field characters to be analyzed when extracting fragments to highlight.
        /// The default value is 51200.
        /// </summary>
        public int MaxAnalyzedChars { get; set; } = 51200;
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
        /// Filters search results by data types.
        /// </summary>
        /// <param name="dataTypes"></param>
        public void FilterByDataTypes(params Type[] dataTypes)
        {
            Verify.ArgumentNotNull(dataTypes, nameof(dataTypes));

            Selection.Add(new SearchQuerySelection
            {
                FieldName = DocumentFieldNames.DataType,
                Operation = SearchQuerySelectionOperation.Or,
                Values = dataTypes.Select(type => type.GetImmutableTypeId().ToString()).ToArray()
            });
        }

        /// <summary>
        /// Only documents that have the <see cref="SearchDocument.Url"/> property set should be returned.
        /// </summary>
        public void ShowOnlyDocumentsWithUrls()
        {
            Selection.Add(new SearchQuerySelection
            {
                FieldName = DocumentFieldNames.HasUrl,
                Values = new [] {"1"}
            });
        }


        /// <summary>
        /// Filters the results, so only entity tokens that have at least one of the given entity tokens
        /// as an ancestor, will be returned. This enables searching for the child elements in the console
        /// and searching for data that belongs to a specific website on frontend.
        /// </summary>
        public void FilterByAncestors(params EntityToken[] entityTokens)
        {
            Selection.Add(new SearchQuerySelection
            {
                FieldName = DocumentFieldNames.Ancestors,
                Operation = SearchQuerySelectionOperation.Or,
                Values = entityTokens.Select(SearchDocumentBuilder.GetEntityTokenHash).ToArray()
            });
        }


        /// <summary>
        /// Filtering search results to which the given user does not have read access permission.
        /// </summary>
        /// <param name="userName"></param>
        public void FilterByUser(string userName)
        {
            Verify.ArgumentNotNullOrEmpty(userName, nameof(userName));

            var tokens = new List<string> {userName};

            using (ThreadDataManager.EnsureInitialize())
            {
                tokens.AddRange(UserGroupFacade.GetUserGroupIds(userName).Select(id => id.ToString()));
            }

            Selection.Add(new SearchQuerySelection
            {
                FieldName = DocumentFieldNames.ConsoleAccess,
                Operation = SearchQuerySelectionOperation.Or,
                Values = tokens.ToArray()
            });
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
        public int SearchResultOffset { get; set; }

        /// <summary>
        /// Maximum amount of documents returned.
        /// </summary>
        public int MaxDocumentsNumber { get; set; }

        /// <summary>
        /// Facets to be returned.
        /// </summary>
        public ICollection<KeyValuePair<string, DocumentFieldFacet>> Facets { get; set; } 
            = new List<KeyValuePair<string, DocumentFieldFacet>>();

        /// <summary>
        /// To be used to filter results by facet field values.
        /// </summary>
        public ICollection<SearchQuerySelection> Selection { get; set; } = new List<SearchQuerySelection>();

        /// <summary>
        /// Sort options.
        /// </summary>
        public IEnumerable<SearchQuerySortOption> SortOptions { get; set; }

        /// <summary>
        /// Highlight settings.
        /// </summary>
        public SearchQueryHighlightSettings HighlightSettings { get; set; } = new SearchQueryHighlightSettings();


        /// <summary>
        /// Will indicate that the search results should return facet information for the given field.
        /// </summary>
        /// <param name="fieldName"></param>
        public void AddFieldFacet(string fieldName)
        {
            Verify.ArgumentNotNullOrEmpty(fieldName, nameof(fieldName));

            if (Facets.Any(f => f.Key == fieldName))
            {
                return;
            }

            var field = SearchDocumentBuilder.GetDefaultDocumentFields()
                .FirstOrDefault(f => f.Name == fieldName);

            if (field == null)
            {
                field = SearchFacade.DocumentSources.SelectMany(f => f.CustomFields)
                    .FirstOrDefault(f => f.Name == fieldName);

                Verify.IsNotNull(field, $"Failed to find a document field by name '{fieldName}'");
            }

            Verify.IsNotNull(field.Facet, $"Faceted search is not enabled for the field '{fieldName}'");

            Facets.Add(new KeyValuePair<string, DocumentFieldFacet>(
                    fieldName,
                    field.Facet));
        }
    }
}
