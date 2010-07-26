using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Security.Plugins.LoginProvider;



namespace Composite.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Security.Plugins.LoginProviderConfiguration";

        private const string _loginProvidersProperty = "LoginProviderPlugins";               
        [ConfigurationProperty(_loginProvidersProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<LoginProviderData, LoginProviderData> LoginProviderPlugins
        {
            get
            {
                return (NameTypeConfigurationElementCollection<LoginProviderData, LoginProviderData>)base[_loginProvidersProperty];
            }
        }

        private const string _defaultLoginProviderPluginProperty = "defaultLoginProviderPlugin";
        [ConfigurationProperty(_defaultLoginProviderPluginProperty, IsRequired = true)]
        public string DefaultLoginProviderPlugin
        {
            get { return (string)base[_defaultLoginProviderPluginProperty]; }
            set { base[_defaultLoginProviderPluginProperty] = value; }
        }        
    }
}
