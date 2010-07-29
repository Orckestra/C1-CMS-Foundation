using System;


namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class BuildManagerAssemblyVersionAttribute : Attribute
	{
        public BuildManagerAssemblyVersionAttribute(int version)
        {
            this.Version = version;
        }


        public int Version
        {
            get;
            private set;
        }
	}
}
