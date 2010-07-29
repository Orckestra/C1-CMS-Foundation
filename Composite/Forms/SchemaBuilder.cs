using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.ConfigurationSystem;


namespace Composite.Forms
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SchemaInfo
    {
        public enum FormSchemaType
	    {
            Uicontrols,
            Functions
	    }

        internal SchemaInfo(IFormChannelIdentifier channelIdentifier, XNamespace namespaceObj, XDocument schema)
        {
            this.ChannelIdentifier = channelIdentifier;
            this.Namespace = namespaceObj;
            this.Schema = schema;
            this.SchemaType = FormSchemaType.Uicontrols;
        }

        internal SchemaInfo(XNamespace namespaceObj, XDocument schema)
        {
            this.Namespace = namespaceObj;
            this.Schema = schema;
            this.SchemaType = FormSchemaType.Functions;
        }

        public IFormChannelIdentifier ChannelIdentifier { get; private set; }
        public XNamespace Namespace { get; private set; }
        public XDocument Schema { get; private set; }
        public FormSchemaType SchemaType { get; private set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class SchemaBuilder
    {
        public static IEnumerable<SchemaInfo> GenerateAllDynamicSchemas()
        {
            List<SchemaInfo> generatedSchemas = new List<SchemaInfo>();

            ElementInformationExtractor worker = new ElementInformationExtractor(ConfigurationServices.FileConfigurationSourcePath);

            var channels = from c in worker.GetUiControlDescriptors()
                           group c by c.ChannelName into g
                           select g;

            foreach (var channel in channels)
            {
                var xmlnss = from c in channel
                             group c by c.NamespaceName into g
                             select g;
                foreach (var xmlns in xmlnss)
                {
                    XDocument schema = worker.GetXsd( xmlns, xmlns.Key);

                    generatedSchemas.Add(new SchemaInfo(new ChannelIdentifier(channel.Key), xmlns.Key, schema));
                }
            }


            var namespaceBasedFunctionLookup = 
                from c in worker.GetFunctionDescriptors()
                group c by c.NamespaceName into g
                select g;

            foreach (var xmlns in namespaceBasedFunctionLookup)
            {
                XDocument schema = worker.GetXsd(xmlns, xmlns.Key);

                generatedSchemas.Add(new SchemaInfo(xmlns.Key, schema));
            }

            return generatedSchemas;
        }



        public static XDocument GenerateUiControlSchema(IFormChannelIdentifier channelIdentifier, XNamespace controlNamespace)
        {
            Dictionary<XNamespace, XDocument> schemas = new Dictionary<XNamespace, XDocument>();

            ElementInformationExtractor worker = new ElementInformationExtractor(ConfigurationServices.FileConfigurationSourcePath);

            var elementDescriptors =
                from descriptor in worker.GetUiControlDescriptors()
                where descriptor.ChannelName == channelIdentifier.ChannelName && descriptor.NamespaceName == controlNamespace
                select descriptor;

            return worker.GetXsd(elementDescriptors, controlNamespace);
        }

        private class ChannelIdentifier : IFormChannelIdentifier
        {
            public ChannelIdentifier(string name)
            {
                this.ChannelName = name;
            }

            public string ChannelName { get; private set; }
        }


        private class ElementInformationExtractor
        {
            private string configurationFilePath;
            private List<string> UiContolNs;
            private List<string> FunctionNs;
            private XDocument configDoc;
            public string OutputDir { get; set; }

            internal IEnumerable<ElementDescriptor> GetUiControlDescriptors()
            {


                var uiControlConfigRoot = configDoc.Descendants("Composite.Forms.Plugins.UiControlFactoryConfiguration").Single();

                var controlInfos = from controlElement in uiControlConfigRoot.Descendants("add")
                                   select new
                                   {
                                       Name = controlElement.Attribute("name").Value,
                                       NamespaceName = controlElement.Parent.Parent.Attribute("name").Value,
                                       ChannelName = controlElement.Parent.Parent.Parent.Parent.Attribute("name").Value
                                   };

                return
                    from controlInfo in controlInfos
                    select new ElementDescriptor
                    {
                        ChannelName = controlInfo.ChannelName,
                        NamespaceName = controlInfo.NamespaceName,
                        Name = controlInfo.Name,
                        ElementType = Composite.Forms.FormFactoryService.CreateControl(controlInfo.ChannelName, controlInfo.NamespaceName, controlInfo.Name).GetType()
                    };

            }

            public ElementInformationExtractor(string configurationFilePath)
            {
                this.configurationFilePath = configurationFilePath;
                configDoc = XDocument.Load(configurationFilePath);

                //Quick code for nameSpaces
                UiContolNs = (from c in GetUiControlDescriptors()
                              group c by c.NamespaceName into g
                              select g.Key).ToList();
                FunctionNs = (from c in GetFunctionDescriptors()
                              group c by c.NamespaceName into g
                              select g.Key).ToList();
            }

            private XElement GetXsdSequence(PropertyInfo property, XNamespace xsd, XNamespace targetNamespace)
            {

                var isContainer = typeof(List<Composite.Forms.IUiControl>) == property.PropertyType
                                || typeof(System.Object) == property.PropertyType;
                return new XElement(xsd + "sequence",
                            (property.PropertyType.GetInterface("IList") != null)
                            ? new XAttribute("maxOccurs", "unbounded")
                            : new XAttribute("maxOccurs", "1"),
                            new XAttribute("minOccurs", "0"),
                            new XElement(xsd + "choice",
                    // if Element is bindable
                                ((property.GetCustomAttributes(typeof(Composite.Forms.BindablePropertyAttribute), true)).Count() > 0) ?

                                new XElement(xsd + "element",
                                   new XAttribute("ref", "cms:bind")
                                ) : null,
                                new XElement(xsd + "element",
                                   new XAttribute("ref", "cms:read")
                                ),

                                //UiControls
                                isContainer ?
                                new XElement(xsd + "group",
                                    new XAttribute("ref", "ElementList")
                                ) : null,

                                //Other UiControls
                                isContainer ?
                                from ns in UiContolNs
                                where ns != targetNamespace.NamespaceName
                                select new XElement(xsd + "any",
                                   new XAttribute("namespace", ns)
                                )
                                : null,

                                //Functions
                                from ns in FunctionNs
                                where ns != targetNamespace.NamespaceName
                                select new XElement(xsd + "any",
                                   new XAttribute("namespace", ns)
                                )


                            )
               );



            }

            private XElement GetXsdContolValue(ElementDescriptor element, XNamespace xsd, XNamespace targetNamespace)
            {
                try
                {
                    ControlValuePropertyAttribute controlValue = (ControlValuePropertyAttribute)(element.ElementType.GetCustomAttributes(typeof(ControlValuePropertyAttribute), true).First());
                    return GetXsdSequence(element.ElementType.GetProperty(controlValue.PropertyName), xsd, targetNamespace);
                }
                catch (Exception)
                {

                }
                return null;

            }

            private XAttribute GetXsdAttributeType(PropertyInfo property)
            {


                if (property.PropertyType == typeof(int))
                {
                    return new XAttribute("type", "xsd:int");
                }
                if (property.PropertyType == typeof(Boolean))
                {
                    return new XAttribute("type", "xsd:boolean");
                }
                return new XAttribute("type", "xsd:string");
            }


            /// <summary>
            /// Generate XSD file by  List of ElementDescriptor
            /// </summary>
            /// <param name="xmlns">List of ElementDescriptor </param>
            /// <param name="targetNamespace">Namespace</param>
            /// <returns>XSD File</returns>
            public XDocument GetXsd(IEnumerable<ElementDescriptor> xmlns, XNamespace targetNamespace/*, List<string> functionNss*/)
            {
                XNamespace xsd = "http://www.w3.org/2001/XMLSchema";

                var controlsList = from element in xmlns
                                   select new XElement(xsd + "element",
                                       new XAttribute("name", element.Name),
                                       new XAttribute("type", element.Name)
                                   );
                XDocument doc = new XDocument(

                    new XDeclaration("1.0", "utf-8", "yes"),

                    new XElement(xsd + "schema",
                        new XAttribute(XNamespace.Xmlns + "xsd", xsd.NamespaceName),
                        new XAttribute(XNamespace.Xmlns + "cms", "http://www.composite.net/ns/management/bindingforms/1.0"),
                        new XAttribute("targetNamespace", targetNamespace.NamespaceName),
                        new XAttribute("xmlns", targetNamespace.NamespaceName),
                        new XAttribute("elementFormDefault", "qualified"),
                        new XElement(xsd + "import",
                            new XAttribute("namespace", "http://www.w3.org/XML/1998/namespace")//,
                            //new XAttribute("schemaLocation", "xml.xsd")
                        ),
                        new XElement(xsd + "import",
                            new XAttribute("namespace", "http://www.composite.net/ns/management/bindingforms/1.0"),
                            new XAttribute("schemaLocation", "bindingforms10.xsd")
                        ),
                        controlsList,

                        new XElement(xsd + "group",
                            new XAttribute("name", "ElementList"),
                            new XElement(xsd + "sequence",
                                new XElement(xsd + "choice",
                                    new XAttribute("minOccurs", "0"),
                                    controlsList

                                )
                            )

                        ),


                        from element in xmlns
                        select new XElement(
                             xsd + "complexType",
                             new XAttribute("name", element.Name),
                             new XAttribute("mixed", "true"),
                             new XElement(xsd + "sequence",
                                 new XAttribute("maxOccurs", "unbounded"),
                                 new XAttribute("minOccurs", "0"),
                                 (element.ElementType.GetProperties().Where( f=> f.GetCustomAttributes(typeof(FormsPropertyAttribute), true).Any()).Any()) ?
                                     new XElement(xsd + "choice",
                                        from property in element.ElementType.GetProperties()
                                        where property.CanWrite && property.GetCustomAttributes(typeof(FormsPropertyAttribute), true).Any()
                                        select new XElement(xsd + "element",
                                            new XAttribute("name", element.Name + "." + property.Name),
                                            new XElement(xsd + "complexType",
                                                new XAttribute("mixed", "true"),
                                                GetXsdSequence(property, xsd, targetNamespace)
                                            )

                                        ),
                                        GetXsdContolValue(element, xsd, targetNamespace)


                                ) : null

                             ),

                             from property in element.ElementType.GetProperties()
                             where property.CanWrite && property.GetCustomAttributes(typeof(FormsPropertyAttribute), true).Any()
                             && property.PropertyType.GetInterface("IList") == null
                             select new XElement(xsd + "attribute",
                                 new XAttribute("name", property.Name),
                                 GetXsdAttributeType(property),
                                 new XAttribute("use", "optional")

                             )

                        )



                    )
                );


                return doc;


            }




            /// <summary>
            /// For all channels and namespaces of elements generate XSD file
            /// </summary>
            /// 
            public void GenerateUiControls()
            {
                var channels = from c in GetUiControlDescriptors()
                               group c by c.ChannelName into g
                               select g;
                foreach (var channel in channels)
                {
                    int countChannels = 0;
                    var xmlnss = from c in channel
                                 group c by c.NamespaceName into g
                                 select g;
                    foreach (var xmlns in xmlnss)
                    {
                        XDocument uicontrols = GetXsd(
                        xmlns,
                        xmlns.Key
                        );
                        uicontrols.Save(OutputDir + channel.Key + ((countChannels++ > 0) ? "." + countChannels : "") + ".xsd");
                    }


                }


            }
            /// <summary>
            /// For all namespaces of functions generate XSD file
            /// </summary>
            /// 
            public void GenerateFunctions()
            {

                var xmlnss = from c in GetFunctionDescriptors().ToList()
                             group c by c.NamespaceName into g
                             select g;
                int countChannels = 0;
                foreach (var xmlns in xmlnss)
                {
                    XDocument uicontrols = GetXsd(
                    xmlns,
                    xmlns.Key

                    );

                    uicontrols.Save(OutputDir + "Plugins.Function" + ((countChannels++ > 0) ? "." + countChannels : "") + ".xsd");
                }


            }



            internal IEnumerable<ElementDescriptor> GetFunctionDescriptors()
            {
                var uiControlConfigRoot = configDoc.Descendants("Composite.Forms.Plugins.FunctionFactoryConfiguration").Single();

                var functionInfos = from functionlElement in uiControlConfigRoot.Descendants("add")
                                    select new
                                    {
                                        Name = functionlElement.Attribute("name").Value,
                                        NamespaceName = functionlElement.Parent.Parent.Attribute("name").Value,
                                    };

                return
                    from functionInfo in functionInfos
                    select new ElementDescriptor
                    {
                        NamespaceName = functionInfo.NamespaceName,
                        Name = functionInfo.Name,
                        ElementType = Composite.Forms.FormFactoryService.GetFunction(functionInfo.NamespaceName, functionInfo.Name).GetType()
                    };

            }
        }

        internal class ElementDescriptor
        {
            public string ChannelName { get; set; }
            public string NamespaceName { get; set; }
            public string Name { get; set; }
            public Type ElementType { get; set; }
        }

    }
}
