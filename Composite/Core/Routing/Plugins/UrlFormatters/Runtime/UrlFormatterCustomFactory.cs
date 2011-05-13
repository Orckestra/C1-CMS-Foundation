using System.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Routing.Plugins.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Routing.Plugins.UrlFormatters.Runtime
{
    internal sealed class UrlFormatterCustomFactory : AssemblerBasedCustomFactory<IUrlFormatter, UrlFormatterData>
    {
        protected override UrlFormatterData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            string section = UrlsConfiguration.SectionName;
            var settings = configurationSource.GetSection(section) as UrlsConfiguration;

            if (null == settings)
            {
                throw new ConfigurationErrorsException("The configuration section '{0}' was not found in the configuration".FormatWith(section));
            }

            return settings.UrlFormatters.Get(name);
        }
    }
}
