using System;


namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to give it a human readable title to be used in the C1 Console
    /// </summary>
    /// <example> This sample shows how to use the Title attribute.
    /// <code>
    /// [Title("My Data Type")]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     // data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
	public sealed class TitleAttribute : Attribute
	{
        /// <summary>
        /// Set the title
        /// </summary>
        /// <param name="title">The (human readable) title to give the data type</param>
        public TitleAttribute(string title)
        {
            this.Title = title;
        }


        /// <exclude />
        public string Title
        {
            get;
            private set;
        }
	}
}
