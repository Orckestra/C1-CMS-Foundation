using System;
using System.Text.RegularExpressions;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Represents a <see cref="RegexValidator"/>.
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class RegexValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        /// <summary>
        /// Validator rule for data type properties.
        /// Represents a <see cref="RegexValidator"/>.
        /// </summary>    
        public RegexValidatorAttribute(string pattern)
        {
            this.Pattern = pattern;
        }


        /// <exclude />
        public string Pattern
        {
            get;
            private set;
        }



        /// <exclude />
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
