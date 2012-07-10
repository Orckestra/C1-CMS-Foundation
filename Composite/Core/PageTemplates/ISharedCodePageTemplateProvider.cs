using System;
using System.Collections.Generic;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Represents a page template provider with shared code files
    /// </summary>
    public interface ISharedCodePageTemplateProvider: IPageTemplateProvider
    {
        /// <summary>
        /// Gets the list of shared files, those files will be shown in a "Shared code" folder under "Layout/Page Templates"
        /// </summary>
        /// <returns></returns>
        IEnumerable<SharedFile> GetSharedFiles();
    }
}
