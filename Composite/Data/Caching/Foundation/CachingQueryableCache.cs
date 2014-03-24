using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;


namespace Composite.Data.Caching.Foundation
{
    internal static class CachingQueryableCache
    {
        private static readonly ConcurrentDictionary<Type, MethodInfo> _getEnumeratorMethodInfoCache = new ConcurrentDictionary<Type, MethodInfo>();
        private static readonly ConcurrentDictionary<Type, Type> _queryableTypeCache = new ConcurrentDictionary<Type, Type>();
        private static readonly ConcurrentDictionary<Type, ConcurrentDictionary<Type, MethodInfo>> _executeMethodInfoCache = new ConcurrentDictionary<Type, ConcurrentDictionary<Type, MethodInfo>>();


        static CachingQueryableCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static MethodInfo GetCachingQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            return _getEnumeratorMethodInfoCache.GetOrAdd(genericType, genType =>
            {
                Type type = typeof (CachingQueryable<>).MakeGenericType(new[] {genType});

                return type.GetMethods().First(method => method.Name == "GetEnumerator");
            });
        }



        public static Type GetCachingQueryableType(Type elementType)
        {
            return _queryableTypeCache.GetOrAdd(elementType, eType => typeof(CachingQueryable<>).MakeGenericType(new[] { eType }));
        }
        

        public static MethodInfo GetCachingQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            var methodInfos = _executeMethodInfoCache.GetOrAdd(genericType, t => new ConcurrentDictionary<Type, MethodInfo>());

            return methodInfos.GetOrAdd(expressionType, eType =>
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new[] { genericType });

                var genericMethodInfo = type.GetMethods().First(method => method.Name == "Execute" && method.IsGenericMethod);

                return genericMethodInfo.MakeGenericMethod(new[] { eType });
            });
        }


        private static void Flush()
        {
            _getEnumeratorMethodInfoCache.Clear();
            _queryableTypeCache.Clear();
            _executeMethodInfoCache.Clear();
        }
    }
}
