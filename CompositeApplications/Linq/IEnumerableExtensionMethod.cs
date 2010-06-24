using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Linq
{
    public static class IEnumerableExtensionMethod
    {
        public static IEnumerable<T> ConcatOrDefault<T>(this IEnumerable<T> enumerable, IEnumerable<T> enumerableToAppend)
        {
            if (enumerable == null) return enumerableToAppend;

            return enumerable.Concat(enumerableToAppend);
        }
    }
}
