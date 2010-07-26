using System;

namespace Composite.Forms
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple=false, Inherited=true)]
    internal sealed class RequiredValueAttribute : Attribute
    {
    }
}
