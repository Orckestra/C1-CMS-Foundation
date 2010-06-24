using System;


namespace Composite.Forms
{
    /// <summary>
    /// Defines that a property supports data binding. This attribute should only be assigned to updateable fields.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
    public sealed class BindablePropertyAttribute : Attribute
    {
    }
}