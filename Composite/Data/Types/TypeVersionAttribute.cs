using System;


namespace Composite.Data
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Obsolete("This is no longer used in C1. From version 3.0", true)]
    public sealed class TypeVersionAttribute : Attribute
    {
        /// <exclude />
        public TypeVersionAttribute(int version)
        {
            this.Version = version;
        }

        /// <exclude />
        public int Version { get; private set; }
    }
}
