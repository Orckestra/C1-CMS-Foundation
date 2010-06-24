using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.EventSystem;
using Composite.Logging;


namespace Composite.Data.Caching.Foundation
{
    internal static class CachingQueryableCache
    {
        private static Dictionary<Type, MethodInfo> _cachingQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, Type> _cachingQueryableTypeCache = new Dictionary<Type, Type>();
        private static Dictionary<Type, Dictionary<Type, MethodInfo>> _cachingQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();


        static CachingQueryableCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static MethodInfo GetCachingQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            if (_cachingQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo) == false)
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo =
                    (from method in type.GetMethods()
                     where method.Name == "GetEnumerator"
                     select method).First();

                _cachingQueryableGetEnumeratorMethodInfoCache.Add(genericType, methodInfo);
            }

            return methodInfo;
        }



        public static Type GetCachingQueryableType(Type elementType)
        {
            Type type;

            if (_cachingQueryableTypeCache.TryGetValue(elementType, out type) == false)
            {
                type = typeof(CachingQueryable<>).MakeGenericType(new Type[] { elementType });

                _cachingQueryableTypeCache.Add(elementType, type);
            }

            return type;
        }



        public static MethodInfo GetCachingQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            Dictionary<Type, MethodInfo> methodInfoes;

            if (_cachingQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes) == false)
            {
                methodInfoes = new Dictionary<Type, MethodInfo>();

                _cachingQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
            }


            MethodInfo methodInfo;

            if (methodInfoes.TryGetValue(expressionType, out methodInfo) == false)
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo =
                    (from method in type.GetMethods()
                     where method.Name == "Execute" &&
                           method.IsGenericMethod == true
                     select method).First();

                methodInfo = methodInfo.MakeGenericMethod(new Type[] { expressionType });

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



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
