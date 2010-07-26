using System;

namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true, Inherited = true)]
	public sealed class BeforeSetAttribute : Attribute
	{
        public BeforeSetAttribute(Type beforeSetHandlerType)
        {
            this.BeforeSetHandlerType = beforeSetHandlerType;
        }


        public Type BeforeSetHandlerType
        {
            get;
            private set;
        }
	}
}
