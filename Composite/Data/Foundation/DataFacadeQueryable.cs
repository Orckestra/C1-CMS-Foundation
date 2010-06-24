using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data.Caching;
using Composite.Extensions;
using Composite.Linq;


namespace Composite.Data.Foundation
{
    internal sealed class DataFacadeQueryable<T> : IQueryable<T>, IOrderedQueryable<T>, IDataFacadeQueryable, IQueryProvider
    {
        private List<IQueryable> _sources;
        private Expression _currentExpression = null;
        private Expression _initialExpression = null;



        public DataFacadeQueryable(IEnumerable<IQueryable<T>> sources)
        {
            if (null == sources) throw new ArgumentNullException("sources");

            _sources = new List<IQueryable>();
            foreach (IQueryable<T> source in sources)
            {
                _sources.Add(source);
            }

            _initialExpression = Expression.Constant(this);
            _currentExpression = _initialExpression;
        }


        /// <summary>
        /// DO NOT USE! For internal use only
        /// </summary>
        public DataFacadeQueryable(List<IQueryable> sources, Expression currentExpression)
        {
            _sources = sources;
            _currentExpression = currentExpression;
        }



        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            if (null == expression) throw new ArgumentNullException("expression");
            if (false == typeof(IQueryable<S>).IsAssignableFrom(expression.Type)) throw new ArgumentException("expression");

            return new DataFacadeQueryable<S>(_sources, expression);
        }



        public S Execute<S>(Expression expression)
        {
            DataFacadeQueryableGathererExpressionVisitor gathererVisitor = new DataFacadeQueryableGathererExpressionVisitor();
            gathererVisitor.Visit(_currentExpression);

            if (gathererVisitor.SourceCount == 0)
            {
                return default(S);
            }

            bool pullIntoMemory = ShouldBeHandledByProvider(gathererVisitor.MultibleSourceQueryables) == false;

            DataFacadeQueryableExpressionVisitor handleInProviderVisitor =
                new DataFacadeQueryableExpressionVisitor(pullIntoMemory);

            Expression newExpression = handleInProviderVisitor.Visit(expression);

            IQueryable source = handleInProviderVisitor.Queryable;

            return (S)source.Provider.Execute(newExpression);
        }



        public IEnumerator<T> GetEnumerator()
        {
            if(object.Equals(_currentExpression, _initialExpression))
            {
                if(_sources.Count == 1 && _sources[0] is IEnumerable<T>)
                {
                    return (_sources[0] as IEnumerable<T>).GetEnumerator();
                }

                if (_sources.Count == 0)
                {
                    return new List<T>().GetEnumerator();
                }
            }

            // Checking if result contains "multiple source" queryables
            var gathererVisitor = new DataFacadeQueryableGathererExpressionVisitor();
            gathererVisitor.Visit(_currentExpression);

            if (gathererVisitor.SourceCount == 0)
            {
                return new List<T>().GetEnumerator();
            }

            bool pullIntoMemory = ShouldBeHandledByProvider(gathererVisitor.MultibleSourceQueryables) == false;

            var handleInProviderVisitor = new DataFacadeQueryableExpressionVisitor(pullIntoMemory);

            Expression newExpression = handleInProviderVisitor.Visit(_currentExpression);

            // Checking if the source contains queries both from SQL and Composite.Data.Caching.CachingQueryable in-memory queries. 
            // In this case, we can replace CachingQueryable instances with sql queries which allows building correct sql statements.
            var analyzer = new QueryableAnalyzerVisitor();
            analyzer.Visit(newExpression);

            if(analyzer.CachedSqlQueries > 1
               || (analyzer.SqlQueries > 0 
                && analyzer.CachedSqlQueries > 0))
            {
                newExpression = new CachedQueryExtractorVisitor().Visit(newExpression);
                newExpression = handleInProviderVisitor.Visit(newExpression);
            }

            // Executing the query
            IQueryable source = handleInProviderVisitor.Queryable;
            IQueryable<T> queryable = (IQueryable<T>)source.Provider.CreateQuery(newExpression);

            return queryable.GetEnumerator();
        }



        IEnumerator IEnumerable.GetEnumerator()
        {
            MethodInfo methodInfo = DataFacadeQueryableCache.GetDataFacadeQueryableGetEnumeratorMethodInfo(typeof(T));         

            return (IEnumerator)methodInfo.Invoke(this, null);
        }



        public IQueryable CreateQuery(Expression expression)
        {
            if (_currentExpression == expression) return this;

            Type elementType = TypeHelpers.FindElementType(expression);

            Type multibleSourceQueryableType = typeof(DataFacadeQueryable<>).MakeGenericType(new Type[] { elementType });

            return Activator.CreateInstance(
                multibleSourceQueryableType,
                new object[] { _sources, expression }) as IQueryable;
        }



        public Type ElementType
        {
            get { return typeof(T); }
        }



        public object Execute(Expression expression)
        {
            MethodInfo methodInfo = DataFacadeQueryableCache.GetDataFacadeQueryableExecuteMethodInfo(typeof(T), expression.Type);

            return methodInfo.Invoke(this, new object[] { expression });
        }



        public Expression Expression
        {
            get
            {
                if (_currentExpression != null)
                {
                    return _currentExpression;
                }
                
                return Expression.Constant(this);
            }
        }



        public IEnumerable<IQueryable> Sources
        {
            get
            {
                foreach (IQueryable queryable in _sources)
                {
                    yield return queryable;
                }
            }
        }



        private bool ShouldBeHandledByProvider(List<IDataFacadeQueryable> multibleSourceQueryables)
        {
            return true;
            
            //IQueryable currentQueryable = null;

            //foreach (IDataFacadeQueryable multibleSourceQueryable in multibleSourceQueryables)
            //{
            //    if (multibleSourceQueryable.Sources.Count() != 1) return false;

            //    if (currentQueryable == null)
            //    {
            //        currentQueryable = multibleSourceQueryable.Sources.First();
            //    }
            //    else
            //    {
            //        IQueryable queryable = multibleSourceQueryable.Sources.First();

            //        if (object.ReferenceEquals(currentQueryable, queryable) == false) return false;
            //    }
            //}

            //return true;
        }

        public bool IsEnumerableQuery
        {
            get
            {
                return _sources.Count == 1
                       && (_sources[0] as IQueryable<T>).IsEnumerableQuery();
            }
        }

        public IQueryProvider Provider
        {
            get { return this; }
        }


        private class QueryableAnalyzerVisitor : ExpressionVisitor
        {
            public int SqlQueries { get; private set; }
            public int CachedSqlQueries { get; private set; }
            public int InMemoryQueries { get; private set; }
            public int Other { get; private set; }

            protected override Expression VisitConstant(ConstantExpression node)
            {
                var value = node.Value;
                if (value != null && value is IQueryable)
                {
                    if (value is ITable)
                    {
                        SqlQueries++;
                    }
                    else if (value is ICachedQuery)
                    {
                        CachedSqlQueries++;
                    }
                    else if (typeof(EnumerableQuery).IsAssignableFrom(value.GetType()))
                    {
                        InMemoryQueries++;
                    }
                    else
                    {
                        Other++;
                    }
                }

                return base.VisitConstant(node);
            }
        }

        private class CachedQueryExtractorVisitor : ExpressionVisitor
        {
            protected override Expression VisitConstant(ConstantExpression node)
            {
                object value = node.Value;
                if(value != null && value is ICachedQuery)
                {
                    IQueryable originalQuery = (value as ICachedQuery).GetOriginalQuery();

                    return Expression.Constant(originalQuery);
                }

                return base.VisitConstant(node);
            }
        }
    }
}
