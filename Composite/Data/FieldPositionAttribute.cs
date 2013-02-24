using System;


namespace Composite.Data
{
    /// <summary>
    /// Specify the posution of a field as they should be listed by default
    /// </summary>
    /// <example> This sample shows how to use the FieldPosition attribute. 
    /// <code>
    /// // data interface attributes ...
    /// interface IMyDataType : IData
    /// {
    ///     [StoreFieldType(PhysicalStoreFieldType.String, 64)]
    ///     [ImmutableFieldId("{D75EA67F-AD14-4BAB-8547-6D87002709F3}")]
    ///     [FieldPosition(1)]
    ///     string Title { get; set; }
    ///     
    ///     // more data properties ...
    /// }
    /// </code>
    /// </example>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public sealed class FieldPositionAttribute : Attribute
	{
        /// <exclude />
        public FieldPositionAttribute(int position)
        {
            this.Position = position;
        }

        /// <exclude />
        public int Position { get; private set; }
	}
}
