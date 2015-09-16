using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data.Validation;
using Composite.Data.Validation.Validators;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    internal sealed class DecimalPrecisionValidationFunction : StandardFunctionBase
	{
        public DecimalPrecisionValidationFunction(EntityTokenFactory entityTokenFactory)
            : base("DecimalPrecisionValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<decimal>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.IntegerTextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "MaxDigits", typeof(int), true, new NoValueValueProvider(), textboxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DecimalPrecisionValidatorAttribute)));

            int maxDigits = parameters.GetParameter<int>("MaxDigits");

            codeAttributeDeclaration.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(maxDigits)));

            return new ConstructorBasedPropertyValidatorBuilder<decimal>(codeAttributeDeclaration, new DecimalPrecisionValidatorAttribute(28, maxDigits));
        }
	}
}
