using System.Threading.Tasks;

namespace Composite.Search
{
    /// <summary>
    /// A search provider.
    /// </summary>
    public interface ISearchProvider
    {
        /// <summary>
        /// Executes the given search query asynchronously.
        /// </summary>
        /// <param name="query">The search query.</param>
        /// <returns></returns>
        Task<SearchResult> SearchAsync(SearchQuery query);
    }
}
