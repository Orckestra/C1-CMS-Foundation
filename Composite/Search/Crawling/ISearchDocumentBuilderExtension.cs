using Composite.Data;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// Allows extending the default SearchDocumentBuilder class,
    /// making it possible to index additional new text fragments/field values.
    /// </summary>
    public interface ISearchDocumentBuilderExtension
    {
        /// <summary>
        /// Populates the search document builder with the new data.
        /// </summary>
        /// <param name="searchDocumentBuilder"></param>
        /// <param name="data"></param>
        void Populate(SearchDocumentBuilder searchDocumentBuilder, IData data);
    }
}
