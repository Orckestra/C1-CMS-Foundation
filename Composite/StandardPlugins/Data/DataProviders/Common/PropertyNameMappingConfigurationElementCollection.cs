using System.Configuration;


namespace Composite.StandardPlugins.Data.DataProviders.Common
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyNameMappingConfigurationElementCollection : ConfigurationElementCollection
    {
        public void Add(string propertyName, string sourcePropertyName)
        {
            PropertyNameMappingConfigurationElement element = new PropertyNameMappingConfigurationElement();
            element.PropertyName = propertyName;
            element.SourcePropertyName = sourcePropertyName;

            BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {                        
            return new PropertyNameMappingConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return string.Format("{0}{1}", 
                                 ((PropertyNameMappingConfigurationElement)element).PropertyName,
                                 ((PropertyNameMappingConfigurationElement)element).SourcePropertyName);
        }
    }
}
