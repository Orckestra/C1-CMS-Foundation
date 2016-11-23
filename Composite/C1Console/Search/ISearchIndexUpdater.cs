using System.Globalization;

namespace Composite.C1Console.Search
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
        void Rebuild(string dataSource);

        /// <summary>
        /// Removes data for the given data source.
        /// </summary>
        /// <param name="dataSource"></param>
        void Remove(string dataSource);

        /// <summary>
        /// Drops the index for the given culture.
        /// </summary>
        /// <param name="cultureInfo"></param>
        void Drop(CultureInfo cultureInfo);
    }
}
