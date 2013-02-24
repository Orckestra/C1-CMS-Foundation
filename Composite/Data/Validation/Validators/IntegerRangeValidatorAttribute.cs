using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that an integer has a value than falls within a minimum and maximum value. 
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class IntegerRangeValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        /// <summary>
        /// Validator rule for data type properties.
        /// Validate that an integer has a value than falls within a minimum and maximum value. 
        /// </summary>    
        public IntegerRangeValidatorAttribute(int lowerBound, int upperBound)
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
            return new Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RangeValidator<int>(
                this.LowerBound,
                Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RangeBoundaryType.Inclusive,
                this.UpperBound,
                Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RangeBoundaryType.Inclusive);
        }
    }
}
