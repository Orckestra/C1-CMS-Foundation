using System.Globalization;
using Composite.Extensions;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Composite.Validation.Validators
{
    internal sealed class DecimalPrecisionValidator : Validator
    {
        public DecimalPrecisionValidator()
            : base("To many digits", "decimal")
        {
        }


        protected override string DefaultMessageTemplate
        {
            get { return "To many digits"; }
        }


        protected override void DoValidate(object objectToValidate, object currentTarget, string key, ValidationResults validationResults)
        {
            // TODO: localize validation messages

            decimal number = (decimal)objectToValidate;

            List<DecimalPrecisionValidatorAttribute> attributes = currentTarget.GetType().GetProperty(key).GetCustomAttributesRecursively<DecimalPrecisionValidatorAttribute>().ToList();
            var validatiorAttribute = attributes[0];

            if (number != Decimal.Round(number, validatiorAttribute.Digits))
            {
                LogValidationResult(validationResults, "Only {0} digit(s) after decimal point allowed".FormatWith(attributes[0].Digits), currentTarget, key);
                return;
            }

            string str = number.ToString(CultureInfo.InvariantCulture);
            int separatorIndex = str.IndexOf(".");
            if(separatorIndex > 0)
            {
                str = str.Substring(0, separatorIndex);
            }

            if (str.StartsWith("-")) str = str.Substring(1);

            int allowedDigitsBeforeSeparator = validatiorAttribute.Precision - validatiorAttribute.Digits;
            if (str.Length > allowedDigitsBeforeSeparator)
            {
                LogValidationResult(validationResults, "Only {0} digit(s) before decimal point allowed".FormatWith(allowedDigitsBeforeSeparator), currentTarget, key);
            }
        }
    }
}
