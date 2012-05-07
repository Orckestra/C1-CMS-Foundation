using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;

namespace Composite.Core.PageTemplates.Foundation
{
    internal static class PageTemplateProviderRegistry
    {
        private static readonly IPageTemplateProviderRegistry _registry = new PageTemplateProviderRegistryImpl();

        static PageTemplateProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        public static IEnumerable<string> ProviderNames
        {
            get
            {
                return _registry.ProviderNames;
            }
        }

        public static IEnumerable<PageTemplateDescriptor> PageTemplates
        {
            get
            {
                return _registry.PageTemplates;
            }
        }

        public static IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId)
        {
            return _registry.GetProviderByTemplateId(pageTemplateId);
        }

        public static void Flush()
        {
            _registry.Flush();
        }
    }
}
