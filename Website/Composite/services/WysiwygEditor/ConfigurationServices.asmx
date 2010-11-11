<%@ WebService Language="C#" Class="Composite.Services.WysiwygEditorConfigurationServices" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.DynamicTypes;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Core.IO;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class WysiwygEditorConfigurationServices : System.Web.Services.WebService
    {
        [WebMethod]
        public XmlDocument GetElementClassConfiguration(string configurationName)
        {
            if (string.IsNullOrEmpty(configurationName) == true) throw new ArgumentException("Missing QueryString 'configurationName' value");

            List<IXhtmlEditorElementClassConfiguration> elementClasses;

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                elementClasses =
                    (from elementClass in DataFacade.GetData<IXhtmlEditorElementClassConfiguration>()
                     where elementClass.ConfigurationName == configurationName
                     orderby elementClass.ElementName
                     select elementClass).ToList();
            }

            XElement xml = new XElement("elements",
                               from elementClass in elementClasses
                               orderby elementClass.ElementName
                               group elementClass by elementClass.ElementName into element
                               select new XElement("element", new XAttribute("name", element.Key),
                                          from cssclass in element
                                          select new XElement("class", new XAttribute("name", cssclass.ClassName))));

            XmlDocument output = new XmlDocument();
            output.LoadXml(xml.ToString());
            return output;
        }






        [WebMethod]
        public List<FieldGroup> GetEmbedableFieldGroupConfigurations(string embedableFieldsTypeNames)
        {
            if (string.IsNullOrEmpty(embedableFieldsTypeNames) == false)
            {
                List<FieldGroup> fieldGroups = new List<FieldGroup>();

                string[] serializedTypeManagerTypeNameArray = embedableFieldsTypeNames.Split('|');

                foreach (string serializedTypeManagerTypeName in serializedTypeManagerTypeNameArray)
                {
                    Type sourceDataType = TypeManager.TryGetType(serializedTypeManagerTypeName);

                    if (sourceDataType != null)
                    {
                        fieldGroups.Add(GetSingleFieldGroupByType(sourceDataType));
                    }
                }

                return fieldGroups;
            }
            else
            {
                return new List<FieldGroup>();
            }
        }



        private FieldGroup GetSingleFieldGroupByType(Type sourceDataType)
        {
            if (sourceDataType == null) throw new ArgumentNullException();

            FieldGroup group = new FieldGroup();

            // TODO: Fix the logic, this expression is always "false"
            if (sourceDataType is IData)
            {
                DataTypeDescriptor dataTypeDescriptor = null;
                if (DynamicTypeManager.TryGetDataTypeDescriptor(sourceDataType, out dataTypeDescriptor) == false)
                {
                    dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(sourceDataType);
                }

                group.GroupName = dataTypeDescriptor.Name;

                foreach (var dataField in dataTypeDescriptor.Fields)
                {
                    string label = dataField.Name;

                    if (dataField.FormRenderingProfile != null && string.IsNullOrEmpty(dataField.FormRenderingProfile.Label) == false)
                    {
                        label = dataField.FormRenderingProfile.Label;
                    }

                    Field field = new Field
                    {
                        Name = label,
                        XhtmlRepresentation = GetImageTagForDynamicDataFieldReference(dataField, dataTypeDescriptor).ToString(),
                        XmlRepresentation = dataField.GetReferenceElement(dataTypeDescriptor).ToString()
                    };

                    group.Fields.Add(field);
                }
            }
            else
            {
                group.GroupName = sourceDataType.Name;

                foreach (var propertyInfo in sourceDataType.GetPropertiesRecursively())
                {
                    string label = propertyInfo.Name;

                    Field field = new Field
                    {
                        Name = propertyInfo.Name,
                        XhtmlRepresentation = GetImageTagForDynamicDataFieldReference(propertyInfo.Name, sourceDataType).ToString(),

                        XmlRepresentation = DynamicTypeMarkupServices.GetReferenceElement(propertyInfo.Name, TypeManager.SerializeType(sourceDataType)).ToString()
                    };

                    group.Fields.Add(field);
                }
            }

            return group;
        }



        private XElement GetImageTagForDynamicDataFieldReference(string fieldName, Type dataType)
        {
            string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}", HttpUtility.UrlEncodeUnicode(fieldName), HttpUtility.UrlEncodeUnicode(dataType.Name));

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
                new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
                new XAttribute("referencedtypemanagername", TypeManager.SerializeType(dataType)),
                new XAttribute("referencedfieldname", fieldName));
        }


        private XElement GetImageTagForDynamicDataFieldReference(DataFieldDescriptor dataField, DataTypeDescriptor dataTypeDescriptor)
        {
            string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}", HttpUtility.UrlEncodeUnicode(dataField.Name), HttpUtility.UrlEncodeUnicode(dataTypeDescriptor.Name));

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
                new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
                new XAttribute("referencedtypemanagername", dataTypeDescriptor.TypeManagerTypeName),
                new XAttribute("referencedfieldname", dataField.Name));
        }







        public class FieldGroup
        {
            public FieldGroup()
            {
                this.Fields = new List<Field>();
            }

            public string GroupName { get; set; }

            public List<Field> Fields { get; set; }
        }



        public class Field
        {
            public string Name { get; set; }

            public string XhtmlRepresentation { get; set; }

            public string XmlRepresentation { get; set; }
        }
    }
}