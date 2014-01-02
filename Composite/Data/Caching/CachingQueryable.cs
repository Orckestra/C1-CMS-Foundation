using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using Composite.Core.Collections.Generic;
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
    }


    internal sealed class CachingQueryable<T> : ICachedQuery, IOrderedQueryable<T>, IQueryProvider, ICachingQueryable, CachingQueryable_CachedByKey
    {
        private readonly IQueryable _source;
        private readonly Expression _currentExpression;
        private readonly CachingEnumerable<T> _wrappedEnumerable;
        private readonly Func<IQueryable> _getQueryFunc;

        private readonly DataCachingFacade.CachedTable _cachedTable;
        private static readonly MethodInfo _wrappingMethodInfo;

        private IEnumerable<T> _innerEnumerable;

        static CachingQueryable()
        {
            if (typeof(IData).IsAssignableFrom(typeof(T)))
            {
                _wrappingMethodInfo = StaticReflection.GetGenericMethodInfo(a => DataWrappingFacade.Wrap((IData) a))
                                                      .MakeGenericMethod(new[] {typeof (T)});
            }
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
            if (_cachedTable.RowByKey == null)
            {
                lock(_cachedTable)
                {
                    if (_cachedTable.RowByKey == null)
                    {
                        var table = new Hashtable<object, object>();

                        PropertyInfo keyPropertyInfo = DataAttributeFacade.GetKeyProperties(typeof(T)).Single();

                        IEnumerable<T> enumerable = BuildEnumerable();

                        var emptyIndexCollection = new object[0];

                        foreach(T row in enumerable)
                        {
                            object rowKey = keyPropertyInfo.GetValue(row, emptyIndexCollection);

                            table.Add(rowKey, row);
                        }

                        _cachedTable.RowByKey = table;
                    }
                }
            }

            object cachedRow = _cachedTable.RowByKey[key];
            if (cachedRow == null) return null;

            return _wrappingMethodInfo.Invoke(null, new object[] { cachedRow }) as IData;
        }


        public Expression Expression
        {
            get { return _currentExpression; }
        }



        public Type ElementType
        {
            get { return typeof(T); }
        }



        public IQueryProvider Provider
        {
            get { return this; }
        }

        public IQueryable Source
        {
            get { return _source; }
        }

        public IQueryable GetOriginalQuery()
        {
            return _getQueryFunc();
        }
    }
}
