<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ShowFunctionInfo.aspx.cs" Inherits="Composite_content_views_functioninfo_ShowFunctionInfo" %>


<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml"
xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders ID="Httpheaders1" runat="server" />

<head>
    <control:styleloader ID="Styleloader" runat="server" />
    <control:scriptloader ID="Scriptloader" type="sub" runat="server" />
    <link rel="stylesheet" type="text/css" href="ShowFunctionInfo.css" media="all" />
    <title>Function Info</title>
    <script type="text/javascript">
        DocumentManager.isDocumentSelectable = true;
    </script>
</head>
<body>
    <ui:page label="<%= this.PageLabel %>" image="${icon:zoom}">
        <%--<ui:toolbar id="toolbar">
            <ui:toolbarbody>
                <ui:toolbargroup>
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:toolbar>--%>
        <div id="statuscontainer">
            <asp:PlaceHolder ID="functionInfoPlaceholder" runat="server" />
        </div>
    </ui:page>
</body>
</html>
