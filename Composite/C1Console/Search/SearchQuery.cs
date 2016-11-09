using System.Globalization;

namespace Composite.C1Console.Search
{
    /// <summary>
    /// A search query.
    /// </summary>
    public sealed class SearchQuery
    {
        /// <summary>
        /// Constructs a search query.
        /// </summary>
        public SearchQuery()
        {
            MaxDocumentsNumber = 100;
        }

        /// <summary>
        /// The culture in which the search is performed
        /// </summary>
        public CultureInfo CultureInfo { get; set; }

        /// <summary>
        /// The query text
        /// </summary>
        public string Query { get; set; }

        /// <exclude />
        public int MaxDocumentsNumber;
    }
}
