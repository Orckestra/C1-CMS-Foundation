using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Core.Extensions;


namespace Composite.Core.PageTemplates.Plugins.Runtime
{
    internal sealed class PageTemplateProviderCustomFactory : AssemblerBasedCustomFactory<IPageTemplateProvider, PageTemplateProviderData>
    {
        protected override PageTemplateProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            string sectionName = PageTemplateProviderSettings.SectionName;

            PageTemplateProviderSettings settings = configurationSource.GetSection(sectionName) as PageTemplateProviderSettings;

            if (settings == null)
            {
                throw new ConfigurationErrorsException("The configuration section '{0}' was not found in the configuration".FormatWith(sectionName));
            }

            return settings.PageTemplateProviders.Get(name);
        }
    }
}
