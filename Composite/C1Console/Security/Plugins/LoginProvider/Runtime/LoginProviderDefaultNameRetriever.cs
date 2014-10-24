using System;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginProvider.Runtime
{
    internal class LoginProviderDefaultNameRetriever : IConfigurationNameMapper
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            if (null == configSource) throw new ArgumentNullException("configSource");

            if (null != name)
            {
                return name;
            }
            
            var settings = configSource.GetSection(LoginProviderSettings.SectionName) as LoginProviderSettings;
                
            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", LoginProviderSettings.SectionName));
            }
                
            return settings.DefaultLoginProviderPlugin;
        }
    }
}
