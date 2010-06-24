using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
	public sealed class LabelPropertyNameAttribute : Attribute
	{
        public LabelPropertyNameAttribute(string propertyName)
        {
            this.PropertyName = propertyName;
        }


        public string PropertyName
        {
            get;
            private set;
        }
	}
}
