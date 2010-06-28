using System.Configuration;

using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Security.Plugins.HookRegistrator.Runtime
{
    internal sealed class HookRegistratorSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Security.Plugins.HookRegistratorConfiguration";


        private const string _hookRegistratorPluginsProperty = "HookRegistratorPlugins";
        [ConfigurationProperty(_hookRegistratorPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<HookRegistratorData> HookRegistratorPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<HookRegistratorData>)base[_hookRegistratorPluginsProperty];
            }
        }
    }
}
