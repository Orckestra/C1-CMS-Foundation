
using Composite.C1Console.Elements;
namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class ClientLabeledProperty
	{
        /// <exclude />
        public ClientLabeledProperty()
        { }

        /// <exclude />
        public ClientLabeledProperty(LabeledProperty labeledProperty)
        {
            this.Name = labeledProperty.Name;
            this.Label = labeledProperty.Label;
            this.Value = labeledProperty.Value;
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
