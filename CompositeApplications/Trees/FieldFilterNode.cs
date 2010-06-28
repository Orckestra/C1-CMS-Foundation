using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Linq;
using Composite.Types;


namespace Composite.Trees
{
    internal enum FieldFilterNodeOperator
    {
        Equal = 0,
        Inequal = 1,
        Lesser = 2,
        Greater = 3,
        LesserEqual = 4,
        GreaterEqual = 5
    }



    internal class FieldFilterNode : FilterNode
	{
        private PropertyInfo PropertyInfo { get; set; }
        private object ConvertedValue { get; set ;}

        public string FieldName { get; internal set; }                  // Required
        public string FieldValue { get; internal set; }                 // Required
        public FieldFilterNodeOperator Operator { get; internal set; }  // Optional



        public override Expression CreateDownwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            return CreateFilterExpression(parameterExpression, dynamicContext);            
        }



        public override Expression CreateUpwardsFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {
            return CreateFilterExpression(parameterExpression, dynamicContext);
        }



        internal override void Initialize()
        {
            this.PropertyInfo = this.OwnerNode.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == this.FieldName).SingleOrDefault();

            if (this.PropertyInfo == null)
            {
                AddValidationError("TreeValidationError.Common.MissingProperty", this.OwnerNode.InterfaceType, this.FieldName);
                return;
            }

            try
            {
                this.ConvertedValue = ValueTypeConverter.Convert(this.FieldValue, this.PropertyInfo.PropertyType);
            }
            catch
            {
                AddValidationError("TreeValidationError.FieldFilter.ValueCouldNotBeConverted", this.FieldValue, this.PropertyInfo.PropertyType);
            }

            if ((this.PropertyInfo.PropertyType == typeof(string)) || (this.PropertyInfo.PropertyType == typeof(Guid)))
            {
                if ((this.Operator != FieldFilterNodeOperator.Equal) && (this.Operator != FieldFilterNodeOperator.Inequal))
                {
                    AddValidationError("TreeValidationError.FieldFilter.OperatorNotSupportedForType", this.Operator, this.PropertyInfo.PropertyType);
                }
            }
        }



        private Expression CreateFilterExpression(ParameterExpression parameterExpression, TreeNodeDynamicContext dynamicContext)
        {            
            object value = ValueTypeConverter.Convert(this.FieldValue, this.PropertyInfo.PropertyType);

            Expression valueExpression = Expression.Constant(value, this.PropertyInfo.PropertyType);

            Expression expression;
            switch (this.Operator)
            {
                case FieldFilterNodeOperator.Equal:
                    expression = Expression.Equal(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                case FieldFilterNodeOperator.Inequal:
                    expression = Expression.NotEqual(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                case FieldFilterNodeOperator.Greater:
                    expression = Expression.GreaterThan(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                case FieldFilterNodeOperator.GreaterEqual:
                    expression = Expression.GreaterThanOrEqual(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                case FieldFilterNodeOperator.Lesser:
                    expression = Expression.LessThan(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                case FieldFilterNodeOperator.LesserEqual:
                    expression = Expression.LessThanOrEqual(ExpressionHelper.CreatePropertyExpression(this.FieldName, parameterExpression), valueExpression);
                    break;

                default:
                    throw new NotImplementedException();
            }
            

            return expression;
        }
        


        public override string ToString()
        {
            return string.Format("FieldFilterNode, FieldName = {0}, FieldValue = {1}", this.FieldName, this.FieldValue);
        }
	}
}
