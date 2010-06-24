<%@ Page Language="C#"  %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="Composite.Linq" %>
<%@ Import Namespace="System.Globalization" %>

<%

    using (new DataScope(DataScopeIdentifier.Administrated, new CultureInfo("en-US")))
    {
         IEnumerable<XElement> result = from info in DataFacade.GetData<evi.AAA>()
                                       join x in DataFacade.GetData<Composite.Data.Types.IPage>()
                                           on info.PageId equals x.Id
                                       select new
                                           XElement("DTInformation",
                                                    new XAttribute("Name", info.Name),
                                                    new XAttribute("PageTitle", x.Title),
                                                    new XAttribute("FriendlyURL", x.FriendlyUrl));


/*        IEnumerable<XElement> result = from x in DataFacade.GetData<Composite.Data.Types.IPage>()
                                       join info in DataFacade.GetData<evi.AAA>()
                                           on x.Id equals info.PageId
                                       select new
                                           XElement("DTInformation",
                                                    new XAttribute("Name", info.Name),
                                                    new XAttribute("PageTitle", x.Title),
                                                    new XAttribute("FriendlyURL", x.FriendlyUrl));*/
                
        
        XElement rx = new XElement("Result");
        foreach(XElement x in result)
        {
            rx.Add(x);
        }

        Response.Write(Server.HtmlEncode(rx.ToString()));
    }

%>