<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" %>

<script runat="server">
    bool HasDeveloperModeSupport
    {
        get { return Composite.Core.IO.C1File.Exists(this.MapPath("scripts/source/top/core/Application.js")); }
    }

    bool isCSSCompiled
    {
        get { return Composite.Core.IO.C1File.Exists(this.MapPath("styles/styles.min.css")) && Composite.Core.IO.C1File.Exists(this.MapPath("styles/styles.css")); }
    }
    
</script>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<head>
    <title>Start Developer Mode</title>
    <meta name="robots" content="noindex, nofollow" />
    <control:styleloader runat="server" />
     <% Response.WriteFile("favicon.inc"); %>
    <script type="text/javascript" src="default.js"></script>
    <style type="text/css">
        div#welcome {
            display: <%= (this.HasDeveloperModeSupport ? "block" : "none" ) %>;
        }

        div#start {
            display: <%= (this.HasDeveloperModeSupport ? "block" : "none" ) %>;
        }

        div#developermodeprb {
            display: <%= (this.HasDeveloperModeSupport ? "none" : "block" ) %>;
        }

        div#grunt {
            display: <%= (this.isCSSCompiled ? "none" : "block" ) %>;
        }

        div#splash {
            display: <%= (this.isCSSCompiled ? "block" : "none" ) %>;
        }
    </style>
</head>
<body>
    <div id="grunt">
        <% Response.WriteFile("grunt.inc"); %>
    </div>
    <div id="splash" class="splash-cover">
        <div class="splash-bg"></div>
        <div class="splash">
            <div class="splash-inner">
                <control:brandingSnippet runat="server" SnippetName="logo" />
                <div id="welcome">
                    <p>Welcome to your <%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %> website. You can start the Console or go back to your website <a href=".." title="Go to the main page">frontpage</a>.</p>
                </div>
                <div id="developermodeprb">
                    <p>C1 DeveloperMode has not been installed on this site.</p>
                    <p>Press <kbd>SHIFT</kbd> for OperationalMode</p>
                </div>
                <div id="start">
                    <a class="clickbutton mt-40" href="javascript:Composite.start(true);" title="Open in a new window">Start Developer Mode</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
