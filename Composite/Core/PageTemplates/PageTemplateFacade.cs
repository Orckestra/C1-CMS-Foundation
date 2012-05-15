using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.PageTemplates.Foundation.PluginFacade;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Facade for accessing page templates
    /// </summary>
    public static class PageTemplateFacade
    {
        /// <summary>
        /// Gets the page templates.
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<PageTemplate> GetPageTemplates()
        {
            var result = new List<PageTemplate>();

            foreach (string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);

                var templates = provider.GetPageTemplates();

                result.AddRange(templates);
            }

            return result;
        }

        /// <summary>
        /// Builds the page renderer.
        /// </summary>
        /// <param name="pageTemplateId">The page template id.</param>
        /// <returns></returns>
        public static IPageRenderer BuildPageRenderer(Guid pageTemplateId)
        {
            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(pageTemplateId);

            return provider.BuildPageRenderer();
        }

        /// <summary>
        /// Gets the page template.
        /// </summary>
        /// <param name="pageTemplateId">The page template id.</param>
        /// <returns></returns>
        public static PageTemplate GetPageTemplate(Guid pageTemplateId)
        {
            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(pageTemplateId);

            if(provider == null)
            {
                return null;
            }

            return provider.GetPageTemplates().FirstOrDefault(t => t.Id == pageTemplateId);
        }
    }
}
