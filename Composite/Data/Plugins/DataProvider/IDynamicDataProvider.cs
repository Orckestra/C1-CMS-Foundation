using System;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDynamicDataProvider : IDataProvider
    {
        /// <summary>
        /// This method should return ALL data interface that the provider knows. Including
        /// currently not supported interface due to configuratoion and/or store errors.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Type> GetKnownInterfaces();

        /// <exclude />
        void CreateStores(IReadOnlyCollection<DataTypeDescriptor> typeDescriptor);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateDataTypeDescriptor"></param>
        /// <param name="forceCompile">If this is true and the provider uses dynamic compilations. It should compile its helper regardless.</param>
        void AlterStore(UpdateDataTypeDescriptor updateDataTypeDescriptor, bool forceCompile);

        /// <exclude />
        void DropStore(DataTypeDescriptor typeDescriptor);
    }
}
