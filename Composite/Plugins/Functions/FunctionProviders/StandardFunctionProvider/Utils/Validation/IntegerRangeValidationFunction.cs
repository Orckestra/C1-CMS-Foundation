using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data.Validation;
using Composite.Data.Validation.Validators;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    internal sealed class IntegerRangeValidationFunction : StandardFunctionBase
	{
        public IntegerRangeValidationFunction(EntityTokenFactory entityTokenFactory)
            : base("IntegerRangeValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<int>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "min", typeof(int), true, new NoValueValueProvider(), StandardWidgetFunctions.IntegerTextBoxWidget);

                yield return new StandardFunctionParameterProfile(
                    "max", typeof(int), true, new NoValueValueProvider(), StandardWidgetFunctions.IntegerTextBoxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(IntegerRangeValidatorAttribute)));

            int min = parameters.GetParameter<int>("min");
            int max = parameters.GetParameter<int>("max");

            codeAttributeDeclaration.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(min)));
            codeAttributeDeclaration.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(max)));

            return new ConstructorBasedPropertyValidatorBuilder<int>(codeAttributeDeclaration, new IntegerRangeValidatorAttribute(min, max));
        }
	}
}
