using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Parallelization.Plugins.Runtime
{
    public sealed class ParallelizationProviderSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Parallelization.Plugins.ParallelizationProviderConfiguration";

        private const string _parallelizationElementName = "Parallelization";
        [ConfigurationProperty(_parallelizationElementName)]
        public ParallelizationConfigurationElement Parallelization
        {
            get { return (ParallelizationConfigurationElement)base[_parallelizationElementName]; }
            set { base[_parallelizationElementName] = value; }
        }
    }

    public sealed class ParallelizationConfigurationElement : ConfigurationElementCollection
    {
        private const string _enabledPropertyName = "enabled";
        [ConfigurationProperty(_enabledPropertyName, DefaultValue = "true")]
        public bool Enabled
        {
            get { return (bool)base[_enabledPropertyName]; }
            set { base[_enabledPropertyName] = value; }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new ParallelizationSettingsElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            var parallelPointSettings = (ParallelizationSettingsElement)element;
            return parallelPointSettings.Name;
        }
    }

    public sealed class ParallelizationSettingsElement : ConfigurationElement
    {
        private const string _namePropertyName = "name";
        [ConfigurationProperty(_namePropertyName)]
        public string Name
        {
            get { return (string)base[_namePropertyName]; }
            set { base[_namePropertyName] = value; }
        }

        private const string _enabledPropertyName = "enabled";
        [ConfigurationProperty(_enabledPropertyName, DefaultValue = "true")]
        public bool Enabled
        {
            get { return (bool)base[_enabledPropertyName]; }
            set { base[_enabledPropertyName] = value; }
        }
    }
}
