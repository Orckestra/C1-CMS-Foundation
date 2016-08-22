using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
    /// <summary>
    /// This class handles data wrapper types and cashing.
    /// It will through <see cref="DataWrapperCodeGenerator"/> generated
    /// data wrapper class types if needed.
    /// </summary>
    internal static class DataWrapperTypeManager
    {
        private static readonly object _compilationLock = new object();

        private static readonly ConcurrentDictionary<Type, Type> _dataWrappersCache
            = new ConcurrentDictionary<Type, Type>();


        public static Type GetDataWrapperType(Type interfaceType)
        {
            return _dataWrappersCache.GetOrAdd(interfaceType, type =>
            {
                Type wrapperType = TryGetWrapperType(type.FullName);
                if (wrapperType != null) return wrapperType;

                lock (_compilationLock)
                {
                    wrapperType = TryGetWrapperType(type.FullName);
                    if (wrapperType != null) return wrapperType;

                    var codeGenerationBuilder = new CodeGenerationBuilder("DataWrapper:" + type.FullName);

                    DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, type);

                    IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                    return types.Single();
                }
            });
        }



        public static Type GetDataWrapperType(DataTypeDescriptor dataTypeDescriptor)
        {
            Type wrapperType = TryGetWrapperType(dataTypeDescriptor.GetFullInterfaceName());
            if (wrapperType != null) return wrapperType;

            lock (_compilationLock)
            {
                wrapperType = TryGetWrapperType(dataTypeDescriptor.GetFullInterfaceName());
                if (wrapperType != null) return wrapperType;

                var codeGenerationBuilder = new CodeGenerationBuilder("DataWrapper:" + dataTypeDescriptor.GetFullInterfaceName());

                DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);

                IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                return types.Single();
            }
        }



        /// <summary>
        /// Returns a wrapper type, if it already exists.
        /// </summary>
        public static Type TryGetWrapperType(string fullName)
        {
            string dataWrapperFullName = DataWrapperCodeGenerator.CreateWrapperClassFullName(fullName);

            Type wrapperType = TypeManager.TryGetType(dataWrapperFullName);

            return wrapperType;
        }
    }
}
