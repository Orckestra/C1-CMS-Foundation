using System;

namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
	public sealed class BuildManagerDataWrapperClassPointerAttribute : Attribute
	{
        public BuildManagerDataWrapperClassPointerAttribute(string interfaceNamespaceName, string interfaceTypeName)
        {
            this.InterfaceNamespaceName = interfaceNamespaceName;
            this.InterfaceTypeName = interfaceTypeName;
        }


        public string InterfaceNamespaceName
        {
            get;
            private set;
        }


        public string InterfaceTypeName
        {
            get;
            private set;
        }
	}
}
