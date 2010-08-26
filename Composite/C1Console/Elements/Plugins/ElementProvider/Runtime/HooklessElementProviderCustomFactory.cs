using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementProvider.Runtime
{
    internal sealed class HooklessElementProviderCustomFactory : AssemblerBasedCustomFactory<IHooklessElementProvider, HooklessElementProviderData>
    {
        protected override HooklessElementProviderData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            ElementProviderSettings settings = configurationSource.GetSection(ElementProviderSettings.SectionName) as ElementProviderSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", ElementProviderSettings.SectionName));
            }

            return settings.ElementProviderPlugins.Get(name);
        }
    }
}
