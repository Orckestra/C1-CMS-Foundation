using System;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class RazorPageTemplateProviderAssembler : IAssembler<IPageTemplateProvider, PageTemplateProviderData>
    {
        public IPageTemplateProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, PageTemplateProviderData objectConfiguration, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as RazorPageTemplateProviderData;
            if (data == null)
            {
                throw new ArgumentException("Expected configuration to be of type " + typeof(RazorPageTemplateProviderData).Name, 
                                            "objectConfiguration");
            }

            return new RazorPageTemplateProvider(data.Name, data.Directory);
        }
    }
}
