using Composite.Core;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
    internal class DataWrapperClassCodeProvider : ICodeProvider
    {
        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            foreach (DataTypeDescriptor dataTypeDescriptor in DataMetaDataFacade.AllDataTypeDescriptors)
            {
                if (!dataTypeDescriptor.ValidateRuntimeType())
                {
                    Log.LogError("DataWrapperClassCodeProvider", string.Format("The non code generated interface type '{0}' was not found, skipping code generation for that type", dataTypeDescriptor));
                    continue;
                }

                DataWrapperCodeGenerator.AddDataWrapperClassCode(builder, dataTypeDescriptor);
            }
        }
    }
}
