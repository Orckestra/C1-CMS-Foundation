using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Xml;
using Composite.Forms;
using Composite.Data.Types;
using Composite.Data;

namespace Composite.StandardPlugins.Elements.ElementProviders.UserElementProvider
{
	internal sealed class UserGroupsFormsHelper
	{
        private List<XElement> _bindingElements = null;
        private XElement _fieldGroupElement = null;


        private static readonly string MultiKeySelectorOptionsBindingName = "UserGroupsFormsHelper_Options";
        private static readonly string MultiKeySelectorSelectedBindingName = "UserGroupsFormsHelper_Selected";


        public UserGroupsFormsHelper(string fieldLabel, string multiSelectHelp)
        {
            this.FieldLabel = fieldLabel;
            this.MultiSelectHelp = multiSelectHelp;
        }



        public void UpdateWithNewBindings(Dictionary<string, object> bindings, IEnumerable<Guid> selectedUserGroups)
        {
            Dictionary<Guid, string> options = new Dictionary<Guid, string>();

            List<IUserGroup> userGroups = DataFacade.GetData<IUserGroup>().OrderBy(f => f.Name).ToList();

            foreach (IUserGroup userGroup in userGroups)
            {
                options.Add(userGroup.Id, userGroup.Name);
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
                bindings.Add(MultiKeySelectorSelectedBindingName, selectedUserGroups.ToList());
            }
            else
            {
                bindings[MultiKeySelectorSelectedBindingName] = selectedUserGroups.ToList();
            }
        }



        public static List<Guid> GetSelectedUserGroupIds(Dictionary<string, object> bindings)
        {
            return (List<Guid>)bindings[MultiKeySelectorSelectedBindingName];
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
                    new XAttribute("type", typeof(Dictionary<Guid, string>))
                ));

            _bindingElements.Add(
                new XElement(
                    Namespaces.BindingForms10 + FormKeyTagNames.Binding,
                    new XAttribute("name", MultiKeySelectorSelectedBindingName),
                    new XAttribute("type", typeof(List<Guid>))
                ));



            _fieldGroupElement = new XElement(
                    Namespaces.BindingFormsStdUiControls10 + "FieldGroup",
                    new XAttribute("Label", this.FieldLabel));

            XElement multiKeySelectorElement = new XElement(
                    Namespaces.BindingFormsStdUiControls10 + "MultiKeySelector",
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
