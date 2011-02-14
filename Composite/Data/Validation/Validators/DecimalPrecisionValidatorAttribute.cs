using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class DecimalPrecisionValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        /// <exclude />
        public DecimalPrecisionValidatorAttribute(int digits)
        {
            this.Digits = digits;
        }


        /// <exclude />
        public int Digits
        {
            get;
            private set;
        }


        /// <exclude />
        public int Precision
        {
            get { return 10; /* Hardcoded for now */ }
        }


        /// <exclude />
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new DecimalPrecisionValidator();
        }
    }
}
