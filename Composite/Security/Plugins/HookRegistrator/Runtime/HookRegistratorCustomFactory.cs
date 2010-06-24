using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.HookRegistrator.Runtime
{
    internal sealed class HookRegistratorCustomFactory : AssemblerBasedCustomFactory<IHookRegistrator, HookRegistratorData>
    {
        protected override HookRegistratorData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            HookRegistratorSettings settings = configurationSource.GetSection(HookRegistratorSettings.SectionName) as HookRegistratorSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", HookRegistratorSettings.SectionName));
            }

            return settings.HookRegistratorPlugins.Get(name);
        }
    }
}
