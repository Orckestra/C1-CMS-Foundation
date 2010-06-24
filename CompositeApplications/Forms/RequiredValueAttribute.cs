using System;

namespace Composite.Forms
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple=false, Inherited=true)]
    public sealed class RequiredValueAttribute : Attribute
    {
    }
}
