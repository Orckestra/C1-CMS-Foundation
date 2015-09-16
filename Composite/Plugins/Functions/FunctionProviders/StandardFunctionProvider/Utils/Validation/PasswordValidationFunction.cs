using System.CodeDom;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data.Validation;
using Composite.Data.Validation.Validators;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    internal sealed class PasswordValidationValidationFunction : StandardFunctionBase
	{
        public PasswordValidationValidationFunction(EntityTokenFactory entityTokenFactory)
            : base("PasswordValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<string>), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(StringSizeValidatorAttribute)));

            return new ConstructorBasedPropertyValidatorBuilder<string>(codeAttributeDeclaration, new PasswordValidatorAttribute());
        }
	}
}
