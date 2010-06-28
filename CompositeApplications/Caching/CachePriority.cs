using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Caching
{
    internal enum CachePriority
    {
        Undefined = 0,
        WeakReference = 1,
        Low = 2,
        Default = 3,
        High = 4,
        NeverExpires = 5
    }
}
