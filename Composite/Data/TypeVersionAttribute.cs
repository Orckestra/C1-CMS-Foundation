using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
