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

using Composite.Renderings.Page;
using Composite.Logging;
using Composite.Xml;
using System.IO;
using Composite.Data;

public partial class Spikes_MAW_HtmlHead : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //var result = DataFacade.GetData<INewsCategory>();
        //var newData = DataFacade.BuildNew<INewsCategory>();
        //newData.Id = Guid.Empty;
        //DataFacade.AddNew<INewsCategory>("DynamicXmlDataProvider", newData);


        //var result2 = DataFacade.GetData<INewsCategoryLocalization>();
        //var newData2 = DataFacade.BuildNew<INewsCategoryLocalization>();
        //newData2.Id = Guid.Empty;
        //newData2.CultureName = "da-DK";
        //newData2.NewsCategoryId = Guid.Empty;
        //newData2.Name = "Hi there!";
        //DataFacade.AddNew<INewsCategory>("DynamicXmlDataProvider", newData2);


        XhtmlDocument doc = new XhtmlDocument();

        doc.Head.Add(new XElement( Namespaces.Xhtml+ "title", "hi there"));
        doc.Body.Add(new XElement(Namespaces.Xhtml + "h1", "Hello world... æøåÆØÅ <he he>"));
        doc.Body.Add(new XComment( "this is a comment æøå <he he>" ));

        doc.Body.Add(
            new XAttribute("class", "cool"),
            new XAttribute("id", "myBody"));

        doc.Root.Add(
            new XAttribute("id", "root"));


        doc.Body.Add(
            new XElement("div",
                new XAttribute("id", "myDiv"),
                new XElement("div",
                new XAttribute("id", "myDiv2")),
                new XElement("div",
                new XAttribute("id", "myInnerDiv"))));
            



        LoggingService.LogVerbose("raw", doc.ToString());

        this.Controls.Add(doc.AsAspNetControl());


        Control found = this.Page.FindControl("myInnerDiv");
        if (found != null)
        {
            found.Controls.Add(new LiteralControl("JEG FANDT DEN!!!"));
        }

        this.Title += " - asp.net can play along";
        
    }



    protected override void Render(HtmlTextWriter writer)
    {
        StringWriter sw = new StringWriter();
        base.Render(new HtmlTextWriter(sw));

        writer.Write(XDocument.Parse(sw.ToString()).ToString());
    }



}
