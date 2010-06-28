using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

using Composite.Data.DynamicTypes;

namespace Composite.Data.Plugins.DataProvider
{
    internal interface IDynamicDataProvider : IDataProvider
    {
        /// <summary>
        /// This method should return ALL data interface that the provider knows. Including
        /// currently not supported interface due to configuratoion and/or store errors.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Type> GetKnownInterfaces();

        void CreateStore(DataTypeDescriptor typeDescriptor);
        void AlterStore(DataTypeChangeDescriptor changeDescriptor);
        void DropStore(DataTypeDescriptor typeDescriptor);
    }
}
