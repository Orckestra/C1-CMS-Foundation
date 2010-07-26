using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.EventSystem;


namespace Composite.Data.Foundation
{
    internal static class DataFacadeQueryableCache
    {
        private static Dictionary<Type, Type> _listTypeCache = new Dictionary<Type, Type>();
        private static Dictionary<Type, MethodInfo> _addRangeToListMethodInfoCache = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, MethodInfo> _toListMethodInfo = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, MethodInfo> _asQueryableMethodInfo = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, Dictionary<Type, MethodInfo>> _dataFacadeQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
        private static Dictionary<Type, MethodInfo> _dataFacadeQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();

        private static Dictionary<Type, MethodInfo> _createQueryMethodInfo = new Dictionary<Type, MethodInfo>();
        private static MethodInfo _baseCreateQueryMethod;
        private static object _lock = new object();



        static DataFacadeQueryableCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);

            _baseCreateQueryMethod =
                (from method in typeof(IQueryProvider).GetMethods()
                 where method.Name == "CreateQuery" && method.GetGenericArguments().Length > 0
                 select method).First();
        }



        public static Type GetListType(Type type)
        {
            Type listType;

            lock (_lock)
            {
                if (_listTypeCache.TryGetValue(type, out listType) == false)
                {
                    listType = typeof(List<>);
                    listType = listType.MakeGenericType(new Type[] { type });

                    _listTypeCache.Add(type, listType);
                }
            }

            return listType;
        }



        public static MethodInfo GetAddRangeToListMethodInfo(Type type)
        {
            MethodInfo addRangeToListMethodInfo;

            lock (_lock)
            {
                if (_addRangeToListMethodInfoCache.TryGetValue(type, out addRangeToListMethodInfo) == false)
                {
                    Type listType = GetListType(type);

                    addRangeToListMethodInfo = listType.GetMethod("AddRange");

                    _addRangeToListMethodInfoCache.Add(type, addRangeToListMethodInfo);
                }
            }

            return addRangeToListMethodInfo;
        }



        public static MethodInfo GetToListMethodInfo(Type type)
        {
            MethodInfo toListMethodInfo;

            lock (_lock)
            {
                if (_toListMethodInfo.TryGetValue(type, out toListMethodInfo) == false)
                {
                    toListMethodInfo = typeof(Enumerable).GetMethod("ToList");
                    toListMethodInfo = toListMethodInfo.MakeGenericMethod(new Type[] { type });

                    _toListMethodInfo.Add(type, toListMethodInfo);
                }
            }

            return toListMethodInfo;
        }



        public static MethodInfo GetAsQueryableMethodInfo(Type type)
        {
            MethodInfo asQueryableMethodInfo;

            lock (_lock)
            {

                if (_asQueryableMethodInfo.TryGetValue(type, out asQueryableMethodInfo) == false)
                {
                    asQueryableMethodInfo = typeof(Queryable).GetMethods().Where(m => m.Name == "AsQueryable" && m.IsGenericMethod == true).First();
                    asQueryableMethodInfo = asQueryableMethodInfo.MakeGenericMethod(new Type[] { type });

                    _asQueryableMethodInfo.Add(type, asQueryableMethodInfo);
                }
            }

            return asQueryableMethodInfo;
        }



        public static MethodInfo GetDataFacadeQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            Dictionary<Type, MethodInfo> methodInfoes;
            MethodInfo methodInfo;

            lock (_lock)
            {

                if (_dataFacadeQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes) == false)
                {
                    methodInfoes = new Dictionary<Type, MethodInfo>();

                    _dataFacadeQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
                }

                if (methodInfoes.TryGetValue(expressionType, out methodInfo) == false)
                {
                    Type type = typeof(DataFacadeQueryable<>).MakeGenericType(new Type[] { genericType });

                    methodInfo =
                        (from method in type.GetMethods()
                         where method.Name == "Execute" &&
                               method.IsGenericMethod == true
                         select method).First();

                    methodInfo = methodInfo.MakeGenericMethod(new Type[] { expressionType });

                    methodInfoes.Add(expressionType, methodInfo);
                }
            }

            return methodInfo;
        }



        public static MethodInfo GetDataFacadeQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            lock (_lock)
            {

                if (_dataFacadeQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo) == false)
                {
                    Type type = typeof(DataFacadeQueryable<>).MakeGenericType(new Type[] { genericType });

                    methodInfo =
                        (from method in type.GetMethods()
                         where method.Name == "GetEnumerator"
                         select method).First();

                    _dataFacadeQueryableGetEnumeratorMethodInfoCache.Add(genericType, methodInfo);
                }
            }

            return methodInfo;
        }



        public static MethodInfo GetCreateQueryMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            lock (_lock)
            {
                if (_createQueryMethodInfo.TryGetValue(genericType, out methodInfo) == false)
                {
                    methodInfo = _baseCreateQueryMethod.MakeGenericMethod(genericType);

                    _createQueryMethodInfo.Add(genericType, methodInfo);
                }
            }

            return methodInfo;
        }



        private static void Flush()
        {
            lock (_lock)
            {

                _listTypeCache = new Dictionary<Type, Type>();
                _addRangeToListMethodInfoCache = new Dictionary<Type, MethodInfo>();
                _toListMethodInfo = new Dictionary<Type, MethodInfo>();
                _asQueryableMethodInfo = new Dictionary<Type, MethodInfo>();
                _dataFacadeQueryableExecuteMethodInfoCache = new Dictionary<Type, Dictionary<Type, MethodInfo>>();
                _dataFacadeQueryableGetEnumeratorMethodInfoCache = new Dictionary<Type, MethodInfo>();
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
