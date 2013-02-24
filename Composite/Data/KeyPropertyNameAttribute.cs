using System;
using System.Collections.Generic;

namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to specify one or more primary key fields.
    /// </summary>
    /// <example> This sample shows how to use the KeyPropertyName attribute:
    /// <code>
    /// [KeyPropertyName("Id")]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     Guid Id { get; set; }
    ///     
    ///     // other data type properties
    /// }
    /// </code>
    /// 
    /// This example shows how to specify a compound key:
    /// <code>
    /// [KeyPropertyName("FolderName")]
    /// [KeyPropertyName("FileName")]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     string FolderName { get; set; }
    ///     string FileName { get; set; }
    ///     
    ///     // other data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class KeyPropertyNameAttribute : Attribute
    {
        /// <summary>
        /// Specify the name of a data property to be used as primary key.
        /// </summary>
        /// <param name="propertyName">Name of data property</param>
        public KeyPropertyNameAttribute(string propertyName)
        {
            this.KeyPropertyName = propertyName;
        }


        /// <exclude />
        public string KeyPropertyName
        {
            get;
            private set;
        }
    }
}
