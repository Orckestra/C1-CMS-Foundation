using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementActionProvider.Runtime
{
    internal sealed class ElementActionProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.C1Console.Elements.Plugins.ElementActionProviderConfiguration";


        private const string _elementActionProviderPluginsProperty = "ElementActionProviderPlugins";
        [ConfigurationProperty(_elementActionProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ElementActionProviderData> ElementActionProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ElementActionProviderData>)base[_elementActionProviderPluginsProperty];
            }
        }
	}
}
