using System;

namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to prevent it from being referenced by other data types
    /// </summary>
    /// <example> This sample shows how to use the NotReferenceable attribute.
    /// <code>
    /// [NotReferenceable()]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     // data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]    
    public sealed class NotReferenceableAttribute : Attribute
    {
    }
}
