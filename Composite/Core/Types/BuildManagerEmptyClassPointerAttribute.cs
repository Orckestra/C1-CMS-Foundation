using System;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
	public sealed class BuildManagerEmptyClassPointerAttribute : Attribute
	{
        public BuildManagerEmptyClassPointerAttribute(string interfaceNamespaceName, string interfaceTypeName)
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
