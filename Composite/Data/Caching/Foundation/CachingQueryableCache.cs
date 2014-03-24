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
        private static readonly ConcurrentDictionary<Tuple<Type, Type>, MethodInfo> _executeMethodInfoCache = new ConcurrentDictionary<Tuple<Type, Type>, MethodInfo>();


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
            return _executeMethodInfoCache.GetOrAdd(new Tuple<Type, Type>(genericType, expressionType), pair =>
            {
                Type type = typeof(CachingQueryable<>).MakeGenericType(new[] { pair.Item1 });

                var genericMethodInfo = type.GetMethods().First(method => method.Name == "Execute" && method.IsGenericMethod);

                return genericMethodInfo.MakeGenericMethod(new[] { pair.Item2 });
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
