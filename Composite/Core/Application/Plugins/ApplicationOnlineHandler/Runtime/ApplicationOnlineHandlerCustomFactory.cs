using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Application.Plugins.ApplicationOnlineHandler.Runtime
{
    internal sealed class ApplicationOnlineHandlerCustomFactory : AssemblerBasedCustomFactory<IApplicationOnlineHandler, ApplicationOnlineHandlerData>
	{
        protected override ApplicationOnlineHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ApplicationOnlineHandlerSettings settings = configurationSource.GetSection(ApplicationOnlineHandlerSettings.SectionName) as ApplicationOnlineHandlerSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ApplicationOnlineHandlerSettings.SectionName));
            }

            return settings.ApplicationOnlineHandlerPlugins.Get(name);
        }
	}
}
