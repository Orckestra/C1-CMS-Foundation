using System;


namespace Composite.Data
{
    /// <summary>
    /// IData types decorated with this attribute will be have their store auto created and updated if the interface changes. 
    /// You should use this attribute for data types that Orckestra CMS should be able to auto support via data providers.
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
	public sealed class AutoUpdatebleAttribute : Attribute
	{
        /// <exclude />
        public AutoUpdatebleAttribute()
        {
        }
	}
}
