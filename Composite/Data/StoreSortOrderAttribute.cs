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
        public StoreSortOrderAttribute(params string[] sortOrder)
        {
            this.SortOrder = sortOrder;
        }


        public string[] SortOrder
        {
            get;
            private set;
        }
    }
}
