using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Composite.Actions;
using Composite.Data.DynamicTypes;
using Composite.Forms.Flows;
using Composite.Functions;
using Composite.Serialization;
using Composite.Types;
using Composite.Validation.ClientValidationRules;
using Composite.Xml;


namespace Composite.Workflow.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FormData
    {
        public string ContainerLabel { get; set; }
        public string FormDefinition { get; set; }
        public string CustomToolbarDefinition { get; set; }

        public IFormMarkupProvider CustomToolbarMarkupProvider { get; set; }
        public IFormMarkupProvider FormMarkupProvider { get; set; }
        public Dictionary<string, object> Bindings { get; set; }
        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules { get; set; }
        public IFlowUiContainerType ContainerType { get; set; }
        public Type EventHandleFilterType { get; set; }


        public XElement Serialize()
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


            XElement customToolbarDefinitionElement = new XElement("CustomToolbarDefinition");
            if (this.CustomToolbarDefinition != null)
            {
                customToolbarDefinitionElement.Add(new XAttribute("value", this.CustomToolbarDefinition));
            }
            else if (this.CustomToolbarMarkupProvider != null)
            {
                using (XmlReader xmlReader = this.CustomToolbarMarkupProvider.GetReader())
                {
                    xmlReader.MoveToContent();
                    XElement element = (XElement)XDocument.ReadFrom(xmlReader);
                    XDocument document = new XDocument(element);
                    string content = document.GetDocumentAsString();
                    customToolbarDefinitionElement.Add(new XAttribute("value", content));
                }
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

            XElement formDataElement = new XElement("FormData");
            formDataElement.Add(containerLabelElement);
            formDataElement.Add(formDefinitionElement);
            formDataElement.Add(customToolbarDefinitionElement);
            formDataElement.Add(new XElement("ContainerType", containerTypeElement));
            formDataElement.Add(new XElement("Bindings", bindingsElement));
            formDataElement.Add(new XElement("BindingsValidationRules", bindingsValidationRulesElement));

            if (this.EventHandleFilterType != null)
            {
                formDataElement.Add(new XElement("EventHandleFilterType", new XAttribute("type", TypeManager.SerializeType(this.EventHandleFilterType))));
            }

            return formDataElement;
        }



        public static FormData Deserialize(XElement serializedData)
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

            XElement customToolbarDefinitionElement = serializedData.Elements("CustomToolbarDefinition").Single();
            XAttribute customToolbarDefinitionValueAttribute = customToolbarDefinitionElement.Attribute("value");
            if (customToolbarDefinitionValueAttribute != null)
            {
                formData.CustomToolbarDefinition = customToolbarDefinitionValueAttribute.Value;
                formData.CustomToolbarMarkupProvider = new StringBasedFormMarkupProvider(customToolbarDefinitionValueAttribute.Value);
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

            return formData;
        }
    }
}
