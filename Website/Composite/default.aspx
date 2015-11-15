<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>

<%@ Page Language="C#" %>

<%@ Import Namespace="Composite.Core.WebClient" %>
<%
    if (Composite.RuntimeInformation.IsDebugBuild
        && (Request.UrlReferrer == null || Request.UrlReferrer.AbsolutePath == "/")
        && ScriptLoader.UnbundledScriptsAvailable())
    {
        Response.Redirect("develop.aspx");
    }
%>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<head>
    <title>Start Composite</title>
    <meta name="robots" content="noindex, nofollow" />
    <control:styleloader runat="server"/>
     <% Response.WriteFile("favicon.inc"); %>
    <script type="text/javascript" src="default.js"></script>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div class="splash">
            <div class="splash-inner">
                <control:brandingSnippet runat="server" SnippetName="logo" />
                <div id="welcome">
                    <p>Welcome to your <%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %> website. You can start the Console or go back to your website <a href=".." title="Go to the main page">frontpage</a>.</p>
                </div>
                <div id="start">
                    <a class="clickbutton mt-40" href="javascript:Composite.start();" title="Open in a new window">Start <%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %></a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
