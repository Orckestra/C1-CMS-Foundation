using System;

namespace Composite.Functions
{
    /// <summary>
    /// Put this attribute on properties to make C1 CMS skip them when infering C1 Function parameters from a class.
    /// 
    /// If you need a property on your class, but do not want this property to be part of the C1 Function signature use this attrobute.
    /// </summary>
    /// <example>
    /// Here is an example of how to use <see cref="FunctionParameterIgnoreAttribute" /> to make C1 CMS skip a property when infering parameters:
    /// <code>
    /// [FunctionParameterIgnore()]
    /// public int ItemCount { get; set; } 
    /// </code>
    /// </example>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public sealed class FunctionParameterIgnoreAttribute : Attribute
	{
        /// <summary>
        /// Declare that a property should be ignored as a C1 Function parameter. 
        /// </summary>
        public FunctionParameterIgnoreAttribute()
        {
        }
    }
}
