using System;


namespace Composite.Data
{
#warning MRJ: BM: Remove all references to this class
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("This is no longer used in C1. From version 3.0")]
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
