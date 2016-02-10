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
                <p>Please use a recent version of Firefox, Google Chrome, Apple Safari or Microsoft Edge. Or use Internet Explorer 9, 10 or 11.</p>
                <div id="iecompat">
                    <h2>Are you running Internet Explorer?</h2>
                    <p>Make sure <a href="http://windows.microsoft.com/en-us/internet-explorer/use-compatibility-view">'Compatibility View'</a> is NOT on. When turned off <a href="top.aspx">try again</a>.</p>
                    <p>
                        <strong>Are you using IE on an intranet?</strong>
                    </p>
                    <p>If you are running this site from an intranet host, IE may have been forced into Compatibility Mode by default. Launch the "Compatibility View Settings" and uncheck the option "Display intranet sites in Compatibility View".</p>
                </div>

                <script type="text/javascript">
                    if (navigator.appName != "Microsoft Internet Explorer") {
                        document.getElementById("iecompat").style.display = 'none';
                    } else {
                        // old IE - styling will be way off and the page looks like an error, so we alleviate this a bit:
                        var splachDiv = document.getElementById("splash");
                        splachDiv.style.width = "80%";
                        splachDiv.style.left = "10%";
                        splachDiv.style.top = "10%";
                    }
                </script>
            </div>
        </div>
    </div>
</body>
</html>
