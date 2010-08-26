using System.Configuration;

using Composite.Core.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Security.Plugins.HookRegistrator.Runtime
{
    internal sealed class HookRegistratorSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Security.Plugins.HookRegistratorConfiguration";


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
