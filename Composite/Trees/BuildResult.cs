using System.Collections.Generic;


namespace Composite.Trees
{
	public sealed class BuildResult
	{
        private List<ValidationError> _validationError = new List<ValidationError>();


        public void AddValidationError(ValidationError validationError)
        {
            Verify.IsNotNull(validationError, "validationError");

            _validationError.Add(validationError);
        }



        public IEnumerable<ValidationError> ValidationErrors 
        {
            get
            {
                foreach (ValidationError validationError in _validationError)
                {
                    yield return validationError;
                }
            }
        }
	}
}
