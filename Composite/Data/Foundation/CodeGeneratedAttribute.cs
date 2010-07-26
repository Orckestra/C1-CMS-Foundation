using System;


namespace Composite.Data.Foundation
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    internal sealed class CodeGeneratedAttribute : Attribute
	{
        public CodeGeneratedAttribute()
        {
        }
	}
}
