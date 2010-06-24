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
using Composite.Data;
using Composite.Data.Types;

public partial class Spikes_MAW_CreatePage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DataFacade.Delete<IPage>(p => p.Id == new Guid("774bd9a0-8abc-4710-af9e-cb7d37f8e859"));
        Guid pageTemplateId = DataFacade.GetData<IPageTemplate>().Select(pt => pt.Id).First();
        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
        {
            IPage page = DataFacade.BuildNew<IPage>();
            page.Id = Guid.NewGuid();            
            page.TemplateId = pageTemplateId;
            page.CultureName = "en-US";
            page.Title = "HomeC";
            page.MenuTitle = page.Title;
            page.UrlTitle = page.Title;
            page.Abstract = "";            
            page.PublicationStatus = "draft";
            IPage createdPage = DataFacade.AddNew<IPage>(page);

            IPageStructure pageStructure = DataFacade.BuildNew<IPageStructure>();
            pageStructure.Id = page.Id;
            pageStructure.ParentId = Guid.Empty;
            pageStructure.LocalOrdering = 0;
            DataFacade.AddNew<IPageStructure>(pageStructure);


            createdPage.PublicationStatus = "published";
            DataFacade.Update(createdPage);

            Response.Write(page.Id.ToString());
        }

    }
}
