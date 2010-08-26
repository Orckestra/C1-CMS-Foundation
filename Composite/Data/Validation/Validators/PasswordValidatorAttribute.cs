using System;


namespace Composite.Data.Validation.Validators
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public sealed class PasswordValidatorAttribute : Microsoft.Practices.EnterpriseLibrary.Validation.Validators.ValueValidatorAttribute
	{
        public PasswordValidatorAttribute()
        {
        }


        protected override Microsoft.Practices.EnterpriseLibrary.Validation.Validator DoCreateValidator(Type targetType)
        {
            return new PasswordValidator();
        }
    }
}
