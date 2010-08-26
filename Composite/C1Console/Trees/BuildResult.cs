using System.Collections.Generic;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
