using System;
using System.Collections.Generic;

namespace Composite.Core.PageTemplates.Foundation
{
    internal interface IPageTemplateProviderRegistry
    {
        void Flush();

        IEnumerable<string> ProviderNames { get; }
        IEnumerable<PageTemplateDescriptor> PageTemplates { get; }

        IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId);

    }
}
