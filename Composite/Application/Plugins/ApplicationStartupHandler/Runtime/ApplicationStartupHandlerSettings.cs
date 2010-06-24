using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Application.Plugins.ApplicationStartupHandler.Runtime
{
    public sealed class ApplicationStartupHandlerSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Application.Plugins.ApplicationStartupHandlerConfiguration";



        private const string _applicationStartupPluginPluginsProperty = "ApplicationStartupHandlerPlugins";
        [ConfigurationProperty(_applicationStartupPluginPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ApplicationStartupHandlerData> ApplicationStartupHandlerPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ApplicationStartupHandlerData>)base[_applicationStartupPluginPluginsProperty];
            }
        }
	}
}
