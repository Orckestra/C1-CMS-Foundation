using System.Xml.Linq;
using System;
using Composite.Functions.Foundation;
using Composite.Core.ResourceSystem;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class HelpDefinition
	{
        /// <exclude />
        public HelpDefinition GetLocalized()
        {
            if (this.HelpText.StartsWith("${"))
            {
                return new HelpDefinition(StringResourceSystemFacade.ParseString(this.HelpText));
            }
            else
            {
                return new HelpDefinition(this.HelpText);
            }
        }


        /// <exclude />
        public HelpDefinition(string helpText)
        {
            this.HelpText = helpText;
        }


        /// <exclude />
        public string HelpText
        {
            get;
            private set;
        }



        /// <exclude />
        public XElement Serialize()
        {
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.HelpDefinitionTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.HelpTextAttributeName, this.HelpText));

            return element;
        }



        /// <exclude />
        public static HelpDefinition Deserialize(XElement serializedHelpDefinition)
        {
            if (serializedHelpDefinition == null) throw new ArgumentNullException("serializedHelpDefinition");

            if (serializedHelpDefinition.Name.LocalName != FunctionTreeConfigurationNames.HelpDefinitionTagName) throw new ArgumentException("Wrong serialized format");

            XAttribute helpTextAttribute = serializedHelpDefinition.Attribute(FunctionTreeConfigurationNames.HelpTextAttributeName);
            if (helpTextAttribute == null) throw new ArgumentException("Wrong serialized format");

            return new HelpDefinition(helpTextAttribute.Value);
        }
	}
}
