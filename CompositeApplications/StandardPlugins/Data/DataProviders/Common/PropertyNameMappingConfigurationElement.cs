using System.Configuration;


namespace Composite.StandardPlugins.Data.DataProviders.Common
{
    public sealed class PropertyNameMappingConfigurationElement : ConfigurationElement
    {
        private const string _propertyNamePropertyName = "propertyName";
        [ConfigurationProperty(_propertyNamePropertyName, IsRequired=true)]
        public string PropertyName
        {
            get { return (string)base[_propertyNamePropertyName]; }
            set { base[_propertyNamePropertyName] = value; }
        }


        private const string _sourcePropertyNamePropertyName = "sourcePropertyName";
        [ConfigurationProperty(_sourcePropertyNamePropertyName, IsRequired=true)]
        public string SourcePropertyName
        {
            get { return (string)base[_sourcePropertyNamePropertyName]; }
            set { base[_sourcePropertyNamePropertyName] = value; }
        }
    }
}
