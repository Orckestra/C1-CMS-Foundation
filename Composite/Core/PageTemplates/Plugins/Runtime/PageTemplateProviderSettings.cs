using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Configuration;

namespace Composite.Core.PageTemplates.Plugins.Runtime
{
    internal class PageTemplateProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Core.PageTemplates.Plugins.PageTemplateProviderConfiguration";

        private const string _pageTemplateProvidersProperty = "PageTemplateProviders";
        [ConfigurationProperty(_pageTemplateProvidersProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<PageTemplateProviderData, PageTemplateProviderData> PageTemplateProviders
        {
            get
            {
                return (NameTypeConfigurationElementCollection<PageTemplateProviderData, PageTemplateProviderData>)base[_pageTemplateProvidersProperty];
            }
        }
    }
}
