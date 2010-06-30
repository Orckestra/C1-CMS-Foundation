using System;
using System.Text.RegularExpressions;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Validation.Validators
{
    /// <summary>
    /// Represents a <see cref="RegexValidator"/>.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class RegexValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        public RegexValidatorAttribute(string pattern)
        {
            this.Pattern = pattern;
        }


        public string Pattern
        {
            get;
            private set;
        }


        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new Microsoft.Practices.EnterpriseLibrary.Validation.Validators.RegexValidator(
                this.Pattern,
                null,
                null, 
                RegexOptions.None,
                this.MessageTemplate,
                Negated);
        }
    }

}
