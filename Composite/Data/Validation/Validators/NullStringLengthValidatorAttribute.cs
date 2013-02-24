using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that a string - when not null - has a length than falls within a minimum and maximum length. 
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class NullStringLengthValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        /// <summary>
        /// Validator rule for data type properties.
        /// Validate that a string - when not null - has a length than falls within a minimum and maximum length. 
        /// </summary>    
        public NullStringLengthValidatorAttribute(int lowerBound, int upperBound)
        {
            this.LowerBound = lowerBound;
            this.UpperBound = upperBound;
        }


        /// <exclude />
        public int LowerBound
        {
            get;
            private set;
        }


        /// <exclude />
        public int UpperBound
        {
            get;
            private set;
        }


        /// <exclude />
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new NullStringLengthValidator(this.LowerBound, this.UpperBound);
        }
	}
}
