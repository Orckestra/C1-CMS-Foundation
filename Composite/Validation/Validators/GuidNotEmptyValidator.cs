using System;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Validation.Validators
{
    internal class GuidNotEmptyValidator : Validator
	{
        public GuidNotEmptyValidator()
            : base("Empty guid value not allowed", "value")
        {
        }


        protected override string DefaultMessageTemplate
        {
            get { return "Empty guid value not allowed"; }
        }


        protected override void DoValidate(object objectToValidate, object currentTarget, string key, ValidationResults validationResults)
        {
            Guid guid = (Guid)objectToValidate;

            if (guid == Guid.Empty)
            {
                LogValidationResult(validationResults, "Empty value not allowed", currentTarget, key);
            }
        }
    }
}
