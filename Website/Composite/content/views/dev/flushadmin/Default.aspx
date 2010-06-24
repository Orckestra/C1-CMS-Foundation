<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="FlushAdmin_Default" %>

<%@ Register TagPrefix="control" TagName="httpheaders" Src="~/Composite/controls/HttpHeadersControl.ascx" %>
<%@ Register TagPrefix="control" TagName="scriptloader" Src="~/Composite/controls/ScriptLoaderControl.ascx" %>
<%@ Register TagPrefix="control" TagName="styleloader" Src="~/Composite/controls/StyleLoaderControl.ascx" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
    <title>Flush Admin</title>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
</head>
<body>
    <ui:page label="Flush Admin" image="${skin}/dialogpages/message16.png">
        <ui:scrollbox>
            <asp:PlaceHolder ID="FlushAdminPlaceHolder" runat="server" />
        </ui:scrollbox>
    </ui:page>
</body>
</html>