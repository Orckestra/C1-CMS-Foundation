using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

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
        void CreateStore(DataTypeDescriptor typeDescriptor);

        /// <exclude />
        void AlterStore(DataTypeChangeDescriptor changeDescriptor);

        /// <exclude />
        void DropStore(DataTypeDescriptor typeDescriptor);
    }
}
