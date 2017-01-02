using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Composite.C1Console.Search.DocumentSources;
using Composite.Core;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.C1Console.Search
{
    /// <summary>
    /// Console search functionality
    /// </summary>
    public static class SearchFacade
    {
        /// <summary>
        /// Gets the document sources
        /// </summary>
        public static IEnumerable<ISearchDocumentSource> DocumentSources =>
            ServiceLocator.GetServices<ISearchDocumentSourceProvider>()
                .SelectMany(sp => sp.GetDocumentSources());

        /// <summary>
        /// Gets or sets the search provider
        /// </summary>
        public static ISearchProvider SearchProvider
            => ServiceLocator.GetService<ISearchProvider>();

        /// <summary>
        /// Indicates whether search functionality is enabled
        /// </summary>
        public static bool SearchEnabled => SearchProvider != null;

        /// <summary>
        /// Executes a search query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static async Task<SearchResult> SearchConsoleAsync(
            SearchQuery query)
        {
            if (!SearchEnabled)
            {
                return SearchResult.Empty;
            }

            return await SearchProvider.SearchAsync(query);
        }

        internal static void AddDefaultSearchDocumentSourceProviders(this IServiceCollection services)
        {
            services.AddSingleton<ISearchDocumentSourceProvider>(new BuiltInTypesDocumentSourceProvider());
            services.AddSingleton<ISearchDocumentSourceProvider>(new DataTypesDocumentSourceProvider());
        }
    }
}
