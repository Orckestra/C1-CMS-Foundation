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
                InterfaceCodeGenerator.AddAssemblyReferences(builder, dataTypeDescriptor);
                InterfaceCodeGenerator.AddInterfaceTypeCode(builder, dataTypeDescriptor);                
            }
        }
    }
}
