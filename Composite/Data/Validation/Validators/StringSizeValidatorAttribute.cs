using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that a string has a length than falls within a minimum and maximum length. 
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class StringSizeValidatorAttribute : ValueValidatorAttribute
	{
        /// <summary>
        /// Validator rule for data type properties.
        /// Validate that a string has a length than falls within a minimum and maximum length. 
        /// </summary>
        /// <param name="lowerBound">minimum</param>
        /// <param name="upperBound">maximum</param>
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
            int lowerBound = Math.Min(LowerBound, UpperBound);
            int upperBound = Math.Max(LowerBound, UpperBound);

            return new StringLengthValidator(
                lowerBound, RangeBoundaryType.Inclusive,
                upperBound, RangeBoundaryType.Inclusive,
				Negated);
        }
    }
}
