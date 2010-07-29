using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data.Plugins.DataProvider.TransformQueryable.Foundation;
using Composite.Linq;


namespace Composite.Data.Plugins.DataProvider.TransformQueryable
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class TransformQueryable<T> : IOrderedQueryable<T>, ITransformQueryable, IQueryProvider
    {
        private IQueryable _source;
        private TypeMappings _typeMappings;
        private PropertyMappings _propertyMappings;
        private SelectParameterMappings _selectParameterMappings;
        private ContainerClassMappings _containerClassMappings;

        private Expression _currentExpression;



        public TransformQueryable(IQueryable source, TypeMappings typeMappings, PropertyMappings propertyMappings, SelectParameterMappings selectParameterMappings, ContainerClassMappings containerClassMappings)
        {
            if (source == null) throw new ArgumentNullException("source");
            if (typeMappings == null) throw new ArgumentNullException("typeMappings");
            if (propertyMappings == null) throw new ArgumentNullException("propertyMappings");
            if (selectParameterMappings == null) throw new ArgumentNullException("selectParameterMappings");
            if (containerClassMappings == null) throw new ArgumentNullException("containerClassFieldMappings");

            _source = source;
            _typeMappings = typeMappings;
            _propertyMappings = propertyMappings;
            _selectParameterMappings = selectParameterMappings;
            _containerClassMappings = containerClassMappings;

            _currentExpression = Expression.Constant(this);
        }



        public TransformQueryable(IQueryable source, TypeMappings typeMappings, PropertyMappings propertyMappings, SelectParameterMappings selectParameterMappings, ContainerClassMappings containerClassMappings, Expression currentExpression)
        {
            if (source == null) throw new ArgumentNullException("source");
            if (typeMappings == null) throw new ArgumentNullException("typeMappings");
            if (propertyMappings == null) throw new ArgumentNullException("propertyMappings");
            if (selectParameterMappings == null) throw new ArgumentNullException("selectParameterMappings");
            if (containerClassMappings == null) throw new ArgumentNullException("containerClassFieldMappings");
            if (currentExpression == null) throw new ArgumentNullException("currentExpression");

            _source = source;
            _typeMappings = typeMappings;
            _propertyMappings = propertyMappings;
            _selectParameterMappings = selectParameterMappings;
            _containerClassMappings = containerClassMappings;

            _currentExpression = currentExpression;
        }



        public IQueryable<S> CreateQuery<S>(Expression expression)
        {
            return new TransformQueryable<S>(_source, _typeMappings, _propertyMappings, _selectParameterMappings, _containerClassMappings, expression);
        }



        public S Execute<S>(Expression expression)
        {
            TransformMappingsMergerExpressionVisitor mergerVisitor = new TransformMappingsMergerExpressionVisitor();
            mergerVisitor.Visit(expression);


            TransformSelectInserterExpressionVisitor selectInserterVisitor = new TransformSelectInserterExpressionVisitor(mergerVisitor.TypeMappings);
            expression = selectInserterVisitor.Visit(expression);


            TransformExpressionVisitor visitor = new TransformExpressionVisitor(
                                                     _source,
                                                     mergerVisitor.TypeMappings,
                                                     mergerVisitor.PropertyMappings,
                                                     mergerVisitor.SelectParameterMappings,
                                                     mergerVisitor.ContainerClassMappings);

            Expression newExpression = visitor.Visit(expression);

            return (S)_source.Provider.Execute(newExpression);
        }



        public IEnumerator<T> GetEnumerator()
        {
            TransformMappingsMergerExpressionVisitor mergerVisitor = new TransformMappingsMergerExpressionVisitor();
            mergerVisitor.Visit(_currentExpression);


            TransformSelectInserterExpressionVisitor selectInserterVisitor = new TransformSelectInserterExpressionVisitor(mergerVisitor.TypeMappings);
            Expression newExpression = selectInserterVisitor.Visit(_currentExpression);


            TransformExpressionVisitor visitor = new TransformExpressionVisitor(
                                                     _source,
                                                     mergerVisitor.TypeMappings,
                                                     mergerVisitor.PropertyMappings,
                                                     mergerVisitor.SelectParameterMappings,
                                                     mergerVisitor.ContainerClassMappings);

            newExpression = visitor.Visit(newExpression);

            IQueryable<T> queryable = (IQueryable<T>)_source.Provider.CreateQuery(newExpression);

            return queryable.GetEnumerator();
        }


        IEnumerator IEnumerable.GetEnumerator()
        {
            MethodInfo methodInfo = TransformQueryableCache.GetTransformQueryableGetEnumeratorMethodInfo(typeof(T));

            return (IEnumerator)methodInfo.Invoke(this, null);
        }



        public IQueryable CreateQuery(Expression expression)
        {
            if (_currentExpression == expression) return this;

            Type elementType = TypeHelpers.FindElementType(expression);

            Type queryableType = TransformQueryableCache.GetTransformQueryableType(elementType);

            return (IQueryable)Activator.CreateInstance(
                queryableType,
                new object[] { _source, _typeMappings, _propertyMappings, _selectParameterMappings, _containerClassMappings, expression });
        }



        public Type ElementType
        {
            get { return typeof(T); }
        }



        public object Execute(Expression expression)
        {
            MethodInfo methodInfo = TransformQueryableCache.GetTransformQueryableExecuteMethodInfo(typeof(T), expression.Type);

            return methodInfo.Invoke(this, new object[] { expression });
        }



        public Expression Expression
        {
            get
            {
                return _currentExpression;
            }
        }



        IQueryable ITransformQueryable.Source
        {
            get { return _source; }
        }



        TypeMappings ITransformQueryable.TypeMappings
        {
            get { return _typeMappings; }
        }



        PropertyMappings ITransformQueryable.PropertyMappings
        {
            get { return _propertyMappings; }
        }



        SelectParameterMappings ITransformQueryable.SelectParameterMappings
        {
            get { return _selectParameterMappings; }
        }



        ContainerClassMappings ITransformQueryable.ContainerClassMappings
        {
            get { return _containerClassMappings; }
        }



        public IQueryProvider Provider
        {
            get { return this; }
        }
    }
}
