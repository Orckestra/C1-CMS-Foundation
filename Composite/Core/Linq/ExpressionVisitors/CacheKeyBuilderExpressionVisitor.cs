using System;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq.Disassembled;
using Composite.Core.WebClient.Renderings.Page;

namespace Composite.Core.Linq.ExpressionVisitors
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CacheKeyBuilderExpressionVisitor : ExpressionStringBuilder
    {
        public interface ICacheKeyProvider
        {
            string GetCacheKey();
        }

        private static readonly object[] EmptyObjectArray = new object[0];

        private bool _cacheKeyCanBeCreated = true;

        protected CacheKeyBuilderExpressionVisitor()
        {
        }

        internal static new string ExpressionToString(Expression node)
        {
            CacheKeyBuilderExpressionVisitor builder = new CacheKeyBuilderExpressionVisitor();
            builder.Visit(node);

            return builder.ToString();
        }

        public override Expression Visit(Expression node)
        {
            // Don't do anything if the expression is considered as not appropriate
            if (!_cacheKeyCanBeCreated)
            {
                return node;
            }

            return base.Visit(node);
        }

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
                    Out(value == null ? "null" : value.ToString());
                    return node;
                }

                if (value != null && value is ICacheKeyProvider)
                {
                    Out((value as ICacheKeyProvider).GetCacheKey());
                    return node;
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

                    Out(value == null ? "null" : value.ToString());

                    return node;
                }
            }

            // Replacing RageRenderer.CurrentPageId with its actual value
            if (node.Expression == null
                && node.Member.DeclaringType == typeof(PageRenderer)
                && node.Member.Name == "CurrentPageId")
            {
                Out(PageRenderer.CurrentPageId.ToString());
                return node;
            }

            return base.VisitMember(node);
        }

        protected override Expression VisitConstant(ConstantExpression node)
        {
            if(node.Value != null && !IsSimpleType(node.Type))
            {
                _cacheKeyCanBeCreated = false;
                return node;
            }

            return base.VisitConstant(node);
        }

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
    }
}
