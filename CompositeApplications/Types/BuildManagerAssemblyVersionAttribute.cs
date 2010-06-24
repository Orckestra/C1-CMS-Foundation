using System;


namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class)]
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
