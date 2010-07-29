using System;


namespace Composite.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class GuidNotEmptyAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        public GuidNotEmptyAttribute()
        {
        }


        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new GuidNotEmptyValidator();
        }
    }
}
