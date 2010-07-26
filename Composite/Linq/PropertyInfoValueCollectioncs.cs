using System;
using System.Collections.Generic;
using System.Reflection;


namespace Composite.Linq
{
    internal sealed class PropertyInfoValueCollection
    {
        private Dictionary<PropertyInfo, object> _propertyValues = new Dictionary<PropertyInfo, object>();


        public void AddPropertyValue(PropertyInfo propertyInfo, object value)
        {
            if (propertyInfo == null) throw new ArgumentNullException("propertyInfo");
            // allow null values

            if (_propertyValues.ContainsKey(propertyInfo) == true) throw new ArgumentException(string.Format("The property name '{0}' has already been added", propertyInfo.Name));

            _propertyValues.Add(propertyInfo, value);
        }



        public IEnumerable<KeyValuePair<PropertyInfo, object>> PropertyValues
        {
            get
            {
                foreach (KeyValuePair<PropertyInfo, object> kvp in _propertyValues)
                {
                    yield return kvp;
                }
            }
        }



        public PropertyInfoValueCollection Clone()
        {
            PropertyInfoValueCollection propertyInfoValueCollection = new PropertyInfoValueCollection();

            foreach (var kvp in this.PropertyValues)
            {
                propertyInfoValueCollection.AddPropertyValue(kvp.Key, kvp.Value);
            }

            return propertyInfoValueCollection;
        }
    }
}
