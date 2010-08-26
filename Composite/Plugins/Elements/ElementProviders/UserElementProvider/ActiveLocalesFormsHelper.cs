using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.C1Console.Forms;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ActiveLocalesFormsHelper
	{
        private List<XElement> _bindingElements = null;
        private XElement _fieldGroupElement = null;

        private static readonly string MultiKeySelectorOptionsBindingName = "ActiveLocalesFormsHelper_Options";
        private static readonly string MultiKeySelectorSelectedBindingName = "ActiveLocalesFormsHelper_Selected";



        public ActiveLocalesFormsHelper(string fieldLabel, string multiSelectLabel, string multiSelectHelp)
        {
            this.FieldLabel = fieldLabel;
            this.MultiSelectLabel = multiSelectLabel;
            this.MultiSelectHelp = multiSelectHelp;
        }



        public void UpdateWithNewBindings(Dictionary<string, object> bindings, IEnumerable<CultureInfo> userActiveLocales)
        {
            Dictionary<string, string> options = new Dictionary<string, string>();
            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                options.Add(
                    cultureInfo.Name,
                    StringResourceSystemFacade.GetString("Composite.Cultures", cultureInfo.Name)
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
                bindings.Add(MultiKeySelectorSelectedBindingName, userActiveLocales.Select(f => f.Name).ToList());
            }
            else
            {
                bindings[MultiKeySelectorSelectedBindingName] = userActiveLocales.Select(f => f.Name).ToList();
            }
        }



        public static string GetFieldBindingPath()
        {
            return MultiKeySelectorSelectedBindingName;
        }


        public static IEnumerable<CultureInfo> GetSelectedLocalesTypes(Dictionary<string, object> bindings)
        {
            List<string> cultureNames = (List<string>)bindings[MultiKeySelectorSelectedBindingName];

            foreach (string cultureName in cultureNames)
            {
                yield return CultureInfo.CreateSpecificCulture(cultureName);
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
