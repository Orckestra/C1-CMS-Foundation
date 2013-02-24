using System;


namespace Composite.Data
{
    /// <summary>
    /// Assign this to properties on your IData interfaces to control default ordering of tree items.
    /// </summary>
    /// <example> This sample shows how to use the TreeOrdering attribute.
    /// <code>
    /// // data interface attributes ...
    /// interface IMyDataType : IData
    /// {
    ///     [TreeOrdering(1)]
    ///     [StoreFieldType(PhysicalStoreFieldType.String, 40)]
    ///     [ImmutableFieldId("{D75EA67F-AD14-4BAB-8547-6D87002809F1}")]
    ///     string ProductName { get; set; }
    ///     
    ///     // more data properties ...
    ///     
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public sealed class TreeOrderingAttribute : Attribute
	{
        /// <summary>
        /// Specify that this field should be used for default tree node ordering. Order is by default ascending.
        /// Multiple fields on a data type may have ordering. In that case the orderPriority has importance.
        /// </summary>
        /// <param name="orderPriority">Priority controls which fields are used first when ordering. Low number win.</param>
        public TreeOrderingAttribute(int orderPriority)
        {
            this.Priority = orderPriority;
        }

        /// <summary>
        /// Specify that this field should be used for default tree node ordering. Order is by default ascending.
        /// Multiple fields on a data type may have ordering. In that case the orderPriority has importance.
        /// </summary>
        /// <param name="orderPriority">Priority controls which fields are used first when ordering. Low number win.</param>
        /// <param name="orderDescending">When true this field will be used in descending (Z-A) order.</param>
        public TreeOrderingAttribute(int orderPriority, bool orderDescending)
        {
            this.Priority = orderPriority;
            this.Descending = orderDescending;
        }


        /// <summary>
        /// Priority for ordering. When multiple fields have this attribute attached this field is used. Low number win.
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// When true descending order (Z-A) will be used.
        /// </summary>
        public bool Descending { get; set; }
    }
}
