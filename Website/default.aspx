<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Core.Routing" %>
<%@ Import Namespace="Composite.Core.WebClient" %>
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
            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                Response.Redirect("Composite/top.aspx" + (RuntimeInformation.IsDebugBuild && ScriptLoader.UnbundledScriptsAvailable() ? "?mode=develop" : ""));
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
                        string url = PageUrls.BuildUrl(new PageUrlData(page), UrlKind.Public, new UrlSpace());

                        if (url != null)
                        {
                            Redirect(url);
                            return;
                        }
                    }
                }

                var sitemapNavigator = new SitemapNavigator(conn);
                PageNode homePageNode = sitemapNavigator.HomePageNodes.FirstOrDefault(); 

                if (homePageNode != null)
                {
                    Redirect(homePageNode.Url);
                    return;
                }
            }
        }
        
        void Redirect(string url)
        {
            if (url == Request.RawUrl)
            {
                if(!HttpRuntime.UsingIntegratedPipeline)
                {
                    Response.Write("Home page is mapped to '/' path, for this to work IIS 7.x integrated pipeline mode should be enabled. You can also edit the home page, give it a 'URL Title' on the settings tab and save and publish. <br/>");
                }
                else
                {
                    Response.Write("Cyclic redirection, there could be a problem with hostnames. <br/>");
                }
                
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
