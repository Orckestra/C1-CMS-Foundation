using System.Configuration;

using Composite.C1Console.Security.Plugins.LoginProvider;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderCustomFactory : AssemblerBasedCustomFactory<ILoginProvider, LoginProviderData>
    {
        protected override LoginProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            LoginProviderSettings settings = (LoginProviderSettings)configurationSource.GetSection(LoginProviderSettings.SectionName);

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", LoginProviderSettings.SectionName));
            }

            return settings.LoginProviderPlugins.Get(name);
        }
    }
}
