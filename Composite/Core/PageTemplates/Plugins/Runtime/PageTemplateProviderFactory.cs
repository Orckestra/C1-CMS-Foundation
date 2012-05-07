using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core.Configuration;

namespace Composite.Core.PageTemplates.Plugins.Runtime
{
    internal class PageTemplateProviderFactory:  NameTypeFactoryBase<IPageTemplateProvider>
    {
        public PageTemplateProviderFactory()            
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
