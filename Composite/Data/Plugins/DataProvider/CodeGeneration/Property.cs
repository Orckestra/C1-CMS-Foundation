using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
#warning MRJ: BM: Is this even used any more?
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class Property
    {
        /// <exclude />
        public string Name { get; internal set; }

        /// <exclude />
        public string MappedName { get; internal set; }

        /// <exclude />
        public Type Type { get; internal set; }

        /// <exclude />
        public bool ReadOnly { get; internal set; }

        /// <exclude />
        public List<Type> BeforeSetHandlerTypes { get; internal set; }

        /// <exclude />
        public int DecimalPrecision { get; internal set; } // For System.Decimal class

        /// <exclude />
        public bool IsInterface
        {
            get { return (PropertyType & PropertyList.PropertyType.Interface) != 0; }
        }

        /// <exclude />
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
