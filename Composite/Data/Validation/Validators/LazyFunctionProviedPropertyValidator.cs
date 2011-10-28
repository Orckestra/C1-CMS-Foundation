using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Data.Validation.Validators
{
    internal class LazyFunctionProviedPropertyValidator : Validator
    {
        public LazyFunctionProviedPropertyValidator()
            : base("", "")
        {                    
        }


        protected override string DefaultMessageTemplate
        {
            get { return ""; }
        }


        protected override void DoValidate(object objectToValidate, object currentTarget, string key, ValidationResults validationResults)
        {            
        }
    }
}
