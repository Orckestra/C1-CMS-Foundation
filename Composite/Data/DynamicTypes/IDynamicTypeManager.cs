using System;
using System.Globalization;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IDynamicTypeManager
	{
        DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript);
        bool TryGetDataTypeDescriptor(Guid immuteableTypeId, out DataTypeDescriptor dataTypeDescriptor);
        void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem);
        
        void CreateStore(string providerName, DataTypeDescriptor typeDescriptor, bool doFlush);
        void AlterStore(string providerName, DataTypeChangeDescriptor changeDescriptor, bool makeAFlush);
        void DropStore(string providerName, DataTypeDescriptor typeDescriptor, bool makeAFlush);

        void AddLocale(string providerName, CultureInfo cultureInfo, bool doFlush); 
        void RemoveLocale(string providerName, CultureInfo cultureInfo, bool doFlush);
	}
}
