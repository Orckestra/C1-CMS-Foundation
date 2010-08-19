using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PropertyInitializerDictionaryArgumentValidator
    {
        public static void Validate(Dictionary<string, Type> propertyInitializers)
        {
            foreach (KeyValuePair<string, Type> kvp in propertyInitializers)
            {
                if (string.IsNullOrEmpty(kvp.Key))
                {
                    throw new ArgumentException("Property names may not be null or empty");
                }

                if (null == kvp.Value)
                {
                    throw new ArgumentException(string.Format("The property initializer for '{0}' may not be null", kvp.Key));
                }

                if (false == typeof(IPropertyInitializer).IsAssignableFrom(kvp.Value))
                {
                    throw new ArgumentException(string.Format("The property initializer '{0}' does not implement the interface '{1}'", kvp.Value, typeof(IPropertyInitializer)));
                }

                if (false == kvp.Value.IsVisible)
                {
                    throw new ArgumentException(string.Format("The property initializer type '{0}' has to be visible from other assemblies", kvp.Value));
                }
            }
        }



        public static void ValidateVsPropertyList(Dictionary<string, Type> propertyInitializers, PropertyList propertyList)
        {
            ValidateVsPropertyList(propertyInitializers, propertyList, new List<string>());
        }



        public static void ValidateVsPropertyList(Dictionary<string, Type> propertyInitializers, PropertyList propertyList, List<string> exceptionList)
        {
            foreach (Property property in propertyList.Properties)
            {
                if ((false == property.IsInterface) &&
                    (true == property.IsDataId))
                {
                    if (false == exceptionList.Contains(property.Name))
                    {
                        if (false == propertyInitializers.ContainsKey(property.Name))
                        {
                            throw new ArgumentException(string.Format("A property initializer for the data id property '{0}' is missing. Check the configuration for column name mismatch.", property.Name));
                        }

                        IPropertyInitializer initializer = (IPropertyInitializer) Activator.CreateInstance(propertyInitializers[property.Name]);
                        if (property.Type != initializer.ValueType)
                        {
                            throw new ArgumentException(string.Format("The property initializer for the data id property '{0}' returns values of type '{1}', but the expected type is '{2}'", property.Name, initializer.ValueType, property.Type));
                        }
                    }
                    else
                    {
                        if (true == propertyInitializers.ContainsKey(property.Name))
                        {
                            throw new ArgumentException(string.Format("The property initializer for the data id property '{0}' will never be used", property.Name));
                        }
                    }
                }
            }
        }
    }
}
