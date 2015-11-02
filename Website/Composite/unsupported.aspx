<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<head>
    <title>Browser not supported</title>
    <control:styleloader runat="server" />
    <% Response.WriteFile("favicon.inc"); %>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div id="splash" class="splash">
            <div id="unsupported" class="splash-inner">
                <h1>Not supported</h1>
                <p>We are terribly sorry, but your web browser is not supported.</p>
                <p>Please use a recent version of Firefox, Google Chrome, Apple Safari or Microsoft Internet Explorer 9 or 10.</p>
                <div id="iecompat">
                    <p>
                        <strong>Running the right version of Internet Explorer?</strong>

                    </p>
                    <p>Make sure <a href="http://windows.microsoft.com/en-us/internet-explorer/use-compatibility-view">'Compatibility View'</a> is NOT on. When turned off <a href="top.aspx">try again</a>.</p>
                </div>

                <script type="text/javascript">
                    if (navigator.appName != "Microsoft Internet Explorer") {
                        document.getElementById("iecompat").style.display = 'none';
                    }
                </script>
            </div>
        </div>
    </div>
</body>
</html>
