using System;


namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to select what property should be used as label when enumerating data.
    /// </summary>
    /// <example> This sample shows how to use the LabelPropertyName attribute.
    /// <code>
    /// [LabelPropertyName("Title")]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     string Title { get; set; }
    ///     
    ///     // other data type properties
    /// }
    /// </code>
    /// </example>    
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
	public sealed class LabelPropertyNameAttribute : Attribute
	{
        /// <exclude />
        public LabelPropertyNameAttribute(string propertyName)
        {
            this.PropertyName = propertyName;
        }


        /// <exclude />
        public string PropertyName
        {
            get;
            private set;
        }
	}
}
