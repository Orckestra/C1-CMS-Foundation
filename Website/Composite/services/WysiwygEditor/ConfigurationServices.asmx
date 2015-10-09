<%@ WebService Language="C#" Class="Composite.Services.WysiwygEditorConfigurationServices" %>

using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Core.Types;
using Composite.Core.Xml;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class WysiwygEditorConfigurationServices : System.Web.Services.WebService
    {
        [WebMethod]
        public List<FieldGroup> GetEmbedableFieldGroupConfigurations(string embedableFieldsTypeNames)
        {
            if (string.IsNullOrEmpty(embedableFieldsTypeNames))
            {
                return new List<FieldGroup>();
            }

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



        private FieldGroup GetSingleFieldGroupByType(Type sourceDataType)
        {
            if (sourceDataType == null) throw new ArgumentNullException();

            FieldGroup group = new FieldGroup();

            if (typeof(IData).IsAssignableFrom(sourceDataType))
            {
                DataTypeDescriptor dataTypeDescriptor;
                if (!DynamicTypeManager.TryGetDataTypeDescriptor(sourceDataType, out dataTypeDescriptor))
                {
                    dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(sourceDataType);
                }

                group.GroupName = dataTypeDescriptor.Name;

                foreach (var dataField in dataTypeDescriptor.Fields)
                {
                    string label = dataField.Name;

                    if (dataField.FormRenderingProfile != null && !string.IsNullOrEmpty(dataField.FormRenderingProfile.Label))
                    {
                        label = dataField.FormRenderingProfile.Label;
                    }

                    group.Fields.Add(new Field
                    {
                        Name = label,
                        XhtmlRepresentation = GetImageTagForDynamicDataFieldReference(label, dataField, dataTypeDescriptor).ToString(),
                        XmlRepresentation = dataField.GetReferenceElement(dataTypeDescriptor).ToString()
                    });
                }
            }
            else
            {
                group.GroupName = sourceDataType.Name;

                foreach (var propertyInfo in sourceDataType.GetPropertiesRecursively())
                {
                    string fieldName = propertyInfo.Name;

                    group.Fields.Add(new Field
                    {
                        Name = fieldName,
                        XhtmlRepresentation = GetImageTagForDynamicDataFieldReference(fieldName, sourceDataType).ToString(),

                        XmlRepresentation = DynamicTypeMarkupServices.GetReferenceElement(fieldName, TypeManager.SerializeType(sourceDataType)).ToString()
                    });
                }
            }

            return group;
        }



        private XElement GetImageTagForDynamicDataFieldReference(string fieldName, Type dataType)
        {
            string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}", HttpUtility.UrlEncode(fieldName, Encoding.UTF8), HttpUtility.UrlEncode(dataType.Name, Encoding.UTF8));

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
                new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
                new XAttribute("data-markup", HttpUtility.UrlEncode(string.Format("{0}\\{1}", TypeManager.SerializeType(dataType), fieldName), Encoding.UTF8)));
        }


        private XElement GetImageTagForDynamicDataFieldReference(string label, DataFieldDescriptor dataField, DataTypeDescriptor dataTypeDescriptor)
        {
            string imageUrl = string.Format("services/WysiwygEditor/FieldImage.ashx?name={0}&groupname={1}", HttpUtility.UrlEncode(label, Encoding.UTF8), HttpUtility.UrlEncode(dataTypeDescriptor.Name, Encoding.UTF8));

            return new XElement(Namespaces.Xhtml + "img",
                new XAttribute("src", Composite.Core.WebClient.UrlUtils.ResolveAdminUrl(imageUrl)),
                new XAttribute("class", "compositeFieldReferenceWysiwygRepresentation"),
                new XAttribute("data-markup", HttpUtility.UrlEncode(string.Format("{0}\\{1}", dataTypeDescriptor.TypeManagerTypeName, dataField.Name), Encoding.UTF8)));
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