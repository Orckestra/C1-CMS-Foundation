using System;
using System.CodeDom;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data.Validation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Validation
{
    internal sealed class NotNullValidationFunction<T> : StandardFunctionBase
    {
        public NotNullValidationFunction(EntityTokenFactory entityTokenFactory)
            : base(typeof(T).Name + "NotNullValidation", "Composite.Utils.Validation", typeof(PropertyValidatorBuilder<T>), entityTokenFactory)
        {          
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute)));

            return new ConstrucorBasedPropertyValidatorBuilder<string>(codeAttributeDeclaration, new Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute());
        }
    }
}
