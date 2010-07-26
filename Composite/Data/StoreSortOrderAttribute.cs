using System;


namespace Composite.Data
{
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
