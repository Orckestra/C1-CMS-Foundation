using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web.UI;
using System.Xml.Linq;
using Composite.C1Console.Forms;
using Composite.Core.IO;
using Composite.Core.Xml;


public partial class Composite_schemas_FormsControls_GenerateDynamicSchemas : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var xsdFiles = C1Directory.GetFiles(this.MapPath(""), "*.xsd");

        XElement xsdFilesTable = new XElement("table",
            new XElement("tr",
                new XElement("td", "Namespace"),
                new XElement("td", "Last generated")));

        foreach( string xsdFile in xsdFiles)
        {
            DateTime lastWrite = C1File.GetLastWriteTime(xsdFile);

            XDocument schemaDocument = XDocumentUtils.Load(xsdFile);
            string targetNamespace = schemaDocument.Root.Attribute("targetNamespace").Value;

            xsdFilesTable.Add(
                new XElement("tr",
                    new XElement("td", 
                        new XElement("a",
                            new XAttribute("href", Path.GetFileName(xsdFile)),
                            targetNamespace)),
                    new XElement("td", lastWrite)));
        }

        XsdTable.Controls.Add( new LiteralControl(xsdFilesTable.ToString()));

        GenerateButton.Click += new EventHandler(GenerateButton_Click);
        
    }

    void GenerateButton_Click(object sender, EventArgs e)
    {
        IEnumerable<SchemaInfo> schemaInfos = SchemaBuilder.GenerateAllDynamicSchemas();

        foreach (SchemaInfo schemaInfo in schemaInfos)
        {
            XDocumentUtils.Save(schemaInfo.Schema, this.MapPath(BuildFileName(schemaInfo)));
        }

        GenerateButton.Text = "Done";
    }


    private string BuildFileName(SchemaInfo schemaInfo)
    {
        StringBuilder sb = new StringBuilder( schemaInfo.Namespace.NamespaceName );

        sb.Replace("http://", "");
        sb.Replace("/", "_");
        sb.Replace(".", "_");

        if (schemaInfo.SchemaType == SchemaInfo.FormSchemaType.Uicontrols)
        {
            return string.Format("{0}__{1}.xsd", schemaInfo.ChannelIdentifier.ChannelName.Replace(".", ""), sb);
        }
        else
        {
            return string.Format("functions__{0}.xsd",  sb);
        }
    }
}
