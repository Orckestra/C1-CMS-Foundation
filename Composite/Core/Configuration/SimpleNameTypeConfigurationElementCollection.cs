using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class SimpleNameTypeConfigurationElementCollection : ConfigurationElementCollection, IEnumerable<SimpleNameTypeConfigurationElement>
    {
        /// <exclude />
        public void Add(string name, Type type)
        {
            var element = new SimpleNameTypeConfigurationElement();
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

        IEnumerator<SimpleNameTypeConfigurationElement> IEnumerable<SimpleNameTypeConfigurationElement>.GetEnumerator()
        {
            return this.OfType<SimpleNameTypeConfigurationElement>().GetEnumerator();
        }
    }
}
