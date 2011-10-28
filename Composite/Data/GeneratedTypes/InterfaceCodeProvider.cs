using System.Reflection;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.GeneratedTypes
{
    internal class InterfaceCodeProvider : ICodeProvider
    {
        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors)
            {
                BuildManagerCompileUnit unit = InterfaceCodeGenerator.GenerateCompilationUnit(dataTypeDescriptor);

                foreach (var type in unit.Types)
                {
                    builder.AddType(type.CodeNamespaceName, type.CodeTypeDeclaration);
                }

                foreach (Assembly assembly in unit.ReferencedAssemblies)
                {
                    builder.AddReference(assembly);
                }
            }
        }
    }
}
