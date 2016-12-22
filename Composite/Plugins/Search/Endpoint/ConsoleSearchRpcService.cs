using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Search;
using Composite.C1Console.Users;
using Composite.Core.Application;
using Composite.Core.Linq;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Search.Endpoint
{
    [ApplicationStartup]
    class SearchApplicationStartup
    {
        public static void OnInitialized()
        {
            WampRouterFacade.RegisterCallee(new ConsoleSearchRpcService());
        }
    }

    /// <exclude />
    public class ConsoleSearchResult
    {
        /// <exclude />
        public ConsoleSearchResultColumn[] Columns { get; set; }
        /// <exclude />
        public ConsoleSearchResultRow[] Rows { get; set; }
        /// <exclude />
        public int TotalHits { get; set; }
        /// <exclude />
        public ConsoleSearchResultFacetField[] FacetFields { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchQuery
    {
        /// <exclude />
        public string CultureName { get; set; }
        /// <exclude />
        public string Text { get; set; }
        /// <exclude />
        public string SortBy { get; set; }
        /// <exclude />
        public bool SortInReverseOrder { get; set; }
        /// <exclude />
        public ConsoleSearchQuerySelection[] Selections { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultColumn
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public bool Sortable { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchQuerySelection
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string[] Values { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultRow
    {
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public string Url { get; set; }
        /// <exclude />
        public Dictionary<string, string> Values { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultFacetField
    {
        /// <exclude />
        public string FieldName { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public ConsoleSearchResultFacetValue[] Facets { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchResultFacetValue
    {
        /// <exclude />
        public string Value { get; set; }
        /// <exclude />
        public string Label { get; set; }
        /// <exclude />
        public int HitCount { get; set; }
    }

    /// <exclude />
    public class ConsoleSearchRpcService : IRpcService
    {
        /// <exclude />
        [WampProcedure("search.query")]
        public ConsoleSearchResult Query(ConsoleSearchQuery query)
        {
            var uiCulture = CultureInfo.CurrentUICulture;

            var documentSources = SearchFacade.DocumentSources.Evaluate();
            var allFields = documentSources.SelectMany(ds => ds.CustomFields).ToList();

            var facetFields = RemoveDuplicateKeys(
                allFields
                .Where(f => f.FacetedSearchEnabled),
                f => f.Name).ToList();

            var selections = new List<SearchQuerySelection>();
            if (query.Selections != null)
            {
                foreach (var selection in query.Selections)
                {
                    var field = allFields.Where(f => f.Facet != null)
                        .FirstOrDefault(f => f.Name == selection.FieldName);
                    Verify.IsNotNull(field, $"Failed to find a facet field by name '{selection.FieldName}'");

                    selections.Add(new SearchQuerySelection
                    {
                        FieldName = selection.FieldName,
                        Values = selection.Values,
                        Operation = field.Facet.FacetType == FacetType.SingleValue 
                            ? SearchQuerySelectionOperation.Or
                            : SearchQuerySelectionOperation.And
                    });
                }
            }

            var sortOptions = new List<SearchQuerySortOption>();
            if (!string.IsNullOrEmpty(query.SortBy))
            {
                var sortTermsAs = allFields
                    .Where(f => f.Name == query.SortBy && f.Preview != null && f.Preview.Sortable)
                    .Select(f => f.Preview.SortTermsAs)
                    .FirstOrDefault();

                sortOptions.Add(new SearchQuerySortOption(query.SortBy, query.SortInReverseOrder, sortTermsAs));
            }

            var culture = !string.IsNullOrEmpty(query.CultureName) 
                ? new CultureInfo(query.CultureName) 
                : UserSettings.ActiveLocaleCultureInfo;
            
            var searchQuery = new SearchQuery(query.Text, culture)
            {
                Facets = facetFields.Select(f => new KeyValuePair<string, DocumentFieldFacet>(f.Name, f.Facet)).ToList(),
                Selection = selections,
                SortOptions = sortOptions
            };

            // TODO: use async/await here
            var result = SearchFacade.SearchConsoleAsync(searchQuery, false, null).Result;

            var documents = result.Documents.ToList();
            if (!documents.Any())
            {
                return new ConsoleSearchResult
                {
                    TotalHits = 0
                };
            }

            var dataSourceNames = new HashSet<string>(documents.Select(d => d.Source).Distinct());

            var dataSources = documentSources.Where(d => dataSourceNames.Contains(d.Name)).ToList();
            var previewFields = RemoveDuplicateKeys(
                    dataSources
                        .SelectMany(ds => ds.CustomFields)
                        .Where(f => f.FieldValuePreserved), 
                    f => f.Name).ToList();

            return new ConsoleSearchResult
            {
                Columns = previewFields.Select(pf => new ConsoleSearchResultColumn
                {
                    FieldName = pf.Name,
                    Label = pf.GetFieldLabel(uiCulture),
                    Sortable = pf.Preview.Sortable
                }).ToArray(),
                Rows = documents.Select(doc => new ConsoleSearchResultRow
                {
                    Label = doc.Label,
                    Url = GetFocusUrl(doc.SerializedEntityToken),
                    Values = GetPreviewValues(doc, previewFields)
                }).ToArray(),
                FacetFields = GetFacets(result, facetFields, uiCulture),
                TotalHits = result.TotalHits
            };
        }

        private ConsoleSearchResultFacetField[] GetFacets(SearchResult queryResult, ICollection<DocumentField> facetFields, CultureInfo culture)
        {
            if (queryResult.Facets == null)
            {
                return null;
            }

            var result = new List<ConsoleSearchResultFacetField>();
            foreach (var field in facetFields.Where(f => queryResult.Facets.ContainsKey(f.Name)))
            {
                Facet[] values = queryResult.Facets[field.Name];
                result.Add(new ConsoleSearchResultFacetField
                {
                    FieldName = field.Name,
                    Label = field.GetFieldLabel(culture),
                    Facets = values.Select(v => new ConsoleSearchResultFacetValue
                    {
                        Value = v.Value,
                        HitCount = v.HitCount,
                        Label = field.Facet.LabelFunction(v.Value)
                    }).ToArray()
                });
            }

            return result.ToArray();
        }

        private Dictionary<string, string> GetPreviewValues(
            SearchDocument searchDocument,
            IEnumerable<DocumentField> fields)
        {
            var result = new Dictionary<string, string>();

            foreach (var field in fields)
            {
                object value;
                if (!searchDocument.FieldValues.TryGetValue(field.Name, out value)) continue;

                var stringValue = (field.Preview.PreviewFunction ?? (a => a?.ToString()))(value);
                result[field.Name] = stringValue;
            }

            return result;
        }

        private string GetFocusUrl(string serializedEntityToken)
        {
            return UrlUtils.AdminRootPath + "/top.aspx#FocusElement;" + serializedEntityToken;
        }

        private IEnumerable<T> RemoveDuplicateKeys<T>(IEnumerable<T> sequence, Func<T, string> getKeyFunc)
        {
            var keys = new HashSet<string>();

            foreach (var el in sequence)
            {
                string key = getKeyFunc(el);

                if (keys.Contains(key)) continue;

                keys.Add(key);

                yield return el;
            }
        }
    }
}
