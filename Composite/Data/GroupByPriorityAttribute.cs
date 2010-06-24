using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public sealed class GroupByPriorityAttribute : Attribute
	{
        public GroupByPriorityAttribute(int priority)
        {
            this.Priority = priority;
        }


        public int Priority { get; set; }
	}
}
