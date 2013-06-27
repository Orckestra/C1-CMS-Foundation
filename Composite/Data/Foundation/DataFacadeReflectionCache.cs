using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;


namespace Composite.Data.Foundation
{
    internal static class DataFacadeReflectionCache
    {
        private static Hashtable<Type, Type> _listTypeCache = new Hashtable<Type, Type>();
        private static Hashtable<Type, MethodInfo> _addRangeToListMethodInfoCache = new Hashtable<Type, MethodInfo>();
        private static Hashtable<Type, MethodInfo> _toListMethodInfo = new Hashtable<Type, MethodInfo>();
        private static Hashtable<Type, MethodInfo> _asQueryableMethodInfo = new Hashtable<Type, MethodInfo>();
        private static Hashtable<Type, Hashtable<Type, MethodInfo>> _dataFacadeQueryableExecuteMethodInfoCache = new Hashtable<Type, Hashtable<Type, MethodInfo>>();
        private static Hashtable<Type, MethodInfo> _dataFacadeQueryableGetEnumeratorMethodInfoCache = new Hashtable<Type, MethodInfo>();
        private static Hashtable<Type, MethodInfo> _createQueryMethodInfo = new Hashtable<Type, MethodInfo>();

        private static readonly MethodInfo IQueryProvider_CreateQuery;
        private static readonly MethodInfo Queryable_AsQueryable;
        private static readonly object _lock = new object();


        static DataFacadeReflectionCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());

            IQueryProvider_CreateQuery = typeof (IQueryProvider).GetMethods().First(m => m.Name == "CreateQuery" && m.IsGenericMethod);
            Queryable_AsQueryable = typeof (Queryable).GetMethods().First(m => m.Name == "AsQueryable" && m.IsGenericMethod);
        }


        private static Type List_GetType(Type type)
        {
            Type listType;

            if (!_listTypeCache.TryGetValue(type, out listType))
            {
                lock (_lock)
                {
                    if (!_listTypeCache.TryGetValue(type, out listType))
                    {
                        listType = typeof(List<>);
                        listType = listType.MakeGenericType(new Type[] { type });

                        _listTypeCache.Add(type, listType);
                    }
                }
            }

            return listType;
        }


        /// <summary>
        /// Creates a new instance of List &lt;<paramref name="type"/>&gt;
        /// </summary>
        public static IList List_New(Type type)
        {
            var listType = List_GetType(type);

            return Activator.CreateInstance(listType) as IList;
        }


        public static MethodInfo List_AddRangeMethodInfo(Type type)
        {
            MethodInfo addRangeToListMethodInfo;

            if (!_addRangeToListMethodInfoCache.TryGetValue(type, out addRangeToListMethodInfo))
            {
                lock (_lock)
                {
                    if (!_addRangeToListMethodInfoCache.TryGetValue(type, out addRangeToListMethodInfo))
                    {
                        Type listType = List_GetType(type);

                        addRangeToListMethodInfo = listType.GetMethod("AddRange");

                        _addRangeToListMethodInfoCache.Add(type, addRangeToListMethodInfo);
                    }
                }
            }

            return addRangeToListMethodInfo;
        }



        public static MethodInfo Enumerable_ToList(Type type)
        {
            MethodInfo toListMethodInfo;

            if (!_toListMethodInfo.TryGetValue(type, out toListMethodInfo))
            {
                lock (_lock)
                {
                    if (!_toListMethodInfo.TryGetValue(type, out toListMethodInfo))
                    {
                        toListMethodInfo = typeof (Enumerable).GetMethod("ToList");
                        toListMethodInfo = toListMethodInfo.MakeGenericMethod(new Type[] {type});

                        _toListMethodInfo.Add(type, toListMethodInfo);
                    }
                }
            }

            return toListMethodInfo;
        }



        public static MethodInfo Queryable_AsQueryableMethodInfo(Type type)
        {
            MethodInfo asQueryableMethodInfo;

            if (!_asQueryableMethodInfo.TryGetValue(type, out asQueryableMethodInfo))
            {
                lock (_lock)
                {
                    if (!_asQueryableMethodInfo.TryGetValue(type, out asQueryableMethodInfo))
                    {
                        asQueryableMethodInfo = Queryable_AsQueryable.MakeGenericMethod(new[] { type });

                        _asQueryableMethodInfo.Add(type, asQueryableMethodInfo);
                    }
                }
            }

            return asQueryableMethodInfo;
        }



        public static MethodInfo GetDataFacadeQueryableExecuteMethodInfo(Type genericType, Type expressionType)
        {
            MethodInfo methodInfo;
            Hashtable<Type, MethodInfo> methodInfoes;

            if (!_dataFacadeQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes)
                || !methodInfoes.TryGetValue(expressionType, out methodInfo))
            {
                lock (_lock)
                {
                    if (!_dataFacadeQueryableExecuteMethodInfoCache.TryGetValue(genericType, out methodInfoes))
                    {
                        methodInfoes = new Hashtable<Type, MethodInfo>();

                        _dataFacadeQueryableExecuteMethodInfoCache.Add(genericType, methodInfoes);
                    }

                    if (!methodInfoes.TryGetValue(expressionType, out methodInfo))
                    {
                        Type type = typeof (DataFacadeQueryable<>).MakeGenericType(new Type[] {genericType});

                        methodInfo = type.GetMethods().First(m => m.Name == "Execute" && m.IsGenericMethod);

                        methodInfo = methodInfo.MakeGenericMethod(new Type[] {expressionType});

                        methodInfoes.Add(expressionType, methodInfo);
                    }
                }
            }

            return methodInfo;
        }



        public static MethodInfo GetDataFacadeQueryableGetEnumeratorMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            if (!_dataFacadeQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo))
            {
                lock (_lock)
                {
                    if (!_dataFacadeQueryableGetEnumeratorMethodInfoCache.TryGetValue(genericType, out methodInfo))
                    {
                        Type type = typeof (DataFacadeQueryable<>).MakeGenericType(new Type[] {genericType});

                        methodInfo = type.GetMethods().First(m => m.Name == "GetEnumerator");

                        _dataFacadeQueryableGetEnumeratorMethodInfoCache.Add(genericType, methodInfo);
                    }
                }
            }

            return methodInfo;
        }



        public static MethodInfo GetCreateQueryMethodInfo(Type genericType)
        {
            MethodInfo methodInfo;

            if (!_createQueryMethodInfo.TryGetValue(genericType, out methodInfo))
            {
                lock (_lock)
                {
                    if (!_createQueryMethodInfo.TryGetValue(genericType, out methodInfo))
                    {
                        methodInfo = IQueryProvider_CreateQuery.MakeGenericMethod(genericType);

                        _createQueryMethodInfo.Add(genericType, methodInfo);
                    }
                }
            }

            return methodInfo;
        }


        private static void Flush()
        {
            lock (_lock)
            {
                _listTypeCache = new Hashtable<Type, Type>();
                _addRangeToListMethodInfoCache = new Hashtable<Type, MethodInfo>();
                _toListMethodInfo = new Hashtable<Type, MethodInfo>();
                _asQueryableMethodInfo = new Hashtable<Type, MethodInfo>();
                _dataFacadeQueryableExecuteMethodInfoCache = new Hashtable<Type, Hashtable<Type, MethodInfo>>();
                _dataFacadeQueryableGetEnumeratorMethodInfoCache = new Hashtable<Type, MethodInfo>();
                _createQueryMethodInfo = new Hashtable<Type, MethodInfo>();
            }
        }
    }
}
