using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Types;
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
        private static readonly string LogTitle = typeof(DataTypeTypesManager).Name;
        private static List<Type> _LoadedDataTypes = new List<Type>();


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
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");

            Type loadedDataType = _LoadedDataTypes.FirstOrDefault(f => f.FullName == dataTypeDescriptor.GetFullInterfaceName());
            if (loadedDataType != null) return loadedDataType;

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



        /// <summary>
        /// Call this method whan a new assembly is load/added into the app domain.
        /// 
        /// </summary>
        /// <param name="assembly"></param>
        public static void AddNewAssembly(Assembly assembly)
        {
            try
            {
                foreach (Type type in assembly.GetTypes())
                {
                    if (typeof(IData).IsAssignableFrom(type))
                    {
                        _LoadedDataTypes.Add(type);
                    }
                }
            }
            catch (ReflectionTypeLoadException exception)
            {
                if (exception.LoaderExceptions != null)
                {
                    Log.LogError(LogTitle, new Exception("Failed to load assebmly '{0}'".FormatWith(assembly.FullName), exception.LoaderExceptions.First()));
                }
                else
                {
                    Log.LogError(LogTitle, new Exception("Failed to load assebmly '{0}'".FormatWith(assembly.FullName), exception));
                }
            }
        }



        internal static bool IsAllowedDataTypeAssembly(Type dataType)
        {
            string assemblyPath = dataType.Assembly.Location;

            if (assemblyPath.StartsWith(CodeGenerationManager.TempAssemblyFolderPath, StringComparison.InvariantCultureIgnoreCase)) return true;
            if (assemblyPath.StartsWith(CodeGenerationManager.BinFolder, StringComparison.InvariantCultureIgnoreCase)) return true;

            string assemblyFileName = Path.GetFileName(assemblyPath);
            bool locatedInBinFolder = C1Directory.GetFiles(CodeGenerationManager.BinFolder).Where(f => Path.GetFileName(f).Equals(assemblyFileName, StringComparison.InvariantCultureIgnoreCase)).Any();
            if (locatedInBinFolder) return true;


            return false;
        }
    }
}
