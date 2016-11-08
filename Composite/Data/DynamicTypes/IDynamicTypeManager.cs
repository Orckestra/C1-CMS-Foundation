using System;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IDynamicTypeManager
	{
        /// <exclude />
        DataTypeDescriptor BuildNewDataTypeDescriptor(Type typeToDescript);

        /// <exclude />
        bool TryGetDataTypeDescriptor(Guid immutableTypeId, out DataTypeDescriptor dataTypeDescriptor);

        /// <exclude />
        void UpdateDataTypeDescriptor(DataTypeDescriptor dataTypeDescriptor, bool flushTheSystem);

        /// <exclude />
        void CreateStores(string providerName, IReadOnlyCollection<DataTypeDescriptor> typeDescriptor, bool doFlush);

        /// <exclude />
        void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool makeAFlush);

        /// <exclude />
        void DropStore(string providerName, DataTypeDescriptor typeDescriptor, bool makeAFlush);

        /// <exclude />
        void AddLocale(string providerName, CultureInfo cultureInfo);

        /// <exclude />
        void RemoveLocale(string providerName, CultureInfo cultureInfo);
	}
}
