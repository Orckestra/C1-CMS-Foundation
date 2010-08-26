using System;
using System.Collections.ObjectModel;
using Composite.Data.Types;

namespace Composite.Data
{
    /// <summary>
    /// Provides access to pages, page structure and placeholder's content 
    /// </summary>
    public interface IPageManager
    {
        /// <summary>
        /// Gets a page by id.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <returns></returns>
        IPage GetPageById(Guid pageId);

        /// <summary>
        /// Gets the parent id.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <returns></returns>
        Guid GetParentId(Guid pageId);

        /// <summary>
        /// Gets a number that represents position of the page in the list of children of its parent.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        int GetLocalOrdering(Guid pageId);

        /// <summary>
        /// Gets a list of children id-s.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId);

        /// <summary>
        /// Gets the content of the placeholders.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId);
    }
}
