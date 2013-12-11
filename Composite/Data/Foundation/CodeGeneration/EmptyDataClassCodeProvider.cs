using Composite.Core;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
    internal class EmptyDataClassCodeProvider : ICodeProvider
    {
        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.AllDataTypeDescriptors)
            {
                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("EmptyDataClassCodeProvider", "The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor);
                    continue;
                }

                if (string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
                {
                    EmptyDataClassCodeGenerator.AddAssemblyReferences(builder, dataTypeDescriptor);
                    EmptyDataClassCodeGenerator.AddEmptyDataClassTypeCode(builder, dataTypeDescriptor);
                }
            }
        }
    }
}
