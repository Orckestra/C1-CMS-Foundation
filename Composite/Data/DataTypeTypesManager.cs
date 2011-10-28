using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;


namespace Composite.Data
{
    /// <summary>
    /// This class handles data type specific types:
    /// - Getting a data type from dataTypeId or data type descriptor
    /// - Getting a data type empty class from type or data type descriptor
    /// </summary>
    /// <exclude />
    internal static class DataTypeTypesManager
    {
        /// <summary>
        /// Gets the runtime data type for the given data type id.
        /// In case of generated types, this call might result in a interface code compilation.
        /// </summary>
        /// <param name="dataTypeId">The id of the data type.</param>
        /// <returns>Returns the data type. Never null.</returns>
        public static Type GetDataType(Guid dataTypeId)
        {
            DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId);
            if (dataTypeDescriptor == null) throw new InvalidOperationException("No data type exists with the given data type id: " + dataTypeId);

            return GetDataType(dataTypeDescriptor);
        }



        /// <summary>
        /// Gets the runtime data type for the given data type id.
        /// In case of generated types, this call might result in a interface code compilation.
        /// </summary>
        /// <param name="dataTypeDescriptor">
        /// The DataTypeDescriptor for the data type.
        /// </param>
        /// <returns>Returns the data type. Never null.</returns>
        public static Type GetDataType(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor", "dataTypeDescriptor");

#warning MRJ: BM: Rename?
            Type addedtype = _addedTypes.Where(f => f.FullName == dataTypeDescriptor.GetFullInterfaceName()).FirstOrDefault();
            if (addedtype != null) return addedtype;

            Type type = InterfaceCodeManager.GetType(dataTypeDescriptor);

            return type;
        }



        /// <summary>
        /// Gets the runtime empty data type for the given data type.
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="forceReCompilation">
        /// If this is true a new empty class will be 
        /// compiled at runtime regardless if it exists or not.
        /// Use with caution!
        /// </param>
        /// <returns></returns>
        public static Type GetDataTypeEmptyClass(Type dataType, bool forceReCompilation = false)
        {
            return EmptyDataClassTypeManager.GetEmptyDataClassType(dataType, forceReCompilation);
        }



        /// <summary>
        /// Gets the runtime empty data type for the given data type descriptor.
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <returns></returns>
        public static Type GetDataTypeEmptyClass(DataTypeDescriptor dataTypeDescriptor)
        {
            return EmptyDataClassTypeManager.GetEmptyDataClassType(dataTypeDescriptor, false);
        }


#warning MRJ: BM: Rename and cleanup
        private static List<Type> _addedTypes = new List<Type>();

        public static void AddNewAssembly(Assembly assembly)
        {
            foreach(Type type in assembly.GetTypes())
            {
                if (typeof(IData).IsAssignableFrom(type))
                {
                    _addedTypes.Add(type);
                }
            }
        }
    }
}
