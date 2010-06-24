using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.DynamicTypes;
using System.Text;

public partial class Spikes_DataTypeDescriptor_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        List<Guid> dataTypeDescriptorIds =
            (from dtd in DataFacade.GetData<IDataTypeDescriptor>()
             select dtd.Id).ToList();

        List<XElement> documentElements = new List<XElement>();
        foreach (Guid dataTypeDescriptorId in dataTypeDescriptorIds)
        {
            XElement typeElement = new XElement("div", new XAttribute("style", "border:2px; border-style: solid; border-color: black; margin-bottom: 2px; margin-left:5px; margin-right:5px; padding: 3px;"));

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(dataTypeDescriptorId);

            // DataTypeDescriptor properties
            AddTitle(typeElement, "Type descriptor:");
            AddString(typeElement, "Id", dataTypeDescriptor.DataTypeId);            
            AddString(typeElement, "Name", dataTypeDescriptor.Name);
            AddString(typeElement, "Namespace", dataTypeDescriptor.Namespace);
            AddString(typeElement, "Title", dataTypeDescriptor.Title);
            AddString(typeElement, "TypeManagerTypeName", dataTypeDescriptor.TypeManagerTypeName);
            AddString(typeElement, "Label field name", dataTypeDescriptor.LabelFieldName);
            AddString(typeElement, "Is code generated", dataTypeDescriptor.IsCodeGenerated);
            AddString(typeElement, "Has custom physical sort order", dataTypeDescriptor.HasCustomPhysicalSortOrder);

            
            // DataTypeDescriptor KeyPropertyNames
            StringBuilder keyPropertyNamesStringBuilder = new StringBuilder();
            foreach (string keyPropertyName in dataTypeDescriptor.KeyPropertyNames)
            {
                if (keyPropertyNamesStringBuilder.ToString() != "")
                {
                    keyPropertyNamesStringBuilder.Append(", ");
                }

                keyPropertyNamesStringBuilder.Append(keyPropertyName);
            }
            AddString(typeElement, "Key property names", keyPropertyNamesStringBuilder.ToString());


            // DataTypeDescriptor DataScopes
            StringBuilder dataScopesStringBuilder = new StringBuilder();
            foreach (DataScopeIdentifier dataScopeIdentifier in dataTypeDescriptor.DataScopes)
            {
                if (dataScopesStringBuilder.ToString() != "")
                {
                    dataScopesStringBuilder.Append(", ");
                }

                dataScopesStringBuilder.Append(dataScopeIdentifier.Name);
            }
            AddString(typeElement, "Data scopes", dataScopesStringBuilder.ToString());


            // DataTypeDescriptor SuperInterfaces
            StringBuilder superInterfacesStringBuilder = new StringBuilder();
            foreach (Type superInterface in dataTypeDescriptor.SuperInterfaces)
            {
                if (superInterfacesStringBuilder.ToString() != "")
                {
                    superInterfacesStringBuilder.Append(", ");
                }

                superInterfacesStringBuilder.Append(superInterface);
            }
            AddString(typeElement, "Super interfaces", superInterfacesStringBuilder.ToString());

            
            typeElement.Add(new XElement("br"));
            // DataTypeDescriptor DataAssociations
            if (dataTypeDescriptor.DataAssociations.Count > 0)
            {                
                foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in dataTypeDescriptor.DataAssociations)
                {
                    XElement dataAssociationElement = new XElement("div", new XAttribute("style", "border:1px; border-style: dotted; border-color: black; margin-bottom: 0px; margin-left:0px; margin-right:0px; padding: 3px;"));

                    AddTitle(dataAssociationElement, "Association descriptor:");
                    AddString(dataAssociationElement, "Association type", dataTypeAssociationDescriptor.AssociationType);
                    AddString(dataAssociationElement, "Associated interface type", dataTypeAssociationDescriptor.AssociatedInterfaceType);
                    AddString(dataAssociationElement, "Foreign key property name", dataTypeAssociationDescriptor.ForeignKeyPropertyName);

                    typeElement.Add(dataAssociationElement);
                    typeElement.Add(new XElement("br"));
                }
            }
            else
            {
                AddString(typeElement, "Association descriptors", "(none");
            }
                       

            // DataTypeDescriptor DataFieldDescriptors
            foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields)
            {
                XElement fieldElement = new XElement("div", new XAttribute("style", "border:1px; border-style: dotted; border-color: black; margin-bottom: 0px; margin-left:0px; margin-right:0px; padding: 3px;"));

                AddTitle(fieldElement, "Field descriptor:");
                AddString(fieldElement, "Id", dataFieldDescriptor.Id);
                AddString(fieldElement, "Name", dataFieldDescriptor.Name);
                AddString(fieldElement, "Store type", dataFieldDescriptor.StoreType);
                AddString(fieldElement, "Instance type", dataFieldDescriptor.InstanceType);
                AddString(fieldElement, "Is nullable", dataFieldDescriptor.IsNullable);
                AddString(fieldElement, "Inherited", dataFieldDescriptor.Inherited);                
                AddString(fieldElement, "Foreign key reference type name", dataFieldDescriptor.ForeignKeyReferenceTypeName);
                AddString(fieldElement, "Position", dataFieldDescriptor.Position);
                AddString(fieldElement, "Default value", dataFieldDescriptor.DefaultValue == null ? "(null)" : dataFieldDescriptor.DefaultValue.ToString());

                if ((string.IsNullOrEmpty(dataFieldDescriptor.FormRenderingProfile.Label) == false) && (string.IsNullOrEmpty(dataFieldDescriptor.FormRenderingProfile.HelpText) == false) && (string.IsNullOrEmpty(dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup) == false))
                {
                    XElement formRenderingProfileElement = new XElement("div", new XAttribute("style", "border:1px; border-style: dotted; border-color: black; margin-bottom: 0px; margin-left:0px; margin-right:0px; padding: 3px;"));
                    AddTitle(formRenderingProfileElement, "Form rendering profile:");
                    AddString(formRenderingProfileElement, "Label", dataFieldDescriptor.FormRenderingProfile.Label);
                    AddString(formRenderingProfileElement, "Help text", dataFieldDescriptor.FormRenderingProfile.HelpText);
                    AddString(formRenderingProfileElement, "Widget function markup", dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup);

                    fieldElement.Add(formRenderingProfileElement);
                }
                else
                {
                    AddString(fieldElement, "Form rendering profile", "(none)");
                }

                if (dataFieldDescriptor.ValidationFunctionMarkup.Count > 0)
                {
                    XElement validationMarkupElement = new XElement("div", new XAttribute("style", "border:1px; border-style: dotted; border-color: black; margin-bottom: 0px; margin-left:0px; margin-right:0px; padding: 3px;"));
                    AddTitle(validationMarkupElement, "Validation function markup");

                    foreach (string markup in dataFieldDescriptor.ValidationFunctionMarkup)
                    {
                        AddString(validationMarkupElement, "Markup", markup);
                    }
                }
                else
                {
                    AddString(fieldElement, "Validation function markup", "(none)");
                }

                typeElement.Add(fieldElement);
                typeElement.Add(new XElement("br"));
            }

            documentElements.Add(typeElement);
            documentElements.Add(new XElement("br"));
            documentElements.Add(new XElement("br"));
            documentElements.Add(new XElement("br"));
        }

        foreach (XElement element in documentElements)
        {
            Response.Write(element.ToString());
        }
    }


    private void AddTitle(XElement element, string label)
    {
        element.Add(
            new XElement("span", new XAttribute("style", "text-decoration: underline; font-size: large; width: 400px; padding-left: 15px;"),
                new XElement("b", label)
            ),
            new XElement("br")
        );
    }


    private void AddString(XElement element, string label, object text)
    {
        element.Add(
            new XElement("span", new XAttribute("style", "width: 260px; padding-left: 15px;"),
                new XElement("b", label)
            ),
            ":",
            new XElement("span", new XAttribute("style", "padding-left: 10px;"),
                text,
                new XElement("br")
            )
        );
    }
}
