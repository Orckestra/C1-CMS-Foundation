using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Validation;
using Composite.Validation.Validators;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    public sealed class PasswordValidationValidationFunction : StandardFunctionBase
	{
        public PasswordValidationValidationFunction(EntityTokenFactory entityTokenFactory)
            : base("PasswordValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<string>), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(StringSizeValidatorAttribute)));

            return new ConstrucorBasedPropertyValidatorBuilder<string>(codeAttributeDeclaration, new PasswordValidatorAttribute());
        }
	}
}
