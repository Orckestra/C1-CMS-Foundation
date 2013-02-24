using System;


namespace Composite.Data
{
    /// <summary>
    /// Assigns an immutable id to this property. The id must be unique and is used to identify the property even if 
    /// the name should change. The Dynamic Type system uses this value to detect data schema changes.
    /// </summary>
    /// <example> This sample shows how to use the ImmutableFieldId attribute:
    /// <code>
    /// // (IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     [ImmutableFieldId("b3bada55-0e7e-4195-86e6-92770c381df4")]
    ///     string Title { get; set; }
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class ImmutableFieldIdAttribute : Attribute
    {
        /// <summary>
        /// Specify the immutable id of this data type. This value must be unique among types and should not change.
        /// </summary>
        /// <param name="immutableFieldId">Unique GUID string</param>
        public ImmutableFieldIdAttribute(string immutableFieldId)
        {
            this.ImmutableFieldId = new Guid(immutableFieldId);
        }

        /// <exclude />
        public Guid ImmutableFieldId { get; set; }
    }
}
