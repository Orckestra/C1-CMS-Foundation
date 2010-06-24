using System.Configuration;

using Composite.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Functions.Plugins.XslExtensionsProvider.Runtime
{
    public sealed class XslExtensionsProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Functions.Plugins.XslExtensionsProviderConfiguration";

        private const string _dataProviderPluginsProperty = "XslExtensionProviders";
        [ConfigurationProperty(_dataProviderPluginsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<XslExtensionsProviderData> XslExtensionProviders
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<XslExtensionsProviderData>)base[_dataProviderPluginsProperty];
            }
        }
    }
}