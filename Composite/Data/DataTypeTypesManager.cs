using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
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
            var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(dataTypeId);
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



        public static void AddNewAssembly(Assembly assembly)
        {
            AddNewAssembly(assembly, true);
        }

        /// <summary>
        /// Call this method whan a new assembly is load/added into the app domain.
        /// </summary>
        /// <param name="assembly"></param>
        /// <param name="logTypeLoadErrors"></param>
        public static void AddNewAssembly(Assembly assembly, bool logTypeLoadErrors)
        {
            if (!AssemblyFacade.AssemblyPotentiallyUsesType(assembly, typeof (IData)))
            {
                return;
            }

            try
            {
                var types = assembly.GetTypes();

                _LoadedDataTypes.AddRange(types.Where(typeof(IData).IsAssignableFrom));
            }
            catch (ReflectionTypeLoadException exception)
            {
                if (logTypeLoadErrors)
                {
                    var exceptionToLog = exception.LoaderExceptions != null ? exception.LoaderExceptions.First() : exception;

                    Log.LogError(LogTitle, new Exception($"Failed to load assembly '{assembly.FullName}'", exceptionToLog));
                }
            }
        }



        internal static bool IsAllowedDataTypeAssembly(Type dataType)
        {
            string assemblyPath = dataType.Assembly.Location;

            if (assemblyPath.StartsWith(CodeGenerationManager.TempAssemblyFolderPath, StringComparison.InvariantCultureIgnoreCase)) return true;
            if (assemblyPath.StartsWith(CodeGenerationManager.BinFolder, StringComparison.InvariantCultureIgnoreCase)) return true;

            string assemblyFileName = Path.GetFileName(assemblyPath);
            bool locatedInBinFolder = C1Directory.GetFiles(CodeGenerationManager.BinFolder).Any(f => Path.GetFileName(f).Equals(assemblyFileName, StringComparison.InvariantCultureIgnoreCase));
            if (locatedInBinFolder) return true;


            return false;
        }

        internal static Dictionary<Guid, Type> GetDataTypes(IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptors)
        {
            var result = new Dictionary<Guid, Type>();
            var toCompile = new List<DataTypeDescriptor>();

            foreach (var dataTypeDescriptor in dataTypeDescriptors)
            {
                string typeFullName = dataTypeDescriptor.GetFullInterfaceName();
                Type type = _LoadedDataTypes.FirstOrDefault(f => f.FullName == typeFullName);
                if (type == null)
                {
                    bool compilationNeeded;
                    type = InterfaceCodeManager.TryGetType(dataTypeDescriptor, false, out compilationNeeded);

                    if (compilationNeeded)
                    {
                        toCompile.Add(dataTypeDescriptor);
                    }
                }

                result[dataTypeDescriptor.DataTypeId] = type;
            }

            if (toCompile.Any())
            {
                var codeGenerationBuilder = new CodeGenerationBuilder("DataTypeTypesManager:compiling missing interfaces");

                foreach (var dataTypeDescriptor in toCompile)
                {
                    InterfaceCodeGenerator.AddAssemblyReferences(codeGenerationBuilder, dataTypeDescriptor);
                    InterfaceCodeGenerator.AddInterfaceTypeCode(codeGenerationBuilder, dataTypeDescriptor);
                }

                var types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);
                var typesMap = types.ToDictionary(type => type.FullName);

                foreach (var dataTypeDescriptor in toCompile)
                {
                    var type = typesMap[dataTypeDescriptor.GetFullInterfaceName()];
                    result[dataTypeDescriptor.DataTypeId] = type;
                }
            }

            return result;
        }
    }
}
