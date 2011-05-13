using System.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Routing.Plugins.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Routing.Plugins.PageUrlsProviders.Runtime
{
    internal sealed class PageUrlProviderCustomFactory : AssemblerBasedCustomFactory<IPageUrlProvider, PageUrlProviderData>
    {
        protected override PageUrlProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            string section = UrlsConfiguration.SectionName;
            var settings = configurationSource.GetSection(section) as UrlsConfiguration;

            if (null == settings)
            {
                throw new ConfigurationErrorsException("The configuration section '{0}' was not found in the configuration".FormatWith(section));
            }

            return settings.PageUrlProviders.Get(name);
        }
    }
}
