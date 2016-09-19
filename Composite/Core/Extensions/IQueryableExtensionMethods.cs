using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Foundation;

namespace Composite.Core.Extensions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class IQueryableExtensionMethods
	{
	    private static readonly MethodInfo _miQueryableAny =
	        (from methodInfo in typeof (Queryable).GetMethods(BindingFlags.Static | BindingFlags.Public)
	         where methodInfo.Name == "Any" && methodInfo.GetParameters().Length == 1
	         select methodInfo).First();


        /// <exclude />
        public static IQueryable<T> Random<T>(this IQueryable<T> source) where T : class, IData
        {
            Verify.ArgumentNotNull(source, "source");

            return source.OrderBy(element => Guid.NewGuid());
        }


        /// <exclude />
        public static IQueryable<T> TakeRandom<T>(this IQueryable<T> source, int elementsToTake) where T : class, IData
        {
            return source.Random().Take(elementsToTake);
        }


        /// <exclude />
        public static bool IsEnumerableQuery<T>(this IQueryable<T> query)
        {
            if(query == null) return false;

            if(query is DataFacadeQueryable<T>)
            {
                return (query as DataFacadeQueryable<T>).IsEnumerableQuery;
            }

            return query is CachingQueryable<T> || query is EnumerableQuery<T>;
        }


        /// <exclude />
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


        /// <exclude />
        public static IOrderedQueryable OrderBy(this IQueryable source, Type dataType, string property)
        {
            return ApplyOrder(source, dataType, property, "OrderBy");
        }


        /// <exclude />
        public static IOrderedQueryable OrderBy(this IQueryable source, Type dataType, string property, bool descending)
        {
            string methodName = descending ? "OrderByDescending" : "OrderBy";

            return ApplyOrder(source, dataType, property, methodName);
            
        }


        /// <exclude />
        public static IOrderedQueryable OrderByDescending(this IQueryable source, Type dataType, string property)
        {
            return ApplyOrder(source, dataType, property, "OrderByDescending");
        }


        /// <exclude />
        public static IOrderedQueryable ThenBy(this IOrderedQueryable source, Type dataType, string property)
        {
            return ApplyOrder(source, dataType, property, "ThenBy");
        }


        /// <exclude />
        public static IOrderedQueryable ThenBy(this IOrderedQueryable source, Type dataType, string property, bool descending)
        {
            string methodName = descending ? "ThenByDescending" : "ThenBy";

            return ApplyOrder(source, dataType, property, methodName);
        }


        /// <exclude />
        public static IOrderedQueryable ThenByDescending(this IOrderedQueryable source, Type dataType, string property)
        {
            return ApplyOrder(source, dataType, property, "ThenByDescending");
        }



        /// <exclude />
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderBy");
        }


        /// <exclude />
        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderByDescending");
        }


        /// <exclude />
        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenBy");
        }


        /// <exclude />
        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenByDescending");
        }


        /// <exclude />
        private static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            return (IOrderedQueryable<T>)ApplyOrder(source, typeof(T), property, methodName);
        }


        private static IOrderedQueryable ApplyOrder(IQueryable source, Type type, string property, string methodName)
        {
            Verify.IsNotNull(property, "property cannot be null");
            Verify.IsNotNull(type, "type cannot be null");

            string[] props = property.Split('.');
            Type paramenetType = type;
            ParameterExpression arg = Expression.Parameter(paramenetType, "x");
            Expression expr = arg;
            foreach (string prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ
                PropertyInfo pi = paramenetType.GetPropertiesRecursively(f=>f.Name == prop).FirstOrDefault();
                Verify.IsNotNull(pi, "Could not find property '{0}' on type '{1}'", property, type);
                expr = Expression.Property(expr, pi);
                paramenetType = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(type, paramenetType);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

            object result = typeof(Queryable).GetMethods().Single(
                    method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                    .MakeGenericMethod(type, paramenetType)
                    .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable)result;
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
