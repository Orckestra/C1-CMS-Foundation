using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.WebClient.State.Runtime
{
    internal sealed class SessionStateProviderCustomFactory : AssemblerBasedCustomFactory<ISessionStateProvider, SessionStateProviderData>
    {
        protected override SessionStateProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            SessionStateProviderSettings settings = configurationSource.GetSection(SessionStateProviderSettings.SectionName) as SessionStateProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", SessionStateProviderSettings.SectionName));
            }

            return settings.Providers.Get(name);
        }
    }
}
