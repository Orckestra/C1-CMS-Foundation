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
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Start Composite</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="stylesheet" type="text/css" href="splash.css.aspx" />
    <link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico" />
    <script type="text/javascript" src="default.js"></script>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div class="splash">
            <div class="splash-inner">
                <div class="logo"></div>
                <div id="welcome">
                    <p>Welcome to your Composite C1 website. You can start the C1 Console or go back to your website <a href=".." title="Go to the main page">frontpage</a>.</p>
                </div>
                <div id="start">
                    <a class="clickbutton" href="javascript:Composite.start();" title="Open Composite C1 in a new window">Start Composite C1</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
