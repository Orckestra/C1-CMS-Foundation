using System;
using System.Collections.Generic;
using Composite.C1Console.Events;

namespace Composite.Core.PageTemplates.Foundation
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageTemplateProviderRegistry
    {
        private static readonly IPageTemplateProviderRegistry _registry = new PageTemplateProviderRegistryImpl();

        static PageTemplateProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        /// <exclude />
        public static IEnumerable<string> ProviderNames
        {
            get
            {
                return _registry.ProviderNames;
            }
        }

        /// <exclude />
        public static IEnumerable<PageTemplateDescriptor> PageTemplates
        {
            get
            {
                return _registry.PageTemplates;
            }
        }

        /// <exclude />
        public static IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId)
        {
            return _registry.GetProviderByTemplateId(pageTemplateId);
        }

        /// <summary>
        /// Flushes list of registered page templates
        /// </summary>
        public static void Flush()
        {
            _registry.Flush();
        }
    }
}
