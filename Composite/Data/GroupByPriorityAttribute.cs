using System;


namespace Composite.Data
{
    /// <summary>
    /// Assign this to properties on your IData interfaces to control default page foldering of tree items.
    /// </summary>
	public sealed class GroupByPriorityAttribute : Attribute
	{
        /// <summary>
        /// Specify that this field should be used for default tree foldering.
        /// Multiple fields on a data type may create foldering. In that case the priority has importance.
        /// </summary>
        /// <param name="priority">Priority controls which fields are used first when foldering. Low number win.</param>
        public GroupByPriorityAttribute(int priority)
        {
            this.Priority = priority;
        }


        /// <summary>
        /// Priority for foldering.
        /// </summary>
        public int Priority { get; set; }
	}
}
