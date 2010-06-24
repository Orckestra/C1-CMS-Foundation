using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

using Composite.Security.Plugins.LoginSessionStore;

namespace Composite.Security.Plugins.LoginSessionStore.Runtime
{
    public class LoginSessionStoreSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Security.Plugins.LoginSessionStoreConfiguration";

        private const string _sessionDataProvidersProperty = "LoginSessionStore";        
        [ConfigurationProperty(_sessionDataProvidersProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<LoginSessionStoreData, LoginSessionStoreData> LoginSessionStores
        {
            get
            {
                return (NameTypeConfigurationElementCollection<LoginSessionStoreData, LoginSessionStoreData>)base[_sessionDataProvidersProperty];
            }
        }

        private const string _defaultProviderProperty = "defaultProvider";
        [ConfigurationProperty(_defaultProviderProperty, IsRequired = true)]
        public string DefaultLoginSessionStore
        {
            get{ return (string)base[_defaultProviderProperty];}
            set { base[_defaultProviderProperty] = value; }
        }                
    }
}
