<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml"  xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>
<head>
    <title><%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %> was updated</title>
     <% Response.WriteFile("favicon.inc"); %>
    <control:styleloader runat="server" />
    <script type="text/javascript" src="updated.js"></script>
</head>
<body class="updatedpage">
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div id="splash" class="splash">
            <div class="splash-inner">
                <control:brandingSnippet runat="server" SnippetName="logo" />
                <div id="updated">
                    <div id="head">
                        <div id="heading">
                            <div id="vignette"></div>
                            <h3><%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %> 
                                <span>was updated</span></h3>
                        </div>
                    </div>
                    <p>
                        Your <%= Composite.Core.Configuration.GlobalSettingsFacade.ApplicationName %> installation has successfully been updated. Enjoy!
                    </p>
                    <div id="start">
                        <a id="continuelink" href="top.aspx" class="clickbutton mt-40">Continue</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
