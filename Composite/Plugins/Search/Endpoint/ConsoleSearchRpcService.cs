using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Composite.C1Console.Search;
using Composite.C1Console.Search.Crawling;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.Linq;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WampRouter;
using Microsoft.Extensions.DependencyInjection;
using WampSharp.V2;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Search.Endpoint
{
    [ApplicationStartup]
    class SearchApplicationStartup
    {
        public static void OnInitialized(IServiceProvider serviceProvider)
        {
            WampRouterFacade.RegisterCallee(new ConsoleSearchRpcService(
                serviceProvider.GetService<ISearchProvider>(),
                serviceProvider.GetServices<ISearchDocumentSourceProvider>()));
        }
    }



    /// <exclude />
    public class ConsoleSearchRpcService : IRpcService
    {
        private readonly ISearchProvider _searchProvider;
        private readonly IEnumerable<ISearchDocumentSourceProvider> _docSourceProviders;

        /// <exclude />
        public ConsoleSearchRpcService(
            ISearchProvider searchProvider,
            IEnumerable<ISearchDocumentSourceProvider> docSourceProviders)
        {
            _searchProvider = searchProvider;
            _docSourceProviders = docSourceProviders;
        }

        /// <exclude />
        [WampProcedure("search.query")]
        public async Task<ConsoleSearchResult> QueryAsync(ConsoleSearchQuery query)
        {
            if (_searchProvider == null) return null;

            if (string.IsNullOrEmpty(query?.Text))
            {
                return new ConsoleSearchResult
                {
                    QueryText = string.Empty,
                    TotalHits = 0
                };
            }

            var consoleCulture = UserSettings.CultureInfo;
            var consoleUiCulture = UserSettings.C1ConsoleUiLanguage;

            var documentSources = _docSourceProviders.SelectMany(dsp => dsp.GetDocumentSources()).ToList();
            var allFields = documentSources.SelectMany(ds => ds.CustomFields).ToList();

            var facetFields = RemoveDuplicateKeys(
                allFields
                .Where(f => f.FacetedSearchEnabled && f.Name != DefaultDocumentFieldNames.HasUrl),
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

            searchQuery.FilterByUser(UserSettings.Username);

            var result = await _searchProvider.SearchAsync(searchQuery);

            var documents = result.Documents.Evaluate();
            if (!documents.Any())
            {
                return new ConsoleSearchResult
                {
                    QueryText = query.Text,
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
                QueryText = query.Text,
                Columns = previewFields.Select(pf => new ConsoleSearchResultColumn
                {
                    FieldName = pf.Name,
                    Label = pf.GetFieldLabel(consoleUiCulture),
                    Sortable = pf.Preview.Sortable
                }).ToArray(),
                Rows = documents.Select(doc => new ConsoleSearchResultRow
                {
                    Label = doc.Label,
                    Url = GetFocusUrl(doc.SerializedEntityToken),
                    Values = GetPreviewValues(doc, previewFields, consoleCulture)
                }).ToArray(),
                FacetFields = GetFacets(result, facetFields, consoleCulture),
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
                if (values.Length == 0) continue;

                result.Add(new ConsoleSearchResultFacetField
                {
                    FieldName = field.Name,
                    Label = field.GetFieldLabel(culture),
                    Facets = values.Select(v => new ConsoleSearchResultFacetValue
                    {
                        Value = v.Value,
                        HitCount = v.HitCount,
                        Label = field.Facet.GetValuePreviewFunction(v.Value, culture)
                    }).ToArray()
                });
            }

            return result.ToArray();
        }

        private Dictionary<string, string> GetPreviewValues(
            SearchDocument searchDocument,
            IEnumerable<DocumentField> fields,
            CultureInfo culture)
        {
            var result = new Dictionary<string, string>();

            foreach (var field in fields)
            {
                object value;
                if (!searchDocument.FieldValues.TryGetValue(field.Name, out value)) continue;

                var stringValue = (field.Preview.PreviewFunction ?? ((v, c) => v?.ToString()))(value, culture);
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
