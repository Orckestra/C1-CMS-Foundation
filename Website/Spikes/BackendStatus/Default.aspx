<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_BackendStatus_Default" Codebehind="Default.aspx.cs" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml"
xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders ID="Httpheaders1" runat="server" />
<head>
    <title>Composite.Management.Martins.Debugging</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
</head>
<body>
    <ui:dialogpage label="Relationship Graph" image="${skin}/dialogpages/warning16.png">
        <ui:scrollbox>
            <asp:PlaceHolder ID="InfoPlaceholder" runat="server" />
        </ui:scrollbox>
    </ui:dialogpage>
</body>
</html>
