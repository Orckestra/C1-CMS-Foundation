using System.Collections.Generic;
using System.Linq;

namespace Composite.Core.Linq
{
    internal static class IEnumerableExtensionMethod
    {
        public static IEnumerable<T> ConcatOrDefault<T>(this IEnumerable<T> enumerable, IEnumerable<T> enumerableToAppend)
        {
            if (enumerable == null) return enumerableToAppend;
            if (enumerableToAppend == null) return enumerable;

            return enumerable.Concat(enumerableToAppend);
        }
    }
}
