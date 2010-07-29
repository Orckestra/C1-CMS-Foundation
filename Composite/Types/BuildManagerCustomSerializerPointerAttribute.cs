using System;


namespace Composite.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerCustomSerializerPointerAttribute : Attribute
	{
        public BuildManagerCustomSerializerPointerAttribute(string propertyClassNamespaceName, string propertyClassTypeName)
        {
            this.PropertyClassNamespaceName = propertyClassNamespaceName;
            this.PropertyClassTypeName = propertyClassTypeName;
        }


        public string PropertyClassNamespaceName
        {
            get;
            private set;
        }


        public string PropertyClassTypeName
        {
            get;
            private set;
        }
	}
}
