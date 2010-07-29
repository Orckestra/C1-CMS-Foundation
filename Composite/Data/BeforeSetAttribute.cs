using System;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
