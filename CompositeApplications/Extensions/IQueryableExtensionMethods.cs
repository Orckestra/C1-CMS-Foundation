using System;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.Foundation;

namespace Composite.Extensions
{
	public static class IQueryableExtensionMethods
	{
	    private static readonly MethodInfo _miQueryableAny =
	        (from methodInfo in typeof (Queryable).GetMethods(BindingFlags.Static | BindingFlags.Public)
	         where methodInfo.Name == "Any" && methodInfo.GetParameters().Length == 1
	         select methodInfo).First();

        public static IQueryable<T> Random<T>(this IQueryable<T> source) where T : class, IData
        {
            Verify.ArgumentNotNull(source, "source");

            return source.OrderBy(element => Guid.NewGuid());
        }

        public static IQueryable<T> TakeRandom<T>(this IQueryable<T> source, int elementsToTake) where T : class, IData
        {
            return source.Random().Take(elementsToTake);
        }

        public static bool IsEnumerableQuery<T>(this IQueryable<T> query)
        {
            if(query == null) return false;

            if(query is DataFacadeQueryable<T>)
            {
                return (query as DataFacadeQueryable<T>).IsEnumerableQuery;
            }

            return query.GetType().GetGenericTypeDefinition().FullName.StartsWith("System.Linq.EnumerableQuery");
        }

        public static bool Any(this IQueryable queryable)
        {
            var type = queryable.GetType();
            if(type.IsGenericType)
            {
                var genericArguments = type.GetGenericArguments();

                if(genericArguments.Length == 1)
                {
                    var queryType = typeof (IQueryable<>).MakeGenericType(genericArguments);
                    if(queryType.IsAssignableFrom(type))
                    {
                        MethodInfo genericAnyMethod = _miQueryableAny.MakeGenericMethod(genericArguments);
                        return (bool)genericAnyMethod.Invoke(null, new object[] { queryable });
                    }
                }
            }
            
            foreach(object element in queryable)
            {
                return true;
            }
            return false;
        }

        #region Obsolete

        //public static IQueryable<T> TakeRandom<T>(this IQueryable<T> source, int elementsToTake) where T : class, IData
        //{
        //    Verify.ArgumentCondition(elementsToTake > 0 && elementsToTake <= 25, "elementsToTake",
        //                             "Value should be between 1 and 25.");

        //    int totalElementCount = source.Count();

        //    if (totalElementCount == 0)
        //    {
        //        return new T[0].AsQueryable();
        //    }

        //    if (totalElementCount < elementsToTake)
        //    {
        //        elementsToTake = totalElementCount;
        //    }


        //    var subqueries = new IQueryable<T>[elementsToTake];

        //    int position = 0;
        //    foreach (int nextIndex in GetUniqueRandomSequence(0, totalElementCount - 1, elementsToTake))
        //    {
        //        subqueries[position++] = source.Skip(nextIndex).Take(1);
        //    }

        //    // Merging subqueries into a binary tree
        //    int queryCount = elementsToTake;
        //    while (queryCount > 1)
        //    {
        //        for (int i = 0; i < (queryCount + 1) / 2; i++)
        //        {
        //            subqueries[i] = (i * 2 < queryCount - 1)
        //                                ? subqueries[i * 2].Concat(subqueries[i * 2 + 1])
        //                                : subqueries[i * 2];
        //        }
        //        queryCount = (queryCount + 1) / 2;
        //    }

        //    return subqueries[0];
        //}

        //private static IEnumerable<int> GetUniqueRandomSequence(int minValue, int maxValue, int count)
        //{
        //    int range = maxValue - minValue + 1;

        //    if (count > range) throw new InvalidOperationException("'count' exceed number of possible unique random values");

        //    var random = new Random();

        //    if((double)count / range >= 0.3)
        //    {
        //        var values = new int[range];
        //        for(int i=0; i<range; i++) values[i] = i;

        //        int valuesLeft = range;
        //        for (int i = 0; i < count; i++) 
        //        {
        //            int index = random.Next(0, valuesLeft);
        //            yield return minValue + values[index];

        //            if (index < valuesLeft - 1)
        //            {
        //                values[index] = values[valuesLeft - 1];
        //            }

        //            valuesLeft--;
        //        }
        //        yield break;
        //    }
            
        //    // Another algoritm to get the values
        //    List<int> usedNumbers = new List<int>(count);
        //    while (usedNumbers.Count < count)
        //    {
        //        int randomInt = random.Next(minValue, maxValue);
        //        if (usedNumbers.Contains(randomInt) == false)
        //        {
        //            usedNumbers.Add(randomInt);
        //            yield return randomInt;
        //        }
        //    }
        //}

        #endregion Obsolete
    }
}
