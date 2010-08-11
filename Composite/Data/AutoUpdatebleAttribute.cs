using System;


namespace Composite.Data
{
#warning RELEASE: Missing documentation
    /// <summary>
    /// IData types decorated with this attribute will be have their store auto created
    /// and updated if the interface changes.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
	public sealed class AutoUpdatebleAttribute : Attribute
	{
        public AutoUpdatebleAttribute()
        {
        }
	}
}
