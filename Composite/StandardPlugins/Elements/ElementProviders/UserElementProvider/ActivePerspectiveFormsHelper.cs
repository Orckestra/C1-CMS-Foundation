using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Elements;
using Composite.Forms;
using Composite.Security;
using Composite.Xml;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ActivePerspectiveFormsHelper
	{
        private List<Element> _perspectiveElements;
        private List<XElement> _bindingElements = null;
        private XElement _fieldGroupElement = null;

        private static readonly string MultiKeySelectorOptionsBindingName = "ActivePerspectiveFormsHelper_Options";
        private static readonly string MultiKeySelectorSelectedBindingName = "ActivePerspectiveFormsHelper_Selected";
        


        public ActivePerspectiveFormsHelper(string fieldLabel, string multiSelectLabel, string multiSelectHelp)
        {
            this.FieldLabel = fieldLabel;
            this.MultiSelectLabel = multiSelectLabel;
            this.MultiSelectHelp = multiSelectHelp;

            _perspectiveElements = ElementFacade.GetPerspectiveElementsWithNoSecurity(null).ToList();
        }



        public void UpdateWithNewBindings(Dictionary<string, object> bindings, IEnumerable<string> selectedSerializedEntityTokens)
        {
            Dictionary<string, string> options = new Dictionary<string, string>();
            foreach (Element perspectiveElement in _perspectiveElements)
            {
                options.Add(
                    EntityTokenSerializer.Serialize(perspectiveElement.ElementHandle.EntityToken),
                    perspectiveElement.VisualData.Label
                );
            }

            if (bindings.ContainsKey(MultiKeySelectorOptionsBindingName) == false)
            {
                bindings.Add(MultiKeySelectorOptionsBindingName, options);
            }
            else
            {
                bindings[MultiKeySelectorOptionsBindingName] = options;
            }

            if (bindings.ContainsKey(MultiKeySelectorSelectedBindingName) == false)
            {
                bindings.Add(MultiKeySelectorSelectedBindingName, selectedSerializedEntityTokens.ToList());
            }
            else
            {
                bindings[MultiKeySelectorSelectedBindingName] = selectedSerializedEntityTokens.ToList();
            }
        }



        public static IEnumerable<string> GetSelectedSerializedEntityTokens(Dictionary<string, object> bindings)
        {
            List<string> serializedEntityTokens = (List<string>)bindings[MultiKeySelectorSelectedBindingName];

            foreach (string serializedEntityToken in serializedEntityTokens)
            {
                yield return serializedEntityToken;
            }
        }



        public IEnumerable<XElement> GetBindingsMarkup()
        {
            if (_bindingElements == null)
            {
                CreateMarkup();
            }

            return _bindingElements;
        }



        public XElement GetFormMarkup()
        {
            if (_fieldGroupElement == null)
            {
                CreateMarkup();
            }

            return _fieldGroupElement;
        }



        public string FieldLabel
        {
            get;
            set;
        }



        public string MultiSelectLabel
        {
            get;
            set;
        }



        public string MultiSelectHelp
        {
            get;
            set;
        }



        private void CreateMarkup()
        {
            _bindingElements = new List<XElement>();

            _bindingElements.Add(
                new XElement(
                    Namespaces.BindingForms10 + FormKeyTagNames.Binding,
                    new XAttribute("name", MultiKeySelectorOptionsBindingName),
                    new XAttribute("type", typeof(Dictionary<string, string>))
                ));

            _bindingElements.Add(
                new XElement(
                    Namespaces.BindingForms10 + FormKeyTagNames.Binding,
                    new XAttribute("name", MultiKeySelectorSelectedBindingName),
                    new XAttribute("type", typeof(List<string>))
                ));



            _fieldGroupElement = new XElement(
                    Namespaces.BindingFormsStdUiControls10 + "FieldGroup",
                    new XAttribute("Label", this.FieldLabel));

            XElement multiKeySelectorElement = new XElement(
                    Namespaces.BindingFormsStdUiControls10 + "MultiKeySelector",
                    new XAttribute("Label", this.MultiSelectLabel),
                    new XAttribute("Help", this.MultiSelectHelp),
                    new XAttribute("OptionsKeyField", "Key"),
                    new XAttribute("OptionsLabelField", "Value"),
                    new XElement(Namespaces.BindingFormsStdUiControls10 + "MultiKeySelector.Options",
                        new XElement(Namespaces.BindingForms10 + "read",
                            new XAttribute("source", MultiKeySelectorOptionsBindingName)
                        )
                    ),
                    new XElement(Namespaces.BindingFormsStdUiControls10 + "MultiKeySelector.Selected",
                        new XElement(Namespaces.BindingForms10 + "bind",
                            new XAttribute("source", MultiKeySelectorSelectedBindingName)
                        )
                    )
                );

            _fieldGroupElement.Add(multiKeySelectorElement);            
        }
	}
}
