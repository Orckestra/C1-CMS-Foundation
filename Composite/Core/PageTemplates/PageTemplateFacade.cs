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
        public static IEnumerable<PageTemplateDescriptor> GetPageTemplates()
        {
            var result = new List<PageTemplateDescriptor>();

            foreach (string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);

                var templates = provider.GetPageTemplates();

                result.AddRange(templates);
            }

            return result;
        }


        /// <summary>
        /// Gets the shared files.
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<string> GetSharedFiles()
        {
            var result = new List<string>();

            foreach (string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);

                var sharedFiles = provider.GetSharedFiles();

                result.AddRange(sharedFiles);
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

            Verify.IsNotNull(provider, "Failed to get page template '{0}'. Check log for possible compilation errors.", pageTemplateId);

            return provider.BuildPageRenderer();
        }

        /// <summary>
        /// Gets the page template.
        /// </summary>
        /// <param name="pageTemplateId">The page template id.</param>
        /// <returns></returns>
        public static PageTemplateDescriptor GetPageTemplate(Guid pageTemplateId)
        {
            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(pageTemplateId);

            if(provider == null)
            {
                return null;
            }

            return provider.GetPageTemplates().FirstOrDefault(t => t.Id == pageTemplateId);
        }

        /// <summary>
        /// Returns <c>true</c> is there's at least one valid page template.
        /// </summary>
        public static bool ValidTemplateExists
        {
            get
            {
                return GetPageTemplates().Any(template => template.IsValid);
            }
        }
    }
}
