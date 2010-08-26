using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime
{
    internal sealed class ElementAttachingProviderSettings : SerializableConfigurationSection
	{
        public const string SectionName = "Composite.C1Console.Elements.Plugins.ElementAttachingProviderConfiguration";


        private const string _elementAttachingProviderPluginsProperty = "ElementAttachingProviderPlugins";
        [ConfigurationProperty(_elementAttachingProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ElementAttachingProviderData> ElementAttachingProviderPlugins
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ElementAttachingProviderData>)base[_elementAttachingProviderPluginsProperty];
            }
        }
	}
}
