using System.Globalization;

namespace Composite.Search
{
    /// <summary>
    /// An interface for updating a search index.
    /// </summary>
    public interface ISearchIndexUpdater
    {
        /// <summary>
        /// Rebuilds the index.
        /// </summary>
        void Rebuild();

        /// <summary>
        /// Rebuilds search data for the given data source.
        /// </summary>
        /// <param name="dataSource"></param>
        void Populate(string dataSource);

        /// <summary>
        /// Removes search documents received from the given data source.
        /// </summary>
        /// <param name="dataSource"></param>
        void Remove(string dataSource);

        /// <summary>
        /// Creates a search document collection for the given culture.
        /// </summary>
        /// <param name="cultureInfo"></param>
        void CreateCollection(CultureInfo cultureInfo);
        
        /// <summary>
        /// Drops the document collection created for the given culture.
        /// </summary>
        /// <param name="cultureInfo"></param>
        void DropCollection(CultureInfo cultureInfo);

        /// <summary>
        /// Notifies the search updater that no updates should be processed until a website restart.
        /// </summary>
        void StopProcessingUpdates();
    }
}
