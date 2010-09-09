using System;


namespace Composite.C1Console.Forms
{
    /// <summary>
    /// Defines that a property should be visuble / accessible in the forms environment.
    /// </summary>
    /// <exclude />    
    [AttributeUsage(AttributeTargets.Property,AllowMultiple=false,Inherited=true)]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FormsPropertyAttribute : Attribute
    {
    }
}