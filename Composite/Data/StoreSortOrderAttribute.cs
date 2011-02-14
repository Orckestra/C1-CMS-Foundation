using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class StoreSortOrderAttribute : Attribute
    {
        /// <exclude />
        public StoreSortOrderAttribute(params string[] sortOrder)
        {
            this.SortOrder = sortOrder;
        }


        /// <exclude />
        public string[] SortOrder
        {
            get;
            private set;
        }
    }
}
