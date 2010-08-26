using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Composite.Data.Caching.Foundation;
using System.Reflection;
using Composite.Core.Linq;


namespace Composite.Data.Caching
{
    internal sealed class CachingEnumerable<T> : IEnumerable<T>
    {
        private IEnumerable<T> _enumerable;

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

    internal sealed class CachingQueryable<T> : ICachedQuery, IOrderedQueryable<T>, IQueryProvider, ICachingQueryable
    {
        private readonly IQueryable _source;
        private readonly Expression _currentExpression;
        private readonly CachingEnumerable<T> _wrappedEnumerable;
        private readonly Func<IQueryable> _getQueryFunc;

        private IEnumerable<T> _innerEnumerable;

        public CachingQueryable(IQueryable source, Func<IQueryable> originalQueryGetter)
        {
            _source = source;
            _currentExpression = Expression.Constant(this);
            _getQueryFunc = originalQueryGetter;

            if(source is IEnumerable<T>)
            {
                _innerEnumerable = source as IEnumerable<T>;
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



        #region Non generic methods

        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            return new CachingQueryable<S>(_source, expression, _getQueryFunc);
        }



        public IEnumerator<T> GetEnumerator()
        {
            if (_innerEnumerable == null)
            {
                lock(this)
                {
                    if (_innerEnumerable == null)
                    {
                        var visitor = new ChangeSourceExpressionVisitor();

                        Expression newExpression = visitor.Visit(_currentExpression);

                        _innerEnumerable = (IQueryable<T>)_source.Provider.CreateQuery(newExpression);

                        Verify.IsNotNull(_innerEnumerable, "Failed to create an enumerator");
                    }
                }
            }

            if (_wrappedEnumerable != null)
            {
                return _wrappedEnumerable.GetEnumerator();
            }

            var enumerator = _innerEnumerable.GetEnumerator();

            if (_source.ElementType == typeof(T))
            {
                return new CachingEnumerator<T>(enumerator);
            }
            return enumerator;
        }


        public S Execute<S>(Expression expression)
        {
            ChangeSourceExpressionVisitor visitor;

            if (_source.ElementType == typeof(S))
            {
                IQueryable<S> newSouce = new CachingEnumerable<S>(_source.Cast<S>()).AsQueryable();

                visitor = new ChangeSourceExpressionVisitor(newSouce.Expression);

            }
            else
            {
                visitor = new ChangeSourceExpressionVisitor();
            }

            Expression newExpression = visitor.Visit(expression);

            return (S)_source.Provider.Execute(newExpression);
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
