using System.Collections.Generic;


namespace Composite.C1Console.Trees
{
    /// <summary>  
    /// Contains information about tree validation errors
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class BuildResult
	{
        private readonly List<ValidationError> _validationErrors = new List<ValidationError>();


        /// <exclude />
        public void AddValidationError(ValidationError validationError)
        {
            Verify.IsNotNull(validationError, "validationError");

            _validationErrors.Add(validationError);
        }


        /// <exclude />
        public IEnumerable<ValidationError> ValidationErrors 
        {
            get { return _validationErrors; }
        }
	}
}
