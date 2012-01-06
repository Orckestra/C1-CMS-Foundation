using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using Composite.Data.Validation.Validators;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyList
    {
        private Dictionary<string, Property> _properties = new Dictionary<string, Property>();


        /// <exclude />
        public PropertyList(Type interfaceType, Dictionary<string, Type> dataIdProperties, Dictionary<string, string> propertyNameMapping)
        {
            if (null == interfaceType) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("interfaceType does not inherit the interface '{0}'", typeof(IData)));
            if (null == dataIdProperties) throw new ArgumentNullException("dataIdProperties");
            if (null == propertyNameMapping) throw new ArgumentNullException("propertyNameMapping");

            if (propertyNameMapping.Values.Count != propertyNameMapping.Values.Distinct().Count())
            {
                throw new ArgumentException("Duplicates in the property name mapping", "propertyNameMapping");
            }


            AddInterfaceProperties(interfaceType, propertyNameMapping);
            AddDataIdProperties(dataIdProperties, propertyNameMapping);
        }


        /// <exclude />
        public IEnumerable<Property> Properties
        {
            get
            {
                foreach (Property property in _properties.Values)
                {
                    yield return property;
                }
            }
        }


        /// <exclude />
        public IEnumerable<Property> InterfaceProperties
        {
            get
            {
                foreach (Property property in _properties.Values)
                {
                    if (property.IsInterface == true)
                    {
                        yield return property;
                    }
                }
            }
        }


        /// <exclude />
        public IEnumerable<Property> DataIdProperties
        {
            get
            {
                foreach (Property property in _properties.Values)
                {
                    if (property.IsDataId == true)
                    {
                        yield return property;
                    }
                }
            }
        }
      



        private void AddInterfaceProperties(Type interfaceType, Dictionary<string, string> propertyNameMapping)
        {
            foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
            {
                AddPropertyInfo(interfaceType, propertyInfo, propertyNameMapping);
            }


            foreach (Type superInterface in interfaceType.GetInterfaces())
            {
                if ((superInterface != typeof(IData)) &&
                    (typeof(IData).IsAssignableFrom(superInterface) == true))
                {
                    foreach (PropertyInfo propertyInfo in superInterface.GetProperties())
                    {
                        AddPropertyInfo(superInterface, propertyInfo, propertyNameMapping);
                    }
                }
                else if (superInterface != typeof(IData))
                {
                    Core.Logging.LoggingService.LogWarning("PropertyList", string.Format("The interface '{0}' does not inherit '{1}'", superInterface, typeof(IData)));
                }
            }
        }



        private void AddPropertyInfo(Type interfaceType, PropertyInfo propertyInfo, Dictionary<string, string> propertyNameMapping)
        {
            if (_properties.ContainsKey(propertyInfo.Name) == false)
            {
                string mappedName = propertyInfo.Name;
                if (propertyNameMapping.ContainsKey(propertyInfo.Name) == true)
                {
                    mappedName = propertyNameMapping[propertyInfo.Name];
                }


                if (false == propertyInfo.CanRead)
                {
                    throw new ArgumentException(string.Format("The property '{0}' on the interface '{1}' is missing a getter", propertyInfo.Name, interfaceType));
                }

                bool readOnly = false == propertyInfo.CanWrite;

                
                Property property = new Property
                {
                    Name = propertyInfo.Name,
                    MappedName = mappedName,
                    Type = propertyInfo.PropertyType,
                    ReadOnly = readOnly,
                    PropertyType = PropertyType.Interface,
                };

                if(propertyInfo.PropertyType == typeof(Decimal))
                {
                    var attrs = propertyInfo.GetCustomAttributes(typeof (DecimalPrecisionValidatorAttribute), true);
                    if(attrs != null && attrs.Length == 1)
                    {
                        property.DecimalPrecision = (attrs[0] as DecimalPrecisionValidatorAttribute).Digits;
                    }
                }

                _properties.Add(property.Name, property);
            }
            else
            {
                throw new InvalidOperationException(string.Format("Duplicate property names '{0}", propertyInfo.Name));
            }
        }



        private void AddDataIdProperties(Dictionary<string, Type> dataIdProperties, Dictionary<string, string> propertyNameMapping)
        {
            foreach (KeyValuePair<string, Type> kvp in dataIdProperties)
            {
                Property property;
                if (false == _properties.TryGetValue(kvp.Key, out property))
                {
                    string mappedName = kvp.Key;
                    if (propertyNameMapping.ContainsKey(kvp.Key) == true)
                    {
                        mappedName = propertyNameMapping[kvp.Key];
                    }


                    property = new Property
                    {
                        Name = kvp.Key,
                        MappedName = mappedName,
                        Type = kvp.Value,
                        ReadOnly = true,
                        PropertyType = PropertyType.DataId
                    };

                    _properties.Add(property.Name, property);
                }
                else
                {
                    if (kvp.Value != property.Type)
                    {
                        throw new ArgumentException(string.Format("Type mismatch between the interface property and data id property named '{0}'", kvp.Key));
                    }

                    property.AddPropertyType(PropertyType.DataId);
                }
            }
        }
       



        [FlagsAttribute]
        internal enum PropertyType
        {
            Interface = 1,
            DataId = 2,            
        };
    }
}
