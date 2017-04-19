using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.Data.DynamicTypes;
using Composite.C1Console.Forms.Flows;
using Composite.Functions;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Core.Xml;
using Composite.Core.Threading;
using System.Globalization;
using Composite.C1Console.Elements;


namespace Composite.C1Console.Workflow.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FormData
    {
        /// <exclude />
        public string ContainerLabel { get; set; }

        /// <exclude />
        public string FormDefinition { get; set; }

        /// <exclude />
        public List<Tuple<string, XDocument, ActionGroupPriority>> CustomToolbarItems { get; set; }

        /// <exclude />
        public IFormMarkupProvider FormMarkupProvider { get; set; }

        /// <exclude />
        public Dictionary<string, object> Bindings { get; set; }

        /// <exclude />
        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules { get; set; }

        /// <exclude />
        public IFlowUiContainerType ContainerType { get; set; }

        /// <exclude />
        public Type EventHandleFilterType { get; set; }

        /// <exclude />
        public List<string> ExcludedEvents { get; set; }


        /// <exclude />
        public XElement Serialize()
        {
            using (new ThreadCultureScope(CultureInfo.InvariantCulture))
            {
                IXmlSerializer xmlSerializer = new XmlSerializer(new IValueXmlSerializer[] {
                new SystemPrimitivValueXmlSerializer(),
                new SystemCollectionValueXmlSerializer(),
                new SystemTypesValueXmlSerializer(),
                new CompositeCollectionValueXmlSerializer(),
                new DataFieldDescriptorValueXmlSerializer(),
                new DataTypeDescriptorValueXmlSerializer(),
                new NamedFunctionCallValueXmlSerializer(),
                new SerializerHandlerValueXmlSerializer(),
                new SystemSerializableValueXmlSerializer() });


                XElement containerLabelElement = new XElement("ContainerLabel");
                if (this.ContainerLabel != null)
                {
                    containerLabelElement.Add(new XAttribute("value", this.ContainerLabel));
                }


                XElement formDefinitionElement = new XElement("FormDefinition");
                if (this.FormDefinition != null)
                {
                    formDefinitionElement.Add(new XAttribute("value", this.FormDefinition));
                }
                else
                {
                    using (XmlReader xmlReader = this.FormMarkupProvider.GetReader())
                    {
                        xmlReader.MoveToContent();
                        XElement element = (XElement)XDocument.ReadFrom(xmlReader);
                        XDocument document = new XDocument(element);
                        string content = document.GetDocumentAsString();
                        formDefinitionElement.Add(new XAttribute("value", content));
                    }
                }

                XElement customToolBarItems = null;
                if (CustomToolbarItems != null && CustomToolbarItems.Count > 0)
                {
                    customToolBarItems = new XElement(nameof(CustomToolbarItems),
                        CustomToolbarItems.Select(tuple => new XElement("item",
                        new XAttribute("id", tuple.Item1.ToString()),
                        new XAttribute("markup", tuple.Item2.ToString()),
                        new XAttribute("priority", (int)tuple.Item3)))
                        .OfType<object>()
                        .ToArray());
                }

                XElement containerTypeElement = xmlSerializer.Serialize(typeof(IFlowUiContainerType), this.ContainerType);


                Dictionary<string, object> selectedBindings =
                    (from kvp in this.Bindings
                     where (kvp.Value != null &&
                            kvp.Value.GetType() != typeof(System.EventHandler)) ||
                            kvp.Value == null
                     select kvp).ToDictionary(f => f.Key, f => f.Value);
                XElement bindingsElement = xmlSerializer.Serialize(typeof(Dictionary<string, object>), selectedBindings);

                XElement bindingsValidationRulesElement = xmlSerializer.Serialize(typeof(Dictionary<string, List<ClientValidationRule>>), this.BindingsValidationRules);

                XElement excludedEventsElement = xmlSerializer.Serialize(typeof(List<string>), ExcludedEvents);

                var formDataElement = new XElement("FormData",
                    containerLabelElement,
                    formDefinitionElement,
                    customToolBarItems,
                    new XElement("ContainerType", containerTypeElement),
                    new XElement("Bindings", bindingsElement),
                    new XElement("BindingsValidationRules", bindingsValidationRulesElement)
                );

                if (excludedEventsElement != null)
                {
                    formDataElement.Add(new XElement("ExcludedEvents", excludedEventsElement));
                }

                if (this.EventHandleFilterType != null)
                {
                    formDataElement.Add(new XElement("EventHandleFilterType", new XAttribute("type", TypeManager.SerializeType(this.EventHandleFilterType))));
                }

                return formDataElement;
            }
        }



        /// <exclude />
        public static FormData Deserialize(XElement serializedData)
        {
            using (new ThreadCultureScope(CultureInfo.InvariantCulture))
            {
                IXmlSerializer xmlSerializer = new XmlSerializer(new IValueXmlSerializer[] {
                new SystemPrimitivValueXmlSerializer(),
                new SystemCollectionValueXmlSerializer(),
                new SystemTypesValueXmlSerializer(),
                new CompositeCollectionValueXmlSerializer(),
                new DataFieldDescriptorValueXmlSerializer(),
                new DataTypeDescriptorValueXmlSerializer(),
                new NamedFunctionCallValueXmlSerializer(),
                new SerializerHandlerValueXmlSerializer(),
                new SystemSerializableValueXmlSerializer()});


                FormData formData = new FormData();

                XElement containerLabelElement = serializedData.Elements("ContainerLabel").Single();
                XAttribute containerLabelValueAttribute = containerLabelElement.Attribute("value");
                if (containerLabelValueAttribute != null)
                {
                    formData.ContainerLabel = containerLabelValueAttribute.Value;
                }

                XElement formDefinitionElement = serializedData.Elements("FormDefinition").Single();
                XAttribute formDefinitionValueAttribute = formDefinitionElement.Attribute("value");
                if (formDefinitionValueAttribute != null)
                {
                    formData.FormDefinition = formDefinitionValueAttribute.Value;
                    formData.FormMarkupProvider = new StringBasedFormMarkupProvider(formDefinitionValueAttribute.Value);
                }

                formData.CustomToolbarItems = new List<Tuple<string, XDocument, ActionGroupPriority>>();

                var customToolbarItemsElement = serializedData.Elements(nameof(CustomToolbarItems)).FirstOrDefault();
                if (customToolbarItemsElement != null)
                {
                    formData.CustomToolbarItems.AddRange(
                        customToolbarItemsElement.Elements().Select(element =>
                            new Tuple<string, XDocument, ActionGroupPriority>(
                                (string)element.Attribute("id"),
                                XDocument.Parse((string) element.Attribute("markup")),
                                (ActionGroupPriority) ((int)element.Attribute("priority")))));
                }


                XElement containerTypeElement = serializedData.Elements("ContainerType").Single();
                object containerType = xmlSerializer.Deserialize(containerTypeElement.Elements().Single());
                formData.ContainerType = (IFlowUiContainerType)containerType;

                XElement bindingsElement = serializedData.Elements("Bindings").Single();
                object bindings = xmlSerializer.Deserialize(bindingsElement.Elements().Single());
                formData.Bindings = (Dictionary<string, object>)bindings;

                XElement bindingsValidationRulesElement = serializedData.Elements("BindingsValidationRules").Single();
                object bindingsValidationRules = xmlSerializer.Deserialize(bindingsValidationRulesElement.Elements().Single());
                formData.BindingsValidationRules = (Dictionary<string, List<ClientValidationRule>>)bindingsValidationRules;

                XElement eventHandleFilterTypeElement = serializedData.Elements("EventHandleFilterType").SingleOrDefault();
                if (eventHandleFilterTypeElement != null)
                {
                    Type eventHandleFilterType = TypeManager.GetType(eventHandleFilterTypeElement.Attribute("type").Value);
                    formData.EventHandleFilterType = eventHandleFilterType;
                }

                XElement excludedEventsElement = serializedData.Elements("ExcludedEvents").SingleOrDefault();
                if (excludedEventsElement != null)
                {
                    object excludedEvents = xmlSerializer.Deserialize(excludedEventsElement.Elements().Single());
                    formData.ExcludedEvents = (List<string>)excludedEvents;
                }

                return formData;
            }
        }
    }
}
