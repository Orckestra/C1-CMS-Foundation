using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
    public sealed class Property
    {
        public string Name { get; internal set; }
        public string MappedName { get; internal set; }
        public Type Type { get; internal set; }
        public bool ReadOnly { get; internal set; }
        public List<Type> BeforeSetHandlerTypes { get; internal set; }
        public int DecimalPrecision { get; internal set; } // For System.Decimal class

        public bool IsInterface
        {
            get { return (PropertyType & PropertyList.PropertyType.Interface) != 0; }
        }

        public bool IsDataId
        {
            get { return (PropertyType & PropertyList.PropertyType.DataId) != 0; }
        }

        internal PropertyList.PropertyType PropertyType { get; set; }

        internal void AddPropertyType(PropertyList.PropertyType propertyType)
        {
            PropertyType |= propertyType;
        }        
    }
}
