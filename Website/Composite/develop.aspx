<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Language="C#" %>
<script runat="server">
    bool HasDeveloperModeSupport
    {
        get { return System.IO.File.Exists(this.MapPath("scripts/source/top/core/Application.js")); }
    }
</script>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Start Developer Mode</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="stylesheet" type="text/css" href="default.css.aspx" />
    <link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico" />
    <script type="text/javascript" src="default.js"></script>
    <style type="text/css">
        div#start a
        {
            background-image: url( "images/startcompositedev.png" );
        }
        div#welcome {
        	  display: <%= (this.HasDeveloperModeSupport ? "block" : "none" ) %>;
        }
        div#start
        {
            display: <%= (this.HasDeveloperModeSupport ? "block" : "none" ) %>;
        }
 		div#developermodeprb
        {
            display: <%= (this.HasDeveloperModeSupport ? "none" : "block" ) %>;
        }
    </style>
</head>
<body>
    <div id="composite">
        <div id="backdrop">
        </div>
        <div id="buzzwords">
        	<div id="welcome">
        		<p>Welcome to your C1 website. You can start the Composite console or go back to your website <a href=".." title="Go to the main page">frontpage</a>.</p>
        	</div>
            <div id="developermodeprb">
                <p>C1 DeveloperMode has not been installed on this site.</p>
                <p>Press <kbd>SHIFT</kbd> for OperationalMode</p>
            </div>
            <div id="start">
                <a href="javascript:Composite.start(true);" title="Open Composite C1 in a new window"><span><img alt="" src="images/blank.png" />Start Developer Mode</span></a>
            </div>
        </div>
    </div>
</body>
</html>
