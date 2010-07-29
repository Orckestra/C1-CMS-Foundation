using System;


namespace Composite.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerCompileUnitIdAttribute : Attribute
	{
        public BuildManagerCompileUnitIdAttribute(string id)
        {
            this.Id = id;
        }



        public string Id
        {
            get;
            private set;
        }
	}
}
