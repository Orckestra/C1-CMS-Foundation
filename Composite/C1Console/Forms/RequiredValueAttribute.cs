using System;

namespace Composite.C1Console.Forms
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple=false, Inherited=true)]
    internal sealed class RequiredValueAttribute : Attribute
    {
    }
}
