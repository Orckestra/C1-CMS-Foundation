using System.Configuration;


namespace Composite.Plugins.Data.DataProviders.Common
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyNameMappingConfigurationElementCollection : ConfigurationElementCollection
    {
        /// <exclude />
        public void Add(string propertyName, string sourcePropertyName)
        {
            PropertyNameMappingConfigurationElement element = new PropertyNameMappingConfigurationElement();
            element.PropertyName = propertyName;
            element.SourcePropertyName = sourcePropertyName;

            BaseAdd(element);
        }


        /// <exclude />
        protected override ConfigurationElement CreateNewElement()
        {                        
            return new PropertyNameMappingConfigurationElement();
        }


        /// <exclude />
        protected override object GetElementKey(ConfigurationElement element)
        {
            return string.Format("{0}{1}", 
                                 ((PropertyNameMappingConfigurationElement)element).PropertyName,
                                 ((PropertyNameMappingConfigurationElement)element).SourcePropertyName);
        }
    }
}
