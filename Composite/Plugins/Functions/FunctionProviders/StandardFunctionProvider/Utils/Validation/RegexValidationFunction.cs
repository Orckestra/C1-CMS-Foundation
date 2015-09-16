using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data.Validation;
using Composite.Data.Validation.Validators;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    internal sealed class RegexValidationFunction : StandardFunctionBase
    {
        public RegexValidationFunction(EntityTokenFactory entityTokenFactory)
            : base("RegularExpressionValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<string>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "pattern", typeof(string), true, new NoValueValueProvider(), StandardWidgetFunctions.TextBoxWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(RegexValidatorAttribute)));
            
            string pattern = parameters.GetParameter<string>("pattern");

            codeAttributeDeclaration.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(pattern)));

            return new ConstructorBasedPropertyValidatorBuilder<string>(codeAttributeDeclaration, new RegexValidatorAttribute(pattern));
        }
    }
}
