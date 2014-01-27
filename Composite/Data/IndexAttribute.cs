using System;
using System.Collections.Generic;

namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to define an additional index to a tables representing the data type.
    /// </summary>
    /// <example> This sample shows how to use the KeyPropertyName attribute:
    /// <code>
    /// [KeyPropertyName("Id")] 
    /// [Index("FolderName", IndexDirection.Ascending, "FileName", IndexDirection.Descending)]
    /// interface IMyDataType : IData
    /// {
    ///     Guid Id { get; set; }
    ///     string FolderName { get; set; }
    ///     string FileName { get; set; }
    ///     
    ///     // other data type properties
    /// }
    /// </code>
    /// </example>  
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class IndexAttribute: Attribute
    {
        private readonly IReadOnlyCollection<Tuple<string, IndexDirection>> _fields;

        /// <exclude />
        public IndexAttribute(string fieldName, IndexDirection indexDirection)
        {
            _fields = new List<Tuple<string, IndexDirection>>
            {
                new Tuple<string, IndexDirection>(fieldName, indexDirection)
            };
        }

        /// <exclude />
        public IndexAttribute(string field1Name, IndexDirection indexDirection1,
                              string field2Name, IndexDirection indexDirection2)
        {
            _fields = new List<Tuple<string, IndexDirection>>
            {
                new Tuple<string, IndexDirection>(field1Name, indexDirection1),
                new Tuple<string, IndexDirection>(field2Name, indexDirection2)
            };
        }

        /// <exclude />
        public IndexAttribute(string field1Name, IndexDirection indexDirection1,
                              string field2Name, IndexDirection indexDirection2,
                              string field3Name, IndexDirection indexDirection3)
        {
            _fields = new List<Tuple<string, IndexDirection>>
            {
                new Tuple<string, IndexDirection>(field1Name, indexDirection1),
                new Tuple<string, IndexDirection>(field2Name, indexDirection2),
                new Tuple<string, IndexDirection>(field3Name, indexDirection3)
            };
        }

        /// <exclude />
        public IndexAttribute(string field1Name, IndexDirection indexDirection1,
                              string field2Name, IndexDirection indexDirection2,
                              string field3Name, IndexDirection indexDirection3,
                              string field4Name, IndexDirection indexDirection4)
        {
            _fields = new List<Tuple<string, IndexDirection>>
            {
                new Tuple<string, IndexDirection>(field1Name, indexDirection1),
                new Tuple<string, IndexDirection>(field2Name, indexDirection2),
                new Tuple<string, IndexDirection>(field3Name, indexDirection3),
                new Tuple<string, IndexDirection>(field4Name, indexDirection4)
            };
        }

        /// <exclude />
        public IndexAttribute(string field1Name, IndexDirection indexDirection1,
                              string field2Name, IndexDirection indexDirection2,
                              string field3Name, IndexDirection indexDirection3,
                              string field4Name, IndexDirection indexDirection4,
                              string field5Name, IndexDirection indexDirection5)
        {
            _fields = new List<Tuple<string, IndexDirection>>
            {
                new Tuple<string, IndexDirection>(field1Name, indexDirection1),
                new Tuple<string, IndexDirection>(field2Name, indexDirection2),
                new Tuple<string, IndexDirection>(field3Name, indexDirection3),
                new Tuple<string, IndexDirection>(field4Name, indexDirection4),
                new Tuple<string, IndexDirection>(field5Name, indexDirection5)
            };
        }

        /// <summary>
        /// Gets the list of fields
        /// </summary>
        public IReadOnlyCollection<Tuple<string, IndexDirection>> Fields
        {
            get { return _fields; }
        }

        /// <summary>
        /// Defines whether current index is clustered. Only one index per data type can be choosen as clustered.
        /// </summary>
        public bool Clustered { get; set; }
    }
}
