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
        a
        {
            background-image: url( "images/startcompositedev.png" );
        }
        #developermodeok
        {
            display: <%= (this.HasDeveloperModeSupport ? "block" : "none" ) %>;
        }
        #developermodeprb
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
            <div id="developermodeprb">
                <p>
                    C1 DeveloperMode has not been installed on this site.</p>
                <p>
                    Press SHIFT for OperationalMode</p>
            </div>
            <div id="developermodeok">
                <a href="javascript:Composite.start(true);"><span><img alt="" src="images/blank.png" />Start Developer Mode</span></a>
            </div>
        </div>
    </div>
</body>
</html>
