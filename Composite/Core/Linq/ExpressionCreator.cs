using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace Composite.Core.Linq
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ExpressionCreator
    {
        public static Expression Select(Expression source, LambdaExpression selector)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable), 
                    "Select",
                    new Type[] { type, selector.Body.Type },
                    source,
                    Expression.Quote(selector)
                );
        }



        public static Expression Where(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "Where",
                    new Type[] { type },
                    source,
                    Expression.Quote(predicate)
                );
        }



        public static Expression Count(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "Count",
                    new Type[] { type },
                    source,
                    Expression.Quote(predicate)
                );
        }



        public static Expression Distinct(Expression source)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "Distinct",
                    new Type[] { type },
                    source
                );
        }



        public static Expression OrderBy(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "OrderBy",
                    new Type[] { type, predicate.Body.Type },
                    source,
                    predicate
                );
        }



        public static Expression OrderByDescending(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);            

            return Expression.Call(
                    typeof(Queryable),
                    "OrderByDescending",
                    new Type[] { type, predicate.Body.Type },
                    source,
                    predicate
                );
        }



        public static Expression ThenBy(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "ThenBy",
                    new Type[] { type, predicate.Body.Type },
                    source,
                    predicate
                );
        }



        public static Expression ThenByDescending(Expression source, LambdaExpression predicate)
        {
            Type type = TypeHelpers.FindElementType(source);

            return Expression.Call(
                    typeof(Queryable),
                    "ThenByDescending",
                    new Type[] { type, predicate.Body.Type },
                    source,
                    predicate
                );
        }



        public static Expression Join(Expression outerSource, Expression innerSource, LambdaExpression outerKeySelector, LambdaExpression innerKeySelector, LambdaExpression resultSelector)
        {
            Type outerType = TypeHelpers.FindElementType(outerSource);
            Type innerType = TypeHelpers.FindElementType(innerSource);
            Type keyType = outerKeySelector.Body.Type;
            Type resultType = resultSelector.ReturnType;

            // public static IEnumerable<TResult> Join<TOuter, TInner, TKey, TResult>(
            //      IEnumerable<TOuter> outer, 
            //      IEnumerable<TInner> inner, 
            //      Func<TOuter, TKey> outerKeySelector, 
            //      Func<TInner, TKey> innerKeySelector, 
            //      Func<TOuter, TInner, TResult> resultSelector);

            Type outerFullType = typeof(IEnumerable<>).MakeGenericType(outerType);
            Type innerFullType = typeof(IEnumerable<>).MakeGenericType(innerType);
            Type outerKeySelectorFullType = typeof(Func<,>).MakeGenericType(outerType, keyType);
            Type innerKeySelectorFullType = typeof(Func<,>).MakeGenericType(innerType, keyType);
            Type resultSelectorFullType = typeof(Func<,,>).MakeGenericType(outerType, innerType, resultType);

            var b1 = outerFullType.IsAssignableFrom(outerSource.Type);
            var b2 = innerFullType.IsAssignableFrom(innerSource.Type);
            var b3 = outerKeySelector.Type == outerKeySelectorFullType;
            var b4 = innerKeySelector.Type == innerKeySelectorFullType;
            var b5 = resultSelector.Type == resultSelectorFullType;


            return Expression.Call(
                    typeof(Queryable),
                    "Join",
                    new Type[] { outerType, innerType, keyType, resultType },
                    outerSource,
                    innerSource,
                    Expression.Quote(outerKeySelector),
                    Expression.Quote(innerKeySelector),
                    Expression.Quote(resultSelector)
                );
        }
    }
}
