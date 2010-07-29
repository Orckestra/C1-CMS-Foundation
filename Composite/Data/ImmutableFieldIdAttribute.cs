using System;


namespace Composite.Data
{
    /// <summary>
    /// Assigns an immutable id to this property. The id must be unique and is used to identify the property even if 
    /// the name should change. The Dynamic Type system uses this value to detect data schema changes.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class ImmutableFieldIdAttribute : Attribute
    {
        public ImmutableFieldIdAttribute(string immutableFieldId)
        {
            this.ImmutableFieldId = new Guid(immutableFieldId);
        }

        public Guid ImmutableFieldId { get; set; }
    }
}
