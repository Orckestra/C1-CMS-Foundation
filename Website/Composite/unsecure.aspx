<%@ Page Language="C#" %>

<%
    Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
    string websiteWatermark = string.Format("ɯǝɥʇpuıqoʇsɯɔǝuo:{0}", Composite.Core.Configuration.InstallationInformationFacade.InstallationId.GetHashCode() % 10000);
    string pageUrl = Request.Url.ToString();

    // jsonp'ish: if this evaluates to true our http brother is checking if we are alive, identical and well - if we are, we go https by js redirecting.
    if (Request.QueryString["jsprobe"] == "true" && pageUrl.IndexOf("/unsecure.aspx") > -1 && Request.QueryString["watermark"] == websiteWatermark)
    {
        string safeStart = pageUrl.Substring(0, pageUrl.IndexOf("unsecure.aspx")) + "default.aspx";
        Response.Write(string.Format("document.location='{0}'", safeStart));
        Response.End();
    }
%>
<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<head>
    <title>Unsecure Connection</title>
    <meta name="https-check-watermark" content="<%= websiteWatermark %>" id="watermark" />
    <link rel="stylesheet" type="text/css" href="unsecure.css.aspx" />
     <% Response.WriteFile("favicon.inc"); %>
     <control:styleloader runat="server" />
    <script type="text/javascript" src="unsecure.js"></script>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div id="splash" class="splash">
            <div class="splash-inner">
                <div id="unsecure">
                    <div id="head">
                        <div id="heading">
                            <div id="vignette"></div>
                            <h1>Not secure</h1>
                        </div>
                    </div>
                    <p>
                        <strong>Warning:</strong> This is not a secure connection - is the URL correct?
                    <span class="fallback">
                        <br />
                        <br />
                        If you continue all content, passwords etc. will be transmitted unencrypted.
                    </span>
                    </p>
                    <div id="start" class="fade fallback">
                        <a id="continuelink" href="#" class="clickbutton">Continue unsecured</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
