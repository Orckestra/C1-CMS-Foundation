using System;


namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to control the physical store sort order of data.
    /// This concept is known as the clustered index on SQL Server.
    /// </summary>
    /// <example> This sample shows how to use the StoreSortOrder attribute.
    /// <code>
    /// [StoreSortOrderAttribute("Date", "Title")]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     // data type properties, must include Date and Title since we ref them above
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class StoreSortOrderAttribute : Attribute
    {
        /// <summary>
        /// Sprcify the names of properties to order data by in the physical store. The specified names must exist as properties on your data type.
        /// </summary>
        /// <param name="sortOrder">Names of properties to order data by in the physical store.</param>
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
