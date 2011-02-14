using System;

namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
	public sealed class BuildManagerDataWrapperClassPointerAttribute : Attribute
	{
        /// <exclude />
        public BuildManagerDataWrapperClassPointerAttribute(string interfaceNamespaceName, string interfaceTypeName)
        {
            this.InterfaceNamespaceName = interfaceNamespaceName;
            this.InterfaceTypeName = interfaceTypeName;
        }


        /// <exclude />
        public string InterfaceNamespaceName
        {
            get;
            private set;
        }


        /// <exclude />
        public string InterfaceTypeName
        {
            get;
            private set;
        }
	}
}
