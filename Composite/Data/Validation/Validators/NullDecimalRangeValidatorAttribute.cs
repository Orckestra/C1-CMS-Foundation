using System;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that an nullable decimal - when not null - has a value than falls within a minimum and maximum value. 
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class NullDecimalRangeValidatorAttribute : ValueValidatorAttribute
    {
        /// <summary>
        /// Validator rule for data type properties.
        /// Validate that an nullable decimal - when not null - has a value than falls within a minimum and maximum value. 
        /// </summary>    
        public NullDecimalRangeValidatorAttribute(decimal lowerBound, decimal upperBound)
        {
            this.LowerBound = lowerBound;
            this.UpperBound = upperBound;
        }


        /// <exclude />
        public decimal LowerBound
        {
            get;
            private set;
        }


        /// <exclude />
        public decimal UpperBound
        {
            get;
            private set;
        }


        /// <exclude />
        protected override Validator DoCreateValidator(Type targetType)
        {
            return new NullableDecimalRangeValidator(new RangeValidator<decimal>(
                this.LowerBound, RangeBoundaryType.Inclusive,
                this.UpperBound, RangeBoundaryType.Inclusive));
        }

        private class NullableDecimalRangeValidator : Validator<decimal?>
        {
            private readonly RangeValidator<decimal> _innerValidator;

            public NullableDecimalRangeValidator(RangeValidator<decimal> innerValidator)
                : base(null, null)
            {
                _innerValidator = innerValidator;
            }

            protected override string DefaultMessageTemplate
            {
                get { return _innerValidator.MessageTemplate; }
            }

            protected override void DoValidate(decimal? objectToValidate, object currentTarget, string key, ValidationResults validationResults)
            {
                if (objectToValidate == null)
                {
                    return;
                }

                validationResults.AddAllResults(_innerValidator.Validate(objectToValidate.Value));
            }
        }
    }
}
