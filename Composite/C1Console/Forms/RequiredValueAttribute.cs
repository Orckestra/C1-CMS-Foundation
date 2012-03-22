using System;

namespace Composite.C1Console.Forms
{
    /// <exclude />
    [AttributeUsage(AttributeTargets.Property, AllowMultiple=false, Inherited=true)]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class RequiredValueAttribute : Attribute
    {
    }
}
