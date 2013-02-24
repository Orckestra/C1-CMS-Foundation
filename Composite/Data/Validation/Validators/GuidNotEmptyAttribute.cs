using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// Validator rule for data type properties.
    /// Validate that a Guid is not Guid.Empty. 
    /// </summary>    
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class GuidNotEmptyAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        /// <summary>
        /// Validator rule for data type properties.
        /// Validate that a Guid is not Guid.Empty. 
        /// </summary>    
        public GuidNotEmptyAttribute()
        {
        }


        /// <exclude />
        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new GuidNotEmptyValidator();
        }
    }
}
