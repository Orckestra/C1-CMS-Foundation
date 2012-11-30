using System;
using System.Collections.Generic;
using System.Linq;


namespace Composite.Core.Extensions
{
	internal static class IEnumerableExtensionMethods
	{
        public static List<TTarget> ToList<TSource, TTarget>(this IEnumerable<TSource> source, Func<TSource, TTarget> objectCreator)
        {
            if (source == null) throw new ArgumentNullException("source");

            List<TTarget> targetList = new List<TTarget>();
            foreach (TSource sourceElement in source)
            {
                TTarget target = objectCreator(sourceElement);
                targetList.Add(target);
            }

            return targetList;
        }

        public static void ForEach<TSource>(this IEnumerable<TSource> source, Action<TSource> action)
        {
            foreach (TSource element in source)
            {
                action(element);
            }
        }

	    public static IEnumerable<T> ConcatOrDefault<T>(this IEnumerable<T> enumerable, IEnumerable<T> enumerableToAppend)
	    {
	        if (enumerable == null) return enumerableToAppend;
	        if (enumerableToAppend == null) return enumerable;

	        return enumerable.Concat(enumerableToAppend);
	    }
	}
}
