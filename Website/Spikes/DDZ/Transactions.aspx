<%@ Page Language="C#"  %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="Composite.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="Composite.Data.Types" %>

<%

    using (new DataScope(DataScopeIdentifier.Administrated, new CultureInfo("en-US")))
    {
        using (var scope = Composite.Transactions.TransactionsFacade.CreateNewScope())
        {
            IPage page = DataFacade.GetData<IPage>().FirstOrDefault();

            if (page.Title.EndsWith("1"))
            {
                page.Title = page.Title.Substring(0, page.Title.Length - 1);
            }
            else
            {
                page.Title = page.Title + "1";
            }
            
            scope.Complete();
        }
    }

%>