using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.GeneratedTypes
{
    /// <summary>
    /// This class handles the caching of code generated data interface.
    /// It also through <see cref="InterfaceCodeGenerator"/> generated data interfaces,
    /// that does not exist.    
    /// </summary>
    internal static class InterfaceCodeManager
    {
        private static readonly object _lock = new object();

        /// <summary>
        /// This method will return type given by the dataTypeDescriptor.
        /// If the data type does not exist, one will be dynamically
        /// runtime code generated.
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <param name="forceReCompilation">If this is true a new type will be compiled regardless if one already exists.</param>
        /// <returns></returns>
        public static Type GetType(DataTypeDescriptor dataTypeDescriptor, bool forceReCompilation = false)
        {
            bool codeGenerationNeeded;

            Type type = TryGetType(dataTypeDescriptor, forceReCompilation, out codeGenerationNeeded);
            if (type != null)
            {
                return type;
            }

            if (codeGenerationNeeded)
            {
                lock (_lock)
                {
                    type = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());
                    if (type != null) return type;

                    var codeGenerationBuilder = new CodeGenerationBuilder("DataInterface: " + dataTypeDescriptor.Name);
                    InterfaceCodeGenerator.AddAssemblyReferences(codeGenerationBuilder, dataTypeDescriptor);
                    InterfaceCodeGenerator.AddInterfaceTypeCode(codeGenerationBuilder, dataTypeDescriptor);

                    IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                    return types.Single();
                }
            }

            return null;
        }

        internal static Type TryGetType(DataTypeDescriptor dataTypeDescriptor, bool forceReCompilation, out bool codeGenerationNeeded)
        {
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");
            codeGenerationNeeded = false;

            Type type;

            if (!forceReCompilation)
            {
                type = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());
                if (type != null) return type;

                if (!dataTypeDescriptor.IsCodeGenerated)
                {
                    type = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                    if (type != null) return type;
                }
            }

            if (!dataTypeDescriptor.IsCodeGenerated)
            {
                return null;
            }

            if (forceReCompilation)
            {
                type = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());
                if (type != null) return type;
            }

            codeGenerationNeeded = true;
            return null;
        }
    }
}
