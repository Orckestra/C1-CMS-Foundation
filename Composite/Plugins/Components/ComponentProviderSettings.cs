using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Components
{
    internal class ComponentProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Plugins.Components.ComponentProviderConfiguration";

        private const string ComponentProvidersProperty = "ComponentProviders";
        [ConfigurationProperty(ComponentProvidersProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<ComponentProviderData, ComponentProviderData>
            ComponentProviders => (NameTypeConfigurationElementCollection<ComponentProviderData, ComponentProviderData>)base[ComponentProvidersProperty];

        internal static ComponentProviderData GetProviderPath(string name)
        {
            var settings = ConfigurationServices.ConfigurationSource.GetSection(ComponentProviderSettings.SectionName)
                               as ComponentProviderSettings;

            return settings?.ComponentProviders.FirstOrDefault(provider => provider.Name.Equals(name));
        }
    }

    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    internal class ComponentProviderData : NameTypeConfigurationElement
    {
        [ConfigurationProperty("directory", IsRequired = false, DefaultValue = "~/App_Data/Components")]
        public string Directory
        {
            get { return (string)base["directory"]; }
            set { base["directory"] = value; }
        }

        [ConfigurationProperty("fileSearchPattern", IsRequired = false, DefaultValue = "*.xml")]
        public string FileSearchPattern
        {
            get { return (string)base["fileSearchPattern"]; }
            set { base["fileSearchPattern"] = value; }
        }

        [ConfigurationProperty("topDirectoryOnly", IsRequired = false, DefaultValue = false)]
        public bool TopDirectoryOnly
        {
            get { return (bool)base["topDirectoryOnly"]; }
            set { base["topDirectoryOnly"] = value; }
        }
    }
}
