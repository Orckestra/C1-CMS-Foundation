using System;
using System.Collections.Generic;
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
        IEnumerable<PageTemplateDescriptor> GetPageTemplateDescriptors();

        /// <summary>
        /// Factory that give Composite C1 a IPageLayouter capable of rendering a Composite C1 page with the specified layout ID.
        /// The factory will be called for each individual page rendering 
        /// </summary>
        /// <param name="pageLayoutId">Id ot the page layout, this Id must belong to the provider</param>
        /// <returns></returns>
        IPageRenderer BuildPageRenderer();
    }
}
