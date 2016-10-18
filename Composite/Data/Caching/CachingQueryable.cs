using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using Composite.Core.Types;
using Composite.Data.Caching.Foundation;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Data.Foundation;


namespace Composite.Data.Caching
{
    internal sealed class CachingEnumerable<T> : IEnumerable<T>
    {
        private readonly IEnumerable<T> _enumerable;

        public CachingEnumerable(IEnumerable<T> enumerable)
        {
            _enumerable = enumerable;
        }


        public IEnumerator<T> GetEnumerator()
        {
            return new CachingEnumerator<T>(_enumerable.GetEnumerator());
        }


        IEnumerator IEnumerable.GetEnumerator()
        {
            return new CachingEnumerator<T>(_enumerable.GetEnumerator());
        }
    }

    internal interface ICachedQuery
    {
        IQueryable GetOriginalQuery();
    }

    /// <summary>
    /// Used for optimizing execution of GetDataByUniqueKey method
    /// </summary>
    internal interface CachingQueryable_CachedByKey
    {
        IData GetCachedValueByKey(object key);
        IEnumerable<IData> GetCachedVersionValuesByKey(object key);
    }


    internal sealed class CachingQueryable<T> : ICachedQuery, IOrderedQueryable<T>, IQueryProvider, ICachingQueryable, CachingQueryable_CachedByKey
    {
        private readonly IQueryable _source;
        private readonly Expression _currentExpression;
        private readonly CachingEnumerable<T> _wrappedEnumerable;
        private readonly Func<IQueryable> _getQueryFunc;

        private volatile DataCachingFacade.CachedTable _cachedTable;
        private static readonly MethodInfo _wrappingMethodInfo;
        private static readonly MethodInfo _listWrappingMethodInfo;

        private IEnumerable<T> _innerEnumerable;

        static CachingQueryable()
        {
            if (typeof(IData).IsAssignableFrom(typeof(T)))
            {
                _wrappingMethodInfo = StaticReflection.GetGenericMethodInfo(a => DataWrappingFacade.Wrap((IData) a))
                                                      .MakeGenericMethod(new[] {typeof (T)});
            }
            if (typeof(IData).IsAssignableFrom(typeof(T)))
            {
                _listWrappingMethodInfo = StaticReflection.GetGenericMethodInfo(a => WrapData((IEnumerable<IData>)a))
                                                      .MakeGenericMethod(typeof(T));
            }
        }

        private static IEnumerable<TData> WrapData<TData>(IEnumerable<TData> input) where TData : class, IData
        {
            return input.Select(DataWrappingFacade.Wrap<TData>);
        }

        public CachingQueryable(DataCachingFacade.CachedTable cachedTable, Func<IQueryable> originalQueryGetter)
        {
            _cachedTable = cachedTable;

            _source = cachedTable.Queryable;
            _currentExpression = Expression.Constant(this);
            _getQueryFunc = originalQueryGetter;

            if (_source is IEnumerable<T>)
            {
                _innerEnumerable = _source as IEnumerable<T>;
                if(_innerEnumerable is CachingEnumerable<T>)
                {
                    _wrappedEnumerable = _innerEnumerable as CachingEnumerable<T>;
                }
            }
        }


        public CachingQueryable(IQueryable source, Expression currentExpression, Func<IQueryable> originalQueryGetter)
        {
            _source = source;
            _currentExpression = currentExpression;
            _getQueryFunc = originalQueryGetter;
        }



        #region Generic methods

        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            return new CachingQueryable<S>(_source, expression, _getQueryFunc);
        }

        public IEnumerator<T> GetEnumerator()
        {
            var enumerable = BuildEnumerable();

            if (_wrappedEnumerable != null)
            {
                return _wrappedEnumerable.GetEnumerator();
            }

            var enumerator = enumerable.GetEnumerator();

            if (_source.ElementType == typeof(T))
            {
                return new CachingEnumerator<T>(enumerator);
            }
            return enumerator;
        }


        private IEnumerable<T> BuildEnumerable()
        {
            if (_innerEnumerable == null) {
                lock (this) {
                    if (_innerEnumerable == null) {
                        var visitor = new ChangeSourceExpressionVisitor();

                        Expression newExpression = visitor.Visit(_currentExpression);

                        var result = (IQueryable<T>)_source.Provider.CreateQuery(newExpression);

                        Verify.IsNotNull(result, "Failed to create an enumerator");

                        Thread.MemoryBarrier();
                        _innerEnumerable = result;
                    }
                }
            }

            return _innerEnumerable;
        }

