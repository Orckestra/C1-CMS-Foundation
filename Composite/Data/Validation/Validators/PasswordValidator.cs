using System;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Data.Validation.Validators
{
    [Obsolete("No longer used")]
    internal class PasswordValidator : Validator
	{
        public PasswordValidator()
            : base("The password is not good enough", "password")
        {
        }


        protected override string DefaultMessageTemplate
        {
            get { return "The password is not good enough"; }
        }


        protected override void DoValidate(object objectToValidate, object currentTarget, string key, ValidationResults validationResults)
        {
            string password = objectToValidate as string;

            if (password != null)
            {
                if (password.Length < 6)
                {
                    LogValidationResult(validationResults, "The password should have a minimum length of 6", currentTarget, key);
                }
            }
        }
    }
}
