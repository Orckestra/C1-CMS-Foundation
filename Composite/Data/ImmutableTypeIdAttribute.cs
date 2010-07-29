using System;


namespace Composite.Data
{
    /// <summary>
    /// Assigns an immutable id to this type. The id must be unique and is used to identify the type even if 
    /// the type name, namespace or version should change. The Dynamic Type system uses this value to detect data schema changes.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple=false,Inherited=true)]
    public class ImmutableTypeIdAttribute : Attribute
    {
        public ImmutableTypeIdAttribute(string immutableTypeId)
        {
            this.ImmutableTypeId = new Guid(immutableTypeId);
        }

        public Guid ImmutableTypeId { get; set; }
    }
}
