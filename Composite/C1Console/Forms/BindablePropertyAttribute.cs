using System;


namespace Composite.C1Console.Forms
{
    /// <summary>
    /// Defines that a property supports data binding. This attribute should only be assigned to updateable fields.
    /// </summary>
    /// <exclude />    
    [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class BindablePropertyAttribute : Attribute
    {
    }
}