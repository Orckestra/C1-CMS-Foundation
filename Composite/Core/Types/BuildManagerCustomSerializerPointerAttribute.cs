using System;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerCustomSerializerPointerAttribute : Attribute
	{
        /// <exclude />
        public BuildManagerCustomSerializerPointerAttribute(string propertyClassNamespaceName, string propertyClassTypeName)
        {
            this.PropertyClassNamespaceName = propertyClassNamespaceName;
            this.PropertyClassTypeName = propertyClassTypeName;
        }


        /// <exclude />
        public string PropertyClassNamespaceName
        {
            get;
            private set;
        }


        /// <exclude />
        public string PropertyClassTypeName
        {
            get;
            private set;
        }
	}
}
