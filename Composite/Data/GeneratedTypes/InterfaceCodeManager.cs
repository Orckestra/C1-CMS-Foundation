using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor");

            if (!forceReCompilation)
            {
                Type type = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());
                if (type != null) return type;
            }

#warning MRJ: BM: Refacture this one
            BuildManagerCompileUnit unit = InterfaceCodeGenerator.GenerateCompilationUnit(dataTypeDescriptor);

            CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("DataInterface: " + dataTypeDescriptor.Name);

            foreach (var t in unit.Types)
            {
                codeGenerationBuilder.AddType(t.CodeNamespaceName, t.CodeTypeDeclaration);
            }

            foreach (Assembly assembly in unit.ReferencedAssemblies)
            {
                codeGenerationBuilder.AddReference(assembly);
            }

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

            return types.Single();
        }
    }
}
