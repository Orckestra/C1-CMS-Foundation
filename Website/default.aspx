<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="Composite.Renderings.Page" %>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Under Construction</title>

        <script runat="server">
            void Page_Init(object sender, EventArgs e)
            {
                using (new DataScope(Composite.Data.DataLocalizationFacade.DefaultLocalizationCulture))
                {
                    IEnumerable<IPageHostNameBinding> hostNameMatches =
                        from binding in DataFacade.GetData<IPageHostNameBinding>()
                        where binding.HostName != null
                                && binding.HostName != string.Empty
                        orderby binding.HostName.Length descending
                        select binding;

                    string url = null;

                    Guid pageId = Guid.Empty;

                    string hostname = Request.Url.Host.ToLower();

                    foreach (var binding in hostNameMatches)
                    {
                        if (hostname.EndsWith(binding.HostName))
                        {
                            pageId = binding.PageId;
                            break;
                        }
                    }

                    if (pageId == Guid.Empty)
                    {
                        pageId = PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault(rootPageId => PageManager.GetPageById(rootPageId) != null);
                    }

                    PageStructureInfo.GetIdToUrlLookup().TryGetValue(pageId, out url);

                    if (url != null)
                    {
                        Response.AddHeader("Location", url);
                        Response.StatusCode = 301;
                        ApplicationInstance.CompleteRequest();
                    }
                }                
            }
        </script>

        <style type="text/css">
            body
            {
                background-color: white;
                color: black;
                font-family: Verdana, sans-serif;
                font-size: 12px;
                padding: 20px;
            }
            p
            {
                margin: 0 0 20px 0;
            }
        </style>
    </head>
    <body>
        <p>
            Site under construction - <a href="Composite">start here</a>.</p>
    </body>
</html>
