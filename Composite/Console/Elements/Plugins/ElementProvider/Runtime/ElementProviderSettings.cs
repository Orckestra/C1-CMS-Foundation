using System.Configuration;

using Composite.Core.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementProvider.Runtime
{
    internal sealed class ElementProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.C1Console.Elements.Plugins.ElementProviderConfiguration";


        private const string _rootProviderNameProperty = "rootProviderName";
        [ConfigurationProperty(_rootProviderNameProperty, IsRequired = true)]
        public string RootProviderName
        {
            get { return (string)base[_rootProviderNameProperty]; }
            set { base[_rootProviderNameProperty] = value; }
        }


        private const string _elementProviderPluginsProperty = "ElementProviderPlugins";
        [ConfigurationProperty(_elementProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<HooklessElementProviderData> ElementProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<HooklessElementProviderData>)base[_elementProviderPluginsProperty];
            }
        }
    }
}
