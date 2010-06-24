using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Validation;
using Composite.Validation.Validators;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    public sealed class DecimalPrecisionValidationFunction : StandardFunctionBase
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
                    "MaxDigits", typeof(int),true,new NoValueValueProvider(),StandardWidgetFunctions.IntegerTextBoxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DecimalPrecisionValidatorAttribute)));

            int maxDigits = parameters.GetParameter<int>("MaxDigits");

            codeAttributeDeclaration.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(maxDigits)));

            return new ConstrucorBasedPropertyValidatorBuilder<decimal>(codeAttributeDeclaration, new DecimalPrecisionValidatorAttribute(maxDigits));
        }
	}
}
