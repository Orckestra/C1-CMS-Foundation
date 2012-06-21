using System;
using System.Collections.Generic;

namespace Composite.Core.PageTemplates.Foundation
{
    internal interface IPageTemplateProviderRegistry
    {
        void Flush();
        void FlushTemplates();

        IEnumerable<string> ProviderNames { get; }
        IEnumerable<PageTemplateDescriptor> PageTemplates { get; }

        IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId);

    }
}
