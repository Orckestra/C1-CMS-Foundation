using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class StringSizeValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        /// <exclude />
        public StringSizeValidatorAttribute(int lowerBound, int upperBound)
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
            return new Microsoft.Practices.EnterpriseLibrary.Validation.Validators.StringLengthValidator(
                this.LowerBound,
                Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RangeBoundaryType.Inclusive,
				this.UpperBound,
                Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RangeBoundaryType.Inclusive,
				Negated);
        }
    }
}
