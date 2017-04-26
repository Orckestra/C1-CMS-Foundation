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
            Type parameterType = type;
            ParameterExpression arg = Expression.Parameter(parameterType, "x");
            Expression expr = arg;
            foreach (string prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ
                PropertyInfo pi = parameterType.GetPropertiesRecursively(f=>f.Name == prop).FirstOrDefault();
                Verify.IsNotNull(pi, "Could not find property '{0}' on type '{1}'", property, type);
                expr = Expression.Property(expr, pi);
                parameterType = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(type, parameterType);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

            object result = typeof(Queryable).GetMethods().Single(
                    method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                    .MakeGenericMethod(type, parameterType)
                    .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable)result;
        }
    }
}
