using System.Configuration;
using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Application.Plugins.ApplicationOnlineHandler.Runtime
{
    public sealed class ApplicationOnlineHandlerSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.Application.Plugins.ApplicationOnlineHandlerConfiguration";


        private const string _defaultApplicationOnlineHandlerProviderProperty = "defaultApplicationOnlineHandler";
        [ConfigurationProperty(_defaultApplicationOnlineHandlerProviderProperty, IsRequired = true)]
        public string DefaultApplicationOnlineHandler
        {
            get { return (string)base[_defaultApplicationOnlineHandlerProviderProperty]; }
            set { base[_defaultApplicationOnlineHandlerProviderProperty] = value; }
        }



        private const string _applicationOnlineHandlerPluginsProperty = "ApplicationOnlineHandlerPlugins";
        [ConfigurationProperty(_applicationOnlineHandlerPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ApplicationOnlineHandlerData> ApplicationOnlineHandlerPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ApplicationOnlineHandlerData>)base[_applicationOnlineHandlerPluginsProperty];
            }
        }
	}
}
