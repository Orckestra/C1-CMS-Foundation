using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class DecimalPrecisionValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
    {
        /// <exclude />
        [Obsolete("Use constructor that allow for both precision and scale")]
        public DecimalPrecisionValidatorAttribute(int digits)
        {
            this.Precision = digits + 10; // uneducated guess
            this.Scale = digits;
        }


        /// <summary>
        /// Creates a decimal precision validator
        /// </summary>
        /// <param name="precision">Digits in total</param>
        /// <param name="scale">Digits after decimal point</param>
        public DecimalPrecisionValidatorAttribute(int precision, int scale)
        {
            if (precision < scale) throw new ArgumentException("Precision cannot be less than scale", "precision");

            this.Precision = precision;
            this.Scale = scale;
        }


        /// <summary>
        /// Number of digits after decimal point - normally you would call this scale.
        /// </summary>
        [Obsolete("Use 'Scale'")]
        public int Digits
        {
            get { return this.Scale; }
        }


        /// <summary>
        /// Number of digits after the separator
        /// </summary>
        public int Scale
        {
            get;
            private set;
        }

        /// <summary>
        /// Number of digits in total
        /// </summary>
        public int Precision
        {
            get;
            private set;
        }


        /// <exclude />
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new DecimalPrecisionValidator();
        }
    }
}
