using System;


namespace Composite.Validation.Validators
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    internal sealed class DecimalPrecisionValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        public DecimalPrecisionValidatorAttribute(int digits)
        {
            this.Digits = digits;
        }


        public int Digits
        {
            get;
            private set;
        }

        public int Precision
        {
            get { return 10; /* Hardcoded for now */ }
        }


        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new DecimalPrecisionValidator();
        }
    }
}
