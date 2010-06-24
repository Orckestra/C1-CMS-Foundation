using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.DynamicTypes.Foundation;
using System.Collections.Generic;
using Composite.Data.Foundation;


public partial class Spikes_DynamicTypes_MetaData : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        /*IMyDataMock mock = DataFacade.BuildNew<IMyDataMock>();
        mock.Id = Guid.NewGuid();
        mock.Name = "Hans";
        mock.Value = 10;
        DataFacade.AddNew<IMyDataMock>(mock);

        return;*/

        string baseUrl = Request.RawUrl;
        int idx = baseUrl.IndexOf('?');
        if (idx != -1)
        {
            baseUrl = baseUrl.Remove(idx);
        }

        if (Request.QueryString["ViewMetaData"] != null)
        {
            ViewMetaData(new Guid(Request.QueryString["ViewMetaData"]), baseUrl);
        }
        else if (Request.QueryString["DeleteMetaData"] != null)
        {
            DeleteMetaData(new Guid(Request.QueryString["DeleteMetaData"]), baseUrl);
        }
        else if (Request.QueryString["DeleteAllMetaData"] != null)
        {
            DeleteAllMetaData(baseUrl);
        }
        else
        {
            XElement tableElement = new XElement("table", new XAttribute("border", "1"));

            XElement rowHeaderElement = new XElement("tr");
            rowHeaderElement.Add(new XElement("th", "Type"));
            rowHeaderElement.Add(new XElement("th", "View"));
            rowHeaderElement.Add(new XElement("th", "Delete"));
            rowHeaderElement.Add(new XElement("th", "Id"));
            tableElement.Add(rowHeaderElement);

            foreach (IDataTypeDescriptor typeDescriptor in DataFacade.GetData<IDataTypeDescriptor>().OrderBy(k => k.Namespace + k.Name))
            {
                XElement rowElement = new XElement("tr");

                rowElement.Add(new XElement("td", string.Format("{0}.{1}", typeDescriptor.Namespace, typeDescriptor.Name)));

                string viewMetaDataUrl = string.Format("{0}?ViewMetaData={1}", baseUrl, typeDescriptor.Id);
                rowElement.Add(new XElement("td", new XElement("a", new XAttribute("href", viewMetaDataUrl), "View")));

                string deleteMetaDataUrl = string.Format("{0}?DeleteMetaData={1}", baseUrl, typeDescriptor.Id);
                rowElement.Add(new XElement("td", new XElement("a", new XAttribute("href", deleteMetaDataUrl), "Delete")));

                rowElement.Add(new XElement("td", typeDescriptor.Id));

                tableElement.Add(rowElement);
            }

            Response.Write(tableElement.ToString());

            string deleteAllMetaDataUrl = string.Format("{0}?DeleteAllMetaData=true", baseUrl);
            Response.Write(new XElement("div", new XElement("a", new XAttribute("href", deleteAllMetaDataUrl), "Delete all (Non generated)")));
        }
    }


    protected void ViewMetaData(Guid id, string baseUrl)
    {
        List<IDataFieldDescriptor> fieldDescriptions =
            (from fieldDescription in DataFacade.GetData<IDataFieldDescriptor>()
             where fieldDescription.TypeDescriptorId == id
             orderby fieldDescription.Position
             select fieldDescription).ToList();

        XElement tableElement = new XElement("table", new XAttribute("border", "1"));

        XElement rowHeaderElement = new XElement("tr");
        rowHeaderElement.Add(new XElement("th", "Name"));
        rowHeaderElement.Add(new XElement("th", "Id"));
        tableElement.Add(rowHeaderElement);

        foreach (IDataFieldDescriptor fieldDescriptor in fieldDescriptions)
        {
            XElement rowElement = new XElement("tr");

            rowElement.Add(new XElement("td", fieldDescriptor.Name));
            rowElement.Add(new XElement("td", fieldDescriptor.Id));

            tableElement.Add(rowElement);
        }

        Response.Write(tableElement.ToString());

        Response.Write(new XElement("div", new XElement("a", new XAttribute("href", baseUrl), "Done")));
        Response.Write(new XElement("br"));
    }


    protected void DeleteMetaData(Guid id, string baseUrl)
    {
        DataMetaDataFacade.DeleteMetaData(id);

        Response.Write(new XElement("div", string.Format("{0} delete!", id)));
        Response.Write(new XElement("br"));

        Response.Write(new XElement("div", new XElement("a", new XAttribute("href", baseUrl), "Ok")));
        Response.Write(new XElement("br"));
    }


    protected void DeleteAllMetaData(string baseUrl)
    {
         //List<Guid> guids = 
         //    (from td in DataFacade.GetData<IDataTypeDescriptor>()
         //     where td.CodeGenerated == false
         //     select td.Id).ToList();

         //foreach (Guid id in guids)
         //{
         //    DynamicTypesMetaDataFacade.DeleteMetaData(id);
         //}

         //Response.Write(new XElement("div", new XElement("a", new XAttribute("href", baseUrl), "Ok")));
         //Response.Write(new XElement("br"));
    }
}
