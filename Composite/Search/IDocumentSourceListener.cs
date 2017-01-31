using System.Globalization;

namespace Composite.Search
{
    /// <summary>
    /// Listener to the <see cref="Composite.Search.DocumentSources"/> changes.
    /// </summary>
    public interface IDocumentSourceListener
    {
        /// <summary>
        /// Creates a search document.
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <param name="document"></param>
        void Create(CultureInfo cultureInfo, SearchDocument document);

        /// <summary>
        /// Updates the given document in the search collection.
        /// </summary>
        /// <param name="cultureInfo">The culture.</param>
        /// <param name="document"></param>
        void Update(CultureInfo cultureInfo, SearchDocument document);

        /// <summary>
        /// Deletes a search document from collection.
        /// </summary>
        /// <param name="cultureInfo">The culture.</param>
        /// <param name="documentId">The id of the document to be deleted.</param>
        void Delete(CultureInfo cultureInfo, string documentId);

        /// <summary>
        /// Requests rebuilding all of the document for the specified source
        /// </summary>
        /// <param name="cultureInfo">The culture.</param>
        /// <param name="source">The document source name.</param>
        void Rebuild(CultureInfo cultureInfo, string source);
    }
}