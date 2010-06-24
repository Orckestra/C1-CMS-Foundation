using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
	public sealed class TitleAttribute : Attribute
	{
        public TitleAttribute(string title)
        {
            this.Title = title;
        }


        public string Title
        {
            get;
            private set;
        }
	}
}