        public S Execute<S>(Expression expression)
        {
            var visitor = new ChangeSourceExpressionVisitor();

            Expression newExpression = visitor.Visit(expression);

            object result = _source.Provider.Execute(newExpression);

            if (result != null && _source.ElementType == typeof(S))
            {
                result = (S) _wrappingMethodInfo.Invoke(null, new [] { result });
            }
            return (S) result;
        }

        #endregion

        #region Non generic methods

        IEnumerator IEnumerable.GetEnumerator()
        {
            MethodInfo methodInfo = CachingQueryableCache.GetCachingQueryableGetEnumeratorMethodInfo(typeof(T));

            return (IEnumerator)methodInfo.Invoke(this, null);
        }



        public IQueryable CreateQuery(Expression expression)
        {
            if (_currentExpression == expression) return this;

            Type elementType = TypeHelpers.FindElementType(expression);

            Type queryableType = CachingQueryableCache.GetCachingQueryableType(elementType);

            return (IQueryable)Activator.CreateInstance(
                queryableType,
                new object[] { _source, expression, _getQueryFunc });
        }



        public object Execute(Expression expression)
        {
            MethodInfo methodInfo = CachingQueryableCache.GetCachingQueryableExecuteMethodInfo(typeof(T), expression.Type);

            return methodInfo.Invoke(this, new object[] { expression });
        }

        #endregion


        public IData GetCachedValueByKey(object key)
        {
            var filteredData = GetFromCacheFiltered(key);
            if (filteredData == null) return null;

            var result = filteredData.FirstOrDefault();
            if (result == null) return null;

            return _wrappingMethodInfo.Invoke(null, new object[] { result }) as IData;
        }


        public IEnumerable<IData> GetCachedVersionValuesByKey(object key)
        {
            var result = GetFromCacheFiltered(key);
            if (result == null) return Enumerable.Empty<IData>();

            return _listWrappingMethodInfo.Invoke(null, new object[] { result }) as IEnumerable<IData>;
        }


        private IEnumerable<T> GetFromCacheFiltered(object key)
        {
            var cachedTable = GetRowsByKeyTable();
            IEnumerable<IData> cachedRows;

            if (!cachedTable.TryGetValue(key, out cachedRows))
            {
                return null;
            }

            IEnumerable<T> filteredData = cachedRows.Cast<T>();

            var filterMethodInfo = StaticReflection.GetGenericMethodInfo(
                    () => ((DataInterceptor)null).InterceptGetData((IEnumerable<IData>)null))
                    .MakeGenericMethod(typeof(T));

            foreach (var dataInterceptor in DataFacade.GetDataInterceptors(typeof(T)))
            {
                filteredData = (IEnumerable<T>)filterMethodInfo.Invoke(dataInterceptor, new object[] { filteredData });
            }

            return filteredData;
        }


        Dictionary<object, IEnumerable<IData>> GetRowsByKeyTable()
        {
            var cachedTable = GetCachedTable();

            var result = cachedTable.RowsByKey;
            if (result != null)
            {
                return result;
            }

            lock (cachedTable)
            {
                result = cachedTable.RowsByKey;
                if (result != null)
                {
                    return result;
                }

                PropertyInfo keyPropertyInfo = typeof(T).GetKeyProperties().Single();

                result = BuildEnumerable()
                    .GroupBy(data => keyPropertyInfo.GetValue(data, null))
                    .ToDictionary(group => group.Key, group => group.ToArray() as IEnumerable<IData>);

                return cachedTable.RowsByKey = result;
            }
        }


        private DataCachingFacade.CachedTable GetCachedTable()
        {
            if (_cachedTable == null)
            {
                lock (this)
                {
                    if (_cachedTable == null)
                    {
                        _cachedTable = new DataCachingFacade.CachedTable(GetOriginalQuery());
                    }
                }
            }

            return _cachedTable;
        }


        public Expression Expression => _currentExpression;

        public Type ElementType => typeof(T);

        public IQueryProvider Provider => this;

        public IQueryable Source => _source;

        public IQueryable GetOriginalQuery() => _getQueryFunc();
    }
}
