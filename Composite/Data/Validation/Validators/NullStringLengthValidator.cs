using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Data.Validation.Validators
{
    internal sealed class NullStringLengthValidator : Validator
    {
        private int _lowerBound;
        private int _upperBound;


        public NullStringLengthValidator(int lowerBound, int upperBound)
            : base("The string is either too long or too short", "string")
        {
            _lowerBound = lowerBound;
            _upperBound = upperBound;
        }        


        protected override string DefaultMessageTemplate
        {
            get { return "The string is either too long or too short"; }
        }


        protected override void DoValidate(object objectToValidate, object currentTarget, string key, ValidationResults validationResults)
        {
            if (objectToValidate != null)
            {
                string theString = (string)objectToValidate;

                if ((theString.Length < _lowerBound) ||
                    (theString.Length > _upperBound))
                {
                    LogValidationResult(validationResults, string.Format("The length of the string should be in the range {0} to {1} or null", _lowerBound, _upperBound), currentTarget, key);
                }
            }
        }
    }
}
