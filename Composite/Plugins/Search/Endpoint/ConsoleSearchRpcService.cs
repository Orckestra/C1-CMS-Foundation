using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Composite.Search;
using Composite.Search.Crawling;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WampRouter;
using Microsoft.Extensions.DependencyInjection;
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
        internal const string WampProcedureName = "search.query";

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
        [WampProcedure(WampProcedureName)]
        public async Task<ConsoleSearchResult> QueryAsync(ConsoleSearchQuery query)
        {
            if (_searchProvider == null || query == null) return null;

            Thread.CurrentThread.CurrentCulture = UserSettings.CultureInfo;
            Thread.CurrentThread.CurrentUICulture = UserSettings.C1ConsoleUiLanguage;

            var documentSources = _docSourceProviders.SelectMany(dsp => dsp.GetDocumentSources()).ToList();
            var allFields = documentSources.SelectMany(ds => ds.CustomFields).ToList();

            var facetFields = RemoveDuplicateKeys(
                allFields
                .Where(f => f.FacetedSearchEnabled && f.Label != null),
                f => f.Name).ToList();

            if (string.IsNullOrEmpty(query.Text))
            {
                return new ConsoleSearchResult
                {
                    QueryText = string.Empty,
                    FacetFields = EmptyFacetsFromSelections(query, facetFields),
                    TotalHits = 0
                };
            }

            var selections = new List<SearchQuerySelection>();
            if (query.Selections != null)
            {
                foreach (var selection in query.Selections)
                {
                    string fieldName = ExtractFieldName(selection.FieldName);

                    var field = allFields.Where(f => f.Facet != null)
                        .FirstOrDefault(f => f.Name == fieldName);
                    Verify.IsNotNull(field, $"Failed to find a facet field by name '{fieldName}'");

                    selections.Add(new SearchQuerySelection
                    {
                        FieldName = fieldName,
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
                string sortByFieldName = ExtractFieldName(query.SortBy);

                var sortTermsAs = allFields
                    .Where(f => f.Name == sortByFieldName && f.Preview != null && f.Preview.Sortable)
                    .Select(f => f.Preview.SortTermsAs)
                    .FirstOrDefault();

                sortOptions.Add(new SearchQuerySortOption(sortByFieldName, query.SortInReverseOrder, sortTermsAs));
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
            searchQuery.AddDefaultFieldFacet(DefaultDocumentFieldNames.Source);

            var result = await _searchProvider.SearchAsync(searchQuery);

            var documents = result.Documents.Evaluate();
            if (!documents.Any())
            {
                return new ConsoleSearchResult
                {
                    QueryText = query.Text,
                    FacetFields = EmptyFacetsFromSelections(query, facetFields),
                    TotalHits = 0
                };
            }

            HashSet<string> dataSourceNames;
            Facet[] dsFacets;
            if (result.Facets != null && result.Facets.TryGetValue(DefaultDocumentFieldNames.Source, out dsFacets))
            {
                dataSourceNames = new HashSet<string>(dsFacets.Select(v => v.Value));
            }
            else
            {
                Log.LogWarning(nameof(ConsoleSearchRpcService), "The search provider did not return the list of document sources");
                dataSourceNames = new HashSet<string>(documents.Select(d => d.Source).Distinct());
            }


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
                    FieldName = MakeFieldNameJsFriendly(pf.Name),
                    Label = StringResourceSystemFacade.ParseString(pf.Label),
                    Sortable = pf.Preview.Sortable
                }).ToArray(),
                Rows = documents.Select(doc => new ConsoleSearchResultRow
                {
                    Label = doc.Label,
                    Url = GetFocusUrl(doc.SerializedEntityToken),
                    Values = GetPreviewValues(doc, previewFields)
                }).ToArray(),
                FacetFields = GetFacets(result, facetFields),
                TotalHits = result.TotalHits
            };
        }

        private ConsoleSearchResultFacetField[] EmptyFacetsFromSelections(
            ConsoleSearchQuery query, 
            List<DocumentField> facetFields)
        {
            if (query.Selections == null) return null;

            return (from selection in query.Selections
                    where selection.Values.Length > 0
                    let facetField = facetFields.First(ff => ff.Name == selection.FieldName)
                    select new ConsoleSearchResultFacetField
                    {
                        FieldName = MakeFieldNameJsFriendly(selection.FieldName),
                        Label = StringResourceSystemFacade.ParseString(facetField.Label),
                        Facets = selection.Values.Select(value => new ConsoleSearchResultFacetValue
                        {
                            Label = (facetField.Facet.PreviewFunction ?? (v => v))(value),
                            Value = value,
                            HitCount = 0
                        }).ToArray()
                    }).ToArray();
        }

        private ConsoleSearchResultFacetField[] GetFacets(SearchResult queryResult, ICollection<DocumentField> facetFields)
        {
            if (queryResult.Facets == null)
            {
                return null;
            }

            var result = new List<ConsoleSearchResultFacetField>();
            foreach (var field in facetFields.Where(f => queryResult.Facets.ContainsKey(f.Name)))
            {
                if(field.Label == null) continue;

                Facet[] values = queryResult.Facets[field.Name];
                if (values.Length == 0) continue;

                result.Add(new ConsoleSearchResultFacetField
                {
                    FieldName = MakeFieldNameJsFriendly(field.Name),
                    Label = StringResourceSystemFacade.ParseString(field.Label),
                    Facets = values.Select(v => new ConsoleSearchResultFacetValue
                    {
                        Value = v.Value,
                        HitCount = v.HitCount,
                        Label = (field.Facet.PreviewFunction ?? (value => value))(v.Value)
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

                var stringValue = (field.Preview.PreviewFunction ?? (v => v?.ToString()))(value);
                result[MakeFieldNameJsFriendly(field.Name)] = stringValue;
            }

            return result;
        }

        private static string MakeFieldNameJsFriendly(string fieldName)
        {
            return char.IsUpper(fieldName[0])
                ? "_" + fieldName
                : fieldName;
        }

        private static string ExtractFieldName(string jsFriendlyFieldName)
        {
            return jsFriendlyFieldName.StartsWith("_") ? jsFriendlyFieldName.Substring(1) : jsFriendlyFieldName;
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
