using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.Core.PageTemplates.Plugins.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Defines page template provider
    /// </summary>
    [CustomFactory(typeof(PageTemplateProviderCustomFactory))]
    public interface IPageTemplateProvider
    {
        /// <summary>
        /// Gets the page template descriptors.
        /// </summary>
        /// <returns></returns>
        IEnumerable<PageTemplate> GetPageTemplates();

        /// <summary>
        /// Factory that give Composite C1 a IPageLayouter capable of rendering a Composite C1 page with the specified layout ID.
        /// The factory will be called for each individual page rendering 
        /// </summary>
        /// <returns></returns>
        IPageRenderer BuildPageRenderer();

        /// <summary>
        /// Adds element actions on "Page templates" element
        /// </summary>
        IEnumerable<ElementAction> GetRootActions();

        /// <summary>
        /// Gets the list of shared files, those files will be shown in a "Shared code" folder under "Layout/Page Templates"
        /// </summary>
        /// <returns></returns>
        IEnumerable<string> GetSharedFiles();

        /// <summary>
        /// Flushes the list of templates
        /// </summary>
        void Flush();
    }
}
