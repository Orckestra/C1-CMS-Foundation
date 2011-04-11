using System;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.WebClient.Renderings.Page;

namespace Composite.Core.Linq.ExpressionVisitors
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CacheKeyBuilderExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo ConstantWrapperMethod = typeof (CacheKeyBuilderExpressionVisitor).GetMethod("A", BindingFlags.Static | BindingFlags.NonPublic);

        /// <exclude />
        public interface ICacheKeyProvider
        {
            /// <exclude />
            string GetCacheKey();
        }

        private static readonly object[] EmptyObjectArray = new object[0];

        private bool _cacheKeyCanBeCreated = true;


        /// <exclude />
        protected CacheKeyBuilderExpressionVisitor()
        {
        }

        internal static string ExpressionToString(Expression expression)
        {
            CacheKeyBuilderExpressionVisitor builder = new CacheKeyBuilderExpressionVisitor();
            Expression cachableExpression = builder.Visit(expression);

            return (builder._cacheKeyCanBeCreated ? cachableExpression : expression).ToString();
        }


        /// <exclude />
        public override Expression Visit(Expression node)
        {
            // Don't do anything if the expression is considered as not appropriate
            if (!_cacheKeyCanBeCreated)
            {
                return node;
            }

            return base.Visit(node);
        }


        /// <exclude />
        protected override Expression VisitMember(MemberExpression node)
        {
            // Replacing output like "value(SomeNamespace.Filters+<>c__DisplayClassa).SomeField" with its actual value
            if(node.Expression is ConstantExpression 
                && node.Member is FieldInfo)
            {
                object obj = (node.Expression as ConstantExpression).Value;
                object value = (node.Member as FieldInfo).GetValue(obj);

                if(IsSimpleType(node.Type))
                {
                    return Expression.Constant(value);
                }

                if (value != null && value is ICacheKeyProvider)
                {
                    return Out((value as ICacheKeyProvider).GetCacheKey(), node.Type);
                }
            }

            // Replacing output like "value(SomeNamespace.Filters+<>c__DisplayClassa).SomeField.SomeOtherField" with its actual value
            if(node.Expression is MemberExpression
                && node.Member is PropertyInfo
                && IsSimpleType(node.Type))
            {
                MemberExpression innerExpression = node.Expression as MemberExpression;

                if (innerExpression.Expression is ConstantExpression
                    && innerExpression.Member is FieldInfo)
                {
                    object obj = (innerExpression.Expression as ConstantExpression).Value;
                    object containerValue = (innerExpression.Member as FieldInfo).GetValue(obj);
                    object value = (node.Member as PropertyInfo).GetValue(containerValue, EmptyObjectArray);

                    return Expression.Constant(value);
                }
            }

            // Replacing RageRenderer.CurrentPageId with its actual value
            if (node.Expression == null
                && node.Member.DeclaringType == typeof(PageRenderer)
                && node.Member.Name == "CurrentPageId")
            {
                return Expression.Constant(PageRenderer.CurrentPageId);
            }

            return base.VisitMember(node);
        }


        /// <exclude />
        protected override Expression VisitConstant(ConstantExpression node)
        {
            if(node.Value != null && !IsSimpleType(node.Type))
            {
                _cacheKeyCanBeCreated = false;
                return node;
            }

            return base.VisitConstant(node);
        }


        /// <exclude />
        public override string ToString()
        {
            return _cacheKeyCanBeCreated ? base.ToString() : null;
        }

        private static bool IsSimpleType(Type type)
        {
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                type = type.GetGenericArguments()[0];
            }

            return type == typeof(Guid) || type == typeof(string) || type == typeof(bool)
                   || type == typeof(DateTime) || type == typeof(byte)
                   || type == typeof(Int32) || type == typeof(Int64)
                   || type == typeof(Double);
        }

        /// <summary>  
        /// Used for creating cache keys for LINQ expressions, it has a short name to keep the keys short  
        /// </summary>
        // DO NOT REMOVE, used by "Out" method via reflection
        private static T A<T>(string cacheKeyPart)
        {
            throw new InvalidOperationException("This method is not supposed to be called, used only for building a cache key via ExpressionStringBuilder");
        }

        private static Expression Out(string value, Type type)
        {
            // TODO: check whether it has sense to cache MakeGenericMethod call
            var methodInfo = ConstantWrapperMethod.MakeGenericMethod(type);
            return Expression.Call(methodInfo, Expression.Constant(value));
        }
    }
}
