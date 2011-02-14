using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data.Types.StoreIdFilter.Foundation;


namespace Composite.Data.Types.StoreIdFilter
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IStorageFilter 
    {
        /// <exclude />
        string StoreId { get; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class StoreIdFilterQueryable<T> : IStoreIdFilterQueryable, IOrderedQueryable<T>, IQueryProvider, IStorageFilter
    {
        private IQueryable<T> _originalQueryable;
        private string _storeId;

        private Expression _currentExpression;



        /// <exclude />
        public StoreIdFilterQueryable(IQueryable<T> originalQueryable, string storeId)
        {
            _originalQueryable = originalQueryable;
            _storeId = storeId;
            _currentExpression = Expression.Constant(this);
        }



        /// <exclude />
        public StoreIdFilterQueryable(IQueryable<T> originalQueryable, string storeId, Expression currentExpression)
        {
            _originalQueryable = originalQueryable;
            _storeId = storeId;
            _currentExpression = currentExpression;
        }



        /// <exclude />
        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            StoreIdFilterQueryableSourceChanringExpressionVisitor visitor = new StoreIdFilterQueryableSourceChanringExpressionVisitor();

            Expression newExpression = visitor.Visit(expression);

            IQueryable<S> newOriginalQueryable = _originalQueryable.Provider.CreateQuery<S>(newExpression);

            return new StoreIdFilterQueryable<S>(newOriginalQueryable, _storeId, expression);
        }



        /// <exclude />
        public IQueryable CreateQuery(Expression expression)
        {
            if (_currentExpression == expression) return this;

            MethodInfo methodInfo = StoreIdFilterQueryableCache.GetStoreIdFilterQueryableCreateQueryMethodInfo(typeof(T), expression.Type);

            return (IQueryable)methodInfo.Invoke(this, new object[] { expression });
        }



        /// <exclude />
        public S Execute<S>(Expression expression)
        {
            StoreIdFilterQueryableExpressionVisitor visitor = new StoreIdFilterQueryableExpressionVisitor();

            visitor.Visit(_currentExpression);

            if (visitor.FoundStoreId == _storeId)
            {
                StoreIdFilterQueryableSourceChanringExpressionVisitor sourceChachingvisitor = new StoreIdFilterQueryableSourceChanringExpressionVisitor();

                Expression newExpression = sourceChachingvisitor.Visit(expression);

                return _originalQueryable.Provider.Execute<S>(newExpression);
            }
            else
            {
                List<T> emptyList = new List<T>();

                StoreIdFilterQueryableSourceChanringExpressionVisitor sourceChachingvisitor = new StoreIdFilterQueryableSourceChanringExpressionVisitor(emptyList.AsQueryable().Expression);

                Expression newExpression = sourceChachingvisitor.Visit(expression);

                return emptyList.AsQueryable().Provider.Execute<S>(newExpression);
            }
        }



        /// <exclude />
        public object Execute(Expression expression)
        {
            MethodInfo methodInfo = StoreIdFilterQueryableCache.GetStoreIdFilterQueryableExecuteMethodInfo(typeof(T), expression.Type);

            return methodInfo.Invoke(this, new object[] { expression });
        }



        /// <exclude />
        public IEnumerator<T> GetEnumerator()
        {
            StoreIdFilterQueryableExpressionVisitor visitor = new StoreIdFilterQueryableExpressionVisitor();

            visitor.Visit(_currentExpression);

            if (visitor.FoundStoreId == null)
            {
                throw new InvalidOperationException("Missing storeId test found in where");
            }            
            else if (visitor.FoundStoreId == _storeId)
            {
                return _originalQueryable.GetEnumerator();
            }            
            else
            {
                return new List<T>().GetEnumerator();
            }
        }



        /// <exclude />
        IEnumerator IEnumerable.GetEnumerator()
        {
            MethodInfo methodInfo = StoreIdFilterQueryableCache.GetStoreIdFilterQueryableGetEnumeratorMethodInfo(typeof(T));

            return (IEnumerator)methodInfo.Invoke(this, null);
        }



        /// <exclude />
        public Expression Expression
        {
            get { return _currentExpression; }
        }



        /// <exclude />
        public Type ElementType
        {
            get { return typeof(T); }
        }



        /// <exclude />
        public IQueryProvider Provider
        {
            get { return this; }
        }



        /// <exclude />
        public IQueryable Source
        {
            get { return _originalQueryable; }
        }


        /// <exclude />
        public string StoreId
        {
            get { return _storeId; }
        }
    }
}
