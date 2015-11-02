<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<head>
    <title>Browser unknown</title>
    <control:styleloader runat="server" />
     <% Response.WriteFile("favicon.inc"); %>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div id="splash" class="splash">
            <div id="unsupported" class="splash-inner">
                <h1>Unknown browser</h1>
                <p>Failed to determine browser type. It may be caused by anti-virus software that blocks "User-Agent" http header. When resolved <a href="top.aspx">click here to retry.</a></p>
            </div>
        </div>
    </div>
</body>
</html>
