using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Logging;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    internal static class StoreIdFilterQueryableCache
    {
        private static Dictionary<Type, Dictionary<Type, MethodInfo>> _storeIdFilterQueryableCreateQueryCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
        private static Dictionary<Type, Dictionary<Type, MethodInfo>> _storeIdFilterQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
        private static Dictionary<Type, MethodInfo> _storeIdFilterQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();


        static StoreIdFilterQueryableCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static MethodInfo GetStoreIdFilterQueryableCreateQueryMethodInfo(Type genericType, Type expressionType)
        {
            Dictionary<Type, MethodInfo> methodInfoes;

            if (_storeIdFilterQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes) == false)
            {
                methodInfoes = new Dictionary<Type, MethodInfo>();

                _storeIdFilterQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
            }


            MethodInfo methodInfo;

            if (methodInfoes.TryGetValue(expressionType, out methodInfo) == false)
            {
                Type type = typeof(StoreIdFilterQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo =
                    (from method in type.GetMethods()
                     where method.Name == "CreateQuery" &&
                           method.IsGenericMethod 
                     select method).First();

                methodInfo = methodInfo.MakeGenericMethod(new Type[] { expressionType });

                methodInfoes.Add(expressionType, methodInfo);
            }

            return methodInfo;
        }



        public static MethodInfo GetStoreIdFilterQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            Dictionary<Type, MethodInfo> methodInfoes;

            if (_storeIdFilterQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes) == false)
            {
                methodInfoes = new Dictionary<Type, MethodInfo>();

                _storeIdFilterQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
            }


            MethodInfo methodInfo;

            if (methodInfoes.TryGetValue(expressionType, out methodInfo) == false)
            {
                Type type = typeof(StoreIdFilterQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo =
                    (from method in type.GetMethods()
                     where method.Name == "Execute" &&
                           method.IsGenericMethod 
                     select method).First();

                methodInfo = methodInfo.MakeGenericMethod(new Type[] { expressionType });

                methodInfoes.Add(expressionType, methodInfo);
            }

            return methodInfo;
        }



        public static MethodInfo GetStoreIdFilterQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            if (_storeIdFilterQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo) == false)
            {
                Type type = typeof(StoreIdFilterQueryable<>).MakeGenericType(new Type[] { genericType });

                methodInfo =
                    (from method in type.GetMethods()
                     where method.Name == "GetEnumerator"
                     select method).First();

                _storeIdFilterQueryableGetEnumeratorMethodInfoCache.Add(genericType, methodInfo);
            }

            return methodInfo;
        }



        private static void Flush()
        {
            _storeIdFilterQueryableCreateQueryCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
            _storeIdFilterQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();
            _storeIdFilterQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
