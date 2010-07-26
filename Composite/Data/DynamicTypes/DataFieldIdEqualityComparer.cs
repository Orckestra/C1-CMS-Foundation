using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Composite.Data.DynamicTypes
{
    internal sealed class DataFieldIdEqualityComparer : EqualityComparer<DataFieldDescriptor>
    {
        public override bool Equals(DataFieldDescriptor x, DataFieldDescriptor y)
        {
            return x.Id.Equals(y.Id); 
        }

        public override int GetHashCode(DataFieldDescriptor obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}
