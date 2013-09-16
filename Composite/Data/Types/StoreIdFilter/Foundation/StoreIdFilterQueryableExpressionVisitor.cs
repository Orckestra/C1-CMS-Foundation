using System;
using System.Linq.Expressions;
using System.Reflection;


namespace Composite.Data.Types.StoreIdFilter.Foundation
{
    /// <summary>
    /// Searches for a "StoreId" filtering in an expression tree.
    /// </summary>
    internal sealed class StoreIdFilterQueryableExpressionVisitor : ExpressionVisitor
    {
        private static readonly MemberInfo _mediaFileStoreIdMemberInfo = typeof(IMediaFile).GetMember("StoreId")[0];
        private static readonly MemberInfo _mediaFileFolderStoreIdMemberInfo = typeof(IMediaFileFolder).GetMember("StoreId")[0];



        public StoreIdFilterQueryableExpressionVisitor()
        {
            this.FoundStoreId = null;
        }

        protected override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value is IStorageFilter)
            {
                FoundStoreId = (c.Value as IStorageFilter).StoreId;
            }

            return base.VisitConstant(c);
        }

        protected override Expression VisitBinary(BinaryExpression b)
        {
            if (b.Method != null && b.Method.Name == "op_Equality")
            {
                bool hasStoreIdMemberExpression = IsStoreIdMemberExpression(b.Left) || IsStoreIdMemberExpression(b.Right);

                if (hasStoreIdMemberExpression)
                {
                    string storeId = GetStoreId(b.Left) ?? GetStoreId(b.Right);

                    if (storeId != null)
                    {
                        this.FoundStoreId = storeId;
                    }
                }
            }

            return base.VisitBinary(b);
        }



        public string FoundStoreId
        {
            get;
            private set;
        }



        private bool IsStoreIdMemberExpression(Expression expression)
        {
            MemberExpression memberExpression = expression as MemberExpression;

            if (memberExpression == null) return false;

            if (memberExpression.Expression.Type != typeof(IMediaFile) &&
                memberExpression.Expression.Type != typeof(IMediaFileFolder))
            {
                return false;
            }

            if (memberExpression.Member != _mediaFileStoreIdMemberInfo &&
                memberExpression.Member != _mediaFileFolderStoreIdMemberInfo)
            {
                return false;
            }

            return true;
        }



        private string GetStoreId(Expression expression)
        {
            if (expression is ConstantExpression)
            {
                var constantExpression = expression as ConstantExpression;

                if (constantExpression.Value == null || constantExpression.Type != typeof (string)) return null;

                return (string)constantExpression.Value;
            }

            if (expression is MemberExpression) 
            {
                var memberExpression = expression as MemberExpression;

                if (memberExpression.Expression.NodeType != ExpressionType.Constant) return null;

                object obj = ((ConstantExpression)memberExpression.Expression).Value;

                FieldInfo fieldInfo = memberExpression.Member as FieldInfo;

                if (fieldInfo == null) return null;

                return (string)fieldInfo.GetValue(obj);
            }
            
            throw new InvalidOperationException("This line should not be reachable");
        }
    }
}
