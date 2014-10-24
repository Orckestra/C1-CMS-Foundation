using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;



namespace Composite.C1Console.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Security.Plugins.LoginProviderConfiguration";

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

        private const string _maxLoginAttempts = "maxLoginAttempts";
        [ConfigurationProperty(_maxLoginAttempts, IsRequired = false, DefaultValue = int.MaxValue)]
        public int MaxLoginAttempts
        {
            get { return (int)base[_maxLoginAttempts]; }
            set { base[_maxLoginAttempts] = value; }
        }
    }
}
