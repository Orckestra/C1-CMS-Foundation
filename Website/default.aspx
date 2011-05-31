<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Core.Routing" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Core.Configuration" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="System.Globalization" %>
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

            using (var conn = new DataConnection(DataLocalizationFacade.DefaultLocalizationCulture))
            {
                string host = Request.Url.Host;

                var hostnameBinding = conn.Get<IHostnameBinding>().AsEnumerable().FirstOrDefault(b => b.Hostname == host);
                if(hostnameBinding != null)
                {
                    IPage page;
                    
                    using(new DataScope(PublicationScope.Published, new CultureInfo(hostnameBinding.Culture)))
                    {
                        page = PageManager.GetPageById(hostnameBinding.HomePageId);
                    }
                    
                    if(page != null)
                    {
                        string url = PageUrls.BuildUrl(new UrlData<IPage>(page), UrlKind.Public, new UrlSpace());

                        if (url != null)
                        {
                            Redirect(url);
                            return;
                        }
                    }
                }
                
                
                var sitemapNavigator = new SitemapNavigator(conn);
                PageNode homePageNode = sitemapNavigator.GetPageNodeByHostname(Request.Url.Host);

                if (homePageNode != null)
                {
                    Redirect(homePageNode.Url);
                    return;
                }
            }
        }
        
        void Redirect(string url)
        {
            if (url == Request.RawUrl && !HttpRuntime.UsingIntegratedPipeline)
            {
                Response.Write("Home page is mapped to '/' path, for this to work IIS 7.x integrated pipeline mode should be enabled. <br/>");
                Response.StatusCode = 500; //  "Error"
                Response.End();
            }

            Response.AddHeader("Location", url);
            Response.StatusCode = 301; //  "Moved Permanently"
            ApplicationInstance.CompleteRequest();
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
