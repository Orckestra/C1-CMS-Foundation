using System;
using System.Collections.Generic;
using Composite.Data.Types;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Describe the page and content desired to be rendered.
    /// </summary>
    public class PageContentToRender
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PageContentToRender"/> class.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="contents">The contents.</param>
        /// <param name="isPreview">if set to <c>true</c> the page should be rendered in preview mode.</param>
        public PageContentToRender(IPage page, IEnumerable<IPagePlaceholderContent> contents, bool isPreview)
        {
            this.Page = page;
            this.Contents = contents;
            this.IsPreview = isPreview;
        }

        /// <summary>
        /// The page to be rendered 
        /// </summary>
        public IPage Page { get; private set; }

        /// <summary>
        /// Determines whether page is rendered in a preview mode
        /// </summary>
        public bool IsPreview { get; private set; }

        /// <summary>
        /// Page placeholders' content
        /// </summary>
        public IEnumerable<IPagePlaceholderContent> Contents { get; private set; }
    }
}
