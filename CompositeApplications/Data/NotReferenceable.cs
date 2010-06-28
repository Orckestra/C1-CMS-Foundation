using System;

namespace Composite.Data
{
    /// <summary>
    /// Interfaces that uses this attribute can not be referenced by any
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    internal sealed class NotReferenceableAttribute : Attribute
    {
    }
}
