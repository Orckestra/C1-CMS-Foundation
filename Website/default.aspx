<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Core.Configuration" %>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Under Construction</title>
        <script runat="server">
            void Page_Init(object sender, EventArgs e)
            {
                if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
                {
                    Response.Redirect(string.Format("Composite/top.aspx{0}", RuntimeInformation.IsDebugBuild ? "?mode=develop" : ""));
                }

#warning Remove outer using when bug fixing allow it                 
                using (DataScope dc = new DataScope(DataLocalizationFacade.DefaultLocalizationCulture))
                {
                    using (DataConnection dataConnection = new DataConnection(DataLocalizationFacade.DefaultLocalizationCulture))
                    {
                        SitemapNavigator sitemapNavigator = new SitemapNavigator(dataConnection);
                        PageNode homePageNode = sitemapNavigator.GetPageNodeByHostname(Request.Url.Host);

                        if (homePageNode != null)
                        {
                            Response.AddHeader("Location", homePageNode.Url);
                            Response.StatusCode = 301; //  "Moved Permanently"
                            ApplicationInstance.CompleteRequest();
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
            Site under construction - <a href="Composite">start here</a>.
        </p>
    </body>
</html>
