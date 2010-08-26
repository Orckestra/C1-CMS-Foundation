using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Application.Plugins.ApplicationStartupHandler.Runtime
{
    internal sealed class ApplicationStartupHandlerSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Core.Application.Plugins.ApplicationStartupHandlerConfiguration";



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
