using System;
using System.Collections.Generic;
using System.Linq;

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
