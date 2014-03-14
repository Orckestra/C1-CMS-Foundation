using System;
using Composite.Data.Types;

namespace Composite.Core.Routing.Plugins.PageUrlsProviders
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Obsolete]
    public interface IPageUrlBuilder
    {
        /// <summary>
        /// Gets url information for a page
        /// </summary>
        /// <param name="page">A page</param>
        /// <param name="parentPageId">Id of parent page, to be used for optimization purposes</param>
        /// <returns></returns>
        PageUrlSet BuildUrlSet(IPage page, Guid parentPageId);
    }
}
