using System;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class BuildManagerCompileUnitIdAttribute : Attribute
	{
        /// <exclude />
        public BuildManagerCompileUnitIdAttribute(string id)
        {
            this.Id = id;
        }



        /// <exclude />
        public string Id
        {
            get;
            private set;
        }
	}
}
