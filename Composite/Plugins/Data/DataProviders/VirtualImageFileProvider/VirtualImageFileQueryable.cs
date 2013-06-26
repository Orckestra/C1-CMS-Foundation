using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Composite.Core.Linq;

namespace Composite.Plugins.Data.DataProviders.VirtualImageFileProvider
{
    internal interface IVirtualImageFileQueryable
    {
        IQueryable Source { get; }
    }

    /// <summary>
    /// Moves the IMediaFile -> IImageFile convertion up in the tree, allowing data providers to handle IMedia queries more effectively
    /// </summary>
    internal class VirtualImageFileQueryable<T> : IQueryable<T>, IQueryProvider, IVirtualImageFileQueryable
    {
        private readonly IQueryable _source;
        private readonly Expression _currentExpression;
        private readonly Expression _initialExpression;

        public VirtualImageFileQueryable(IQueryable source)
        {
            _source = source;
            _initialExpression = Expression.Constant(this);
            _currentExpression = _initialExpression;
        }

        public VirtualImageFileQueryable(IQueryable source, Expression expression)
        {
            _source = source;
            _currentExpression = expression;
        }

        public IEnumerator<T> GetEnumerator()
        {
            foreach (var file in (this as IEnumerable))
            {
                yield return (T)file;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            if (_currentExpression == _initialExpression)
            {
                return _source.GetEnumerator();
            }

            var processedExpression = ProcessExpression(_currentExpression);

            IQueryable<T> queryable = (IQueryable<T>)_source.Provider.CreateQuery(processedExpression);

            return queryable.GetEnumerator();
        }

        public Expression Expression
        {
            get { return _currentExpression ?? _initialExpression; }
        }

        public Type ElementType
        {
            get { return typeof(T); }
        }

        public IQueryProvider Provider { get { return this; } }

        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            Verify.ArgumentNotNull(expression, "expression");
            Verify.ArgumentCondition(typeof(IQueryable<S>).IsAssignableFrom(expression.Type), "expression", "Incorrect expression type");

            return new VirtualImageFileQueryable<S>(_source, expression);
        }

        public IQueryable CreateQuery(Expression expression)
        {
            if (_currentExpression == expression) return this;

            Type elementType = TypeHelpers.FindElementType(expression);

            Type multibleSourceQueryableType = typeof(VirtualImageFileQueryable<>).MakeGenericType(new[] { elementType });

            return Activator.CreateInstance(
                multibleSourceQueryableType,
                new object[] { _source, expression }) as IQueryable;
        }

        public TResult Execute<TResult>(Expression expression)
        {
            var processedExpression = ProcessExpression(expression);

            return _source.Provider.Execute<TResult>(processedExpression);
        }

        public object Execute(Expression expression)
        {
            var processedExpression = ProcessExpression(expression);

            return _source.Provider.Execute(processedExpression);
        }

        private Expression ProcessExpression(Expression expression)
        {
            var visitor = new VirtualImageFileQueryableVisitor();

            return visitor.Visit(expression);
        }

        public IQueryable Source
        {
            get { return _source; }
        }
    }
}
