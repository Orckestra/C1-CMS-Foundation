using System;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
	public sealed class BuildManagerAssemblyVersionAttribute : Attribute
	{
        /// <exclude />
        public BuildManagerAssemblyVersionAttribute(int version)
        {
            this.Version = version;
        }


        /// <exclude />
        public int Version
        {
            get;
            private set;
        }
	}
}
