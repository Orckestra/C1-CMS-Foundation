<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
    <title>Composite.Management.PagePreview.FullStop</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <script type="text/javascript" src="StopPageBinding.js" />
    <link rel="stylesheet" type="text/css" href="stop.css" />
</head>
<body>
    <ui:page binding="StopPageBinding" title="Go Back">
        <div class="message">
            <div class="icon">
                <ui:labelbox image="${icon:stop-red}"></ui:labelbox>
            </div>
            <div class="text">
                <ui:text label="Navigation disabled in preview." />
            </div>
        </div>
    </ui:page>
</body>
</html>
