using System;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class CachingAttribute : Attribute
	{
        /// <exclude />
        public CachingAttribute(CachingType cachingType)
        {
            this.CachingType = cachingType;
        }


        /// <exclude />
        public CachingType CachingType
        {
            get;
            private set;
        }
	}



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum CachingType
    {
        /// <exclude />
        Full,

        /// <exclude />
        None
    }
}
