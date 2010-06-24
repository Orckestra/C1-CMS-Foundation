using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Linq;
using Composite.Trees.Foundation;
using Composite.Types;


namespace Composite.Trees
{
    public sealed class FieldOrderByNode : OrderByNode
    {
        private PropertyInfo PropertyInfo { get; set; }


        public string FieldName { get; internal set; } // Required
        public string Direction { get; internal set; } // Optional




        public override Expression CreateOrderByExpression(Expression sourceExpression, ParameterExpression parameterExpression, bool first)
        {
            Expression fieldExpression = ExpressionHelper.CreatePropertyExpression(this.OwnerNode.InterfaceType, this.PropertyInfo.DeclaringType, this.FieldName, parameterExpression);

            LambdaExpression lambdaExpression = Expression.Lambda(fieldExpression, parameterExpression);

            if (first == true)
            {
                if (this.Direction == "ascending") return ExpressionCreator.OrderBy(sourceExpression, lambdaExpression);
                else return ExpressionCreator.OrderByDescending(sourceExpression, lambdaExpression);                    
            }
            else
            {
                if (this.Direction == "ascending") return ExpressionCreator.ThenBy(sourceExpression, lambdaExpression);
                else return ExpressionCreator.ThenByDescending(sourceExpression, lambdaExpression);                    
            }
        }



        internal override void Initialize()
        {
            if ((this.Direction != "ascending") && (this.Direction != "descending"))
            {
                AddValidationError("TreeValidationError.FieldOrderBy.UnknownDirection", this.Direction);
            }

            this.PropertyInfo = this.OwnerNode.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == this.FieldName).SingleOrDefault();

            if (this.PropertyInfo == null)
            {
                AddValidationError("TreeValidationError.FieldOrderBy.UnknownField", this.OwnerNode.InterfaceType, this.FieldName);
            }
        }



        public override string ToString()
        {
            return string.Format("OrderByNode, FieldName = {0}, Direction = {1}", this.FieldName, this.Direction);
        }
    }
}
