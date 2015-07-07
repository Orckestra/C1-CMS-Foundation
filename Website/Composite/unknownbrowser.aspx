<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ Page Language="C#" %>

<head>
    <title>Browser unknown</title>
    <link rel="stylesheet" type="text/css" href="splash.css.aspx" />
    <link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico" />
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
