using System;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class NullIntegerRangeValidatorAttribute : ValueValidatorAttribute
    {
        /// <exclude />
        public NullIntegerRangeValidatorAttribute(int lowerBound, int upperBound)
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
        protected override Validator DoCreateValidator(Type targetType)
        {
            return new NullableIntRangeValidator(new RangeValidator<int>(
                this.LowerBound, RangeBoundaryType.Inclusive,
                this.UpperBound, RangeBoundaryType.Inclusive));
        }

        private class NullableIntRangeValidator : Validator<int?>
        {
            private readonly RangeValidator<int> _innerValidator;

            public NullableIntRangeValidator(RangeValidator<int> innerValidator)
                : base(null, null)
            {
                _innerValidator = innerValidator;
            }

            protected override string DefaultMessageTemplate
            {
                get { return _innerValidator.MessageTemplate; }
            }

            protected override void DoValidate(int? objectToValidate, object currentTarget, string key, ValidationResults validationResults)
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
