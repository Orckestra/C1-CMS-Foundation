using System;
using System.Configuration;


namespace Composite.Configuration
{
    public sealed class SimpleNameTypeConfigurationElementCollection : ConfigurationElementCollection
    {
        public void Add(string name, Type type)
        {
            SimpleNameTypeConfigurationElement element = new SimpleNameTypeConfigurationElement();
            element.Name = name;
            element.Type = type;

            BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {            
            return new SimpleNameTypeConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return (element as SimpleNameTypeConfigurationElement).Name;
        }
    }
}
