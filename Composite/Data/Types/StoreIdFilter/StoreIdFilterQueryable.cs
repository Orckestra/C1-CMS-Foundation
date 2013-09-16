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
        private readonly IQueryable<T> _originalQueryable;
        private readonly string _storeId;
        private readonly Expression _currentExpression;


        private static readonly PropertyInfo _mediaFileStoreIdPropertyInfo = typeof(IMediaFile).GetProperty("StoreId");
        private static readonly PropertyInfo _mediaFileFolderStoreIdPropertyInfo = typeof(IMediaFileFolder).GetProperty("StoreId");

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
            var visitor = new StoreIdFilterQueryableChangeSourceExpressionVisitor();

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
            var visitor = new StoreIdFilterQueryableExpressionVisitor();

            visitor.Visit(_currentExpression);

            if (visitor.FoundStoreId == _storeId)
            {
                var sourceChangingVisitor = new StoreIdFilterQueryableChangeSourceExpressionVisitor();

                Expression newExpression = sourceChangingVisitor.Visit(expression);

                return _originalQueryable.Provider.Execute<S>(newExpression);
            }
            else
            {
                List<T> emptyList = new List<T>();

                var sourceChangingVisitor = new StoreIdFilterQueryableChangeSourceExpressionVisitor(emptyList.AsQueryable().Expression);

                Expression newExpression = sourceChangingVisitor.Visit(expression);

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
            var visitor = new StoreIdFilterQueryableExpressionVisitor();

            visitor.Visit(_currentExpression);

            if (visitor.FoundStoreId == null)
            {
                throw new InvalidOperationException("Missing storeId test found in where");
            }

            if (visitor.FoundStoreId != _storeId)
            {
                return new List<T>().GetEnumerator();
            }

            return FilterByStoreId(_originalQueryable).GetEnumerator();
        }


        IEnumerable<T> FilterByStoreId(IEnumerable<T> enumeration)
        {
            foreach (T item in enumeration)
            {
                if (GetStoreId(item) == _storeId)
                {
                    yield return item;
                }
            }
        }

        static string GetStoreId(T item)
        {
            if (item is IMediaFile)
            {
                return (string) _mediaFileStoreIdPropertyInfo.GetValue(item, null);
            }

            if (item is IMediaFileFolder)
            {
                return (string)_mediaFileFolderStoreIdPropertyInfo.GetValue(item, null);
            }

            throw new InvalidOperationException("This line should not be reachable");
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
