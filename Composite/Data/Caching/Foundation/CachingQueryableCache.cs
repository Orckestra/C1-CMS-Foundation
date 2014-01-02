using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;


namespace Composite.Data.Caching.Foundation
{
    internal static class CachingQueryableCache
    {
        private static Dictionary<Type, MethodInfo> _cachingQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, Type> _cachingQueryableTypeCache = new Dictionary<Type, Type>();
        private static Dictionary<Type, Dictionary<Type, MethodInfo>> _cachingQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();


        static CachingQueryableCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static MethodInfo GetCachingQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            if (!_cachingQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo))
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo = type.GetMethods().First(method => method.Name == "GetEnumerator");

                _cachingQueryableGetEnumeratorMethodInfoCache.Add(genericType, methodInfo);
            }

            return methodInfo;
        }



        public static Type GetCachingQueryableType(Type elementType)
        {
            Type type;

            if (!_cachingQueryableTypeCache.TryGetValue(elementType, out type))
            {
                type = typeof(CachingQueryable<>).MakeGenericType(new [] { elementType });

                _cachingQueryableTypeCache.Add(elementType, type);
            }

            return type;
        }



        public static MethodInfo GetCachingQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            Dictionary<Type, MethodInfo> methodInfoes;

            if (!_cachingQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes))
            {
                methodInfoes = new Dictionary<Type, MethodInfo>();

                _cachingQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
            }


            MethodInfo methodInfo;

            if (methodInfoes.TryGetValue(expressionType, out methodInfo) == false)
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new [] { genericType });

                methodInfo = type.GetMethods().First(method => method.Name == "Execute" && method.IsGenericMethod);

                methodInfo = methodInfo.MakeGenericMethod(new [] { expressionType });

                methodInfoes.Add(expressionType, methodInfo);
            }

            return methodInfo;
        }



        private static void Flush()
        {
            _cachingQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();
            _cachingQueryableTypeCache = new Dictionary<Type, Type>();
            _cachingQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
        }
    }
}
