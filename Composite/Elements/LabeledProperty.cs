
namespace Composite.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class LabeledProperty
	{
        /// <summary>
        /// Initializes a new instance of the LabeledProperty class and sets the label to the specified name.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        public LabeledProperty(string name, string value)
            : this (name, name, value )
        { }

        /// <summary>
        /// Initializes a new instance of the LabeledProperty class.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="label"></param>
        /// <param name="value"></param>
        public LabeledProperty(string name, string label, string value)
        {
            this.Name = name;
            this.Label = label;
            this.Value = value;
        }

        /// <summary>
        /// The name of the property. The name is constant across cultures and is intended as an id other systems can use.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The label the user should see.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// The value of the property
        /// </summary>
        public string Value { get; set; }
	}
}
