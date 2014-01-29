using System;
using System.Globalization;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that a Nullable&lt;DateTime&gt; - when not null - has a value than falls within a minimum and maximum value. 
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class NullDateTimeRangeValidatorAttribute : ValueValidatorAttribute
    {
        private readonly DateTime _lowerBound;
        private readonly DateTime _upperBound;
        private readonly RangeBoundaryType _upperBoundType;
        private readonly RangeBoundaryType _lowerBoundType;


        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(string upperBound)
            : this(ConvertToISO8601Date(upperBound))
        {
        }

        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(DateTime upperBound)
            : this(DateTime.MinValue, RangeBoundaryType.Ignore, upperBound, RangeBoundaryType.Inclusive)
        {
        }

        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(string lowerBound, string upperBound)
            : this(ConvertToISO8601Date(lowerBound), ConvertToISO8601Date(upperBound))
        {
        }

        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(DateTime lowerBound, DateTime upperBound)
            : this(lowerBound, RangeBoundaryType.Inclusive, upperBound, RangeBoundaryType.Inclusive)
        {
        }

        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(string lowerBound, RangeBoundaryType lowerBoundType, string upperBound, RangeBoundaryType upperBoundType)
            : this(ConvertToISO8601Date(lowerBound), lowerBoundType, ConvertToISO8601Date(upperBound), upperBoundType)
        {
        }

        /// <exclude />
        public NullDateTimeRangeValidatorAttribute(DateTime lowerBound, RangeBoundaryType lowerBoundType, DateTime upperBound, RangeBoundaryType upperBoundType)
        {
            _lowerBound = lowerBound;
            _lowerBoundType = lowerBoundType;
            _upperBound = upperBound;
            _upperBoundType = upperBoundType;
        }

        /// <exclude />
        protected override Validator DoCreateValidator(Type targetType)
        {
            return new NullableDateTimeRangeValidator(new RangeValidator<DateTime>(
                _lowerBound, _lowerBoundType,
                _upperBound, _upperBoundType));
        }

        private static DateTime ConvertToISO8601Date(string iso8601DateString)
        {
            if (string.IsNullOrEmpty(iso8601DateString))
            {
                return new DateTime();
            }

            return DateTime.ParseExact(iso8601DateString, "s", CultureInfo.InvariantCulture);
        }


        private class NullableDateTimeRangeValidator : Validator<DateTime?>
        {
            private readonly RangeValidator<DateTime> _innerValidator;

            public NullableDateTimeRangeValidator(RangeValidator<DateTime> innerValidator)
                : base(null, null)
            {
                _innerValidator = innerValidator;
            }

            protected override string DefaultMessageTemplate
            {
                get { return _innerValidator.MessageTemplate; }
            }

            protected override void DoValidate(DateTime? objectToValidate, object currentTarget, string key, ValidationResults validationResults)
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
