using System;
using System.Collections.Generic;


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
	}
}
