using System;
using System.Configuration;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SimpleNameTypeConfigurationElementCollection : ConfigurationElementCollection
    {
        /// <exclude />
        public void Add(string name, Type type)
        {
            SimpleNameTypeConfigurationElement element = new SimpleNameTypeConfigurationElement();
            element.Name = name;
            element.Type = type;

            BaseAdd(element);
        }


        /// <exclude />
        protected override ConfigurationElement CreateNewElement()
        {            
            return new SimpleNameTypeConfigurationElement();
        }


        /// <exclude />
        protected override object GetElementKey(ConfigurationElement element)
        {
            return (element as SimpleNameTypeConfigurationElement).Name;
        }
    }
}
