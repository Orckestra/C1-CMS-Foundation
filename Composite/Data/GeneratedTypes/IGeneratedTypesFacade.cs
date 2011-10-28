using System;
using Composite.Data.DynamicTypes;


namespace Composite.Data.GeneratedTypes
{
    internal interface IGeneratedTypesFacade
    {
        void GenerateNewType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush);
        bool CanDeleteType(DataTypeDescriptor dataTypeDescriptor, out string errorMessage);
        void DeleteType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush);
        void UpdateType(UpdateDataTypeDescriptor updateDataTypeDescriptor);
    }
}
