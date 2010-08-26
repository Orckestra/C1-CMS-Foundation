using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginSessionStore.Runtime
{
    internal class LoginSessionStoreDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            if (null == configSource) throw new ArgumentNullException("configSource");

            if (null != name)
            {
                return name;
            }
            else
            {
                LoginSessionStoreSettings settings = configSource.GetSection(LoginSessionStoreSettings.SectionName) as LoginSessionStoreSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", LoginSessionStoreSettings.SectionName));
                }

                return settings.DefaultLoginSessionStore;
            }
        }
    }
}
