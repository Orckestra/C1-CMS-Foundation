using System;


namespace Composite.Data.ProcessControlled
{   
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    internal sealed class IgnoreActionAttribute : Attribute
	{
        public IgnoreActionAttribute(string actionTypeName)
        {
            this.ActionTypeName = actionTypeName;
        }


        public string ActionTypeName
        {
            get;
            private set;
        }
	}
}
