using System.Configuration;

using Composite.Security.Plugins.LoginSessionStore;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.LoginSessionStore.Runtime
{
    internal class LoginSessionStoreCustomFactory : AssemblerBasedCustomFactory<ILoginSessionStore, LoginSessionStoreData>
    {
        protected override LoginSessionStoreData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            LoginSessionStoreSettings settings = (LoginSessionStoreSettings)configurationSource.GetSection(LoginSessionStoreSettings.SectionName);

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", LoginSessionStoreSettings.SectionName));
            }

            return settings.LoginSessionStores.Get(name);
        }
    }
}
