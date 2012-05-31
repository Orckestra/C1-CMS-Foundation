using System;
using System.Configuration;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [Assembler(typeof(MasterPagesPageTemplateProviderAssembler))]
    internal class MasterPagesPageTemplateProviderData : PageTemplateProviderData
    {
        [ConfigurationProperty("directory", IsRequired = false, DefaultValue = "~/App_Data/Razor/PageTemplates")]
        public string Directory
        {
            get { return (string)base["directory"]; }
            set { base["directory"] = value; }
        }
    }

    internal class MasterPagesPageTemplateProviderAssembler : IAssembler<IPageTemplateProvider, PageTemplateProviderData>
    {
        public IPageTemplateProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, PageTemplateProviderData objectConfiguration, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as MasterPagesPageTemplateProviderData;
            if (data == null)
            {
                throw new ArgumentException("Expected configuration to be of type " + typeof(MasterPagesPageTemplateProviderAssembler).Name,
                                            "objectConfiguration");
            }

            return new MasterPagesPageTemplateProvider(data.Name, data.Directory);
        }
    }
}
