using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationStartupHandler.Runtime
{
    internal sealed class ApplicationStartupHandlerCustomFactory : AssemblerBasedCustomFactory<IApplicationStartupHandler, ApplicationStartupHandlerData>
	{
        protected override ApplicationStartupHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ApplicationStartupHandlerSettings settings = configurationSource.GetSection(ApplicationStartupHandlerSettings.SectionName) as ApplicationStartupHandlerSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ApplicationStartupHandlerSettings.SectionName));
            }

            return settings.ApplicationStartupHandlerPlugins.Get(name);
        }
	}
}
