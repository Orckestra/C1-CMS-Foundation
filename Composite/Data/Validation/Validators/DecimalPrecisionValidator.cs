using System.Globalization;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Composite.Data.Validation.Validators
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
            if(objectToValidate == null)
            {
                // Skipping valudation if optional decimal is a null
                return;
            }

            var number = (decimal)objectToValidate;

            List<DecimalPrecisionValidatorAttribute> attributes = currentTarget.GetType().GetProperty(key).GetCustomAttributesRecursively<DecimalPrecisionValidatorAttribute>().ToList();
            var validatiorAttribute = attributes[0];

            if (number != Decimal.Round(number, validatiorAttribute.Scale))
            {

                LogValidationResult(validationResults, GetString("Validation.Decimal.SymbolsAfterPointAllowed").FormatWith(validatiorAttribute.Scale), currentTarget, key);
                return;
            }

            string str = number.ToString(CultureInfo.InvariantCulture);
            int separatorIndex = str.IndexOf('.');
            if(separatorIndex > 0)
            {
                str = str.Substring(0, separatorIndex);
            }

            if (str.StartsWith("-")) str = str.Substring(1);

            int allowedDigitsBeforeSeparator = validatiorAttribute.Precision - validatiorAttribute.Scale;
            if (str.Length > allowedDigitsBeforeSeparator)
            {
                LogValidationResult(validationResults, GetString("Validation.Decimal.SymbolsBeforePointAllowed").FormatWith(allowedDigitsBeforeSeparator), currentTarget, key);
            }
        }

        private static string GetString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }
    }
}
