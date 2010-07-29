using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
