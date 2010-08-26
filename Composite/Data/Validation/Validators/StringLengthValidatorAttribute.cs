using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class StringLengthValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        public StringLengthValidatorAttribute(int lowerBound, int upperBound)
        {
            this.LowerBound = lowerBound;
            this.UpperBound = upperBound;
        }


        public int LowerBound
        {
            get;
            private set;
        }


        public int UpperBound
        {
            get;
            private set;
        }


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
