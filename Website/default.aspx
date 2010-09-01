<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="Composite.Core.Configuration" %>
<%@ Import Namespace="System.Globalization" %>

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Under Construction</title>

        <script runat="server">
            void Page_Init(object sender, EventArgs e)
            {
                if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
                {
                    Response.Redirect("Composite/top.aspx" + (Composite.RuntimeInformation.IsDebugBuild ? "?mode=develop" : ""));
                }
                
                
                CultureInfo defaultLocale = DataLocalizationFacade.DefaultLocalizationCulture;

                using (DataConnection dataConnection = new DataConnection(defaultLocale))
                {
                    IEnumerable<IPageHostNameBinding> hostNameMatches =
                        from binding in dataConnection.Get<IPageHostNameBinding>()
                        where binding.HostName != null
                                && binding.HostName != string.Empty
                        orderby binding.HostName.Length descending
                        select binding;

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
#warning MAW: Bind to sitemap stuff here - make sure we only find a published page
                        pageId = dataConnection.Get<IPageStructure>().Where(f=>f.ParentId==Guid.Empty).OrderBy(f=>f.LocalOrdering).Select(f=>f.Id).FirstOrDefault();

                        if (pageId != Guid.Empty)
                        {
                            string url = new PageUrl(PublicationScope.Published, defaultLocale, pageId, PageUrlType.Published).Build();

                            if (url != null)
                            {
                                Response.AddHeader("Location", url);
                                Response.StatusCode = 301; //  "Moved Permanently"
                                ApplicationInstance.CompleteRequest();
                            }
                        }
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
